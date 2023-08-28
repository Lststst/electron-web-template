import { ipcRenderer } from "electron";

const exeUpdate = {
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
