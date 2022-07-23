# axios 基础学习

> axios 是一个基于 promise 可以用于浏览器和 node.js 的网络请求库

- github
  - https://github.com/axios/axios
- 官网文档
  - https://axios-http.com/
  - https://axios-http.com/zh/
  - http://www.axios-js.com/zh-cn/

## 快速使用

1. 安装
   ```s
   # npm
   npm install axios
   # bower
   bower install axios
   # yarn
   yarn add axios
   ```
2. 导入
   ```html
   <!-- CDN 导入 -->
   <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   <!-- OR -->
   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
   ```
   ```js
   // js 导入
   const axios = require("axios");
   // 使用 CommonJS 时请
   const axios = require("axios").default;
   ```
3. 使用
   ```js
   // 向给定 ID 的用户发起请求
   axios
     .get("/user?ID=12345")
     .then(function (response) {
       // 处理成功情况
       console.log(response);
     })
     .catch(function (error) {
       // 处理错误情况
       console.log(error);
     })
     .then(function () {
       // 总是会执行
     });
   // 上述请求也可以按以下方式完成（可选）
   axios
     .get("/user", {
       params: {
         ID: 12345,
       },
     })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     })
     .then(function () {
       // 总是会执行
     });
   ```

## 使用

> 部分细节参考 API 部分

### 简单请求

```js
// 向给定 ID 的用户发起请求
axios
  .get("/user?ID=12345")
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
// 上述请求也可以按以下方式完成（可选）
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
// 支持 async/await 用法，注意浏览器兼容情况
async function getUser() {
  try {
    const response = await axios.get("/user?ID=12345");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
// post 请求
axios
  .post("/user", {
    firstName: "Fred",
    lastName: "Flintstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 并发请求

```js
// 多并发请求
function getUserAccount() {
  return axios.get("/user/12345");
}
function getUserPermissions() {
  return axios.get("/user/12345/permissions");
}
axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  })
);
```

### 错误处理

> 可以配置 `validateStatus` 辅助错误处理

```js
axios.get("/user/12345").catch(function (error) {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message);
  }
  console.log(error.config);
});
// 可以使用 toJSON 获取更多信息
axios.get("/user/12345").catch(function (error) {
  console.log(error.toJSON());
});
```

### 请求取消

> 使用 cancel token 取消一个请求，此 cancel token API 是基于被撤销 cancelable promises proposal

```js
// 生成 CancelToken 来取消请求
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // 处理错误
    }
  });
axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);
// 取消请求（message 参数是可选的）
source.cancel("Operation canceled by the user.");
```

```js
const CancelToken = axios.CancelToken;
let cancel;
axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  }),
});
// 取消请求
cancel();
```

> 注意: 可以使用同一个 cancel token 取消多个请求

### 请求编码使用 `application/x-www-form-urlencoded`

> 默认情况下，axios 将 JavaScript 对象序列化为 JSON 。 要以 `application/x-www-form-urlencoded` 格式发送数据，参见下面示例：

#### 浏览器

- `URLSearchParams`
  ```js
  // 使用 URLSearchParams ；注意兼容性
  const params = new URLSearchParams();
  params.append("param1", "value1");
  params.append("param2", "value2");
  axios.post("/foo", params);
  ```
- 使用 `qs` 库： https://github.com/ljharb/qs
  ```js
  const qs = require("qs");
  axios.post("/foo", qs.stringify({ bar: 123 }));
  ```
  ```js
  // ES6 环境
  import qs from "qs";
  const data = { bar: 123 };
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data),
    url,
  };
  axios(options);
  ```

#### Node

- 使用 `querystring` 模块
  ```js
  const querystring = require("querystring");
  axios.post("http://something.com/", querystring.stringify({ foo: "bar" }));
  ```
- 使用 `url` 模块
  ```js
  const url = require("url");
  const params = new url.URLSearchParams({ foo: "bar" });
  axios.post("http://something.com/", params.toString());
  ```
- 使用 `qs` 库（示例见上面）
- 使用 `form-data` 库： https://github.com/form-data/form-data
  ```js
  const FormData = require("form-data");
  const form = new FormData();
  form.append("my_field", "my value");
  form.append("my_buffer", new Buffer(10));
  form.append("my_file", fs.createReadStream("/foo/bar.jpg"));
  axios.post("https://example.com", form, { headers: form.getHeaders() });
  ```
- 使用拦截器
  ```js
  axios.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      Object.assign(config.headers, config.data.getHeaders());
    }
    return config;
  });
  ```

## API

### 方法介绍

#### `axios()`

- `axios(config)`
  ```js
  axios({
    method: "post",
    url: "/user/12345",
    data: {
      firstName: "Fred",
      lastName: "Flintstone",
    },
  });
  axios({
    method: "get",
    url: "http://bit.ly/2mTM3nY",
    responseType: "stream",
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
  });
  ```
- `axios(url[, config])`
  ```js
  // 默认发送 GET 请求，参数见上面示例
  axios("/user/12345");
  ```

#### 请求方法别名封装

除了 `axios()` ，请求方法还具有简单别名封装：

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

#### 并发方法

再就是并发方法：

- `axios.all(iterable)`
- `axios.spread(callback)`

#### 实例方法

> 实例在多接口使用时很方便

##### 创建

- `axios.create([config])`
  ```js
  const instance = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
  ```

##### 使用

- `instance.request(config)`
- `instance.get(url[, config])`
- `instance.delete(url[, config])`
- `instance.head(url[, config])`
- `instance.options(url[, config])`
- `instance.post(url[, data[, config]])`
- `instance.put(url[, data[, config]])`
- `instance.patch(url[, data[, config]])`
- `instance.getUri([config])`

#### 拦截器

> 拦截器在请求或响应被 `then` 或 `catch` 处理前拦截它们
> 实例也可添加拦截器

- `axios.interceptors.request.use()`
- `axios.interceptors.response.use()`
- `axios.interceptors.request.eject()`

```js
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 创建并取消拦截器
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

### 配置参数

#### 默认配置

配置全局默认值：

```js
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
```

配置实例默认值：

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: "https://api.example.com",
});
// 创建实例后修改默认值
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

默认值配置有优先级，依次为（从最高到最低排序）：

1. 创建时的 `config`
2. 配置的 `defaults`
3. 库里的 `lib/defaults.js`

#### 标准配置示例

下面给一个全部配置示例：

```js
{
  // `url` 是用于请求的服务器 URL ；只有此选项必填
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用与 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理
    // ...
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理
    // ...
    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer`是可选方法，主要用于序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
    // ...
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
    // ...
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则 promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
    // ...
  }),

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```

### 响应结构

下面是一个响应结构示例：

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```
