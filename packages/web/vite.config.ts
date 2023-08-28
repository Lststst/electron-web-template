import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver"; // 解析器 可以在文件中，自动识别 <i-carbon-accessibility/> unocss图标组件并导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import unocss from "unocss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig(({ command, mode }) => {

  const isBuild = mode !== 'development'; 

  return {
    base: isBuild ?  './' : '/',
    plugins: [
      vue(),
      unocss(),
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      AutoImport({
        imports: ["vue"],
        dts: "./src/@types/auto-imports.d.ts",
      }),
      // 按需导入resolvers解析的组件，也是无需import声明....
      Components({
        dts: "src/@types/components.d.ts",
        resolvers: [
          IconsResolver(),
          ElementPlusResolver({ importStyle: false }),
        ],
      }),
      Icons({
        compiler: "vue3",
        defaultStyle: "display: inline-block; vertical-align: middle;",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    clearScreen: false,
  };
});
