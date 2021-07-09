# ajax 学习

> AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

- 文档：
  - https://xhr.spec.whatwg.org/
  - https://developer.mozilla.org/zh-CN/docs/Glossary/XHR_(XMLHttpRequest)
  - https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
  - https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

## 基础介绍

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。AJAX 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行

> 默认情况，同源地址才可以相互 ajax 访问
> 如果需要跨域访问，请设置响应头：
>
> ```php
> header('Access-Control-Allow-Origin: *');
> header('Content-Type: application/json');
> echo json_encode($data);
> ```

## 简单使用

```js
var xhr = new XMLHttpRequest();
console.log(xhr.readyState);
// => 0
// 初始化 请求代理对象
xhr.open("GET", "time.php");
console.log(xhr.readyState);
// => 1
// open 方法已经调用，建立一个与服务端特定端口的连接
xhr.send();
xhr.addEventListener("readystatechange", function () {
  switch (this.readyState) {
    case 2:
      // => 2
      // 已经接受到了响应报文的响应头
      // 可以拿到头
      // console.log(this.getAllResponseHeaders())
      console.log(this.getResponseHeader("server"));
      // 但是还没有拿到体
      console.log(this.responseText);
      break;
    case 3:
      // => 3
      // 正在下载响应报文的响应体，有可能响应体为空，也有可能不完整
      // 在这里处理响应体不保险（不可靠）
      console.log(this.responseText);
      break;
    case 4:
      // => 4
      // 一切 OK （整个响应报文已经完整下载下来了）
      console.log(this.responseText);
      break;
  }
});
```

注意，对应 `XMLHttpRequest.readyState` ，它返回一个整数，表示实例对象的当前状态。该属性只读，对应介绍：

- `0` 表示 `XMLHttpRequest` 实例已经生成，但是实例的 `open()` 方法还没有被调用
- `1` 表示 `open()` 方法已经调用，但是实例的 `send()` 方法还没有调用，仍然可以使用实例的 `setRequestHeader()` 方法，设定 HTTP 请求的头信息
- `2` 表示实例的 `send()` 方法已经调用，并且服务器返回的头信息和状态码已经收到
- `3` 表示正在接收服务器传来的数据体（ body 部分）。这时，如果实例的 `responseType` 属性等于 `text` 或者空字符串， `responseText` 属性就会包含已经收到的部分信息
- `4` 表示服务器返回的数据已经完全接收，或者本次接收已经失败

## api 介绍

### 属性

- `xhr.readyState` 只读， XMLHttpRequest 对象的状态，见上面描述
- `xhr.status` 只读，服务器返回的状态码，等于 200 表示一切正常
- `xhr.responseText` 只读，服务器返回的文本数据
- `xhr.responseXML` 只读，服务器返回的 XML 格式的数据
- `xhr.statusText` 只读，服务器返回的状态文本
- `xhr.timeout` 时限设置
  ```js
  xhr.timeout = 3000;
  // 配套事件，超时即失败，然后自动执行
  xhr.ontimeout = function (event) {
    alert("请求超时！");
  };
  ```
- `xhr.responseType` 定义响应值类型
- `xhr.response` 只读，响应值，取决于 `xhr.responseType`
- `xhr.responseURL` 只读，返回的 URL
- `xhr.statusText` 只读，包含文本的响应状态，如 `200 OK`
- `xhr.upload` 只读，上传进度条
- `xhr.withCredentials` 指定跨域 Access-Control 请求是否应当带有授权信息
  ```js
  xhr.withCredentials = true;
  ```

### 方法

- `xhr.abort()`
  如果请求已被发出，则立刻中止请求
- `xhr.getAllResponseHeaders()`
  以字符串的形式返回所有用 CRLF 分隔的响应头，如果没有收到响应，则返回 null
- `xhr.getResponseHeader()`
  返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 null
