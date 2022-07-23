# Error 学习

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error

## js 常见错误类型

- `SyntaxError` 语法错误，解析代码时发生的语法错误
- `ReferenceError` 引用错误，引用一个不存在的变量时发生的错误
- `RangeError` 范围错误，当一个值超出有效范围时发生的错误
- `TypeError` 类型错误，是变量或参数不是预期类型时发生的错误
- `URIError` 路径错误
  以下情况会出现：
  - `encodeURI()`
  - `decodeURI()`
  - `encodeURIComponent()`
  - `decodeURIComponent()`
  - `escape()`
  - `unescape()`
- `EvalError` `eval()` 语句错误
- `InternalError` js 引擎内部错误

## 自定义错误类型

```js
function UserError(message) {
  this.message = message || "默认信息";
  this.name = "UserError";
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

## 错误处理

> 对于 JavaScript 引擎来说，遇到 `throw` 语句，程序就中止了。引擎会接收到 `throw` 抛出的信息，可能是一个错误实例，也可能是其他类型的值

一般可以采用 `try...catch` 和 `window.onerror` 处理错误

> 注意，对于 Ajax 请求，有单独的错误处理

### 记录当前环境信息

一般记录如下信息

```
device:  // 设备
browser: // 浏览器@版本
engine: // 内核
os: // 操作系统@版本
language: // 语言
```

### `window.onerror`

此方法有如下五个参数：

- `msg` （字符串）表示错误信息。直观的错误描述信息，不过压缩后代码的报错信息，并不直观
- `url` （字符串）表示发生错误对应的脚本路径
- `line` （数字）表示错误发生的行号
- `col` （数字）表示错误发生的列号
- `error` （对象）具体的 `error` 对象，包含详细的错误调用堆栈信息

```js
window.onerror = function (msg, url, line, col, error) {
  console.log("错误信息：", msg);
  console.log("出错文件：", url);
  console.log("出错行号：", line);
  console.log("出错列号：", col);
  console.log("错误详情：", error);
  // 错误上传
};
```

```js
/**
 * 异常监控
 * https://github.com/BetterJS/badjs-report
 * @param {String}  msg   错误信息
 * @param {String}  url      出错文件的URL
 * @param {Long}    line     出错代码的行号
 * @param {Long}    col   出错代码的列号
 * @param {Object}  error       错误信息Object
 */
window.onerror = function (msg, url, line, col, error) {
  var newMsg = msg;
  if (error && error.stack) {
    var stack = error.stack
      .replace(/\n/gi, "")
      .split(/\bat\b/)
      .slice(0, 9)
      .join("@")
      .replace(/\?[^:]+/gi, "");
    var msg = error.toString();
    if (stack.indexOf(msg) < 0) {
      stack = msg + "@" + stack;
    }
    newMsg = stack;
  }
  var obj = { msg: newMsg, target: url, rowNum: line, colNum: col };
  alert(obj.msg);
};
```

### `try...catch`

`try...catch` 可以拿到出错的信息，堆栈，出错文件，行号，列号等等。但无法捕捉到语法错误，也没法去捕捉全局的异常事件；此外，它还是同步的

```js
try {
  throw new Error("error");
} catch (e) {
  console.log(e);
  // 错误上传
}
// 最后可增加一个 finally 代码块，表示不管是否出现错误，都必需在最后运行的语句
```

注意，下列情况的错误无法捕获：

- `xhr` 接口错误，此时采取 `xhr.onerror` 获取错误
- 异步错误，此处处理放在代码块内部即可获取

### 元素加载绑定错误事件

```js
var myScript = document.createElement("script");
myScript.src = "//www.demo.com/js/test.js";
myScript.onload = function () {};
myScript.onerror = function (e) {
  console.log("myScript load fail");
  // 错误上传
};
document.body.appendChild(myScript);
```

### Ajax 错误

如果使用了 JQuery ，可以使用 `$(document).ajaxError` 监听错误：

```js
$(document).ajaxError(function (event, xhr, options, exc) {
  console.log("event 对象：", event);
  console.log("XMLHttpRequest 对象：", xhr);
  console.log("url&type等参数：", options);
  console.log("javaScript exception：", exc);
  // 错误上传
});
```

如果是原生环境，可以这样：

```js
// 引入代码
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
(function () {
  function ajaxEventTrigger(event) {
    var ajaxEvent = new CustomEvent(event, {
      detail: this,
    });
    window.dispatchEvent(ajaxEvent);
  }
  var oldXHR = window.XMLHttpRequest;
  function newXHR() {
    var realXHR = new oldXHR();
    realXHR.addEventListener(
      "abort",
      function () {
        ajaxEventTrigger.call(this, "ajaxAbort");
      },
      false
    );
    realXHR.addEventListener(
      "error",
      function () {
        ajaxEventTrigger.call(this, "ajaxError");
      },
      false
    );
    realXHR.addEventListener(
      "load",
      function () {
        ajaxEventTrigger.call(this, "ajaxLoad");
      },
      false
    );
    realXHR.addEventListener(
      "loadstart",
      function () {
        ajaxEventTrigger.call(this, "ajaxLoadStart");
      },
      false
    );
    realXHR.addEventListener(
      "progress",
      function () {
        ajaxEventTrigger.call(this, "ajaxProgress");
      },
      false
    );
    realXHR.addEventListener(
      "timeout",
      function () {
        ajaxEventTrigger.call(this, "ajaxTimeout");
      },
      false
    );
    realXHR.addEventListener(
      "loadend",
      function () {
        ajaxEventTrigger.call(this, "ajaxLoadEnd");
      },
      false
    );
    realXHR.addEventListener(
      "readystatechange",
      function () {
        ajaxEventTrigger.call(this, "ajaxReadyStateChange");
      },
      false
    );
    return realXHR;
  }
  window.XMLHttpRequest = newXHR;
})();
```

```js
// 错误监听
realXHR.addEventListener(
  "error",
  function () {
    ajaxEventTrigger.call(this, "ajaxError");
    // 异步上报日志
    console.log("override XMLHttpRequest ajax error");
  },
  false
);
```
