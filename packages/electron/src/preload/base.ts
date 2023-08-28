import { ipcRenderer } from "electron";
import type { RennderListenerFnType } from "./index";

export interface TrayNotification {
  from: {
    url: string,
    name: string,
  },
  value: {
    title: string,
    content: string
  }
}

const base = {
  /**
   * 运行的预加载脚本当前位置
   */
  preLoadPath: `file:///${__dirname.replaceAll('\\', '/')}`,
  /**
   * SPA页面加载完显示出页面后通知主线程
   */
  pageLoadEnd: () => ipcRenderer.send("pageLoadEnd"),
  /**
   * 页面获取版本号
   * @param {RennderListenerFnType} callback - 渲染进程注册监听
   */
  getAppVersion: (callback: RennderListenerFnType) =>
    ipcRenderer.on("getAppVersion", callback),
  /**
   * 显示系统通知
   * @param {TrayNotification} params - 入参
   */
  showTrayNotification: (params: TrayNotification) => ipcRenderer.send("showTrayNotification", params),
};

export default base;
