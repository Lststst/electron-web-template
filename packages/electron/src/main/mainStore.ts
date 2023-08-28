import { app } from "electron";
import * as fse from "fs-extra";
import * as Store from "electron-store";

let eStore: Store | null = null;

const initAppStore = async () => {
  // 是否第一次使用
  const exists = await fse.pathExists(
    `${app.getPath("userData")}/config.json`
  );  
  eStore = new Store({
    defaults: {},
  });
};

const getStore = (key: string) => {
  return (eStore as Store).get(key);
};

const setStore = (key: string, value: any) => {
  (eStore as Store).set(key, value);
};


export {
  eStore,
  initAppStore,
  getStore,
  setStore
};
