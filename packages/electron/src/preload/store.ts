import { ipcRenderer } from "electron";

const store = {
  /**
   * JSON - 获取本地shencomconfig.json文件的数据 传入字段
   * @param {string} name - 获取json文件里的某个对象的值
   * @returns {Promise<any>}
   */
  getAppJsonData: (name: string) =>
    ipcRenderer.invoke("getAppJsonData", name),

   /**
   * JSON - 设置本地shencomconfig.json文件的数据 传入字段、值。如果为嵌套对象：data1.data2。如果要改数组，需要传入新的数组
   * @param {string} key - 键值
   * @param {any} value - 属性值
   * @returns {Promise<any>}
   */
  setAppJsonData: (key: string, value: any) => ipcRenderer.invoke("setAppJsonData", {key, value}),
};

export default store;
