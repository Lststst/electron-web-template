import { app, dialog } from "electron";
import { join } from "node:path";
import { execSync } from "child_process";

export const isDev = process.env.ELECTRON_MODE === "development";

export const isPro = process.env.ELECTRON_MODE === "production";

// json数据对比新旧对比覆盖
export function coverJson(originObj, newObj) {
  // 新增
  for (const key in newObj) {
    if (originObj.hasOwnProperty(key)) {
      // 属性存在于原始的对象中，保持不变
      if (typeof originObj[key] === "object") {
        coverJson(originObj[key], newObj[key]);
      }
      continue;
    } else {
      // 属性不存在于原始对象中，进行覆盖操作
      originObj[key] = newObj[key];
    }
  }
  // 去除
  for (const key in originObj) {
    if (newObj.hasOwnProperty(key)) {
      // 原始对象和新对象都存在则保持不变
      if (typeof newObj[key] === "object") {
        coverJson(originObj[key], newObj[key]);
      }
      continue;
    } else {
      // 原始对象不存在某属性，则删除
      delete originObj[key];
    }
  }
}

// 自启动
export async function selfStart(productionName: string) {
  if (!isDev) {
    // 修改下由自启动时造成路径不同
    process.cwd = () => {
      const exePath = join(app.getAppPath(), "../..");
      return exePath;
    };
    app.setLoginItemSettings({
      openAtLogin: true,
      path: join(process.cwd(), `/${productionName}.exe`),
      enabled: true,
    });
  }
}

// 授予安装路径所有权限
export async function installPathAuthorized() {
  try {
    // 自启动时，拿到的process.cwd()不一样，变成 window/system32
    const folderPath = process.cwd().replaceAll("\\", "\\\\");
    const checkAccessCmd: string = execSync(`icacls "${folderPath}"`, {
      windowsHide: true,
      encoding: "utf-8",
    });
    if (
      checkAccessCmd.indexOf("Everyone:(OI)(CI)(F)") === -1 ||
      checkAccessCmd.indexOf("Users:(OI)(CI)(F)") == -1
    ) {
      // 使用icacls命令添加权限
      execSync(`icacls "${folderPath}" /grant Users:(OI)(CI)F`, {
        windowsHide: true,
      });
      execSync(`icacls "${folderPath}" /grant Everyone:(OI)(CI)F`, {
        windowsHide: true,
      });
      console.log("权限已设置");
    }
  } catch (err) {
    dialog.showErrorBox(
      "设置权限时发生错误",
      `
      ${process.cwd()}
    ${err.toString()}
    尝试以管理者模式打开应用。
    `
    );
    process.exit(0);
  }
}
