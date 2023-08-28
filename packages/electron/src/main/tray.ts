import { Tray, nativeImage, Menu, MenuItem, app, ipcMain } from "electron";
import { join } from "node:path";
import { showApp, isPro } from '../utils'

// 可使用menu.html自定义托盘菜单
const TrayFn = (mainWindow) => {
  // 托盘
  const icon = nativeImage.createFromPath(join(process.env.PUBLIC, "/icon.png"));
  const tray = new Tray(icon);
  const contextMenu = new Menu();
  contextMenu.append(new MenuItem({
    label: '关闭应用',
    click: () => {
      // 菜单项1的点击事件处理
      app.quit();
      process.exit(0);
    }
  }))
  contextMenu.append(new MenuItem({
    label: '打开应用',
    click: () => {
      // 菜单项2的点击事件处理
      showApp(mainWindow)
    }
  }))
  tray.setToolTip(
    `深传科技${isPro ? "(beta)" : ""}`
  );
  tray.on("double-click", () => {
    showApp(mainWindow)
  });
  tray.setContextMenu(contextMenu)
  
  ipcMain.on('showTrayNotification', (_, notificationData) => {
      tray.displayBalloon({
        iconType: 'none',
        title : notificationData.value.title,
        content: notificationData.value.content
      })
  })

};

export default TrayFn;
