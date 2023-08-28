import { Router, RouteRecordRaw } from "vue-router";
import * as utils from "@/utils";
import bridge from "../../electron/preload";

declare global {
  interface Window {
    bridge: typeof bridge;
    $global: {
      $bridge?: typeof bridge;
      $utils?: typeof utils;
    };
  }
}
