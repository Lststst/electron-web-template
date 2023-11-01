import vite from "vite";
import type { InlineConfig } from "vite";
import { join } from "node:path";
import { builtinModules } from "node:module";
import replace from "@rollup/plugin-replace";
import pkg from "../package.json";
import { spawn } from "node:child_process";
import * as chokidar from "chokidar";
import * as treeKill from "tree-kill";

type modeType = "development" | "production";

const isWin = process.platform === "win32";

// 防抖
let debounceTimer = null;
function debounce(callback, duration, isFirstExecution) {
  return function (...args) {
    let ctx = this;
    const delay = function () {
      debounceTimer = null;
      if (!isFirstExecution) callback.apply(ctx, args);
    };
    let executeNow = isFirstExecution && !debounceTimer;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(delay, duration);
    if (executeNow) callback.apply(ctx, args);
  };
}

const withExternalBuiltins = (config: InlineConfig) => {
  const builtins = builtinModules.filter((e) => !e.startsWith("_"));
  builtins.push(
    "electron",
    ...Object.keys(pkg.dependencies),
    ...builtins.map((m) => `node:${m}`)
  );

  config.build ??= {};
  config.build.rollupOptions ??= {};

  let external = config.build.rollupOptions.external;
  if (
    Array.isArray(external) ||
    typeof external === "string" ||
    external instanceof RegExp
  ) {
    external = builtins.concat(external as string[]);
  } else if (typeof external === "function") {
    const original = external;
    external = function (source, importer, isResolved) {
      if (builtins.includes(source)) {
        return true;
      }
      return original(source, importer, isResolved);
    };
  } else {
    external = builtins;
  }
  config.build.rollupOptions.external = external;

  return config;
};

const getBuildOptions = (
  { entey, outName }: { entey: string; outName: string },
  mode: modeType
) => {
  return withExternalBuiltins({
    mode: mode,
    publicDir: false,
    build: {
      lib: {
        entry: entey,
        formats: ["cjs"],
        fileName: () => `${outName}.js`,
      },
      outDir: "build",
      emptyOutDir: false,
      rollupOptions: {
        external: [],
        plugins: [
          // mode注入electron后台环境变量ELECTRON_MODE
          replace({
            preventAssignment: true,
            "process.env.ELECTRON_MODE": JSON.stringify(mode),
          }),
        ],
      },
    },
    resolve: {
      browserField: false,
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
  });
};

const viteBuild = async (mode: modeType) => {
  await vite.build(
    getBuildOptions(
      {
        entey: join(__dirname, "../src/main/index.ts"),
        outName: "main",
      },
      mode
    )
  );
  await vite.build(
    getBuildOptions(
      {
        entey: join(__dirname, "../src/preload/index.ts"),
        outName: "preload",
      },
      mode
    )
  );
};

const startElectron = () => {
  if (process.electronApp) {
    treeKill(Number(process.electronApp.pid), "SIGTERM", function (err) {
      if (err) {
        console.log("treeKill: ", err);
      }else{
        return ;
      }
    });
  }
  process.electronApp = spawn(
    join(__dirname, `../node_modules/.bin/electron${isWin ? ".cmd" : null}`),
    ["build/main.js"],
    { stdio: "inherit" }
  );
  // 监听子进程的退出事件
  process.electronApp.on("exit", (code, signal) => {
    process.exit();
    console.log(
      `Electron process exited with code ${code} and signal ${signal}`
    );
  });
};

if (process.argv.includes("-w")) {
  chokidar.watch(join(__dirname, "../src")).on(
    "all",
    debounce(
      async () => {
        await viteBuild("development");
        startElectron();
      },
      2000,
      true
    )
  );
} else {
  const isPro = process.argv.includes("--production");
  if (isPro) {
    viteBuild("production");
  }
}
