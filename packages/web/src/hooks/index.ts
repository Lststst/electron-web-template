import { getCurrentInstance } from 'vue';

// 获取vue实例  
export function useInstance() {
  const instance = getCurrentInstance()!.appContext.config.globalProperties;
  return instance;
}

// $glabal在main install被挂载在window，方便添加全局属性方法，获取$glabal
export function useGlobal() {
  const instance = window.$global;
  return instance;
}
