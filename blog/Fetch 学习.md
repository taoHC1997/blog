# Fetch 学习

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
- 兼容： https://caniuse.com/?search=fetch
- 参考学习：
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
  - https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html

## 基础介绍

`fetch()` 是支持 `Promise` 的可使用流的模块化 API ，一般用来发起网络请求

> 它作为 `XMLHttpRequest` 请求方案的更理想的替代方案

下面给出简单示例：

```js
// 默认 GET 请求
fetch("http://example.com/movies.json")
  .then(function (response) {
    // 这里的 response 是一个 Stream 对象
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  })
  .catch((err) => console.log("Request Failed", err));
```

```js
// async 封装，推荐
async function getJSON() {
  let url = "http://example.com/movies.json";
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("Request Failed", error);
  }
}
```

这里说明一下 `fetch()` 的特定：

- 可跨域
- 只有在无响应和请求被阻止时会 `reject`
- 如果是 `404` 或者 `500` 等通信正常的情况，执行 `resolve` 此时返回的 `response.ok` 为 `false`

## API 介绍

```js
Promise<Response> fetch(input[, init]);
```

### 请求创建参数配置

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch

使用 `fetch()` 有两个参数：

- `input` 请求地址，一般是一个 URL ，也可是 `Request` 对象
- `init` 请求其他配置对象
  - `method` 请求方法， GET POST PUT DELETE
  - `headers` 请求头，注意部分默认头无法设置
  - `body` 请求体
  - `mode` 请求模式
    - `cors` 默认值，允许跨域请求
    - `no-cors` 请求方法只限于 GET 、 POST 和 HEAD ，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求
    - `same-origin` 只允许同源请求
  - `credentials` 表示用户代理是否应该在跨域请求的情况下从其他域发送 `cookies`
    - `same-origin` 默认值，同源请求时发送 Cookie ，跨域请求时不发送
    - `include` 不管同源请求，还是跨域请求，一律发送 Cookie
    - `omit` 一律不发送。
  - `cache` 请求 cache 模式
    - `default` 默认，先在缓存里面寻找匹配的请求
    - `no-store` 直接请求远程服务器，并且不更新缓存
    - `reload` 直接请求远程服务器，并且更新缓存
    - `no-cache` 将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存
    - `force-cache` 缓存优先，只有不存在缓存的情况下，才请求远程服务器
    - `only-if-cached` 只检查缓存，如果缓存里面不存在，将返回 504 错误
  - `redirect` 重定向策略
    - `follow` 自动重定向（ Chrome 47+ 默认）
    - `error` 如果产生重定向将自动终止并且抛出一个错误
    - `manual` 手动处理重定向（ Chrome 47- 默认）
  - `referrer` 指定 `referrer` 头
  - `referrerPolicy` 指定了 HTTP 头部 `referer` 字段的规则
    - `no-referrer-when-downgrade` 默认值，总是发送 `Referer` 标头，除非从 HTTPS 页面请求 HTTP 资源时不发送
    - `no-referrer` 不发送 `Referer` 标头
    - `origin` `Referer` 标头只包含域名，不包含完整的路径
    - `origin-when-cross-origin` 同源请求 `Referer` 标头包含完整的路径，跨域请求只包含域名
    - `same-origin` 跨域请求不发送 `Referer` ，同源请求发送
    - `strict-origin` `Referer` 标头只包含域名， HTTPS 页面请求 HTTP 资源时不发送 `Referer` 标头
    - `strict-origin-when-cross-origin` 同源请求时 `Referer` 标头包含完整路径，跨域请求时只包含域名， HTTPS 页面请求 HTTP 资源时不发送该标头
    - `unsafe-url` 不管什么情况，总是发送 `Referer` 标头
  - `integrity` 校验哈希值
  - `signal` 指定一个 `AbortSignal` 实例，用于取消 `fetch()` 请求
  - `keepalive` 用于页面卸载（离开）时，告诉浏览器在后台保持连接，继续发送数据

> 说明一下，配置参数实现了 `Request` 接口，可以参考： https://developer.mozilla.org/zh-CN/docs/Web/API/Request

### 请求响应对象 `Response`

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Response

`response` 作为一个 `Stream` 对象，针对响应处理提供了不少属性和方法辅助使用：

#### 请求响应对象常用属性

