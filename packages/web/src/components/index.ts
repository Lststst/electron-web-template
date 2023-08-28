import type { App } from 'vue';
import * as ElementIcons from '@element-plus/icons-vue';
import * as components from './components';

export * from './components';

export const install = (app: App) => {
  Object.values(components).forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    } else if (component.install) {
      app.use(component as any);
    }
  });

  for (const [key, component] of Object.entries(ElementIcons)) {
    app.component(`el-icon-${key}`, component);
  }
};

export default { install };
