import { ipcRenderer } from "electron";
import type { RennderListenerFnType } from "./index";

const exeUpdate = {
  /**
   * 检查更新 - 检查是否有更新
   */
  updateCheck: () => ipcRenderer.invoke("updateCheck"),
  /**
   * 检查更新 - 下载进度
   */
  getDownLoadStatu: (callback: RennderListenerFnType) =>
    ipcRenderer.on("getDownLoadStatu", callback),
  /**
   * 全量更新 - 下载更新
   */
  exeUpdateDownload: () => ipcRenderer.send("exeUpdateDownload"),

  /**
   * 全量更新 - 更新替换
   */
  exeUpdateReStart: () => ipcRenderer.send("exeUpdateReStart"),
};

export default exeUpdate;
