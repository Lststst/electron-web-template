import * as Store from "electron-store";

let eStore: Store | null = null;

const initAppStore = async () => {
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
