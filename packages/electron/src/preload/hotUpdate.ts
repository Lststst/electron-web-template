import { ipcRenderer } from "electron";
import type { RennderListenerFnType } from "./index";

const hotUpdate = {
  /**
   * 检查更新 - 检查是否有更新
   */
  updateCheck: () => ipcRenderer.invoke("updateCheck"),
  /**
   * 检查更新 - 获取当前新版本（增量/全量）
   */
  getIfHasUpdate: (callback: RennderListenerFnType) =>
    ipcRenderer.on("getIfHasUpdate", callback),
  /**
   * 检查更新 - 下载进度
   */
  getDownLoadStatu: (callback: RennderListenerFnType) =>
    ipcRenderer.on("getDownLoadStatu", callback),

  /**
   * 增量更新 - 确认下载
   */
  hotUpdateDownload: () => ipcRenderer.invoke("hotUpdateDownload"),
    /**
   * 增量更新 - 更新替换
   */
  hotUpdateReStart: () => ipcRenderer.invoke("hotUpdateReStart"),
};

export default hotUpdate;
