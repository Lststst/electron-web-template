export const isDev = process.env.ELECTRON_MODE === "development";
export const isPro = process.env.ELECTRON_MODE === "production";
export const isTst = process.env.ELECTRON_MODE === "tst";

export const compareVersions = (version1, version2) => {
  const parts1 = version1.split(".");
  const parts2 = version2.split(".");

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parseInt(parts1[i] || 0);
    const part2 = parseInt(parts2[i] || 0);

    if (part1 > part2) {
      return { index: i + 1, result: 1 };
    } else if (part1 < part2) {
      return { index: i + 1, result: -1 };
    }
  }

  return { result: 0 };
};

export const showApp = (mainWindow) => {
  if (!mainWindow.isFocused() || mainWindow.isMinimized()) {
    mainWindow.focus();
    mainWindow.restore();
  } else {
    mainWindow.blur();
  }
}
