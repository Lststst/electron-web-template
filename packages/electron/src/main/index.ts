import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { join } from "node:path";
import console from "electron-log";
import fse from "fs-extra";
import mainSession from "./mainSession";
import mainShortcut from "./mainShortcut";
import mainListenerEvent from "./mainListenerEvent";
import mainMenu from "./mainMenu";
// import exeUpdate from "./exeUpdate";
// import hotUpdate from "./hotUpdate";
import mainTray from "./tray";
import { initAppStore } from "./mainStore";
import { isDev } from "../utils";

if(!isDev){
  console.transports.file.resolvePath = () =>
    join(process.cwd(), `logs/${app.getName()}.log`);
  // 确保目录为空。如果目录不为空，则删除目录内容。如果该目录不存在，则创建该目录。目录本身不会被删除。
  fse.emptyDirSync(join(process.cwd(), "logs"));
}

if (process.platform === "win32") app.setAppUserModelId(app.getName());
// window security 开发告警
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
// 进程异常监听输出日志
process.on("uncaughtException", (error) => {
  console.error(error);
});

app.commandLine.appendSwitch("disable-web-security");
// 应用单例锁
// if (!app.requestSingleInstanceLock()) {
//   console.info("Apply singleton lock, app quit...");
//   app.quit();
//   process.exit(0);
// }

let mainWindow: BrowserWindow | null = null;
const createWindow = async () => {
  const preload = join(__dirname, "preload.js");
  const url = `http://127.0.0.1:${process.env?.webDevPort}/`; // dev时加载localhsot
  const indexHtml = join(__dirname, "/web/index.html"); // pro时加载html
  mainWindow = new BrowserWindow({
    show: false,
    title: "xxx系统",
    width: 1200,
    height: 800,
    // icon: join(process.env.PUBLIC, "icon.png"),
    frame: false,
    webPreferences: {
      preload,
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  console.log(preload,'preload');
  console.log(app.getAppPath(),'app.getAppPath()')
  console.log(process.env?.webDevPort, 'process.env.webDevPort');
  
  if (isDev) {
    mainWindow.loadURL(url);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(indexHtml);
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
};

try{
  
  // 创建应用及功能
  app
    .whenReady()
    .then(() => {
      initAppStore();
      createWindow();
    })
    .then(() => {
      // 会话管理模块
      mainSession(mainWindow);
      // 快捷键模块
      mainShortcut(mainWindow);
      // 自定义菜单
      mainMenu(mainWindow);
      // 全量更新模块
      // exeUpdate(mainWindow);
      // 热更新模块
      // hotUpdate(mainWindow);
      // 主线程监听事件模块
      mainListenerEvent(mainWindow);
      // 托盘
      mainTray(mainWindow);
    });
}catch(err){
  console.error(err)
}

app.on("window-all-closed", () => {
  globalShortcut.unregisterAll();
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (mainWindow) {
    // 如果用户试图打开另一个窗口，则聚焦于主窗口
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
