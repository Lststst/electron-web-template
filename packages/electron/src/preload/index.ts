import { contextBridge } from "electron";
import type { IpcRendererEvent } from "electron";
import base from "./base";
import store from "./store";
import settings from './settings';
import exeUpdate from './exeUpdate';
import projectFn from './projectFn';

export type RennderListenerFnType = (
  _: IpcRendererEvent,
  ...args: any[]
) => void;

const bridge:any = {
  ...base,
  ...settings,
  ...store,
  ...exeUpdate,
  ...projectFn,  
};

// 暴露给渲染环境的变量 window.bridge
contextBridge.exposeInMainWorld("bridge", bridge);

export default bridge;
