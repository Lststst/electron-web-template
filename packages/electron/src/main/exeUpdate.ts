import { ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import electronBuildJson from "../../electron-builder.json";
import { isDev } from "../utils/index";

const ExeUpdaterModule = (mainWindow) => {
  if (isDev) {
    autoUpdater.forceDevUpdateConfig = true;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.setFeedURL(electronBuildJson.publish.url);

  ipcMain.handle("updateCheck", async (_) => {
    const result = await autoUpdater.checkForUpdates();
    return result.hasOwnProperty("downloadPromise");
  });

  // 页面确定要更新后去下载新包
  ipcMain.on("exeUpdateDownload", async () => {
    await autoUpdater.downloadUpdate();
  });

  // 下载完成后，由页面点击安装重启
  ipcMain.on("exeUpdateReStart", () => {
    setTimeout(() => {
      autoUpdater.quitAndInstall(true, true);
    }, 800);
  });

  autoUpdater.on("error", (err) => {});

  // 下载进度
  autoUpdater.on("download-progress", (progressObj) => {
    mainWindow.webContents.send("getDownLoadStatu", progressObj.percent);
  });

  // 已经下载完成
  autoUpdater.on("update-downloaded", (info) => {
    // 提示是否重启安装
    mainWindow.webContents.send("getDownLoadStatu", "100");
  });
};

export default ExeUpdaterModule;
