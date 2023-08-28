/** 环境判断 */
export const IsDev = import.meta.env.MODE === 'development';
export const IsPro = import.meta.env.VITE_APP_IS_PRO === 'true';
export const IsTst = !IsDev && !IsPro;
export const IsElectron = Boolean(window?.bridge)