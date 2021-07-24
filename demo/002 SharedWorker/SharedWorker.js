// SharedWorker.js
var clients = [];
let data;
onconnect = function (e) {
  let port = e.ports[0];
  clients.push(port);
  port.onmessage = function (e) {
    for (var i = 0; i < clients.length; i++) {
      if (e.data === "get") {
        // postMessage 既是发送也是接受方法
        clients[i].postMessage(data);
      } else {
        data = e.data;
      }
    }
  };
  port.start();
};
