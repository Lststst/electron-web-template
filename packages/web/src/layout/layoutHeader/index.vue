<script setup lang="ts">
import { useGlobal } from '@/hooks';
import { RefreshRight, Minus, FullScreen, Close } from '@element-plus/icons-vue';
import { usePageStore } from '@/stores'

const { $bridge, $utils } = useGlobal();
const pageStore = usePageStore();

const handleCloseApp= () => {
   if ($utils.IsElectron) {
     $bridge.closeApp();
   }
}

const handleRefresh = () => {
  if ($utils.IsElectron) {
    $bridge.reloadApp();
  }
}

const handleRelauch = () => {
  if ($utils.IsElectron) {
    $bridge.hotUpdateReStart();
  }
}

</script>

<template>
  <div class="w-full h-10 flex items-center bg-primary border-b-(1px solid #000) z-100 layoutHeader">
    <!-- 左侧按钮 -->
    <div class="relative h-full flex flex-c justify-around items-center noDragArea leafButtonArea">
      <div class="w-12 h-full flex justify-center items-center cursor-pointer transition-all hover:bg-primaryBgHover"
        @click="handleRefresh">
        <RefreshRight id="headerReload" class="w-5.3 h-5.3 text-white" />
      </div>
    </div>
    <div class="h-full flex-1">
    </div>
    <!-- 更新进度条 -->
    <div v-if="pageStore.downloadProgress" class="h-full text-#fff text-[13px] flex-c mr-2 noDragArea">
      <template v-if="pageStore.downloadProgress != 100">
        <span>{{ pageStore.downloadProgress.toFixed(2) }}%</span>
      </template>
      <template v-else>
        <span @click="handleRelauch" class="cursor-pointer hover:underline">立即重启</span>
      </template>
      <div class="w-25 h-2 ml-2 relative">
        <div class="h-full absolute left-0 top-0 bg-green rounded-2xl" :style="`width: ${pageStore.downloadProgress}%;`"></div>
      </div>
    </div>
    <!-- 右侧按钮 -->
    <div class="h-full flex-jb items-center noDragArea">
      <div class="w-12 h-full flex justify-center items-center transition-all hover:bg-primaryBgHover cursor-pointer"
        @click="$bridge.minusApp()">
        <Minus class="w-5 h-5 text-white" />
      </div>
      <div class="w-12 h-full flex justify-center items-center transition-all hover:bg-primaryBgHover cursor-pointer"
        @click="$bridge.fullApp()">
        <FullScreen class="w-5 h-5 text-white" />
      </div>
      <div class="w-12 h-full flex justify-center items-center transition-all hover:bg-primaryBgHover cursor-pointer"
        @click="handleCloseApp">
        <Close class="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layoutHeader {
  -webkit-app-region: drag;

  .noDragArea {
    -webkit-app-region: no-drag;
  }
}
</style>