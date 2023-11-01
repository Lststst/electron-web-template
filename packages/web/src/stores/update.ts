import { ref } from "vue";
import { defineStore } from "pinia";

export interface managementLogItem {
  time: string | number;
  content: string;
  statu?: "info" | "error" | "success";
}

export interface printInfo {
  name: string;
  displayName: string;
  description: string;
  isDefault: boolean;
  options: any;
  status: number;
}

export const useUpdateStore = defineStore("useUpdateStore", () => {
  // 是否可以更新
  const ifCanUpdate = ref<null | false | Record<string, any>>(null);
  // 当前更新进度
  const downloadProgress = ref(0);
  // 当前版本
  const version = ref("");

  const changeVersion = (_version: string) => {
    version.value = _version;
  };

  const changeIfCanUpdate = (flag: false | Record<string, any>) => {
    ifCanUpdate.value = flag;
  };

  const changeDownloadProgress = (progress: number) => {
    downloadProgress.value = progress;
  };

  return {
    version,
    ifCanUpdate,
    downloadProgress,
    changeIfCanUpdate,
    changeDownloadProgress,
    changeVersion,
  };
});
