export const isDev = process.env.ELECTRON_MODE === "development";
export const isPro = process.env.ELECTRON_MODE === "production";

export const showApp = (mainWindow) => {
  if (!mainWindow.isFocused() || mainWindow.isMinimized()) {
    mainWindow.focus();
    mainWindow.restore();
  } else {
    mainWindow.blur();
  }
}
