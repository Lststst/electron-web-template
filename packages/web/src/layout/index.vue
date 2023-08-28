

<script setup lang="ts">
import { onMounted, KeepAlive } from "vue";
import { RouterView } from "vue-router";
import { useGlobal } from '@/hooks';
import { compareVersions } from '../utils/index'
import LayoutHeader from './layoutHeader/index.vue';

const { $bridge, $utils } = useGlobal();

const version = ref('');

onBeforeMount(() => {
  console.log($utils.IsElectron, $bridge, '$bridge.');
  if ($utils.IsElectron) {    
    // 获取当前程序版本号
    $bridge.getAppVersion((_, value) => {
      version.value = value;
    });
  }

})

onMounted(() => {
  // 通知后台页面代码加载完成
  if ($utils.IsElectron) {
    $bridge.pageLoadEnd();
  }
  // webview注入js
  if ($utils.IsElectron) {
    const webviewPreloadFilePath = `${$bridge.preLoadPath}.replace('preload', 'webviewPreload/index.js')}`
  }
})

</script>

<template>
  <div class="wh-full relative">
    <LayoutHeader class="fixed top-0" />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" class="absolute top-10 h-[calc(100vh-66px)]" />
      </KeepAlive>
    </RouterView>

    <div v-if="version" class="absolute bottom-1 left-1 text-white text-xs">
      当前版本号：{{ version }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>