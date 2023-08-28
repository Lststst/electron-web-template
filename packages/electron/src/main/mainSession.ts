// 跨域处理
const SessionFn = (mainWindow) => {
  let curSession: any = mainWindow.webContents.session;

  // 跨域处理
  curSession.webRequest.onHeadersReceived((details, callback) => {
    details.responseHeaders["Access-Control-Allow-Origin"] = ["*"];
    details.responseHeaders["Access-Control-Allow-Methods"] = [
      "PUT, GET, HEAD, POST, DELETE, OPTIONS",
    ];
    details.responseHeaders["Access-Control-Allow-Headers"] = [
      "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
    ];
    callback({ responseHeaders: details.responseHeaders });
  });

  return curSession;
};

export default SessionFn;