- `xhr.open()`
  初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 `openRequest()`
  ```js
  // async 默认 true 表示异步
  xhr.open(method, url);
  xhr.open(method, url, async);
  xhr.open(method, url, async, user);
  xhr.open(method, url, async, user, password);
  ```
- `xhr.overrideMimeType()`
  覆写由服务器返回的 MIME 类型
- `xhr.send()`
  发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回
- `xhr.setRequestHeader()`
  设置 HTTP 请求头的值。必须在 `open()` 之后、 `send()` 之前调用 `setRequestHeader()` 方法

### 事件

> 均可以使用 `on` 前缀定义

- `readystatechange` 状态改变
- `loadstart` 接受到数据触发
- `load` 请求成功后触发加载
- `loadend` 请求结束后触发，不知是否成功
- `timeout` 超时
- `error` 错误
- `progress` 下载进度条属性，周期性触发；注意 `xhr.upload.progress` 是上传进度条

## 使用示例

### 使用表单（支持文件上传）

> 最新的 ajax 支持使用表单（部分代码略）

```js
// js 定义表单
var formData = new FormData();
formData.append("username", "张三");
formData.append("id", 123456);
xhr.send(formData);
```

```js
// 使用 dom 上的表单
var form = document.getElementById("myform");
var formData = new FormData(form);
formData.append("secret", "123456"); // 添加一个表单项
xhr.open("POST", form.action);
xhr.send(formData);
```

```js
// 使用文件
var formData = new FormData();
for (var i = 0; i < files.length; i++) {
  formData.append("files[]", files[i]);
}
xhr.send(formData);
```

### 使用二进制数据

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png");
xhr.responseType = "blob";
// 获取时使用
var blob = new Blob([xhr.response], { type: "image/png" });
```

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png");
xhr.responseType = "arraybuffer";
// 获取时使用
var arrayBuffer = xhr.response;
if (arrayBuffer) {
  var byteArray = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteArray.byteLength; i++) {
    // do something
  }
}
```

### 进度条使用

```js
function updateProgress(event) {
  if (event.lengthComputable) {
    var percentComplete = (event.loaded / event.total) * 100;
  }
}
// 下载进度条
xhr.onprogress = updateProgress;
// 上传进度条
xhr.upload.onprogress = updateProgress;
```

### 原生封装

```js
// 请基于此定制或使用更为先进的库
var XHR = (function () {
  var obj = null; // xhr对象
  function init() {
    create();
    send();
  }
  // 创建xhr对象
  function create() {
    if (window.XMLHttpRequest) {
      obj = new XMLHttpRequest();
    } else if (window.ActiveObject) {
      obj = new ActiveObject("Microsoft.XMLHTTP");
    }
    echange();
  }
  // 发送消息
  function send() {
    var v = parseInt(Math.random() * 100);
    obj.open("get", "test.php?v=" + v, true);
    obj.send(null);
    obj.onreadystatechange = echange;
  }
  // 接收消息
  function echange() {
    /*
        0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
        1 (初始化) 对象已建立，尚未调用send方法
        2 (发送数据) send方法已调用，但是当前的状态及http头未知
        3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误
        4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据
        */
    if (obj.readyState == 4 && obj.status == 200) {
      var result = JSON.parse(obj.responseText);
      console.log(result);
    }
  }
  return {
    init: init,
  };
})();
```

### JQuery 封装

```js
$.ajax({
  url: "test.php", // 请求地址
  data: { v: v }, // 发送的数据
  dataType: "json", // 返回的数据格式
  type: "get", // 请求的方式：get|post
  // 发送前执行
  beforeSend: function () {
    console.log("beforeSend");
  },
  // 返回成功执行
  success: function (result) {
    console.log(result);
  },
  // 返回失败执行
  error: function (err) {
    console.log(err);
  },
  // 无论成功还是失败都会执行
  complete: function () {
    console.log("complete");
  },
  // 状态码对应的操作
  statusCode: {
    200: function () {
      console.log("200, ok");
    },
    404: function () {
      console.log("404, page not found");
    },
  },
});
```
