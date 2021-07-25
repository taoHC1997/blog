# js 内置对象 Promise

所谓 `Promise` ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说， `Promise` 是一个对象，从它可以获取异步操作的消息。 `Promise` 提供统一的 API ，各种异步操作都可以用同样的方法进行处理

> `Promise` 对象是为了回调地狱问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用

## 基础使用

### 基础介绍

`Promise` 对象有以下两个特点：

1. 对象的状态不受外界影响。 `Promise` 对象代表一个异步操作，有三种状态： `pending` （进行中）、 `fulfilled` （已成功）和 `rejected` （已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 `Promise` 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。 `Promise` 对象的状态改变，只有两种可能：从 `pending` 变为 `fulfilled` 和从 `pending` 变为 `rejected` 。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved` （已定型）。如果改变已经发生了，你再对 `Promise` 对象添加回调函数，也会立即得到这个结果。这与事件（ `Event` ）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

`Promise` 也有一些缺点：

1. 无法取消 `Promise` ，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数， `Promise` 内部抛出的错误，不会反应到外部
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### 简单使用

```js
const promise = new Promise(function(resolve, reject) {
	// ... some code
	if (/* 异步操作成功 */){
	  resolve(value);
	} else {
	  reject(error);
	}
});
promise.then(function(value) {
	// success
	}, function(error) {
	// failure		第二个函数是可选的
});
```

```js
var promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("成功执行");
  }, 500);
});
promise.then(function (value) {
  setTimeout(() => {
    console.log(value);
  }, 500);
});
```

### `thenable`

包含 `then()` 方法的对象被称为 `thenable` ，所有的 `Promise` 都是 `thenable` ，下面是一个自定义的 `thenable` ， `then()` 方法的参数含义与 `Promise` 中的相同

```js
let tha = {
  then(resolve, reject) {
    reject("thenable");
  },
};
// resolve 接受一个 thenable ，返回一个新的 Promise 实例
// 注意： resolve 能将 thenable 转换成已完成或已拒绝的 Promise ，其最终的状态取决于 thenable 的 then() 方法
Promise.resolve(tha)
  .catch(function (reason) {
    console.log(reason); // xthenable
  })
  .then(function () {
    console.log("end");
  });
```

## 对象方法

### 实例链式方法

#### `Promise.prototype.then()`

`then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数（可选）是 `rejected` 状态的回调函数

```js
getJSON("/posts.json")
  .then(function (json) {
    return json.post;
  })
  .then(function (post) {
    // ...
  });
```

#### `Promise.prototype.catch()`

`Promise.prototype.catch()` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数

> 此方法其行为相当于调用一个忽略已完成的回调函数的 `then()` 方法
> 如果 `Promise` 状态已经变成 `resolved` ，再抛出错误是无效的

```js
getJSON("/posts.json")
  .then(function (posts) {
    // ...
  })
  .catch(function (error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log("发生错误！", error);
  });
```

```js
p.then((val) => console.log("fulfilled:", val)).catch((err) =>
  console.log("rejected", err)
);
// 等同于
p.then((val) => console.log("fulfilled:", val)).then(null, (err) =>
  console.log("rejected:", err)
);
```

这里介绍一下：

`Promise` 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获

一般来说，不要在 `then` 方法里面定义 `Reject` 状态的回调函数（即 `then` 的第二个参数），总是使用 `catch` 方法

> 一般建议链式最后加 `catch`

`Promise` 内部的错误不会影响到 `Promise` 外部的代码

> 注意： `Node` 有一个 `unhandledRejection` 事件，专门监听未捕获的 `reject` 错误
>
> ```js
> process.on("unhandledRejection", function (err, p) {
>   throw err;
> });
> ```

#### `Promise.prototype.finally()`

`finally` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 `Promise` 状态到底是 `fulfilled` 还是 `rejected` 。这表明， `finally` 方法里面的操作，应该是与状态无关的，不依赖于 `Promise` 的执行结果

> `finally` 本质上是 `then` 方法的特例
> `finally` 方法总是会返回原来的值

### 对象静态方法

#### `Promise.all()`

`Promise.all()` 方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例

```js
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()` 方法接受一个数组作为参数， `p1` 、 `p2` 、 `p3` 都是 `Promise` 实例，如果不是，就会先调用下面讲到的 `Promise.resolve` 方法，将参数转为 `Promise` 实例，再进一步处理。（ `Promise.all` 方法的参数可以不是数组，但必须具有 `Iterator` 接口，且返回的每个成员都是 `Promise` 实例）

1. 只有 `p1` 、 `p2` 、 `p3` 的状态都变成 `fulfilled` ， `p` 的状态才会变成 `fulfilled` ，此时 `p1` 、 `p2` 、 `p3` 的返回值组成一个数组，传递给 `p` 的回调函数
2. 只要 `p1` 、 `p2` 、 `p3` 之中有一个被 `rejected` ， `p` 的状态就变成 `rejected` ，此时第一个被 `reject` 的实例的返回值，会传递给 `p` 的回调函数

#### `Promise.race()`

`Promise.race()` 方法同样是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要 `p1` 、 `p2` 、 `p3` 之中有一个实例率先改变状态， `p` 的状态就跟着改变。那个率先改变的 `Promise` 实例的返回值，就传递给 `p` 的回调函数

#### `Promise.resolve()`

有时需要将现有对象转为 `Promise` 对象， `Promise.resolve` 方法就起到这个作用

```js
const jsPromise = Promise.resolve($.ajax("/whatever.json"));
// 上面代码将 jQuery 生成的 deferred 对象，转为一个新的 Promise 对象
```

注意：

1. 参数是一个 `Promise` 实例
   原样返回
2. 参数是一个 `thenable` 对象
   `thenable` 对象指的是具有 `then` 方法的对象，这时先转；然后 `then`
3. 参数不是具有 `then` 方法的对象，或根本就不是对象
   返回一个新的 `Promise` 对象，状态为 `fulfilled` 。值会传
4. 不带有任何参数
   直接返回一个 `resolved` 状态的 `Promise` 对象

```js
let tha = {
  then(resolve, reject) {
    resolve("thenable");
  },
};
// 参数为空
Promise.resolve().then(function (value) {
  console.log(value); // undefined
});
// 参数为非 thenable
Promise.resolve("string").then(function (value) {
  console.log(value); // "string"
});
// 参数为 thenable
Promise.resolve(tha).then(function (value) {
  console.log(value); // "thenable"
});
// 参数为 Promise
Promise.resolve(
  new Promise(function (resolve) {
    resolve("Promise");
  })
).then(function (value) {
  console.log(value); // "Promise"
});
```

> 立即 `resolve()` 的 `Promise` 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时

#### `Promise.reject()`

`Promise.reject(reason)` 方法也会返回一个新的 `Promise` 实例，该实例的状态为 `rejected`
`Promise.reject()` 方法的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。这一点与 `Promise.resolve` 方法不一致

```js
Promise.reject("rejected").catch(function (reason) {
  console.log(reason); // "rejected"
});
var p = Promise.resolve();
Promise.reject(p).catch(function (reason) {
  reason === p; // true
});
```

## 技巧示例

### 图片加载封装

```js
function preImg(src) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
      resolve(this);
    };
    img.onerror = function () {
      reject(this);
    };
  });
}
preImg("img/page.png").then(function (value) {
  console.log(value);
});
```

### Ajax 封装

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```