import { app, ipcMain } from "electron";
import fse from "fs-extra";
import { join } from "node:path";
import { getStore, setStore } from "./mainStore";
import { isDev } from '../utils'

const MainListenerEvent = async (mainWindow) => {
  const pkg = await fse.readJSON(join(app.getAppPath(), isDev ? `../package.json` : '/package.json'));

  ipcMain.on("reloadApp", () => {
    mainWindow.webContents.reload();
  });

  ipcMain.on("minusApp", () => {
    console.log('ipcMain minusApp');
    mainWindow.minimize();
  });

  ipcMain.on("fullApp", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("closeApp", () => {
    mainWindow.close();
  });

  // 监听SPA页面js是否已经加载出来（页面挂载出来的时刻）
  ipcMain.on("pageLoadEnd", () => {
    mainWindow.webContents.send("getAppVersion", pkg.hotVersion);
  });

  ipcMain.handle("getAppJsonData", async (_, name) => {
    return getStore(name);
  });

  ipcMain.handle("setAppJsonData", (_, data) => {
    setStore(data.key, data.value);
  });
};

export default MainListenerEvent;
