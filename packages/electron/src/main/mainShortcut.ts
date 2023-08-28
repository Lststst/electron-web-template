import * as electronLocalshortcut from "electron-localshortcut";

const LayoutSetting = (mainWindow) => {
  const web = mainWindow.webContents;

  electronLocalshortcut.register(mainWindow, "ESC", () => {
    process.exit(0);
  });

  electronLocalshortcut.register(mainWindow, "F5", () => {
    web.reload();
  });
  
  electronLocalshortcut.register(mainWindow, "F12", () => {
    web.isDevToolsOpened() ? web.closeDevTools() : web.openDevTools();
  });

};

export default LayoutSetting;
