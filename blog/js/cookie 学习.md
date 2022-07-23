# cookie 学习

> 有两个 api

## 原 api `document.cookie`

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie

### 基础使用

```js
// 获取
// 注意，不能访问 httponly 类型的 cookie
allCookies = document.cookie;
// 加入新 cookie
// 注意这里 newCookie 是一个键值对字符串，如 'jsc=ffff'
// 还有其他规范限制 cookie ，见文档
document.cookie = newCookie;
```

### 封装

```js
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/
var docCookies = {
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};
```

下面介绍使用：

- 写入： `docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])`
- 读取： `docCookies.getItem(name)`
- 移除： `docCookies.removeItem(name[, path],domain)`
- 检测： `docCookies.hasItem(name)`
- 得到所有 cookie 的列表： `docCookies.keys()`

## 最新 api `cookieStore`

- 文档： https://developer.mozilla.org/en-US/docs/Web/API/CookieStore
- 兼容性： https://caniuse.com/?search=cookieStore

> Chrome87 版本提供的最新 api
> 此 api 仅 https 协议下可使用

### 基础使用

方法：

> 所有方法天然支持 Promise （即返回 Promise 对象）

- `CookieStore.set()`
  ```js
  // 注意，使用方法均可以采用下面两个用法
  // 用法一
  cookieStore.set("username", "Tom");
  // 用法二
  cookieStore.set({
    name: "cookie1",
    // 注意值默认会转 toString()
    value: "cookie1-value",
    expires: Date.now() + 24 * 60 * 60 * 1000,
    // domain: "example.com",
    // path: "/",
    // sameSite: "strict",
    // sameSite: "lax",
    // sameSite: "none",
  });
  ```
- `CookieStore.get()`
  ```js
  let cookie = cookieStore.get("cookie1");
  ```
- `CookieStore.getAll()`
  ```js
  let cookies = cookieStore.getAll();
  // 注意，可以传参数获取某对应 cookie
  ```
- `CookieStore.delete()`
  ```js
  let result = cookieStore.delete("cookie1");
  ```

事件：

- `CookieStore.onChange`

  ```js
  // 用法一
  cookieStore.onchange = function (event) {
    console.log(event.changed);
    console.log(event.deleted);
  };
  // 用法二
  cookieStore.addEventListener("change", (event) => {
    const type = event.changed.length ? "change" : "delete";
    const data = (event.changed.length ? event.changed : event.deleted).map(
      (item) => item.name
    );
    console.log(`刚才进行了 ${type} 操作，cookie有：${JSON.stringify(data)}`);
  });
  // 使用 document.cookie 修改也可监听，此时总是认为是在修改 cookie ，而不是删除
  ```

示例：

```js
// 只有在 https 协议下才使用 cookieStore
const isSupportCookieStore =
  typeof cookieStore === "object" && location.protocol === "https:";
if (isSupportCookieStore) {
  cookieStore
    .set("username", "Tom")
    .then(() => console.log("设置成功"))
    .catch(() => console.error("设置失败"));
}
```
