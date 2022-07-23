# WebSocket 技术

- 文档： https://developer.mozilla.org/zh-CN/docs/Glossary/WebSockets

> 谷歌开发者工具中选 network 并选择 WS 即可查看此接口数据（没有请刷新）

## 基础介绍

WebSockets 的核心是定义了一个在客户端和服务器之间建立套接字连接的 Web API 。它允许自 Web 浏览器或服务器从任何方向上的数据通讯。此外，与 HTTP 相比，它还进行了多项优化，使其更适合实时通讯的场景。

在 HTTP 请求中，浏览器发送 Cookie 和其他头信息需要使用几百个字节，由于这陡增的数据容量，从而增加了实时通信的额外开销。

如果使用 WebSockets ，信息的尺寸很小，只有 6 个字节的开销（其中 2 个用于 header 报头， 4 个用于掩码值），因此， WebSockets 更适合实时数据传输，尤其适合低延迟的应用场景。

下面列举 WebSocket 特点：

- 可以服务器客户端双向平等对话
- 建立在 TCP 协议之上，服务器端的实现比较容易
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
- 数据格式比较轻量，性能开销小，通信高效
- 可以发送文本，也可以发送二进制数据
- **没有同源限制，客户端可以与任意服务器通信**
- 协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL

## 简单使用

> 如果使用 https ，对应使用 wss

用户端开启：

```js
// 创建一个 Websocket 连接
let socketConnection = new WebSocket("ws://websocket.mysite.com");
// 创建一个使用子协议的 WebSocket 连接
let socketConnection = new WebSocket("ws://websocket.mysite.com", [
  "soap",
  "xmpp",
]);
socketConnection.onopen = function (event) {
  // 发送消息
  socketConnection.send(
    "Here's some text that the server is urgently awaiting!"
  );
};
// 接受消息事件
socketConnection.onmessage = function (event) {
  console.log(event.data);
};
// 关闭事件
socketConnection.onclose = function (event) {
  console.log(e);
};
// 主动关闭链接
socketConnection.close();
```

服务端监听：

```js
// 当连接打开时，一些数据会被发送到服务器上。
socketConnection.onopen = function () {
  connection.send("Hello, the socket connection is open!"); // Send a message to the server
};
// 记录错误日志
socketConnection.onerror = function (error) {
  console.log("WebSocket Error " + error);
};
// 记录来自服务器的消息
socketConnection.onmessage = function (e) {
  console.log("Server: " + e.data);
};
```
