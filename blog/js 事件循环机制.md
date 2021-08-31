# js 事件循环机制

> 事件循环（Event Loop）

> 参考： http://www.ruanyifeng.com/blog/2014/10/event-loop.html

## 基础概念

由于 js 是单线程机制，故而在使用定时器如 `setTimeout()` 会有一种机制，叫事件循环。

### 执行栈（stack）

**栈**：英文为 stack

- 定义：一种存放数据的内存区域
- 特点：LIFO，后进先出

当引擎第一次遇到 JS 代码时，会产生一个全局执行上下文并压入执行栈（ execution context stack ），每遇到一个函数调用，就会往栈中压入一个新的上下文。引擎执行栈顶的函数，执行完毕，弹出当前执行上下文

```js
fucntion tur(b){
    var a = 4;
    return a+b;
}
function emy(y){
    var x = 3;
    return tur(x * y);
}
console.log(emy(5));
// 当调用 emy 时，创建了第一个栈帧，帧这包含了 emy 的参数和局部变量
// 当 emy 调用 tur 时，第二个栈帧就被创建，并且压到第一个帧上，帧中包含了 tur 的参数和局部变量
// 当 tur 返回时，最上面的帧就被弹出栈，此时剩下 emy 的调用帧
// 当 emy 返回时，栈就空了
```

函数调用时， 便会在内存形成了一个 调用记录， 又称 **调用帧** ， 保存调用位置和内部变量等信息。 如果函数内部还调用了其他函数，那么在调用记录上方又会形成一个调用记录， 所有的调用记录就形成一个**调用栈**。

### 存储堆（heap）

对象被分配在一个堆中，一个用以表示一个内存中大的未被组织的区域。

### 任务队列（queue）

任务分化：

- 同步任务
- 异步任务
  - 宏任务：**macro-task** 包括： script (整体代码), setTimeout , setInterval , setImmediate , I/O , UI rendering , postMessage , MessageChannel
  - 微任务：**micro-task** 包括：process.nextTick, **Promise.then**, MutationObserver （ Object.observe , MutationObserver 这两个**弃用**了）

> `Promise` 构造函数中的语句看做同步执行
> `requestAnimationFrame` 既不属于宏任务，也不属于微任务；由浏览器根据当前的策略自行决定在哪一帧执行

注意：

- 所有的代码都要通过函数调用栈中调用执行
- 遇到异步 APIs 时，会交给浏览器内核的其他模块进行处理
- 任务队列中存放的是（异步）回调函数。同步任务直接入栈
- 等到调用栈中的 task 执行完之后再回去执行任务队列之中的 task

具体执行顺序：

- 先有全局执行上下文，同步任务开始
- 同步任务调用栈清空，只剩全局执行上下文
- 开始执行所有的`微任务`，此时有`宏任务`则加入其队列而不执行
- 执行`宏任务`中的一个任务队列，此时有`微任务`则加入其队列而不执行
- 执行所有的`微任务`然后`宏任务`，就这样一直循环...

```js
console.log("golb1");
setImmediate(function () {
  console.log("immediate1");
  process.nextTick(function () {
    console.log("immediate1_nextTick");
  });
  new Promise(function (resolve) {
    console.log("immediate1_promise");
    resolve();
  }).then(function () {
    console.log("immediate1_then");
  });
});
setTimeout(function () {
  console.log("timeout1");
  process.nextTick(function () {
    console.log("timeout1_nextTick");
  });
  new Promise(function (resolve) {
    console.log("timeout1_promise");
    resolve();
  }).then(function () {
    console.log("timeout1_then");
  });
  setTimeout(function () {
    console.log("timeout1_timeout1");
    process.nextTick(function () {
      console.log("timeout1_timeout1_nextTick");
    });
    setImmediate(function () {
      console.log("timeout1_setImmediate1");
    });
  });
});
new Promise(function (resolve) {
  console.log("glob1_promise");
  resolve();
}).then(function () {
  console.log("glob1_then");
});
process.nextTick(function () {
  console.log("glob1_nextTick");
});
```

到此，事件循环已经有初步印象了

> **同->微->宏->(循环上两步)**

一点注意

- `setTimeout` ：它按时到队列，不过要等队列之前同步代码执行完
- `setInterval` ：每过一个间断，会有一个函数进入队列；队列中已有任务后不再重复添加

## 在 node 中的事件循环

### 前置知识

Node 中的 `Event Loop` 是基于 `libuv` 实现的，而 `libuv` 是 Node 的新跨平台抽象层， `libuv` 使用异步，事件驱动的编程方式，核心是提供 `i/o` 的事件循环和异步回调。 `libuv` 的 `API` 包含有时间，非阻塞的网络，异步文件操作，子进程等等

Event Loop 就是在 `libuv` 中实现的。所以关于 Node 的 `Event Loop` 学习，有两个官方途径可以学习:

- libuv 文档
- 官网的 What is the Event Loop?

### 事件阶段

Node 的 Event Loop 分为 6 个阶段：

- timers ：执行 `setTimeout()` 和 `setInterval()` 中到期的 callback
- pending callback : 上一轮循环中有少数的`I/O` callback 会被延迟到这一轮的这一阶段执行
- idle, prepare ：仅内部使用
- poll : 最为重要的阶段，执行`I/O` callback ，在**适当的条件下**会阻塞在这个阶段
- check : 执行`setImmediate`的 callback
- close callbacks : 执行`close`事件的 callback ，例如`socket.on('close'[,fn])`、`http.server.on('close, fn)`

> 上面六个阶段都不包括 `process.nextTick()`
> 它拥有一个自己的队列：`nextTickQueue`
> 这是因为 `process.nextTick()` 从技术上讲不是 Event Loop 的一部分。相反，无论当前事件循环的当前阶段如何，都将在当前操作完成之后处理 `nextTickQueue`

> 从使用者角度而言，这两个名称非常的容易让人感觉到困惑
>
> - `process.nextTick()` 在同一阶段立即触发
> - `setImmediate()` 相当于 `setTimeout(() => {}, 0)` 它会在事件循环的下一次迭代或 tick 中触发
>
> 貌似这两个名称应该互换下！的确~官方也这么认为。但是他们说这是历史包袱，已经不会更改了

## 总结

- 浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行
- 在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务
