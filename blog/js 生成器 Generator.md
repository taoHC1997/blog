# js 生成器 Generator

## 基础介绍

### 作用

> 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务
> 协程是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。它的运行流程大致如下：
>
> 1. 协程 A 开始执行
> 2. 协程 A 执行到一半，进入暂停，执行权转移到协程 B
> 3. （一段时间后）协程 B 交还执行权
> 4. 协程 A 恢复执行
>
> 由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束

**`Generator` 函数是 ES6 对协程的实现，但属于不完全实现**。 `Generator` 函数被称为“半协程”（semi-coroutine），意思是只有 `Generator` 函数的调用者，才能将程序的执行权还给 `Generator` 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。
如果将 `Generator` 函数当作协程，完全可以将多个需要互相协作的任务写成 `Generator` 函数，它们之间使用 `yield` 表达式交换控制权

`Generator` 函数执行产生的上下文环境，一旦遇到 `yield` 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行 `next` 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行

### 原理

语法上，首先可以把它理解成， `Generator` 函数是一个**状态机**，封装了多个内部状态。执行 `Generator` 函数会返回一个遍历器对象，也就是说， `Generator` 函数除了状态机，还是一个**遍历器对象生成函数**。返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态

形式上， `Generator` 函数是一个**普通函数**，但是有两个特征。一是， `function` 关键字与函数名之间有一个星号；二是，函数体内部使用 `yield` 表达式，定义不同的内部状态（ `yield` 在英语里的意思就是“产出”）

`Generator` 函数会返回一个遍历器对象，这个对象的 `next` 行为逻辑如下：

1. 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值
2. 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式
3. 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。
4. 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`

> 需要注意的是， `yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能

每次使用 `next` 时，会返回一个 `IteratorResult` 对象，此对象的 `value` 和 `done` 有如下说明：

- 当生成器还在执行时， `value` 的值可通过计算 `yield` 表达式得到， `done` 的值为 `false`
- 当生成器执行完毕时， `value` 的值是 `undefined` ， `done` 的值为 `true`
- 当遇到 `return` 语句时， `value` 的值就是 `return` 后面跟的值， `done` 的值为 `true`

如果使用 `for...of` ，一旦 `next` 方法返回的 `done` 为 `true` ，那么就终止，并且此次不循环；当然，使用 `for...of` 不需要使用 `next` 方法

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = { first: "Jane", last: "Doe" };
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

### 使用

生成器的调用方式和普通函数相同，但它不会马上返回函数的结果（即不能立刻执行）。而是先返回一个它所生成的迭代器

```js
function* f() {
  console.log("执行了！");
}
var generator = f();
setTimeout(function () {
  generator.next();
}, 2000);
// 上面代码中，函数f是一个 Generator 函数，就变成只有调用 next 方法时，函数 f 才会执行
```

```js
function* generator() {
  var count = 0;
  while (count < 2) yield count++;
  return count;
}
var iterator = generator();
iterator.next(); // {value: 0, done: false}
iterator.next(); // {value: 1, done: false}
iterator.next(); // {value: 2, done: true}
```

`yield` 的优先级很低，仅比扩展运算符和逗号高，如果要提前计算，可以像下面这样用一对圆括号包裹

```js
// yield 表达式如果用在另一个表达式之中，必须放在圆括号里面
1 + (yield 2);
```

> `yield yield 1` 相当于 `yield(yield 1)`

## 规范

`Generator` 函数总是返回一个遍历器，ES6 规定这个遍历器是 `Generator` 函数的实例

### 创建

下面几种命名均可创建生成器：

```js
// 推荐
function* generator() {}
// 这种也行，不过不能用箭头函数生成
var iterator = function* () {};
// 作为对象的方法可简写
var obj = {
  *generator() {},
};
```

### 方法

同样的，生成器有 `next` 、 `return` 和 `throw` 三个迭代器方法：

对于 `next` 方法，可以接受一个参数表示上次 `yield` 返回值

```js
function* calculate() {
  let x = yield 1;
  let y = yield x + 2;
  return y;
}
var iterator = calculate();
iterator.next(); // {value: 1, done: false}
iterator.next(10); // {value: 12, done: false}
// 注意，第一次有值无效，第二次不传值就是 undefined ；要避免第二次不传值的情况
```

对于 `return` 方法，可以接受一个参数表示返回的 `value`

> 如果 `Generator` 函数内部有 `try...finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会推迟到 `finally` 代码块执行完再执行

```js
function* stop() {
  let x = yield 1;
  let y = yield x + 2;
  return y;
}
var iterator = stop();
iterator.next(); // {value: 1, done: false}
iterator.return(10); // {value: 10, done: true}
iterator.next(); // {value: undefined, done: true}
```

对于 `throw` 方法，它强制生成器抛出一个错误，在函数体外抛出错误，然后在 `Generator` 函数体内捕获；此方法也有参数，只能被 `catch` 接收，故建议抛出 `Error` 对象的实例

> `throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法
> `throw` 方法被捕获以后，会附带执行下一条 `yield` 表达式。也就是说，会附带执行一次 `next` 方法

```js
function* especial() {
  var count = 1;
  try {
    yield count;
  } catch (e) {
    count = 2;
    console.log(e); // "inner"
  }
  yield count + 3;
}
var iterator = especial();
iterator.next(); // {value: 1, done: false}
try {
  // 第一次错误内部捕获处理，第二次就被外部捕获了
  iterator.throw("inner"); // {value: 5, done: false}
  iterator.next(); // {value: undefined, done: true}
  iterator.throw("outer");
} catch (e) {
  console.log(e); // "outer"
}
```

总结：它们的作用都是让 `Generator` 函数恢复执行，并且使用不同的语句替换 `yield` 表达式

- `next()` 是将 `yield` 表达式替换成一个值
- `throw()` 是将 `yield` 表达式替换成一个 `throw` 语句
- `return()` 是将 `yield` 表达式替换成一个 `return` 语句

### `yield*`

`yield*` 可以将执行权委托给另一个生成器或可迭代对象，即在一个 `Generator` 函数里面执行另一个 `Generator` 函数

```js
function* generator() {
  var count = 0;
  while (count < 2) yield count++;
  return count;
}
function* delegation() {
  yield* ["a", "b"];
  var result = yield* generator();
  console.log(result); // 2
}
var iterator = delegation();
iterator.next(); // {value: "a", done: false}
iterator.next(); // {value: "b", done: false}
iterator.next(); // {value: 0, done: false}
iterator.next(); // {value: 1, done: false}
iterator.next(); // {value: undefined, done: true}
```

## 技巧

### 取出嵌套数组的所有成员

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}
```

### 状态机

> `Generator` 是实现状态机的最佳结构

```js
var clock = function* () {
  while (true) {
    console.log("Tick!");
    yield;
    console.log("Tock!");
    yield;
  }
};
```

### 简单异步使用

> 同步方式执行异步，避免回调地狱

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();
// 卸载UI
loader.next();
```

### 次序执行

```js
//下面是同步实现
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
scheduler(longRunningTask(initialValue));
function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}
```