- `response.ok` 辅助判断请求是否成功；如果返回状态码为 `200~299` 为 `true` ，其他情况为 `false`
- `response.status` 响应状态码
- `response.statusText` 响应字符串
- `response.url` 请求 url （最终的）
- `response.type` 请求类型
  - `basic` 普通请求，即同源请求
  - `cors` 跨域请求
  - `error` 网络错误，主要用于 Service Worker
  - `opaque` 如果 `fetch()` 请求的 `type` 属性设为 `no-cors` ，就会返回这个值。表示发出的是简单的跨域请求，类似 `<form>` 表单的那种跨域请求
  - `opaqueredirect` 如果 `fetch()` 请求的 `redirect` 属性设为 `manual` ，就会返回这个值
- `response.redirected` 布尔值，表示请求是否发生过跳转
- `response.body` 响应体，这是一个底层接口，返回的是一个 `ReadableStream` 对象

##### 请求响应头对象 `Response.headers`

> 响应对象有一个响应头，是一个 `Headers` 对象

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Headers

```js
const response = await fetch(url);
for (let [key, value] of response.headers) {
  console.log(`${key} : ${value}`);
}
```

这里介绍一下此对象方法：

> 其实一般仅使用 `get()` 方法，因为此对象有很多东西只读，理论上也不应该修改

- `Headers.get()` 根据指定的键名，返回键值
- `Headers.has()` 返回一个布尔值，表示是否包含某个标头
- `Headers.set()` 将指定的键名设置为新的键值，如果该键名不存在则会添加
- `Headers.append()` 添加标头
- `Headers.delete()` 删除标头
- `Headers.keys()` 返回一个遍历器，可以依次遍历所有键名
- `Headers.values()` 返回一个遍历器，可以依次遍历所有键值
- `Headers.entries()` 返回一个遍历器，可以依次遍历所有键值对（ `[key, value]` ）
- `Headers.forEach()` 依次遍历标头，每个标头都会执行一次参数函数

#### 请求响应对象常用方法

除了上述属性外，此对象还提供了一些方法辅助**处理不同类型数据**：

- `response.text()` 得到文本字符串，比如网页
- `response.json()` 得到 `JSON` 对象，比如 `json` 文本
- `response.blob()` 得到二进制 `Blob` 对象，比如图片
- `response.formData()` 得到 `FormData` 表单对象，比如表单
- `response.arrayBuffer()` 得到二进制 `ArrayBuffer` 对象，比如流媒体

上述方法均为异步操作，返回的都是 `Promise` ，又因为 `Stream` 对象只能读取一次，故还有辅助克隆当前对象的方法：

- `response.clone()` 克隆当前流对象

此外，还有一些其他方法：

- `response.error()` 返回一个有网络错误的新的 `Response` 对象
- `response.redirect()` 重定向使用

### 取消请求 API

```js
// 1. 创建 AbortController 对象
let controller = new AbortController();
let signal = controller.signal;
fetch(url, {
  // 2. 请求配置 signal
  signal: controller.signal,
});
signal.addEventListener("abort", () => console.log("abort!"));
// 3. 取消请求（发出取消信号）
controller.abort();
console.log(signal.aborted);
```

## 示例

### 常见请求示例

#### GET 请求

```js
// 默认 get
const response = await fetch(url);
```

#### POST 请求

```js
// post 普通请求
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: "foo=bar&lorem=ipsum",
});
```

```js
// post 提交表单
const form = document.querySelector("form");
const response = await fetch("/users", {
  method: "POST",
  body: new FormData(form),
});
```

```js
// post 提交 json
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify(user),
});
```

```js
// post 提交文件（可使用表单附带提交）
const input = document.querySelector('input[type="file"]');
const data = new FormData();
data.append("file", input.files[0]);
data.append("user", "foo");
fetch("/avatars", {
  method: "POST",
  body: data,
});
```

```js
// post 提交二进制数据（二进制文件无需修改 Content-Type ）
let blob = await new Promise((resolve) => canvasElem.toBlob(resolve, "image/png"));
let response = await fetch(url, {
  method: "POST",
  body: blob,
});
```

#### 请求参数详细示例

```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8",
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined,
});
```

### 判断请求是否成功

```js
async function fetchText() {
  let response = await fetch("/readme.txt");
  if (response.ok) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

### 请求多次读取

```js
const response1 = await fetch("flowers.jpg");
const response2 = response1.clone();
const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();
image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```
