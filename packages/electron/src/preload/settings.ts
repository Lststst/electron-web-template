import { ipcRenderer } from "electron";

const settings = {
  /**
   * 应用设置 - 最小化
   */
  minusApp: () => { console.log('web minusApp'); ipcRenderer.send("minusApp");},
  /**
   * 应用设置 - 全屏/恢复
   */
  fullApp: () => ipcRenderer.send("fullApp"),
  /**
   * 应用设置 - 关闭
   */
  closeApp: () => ipcRenderer.send("closeApp"),
  /**
   * 应用设置 - 重新加载
   */
  reloadApp: () => ipcRenderer.send("reloadApp"),
};

export default settings;
