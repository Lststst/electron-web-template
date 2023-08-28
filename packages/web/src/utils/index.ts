export const compareVersions = (version1, version2) => {
  const parts1 = version1.split(".");
  const parts2 = version2.split(".");

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parseInt(parts1[i] || 0);
    const part2 = parseInt(parts2[i] || 0);

    if (part1 > part2) {
      // 有更新
      return { index: i + 1, result: 1 };
    } else if (part1 < part2) {
      // 错误
      return { index: i + 1, result: -1 };
    }
  }
  // 无更新
  return { result: 0 };
};

export * from "./env";
