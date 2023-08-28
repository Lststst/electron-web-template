import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../layout/index.vue";
import Page1 from "../views/page1/index.vue";
import Page2 from "../views/page2/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/page1",
      children: [
        {
          path: "/page1",
          name: "Page1",
          component: Page1,
        },
        {
          path: "/page2",
          name: "Page2",
          component: Page2,
        },
      ],
    },
  ],
});

export default router;
