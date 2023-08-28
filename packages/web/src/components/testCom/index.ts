import type { App } from "vue";
import TestCom from "./index.vue";

TestCom.install = function (app: App) {
  app.component("TestCom", TestCom);
  return app;
};

export { TestCom };
export default TestCom;
