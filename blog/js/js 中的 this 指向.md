# js 中的 this 指向

> `this` 实际上是在函数被调用时发生的绑定，它指向什么完全取决于**函数在哪里被调用**

## 全局 `this`

全局中 `this` 指向顶级对象：

- 在浏览器就是 `window` 对象
- 在 node 环境中：
  - 如果是 node 环境，有 `global === this` ，`global` 就是 node 顶级对象
  - 如果是 `node test.js` 执行，`this` 指向空对象而非顶级对象

> 可以使用 `globalThis` 关键字看看

## 函数中的 `this`

### 常见错误

直接调用函数时， `this` 指向全局对象：

```js
FF = { a: 2 };
a = 5;
FF.myf = function () {
  function test() {
    console.log(this.a);
  }
  // 这里实质是直接调用函数
  test();
};
FF.myf(); // 5
```

修正为：

```js
FF = { a: 2 };
a = 5;
FF.myf = function () {
  function test() {
    console.log(this.a);
  }
  test.call(this);
};
FF.myf(); // 2
```

### 基础说明

1. 默认绑定
   ```js
   // 此时看作用域，一般是顶级对象；严格模式下指向 undefined
   function foo() {
     console.log(this.a);
   }
   var a = 2;
   foo(); // 2
   // 这里多说一句：
   // 在一个 HTML DOM 事件处理程序里面， this 默认始终指向这个处理程序被所绑定到的 HTML DOM 节点
   ```
2. 隐式绑定
   ```js
   // 此时看上下文对象
   // 注意，隐式绑定确有其事，但是很容易出问题
   function foo() {
     console.log(this.a);
   }
   var obj = {
     a: 2,
     foo: foo,
   };
   obj.foo(); // 2
   ```
3. 显式绑定
   ```js
   // 此时利用 call() 或 apply() 强制绑定；看实际使用对象
   function foo() {
     console.log(this.a);
   }
   var obj = {
     a: 2,
   };
   foo.call(obj); // 2
   ```
4. new 绑定
   ```js
   // 此时 new 相当于新建上下文对象
   function foo(a) {
     this.a = a;
     // 这个地方默认返回 this
     // 如果此时返回一个对象，会导致原型方法中的 this 指向不明确
     // 如果返回一个值，会忽略
   }
   var bar = new foo(2);
   console.log(bar.a); // 2
   ```

> 这里说明一下，对应 `new CreateObj()` 命令，有如下行为：
>
> 1. 首先创建了一个空对象 `tempObj`
> 2. 接着调用 `CreateObj.call` 方法，并将 `tempObj` 作为 `call` 方法的参数，这样当 `CreateObj` 的执行上下文创建时，它的 `this` 就指向了 `tempObj` 对象，此时对象 `prototype` 指向构造函数的 `prototype`
> 3. 然后执行 `CreateObj` 函数，此时的 `CreateObj` 函数执行上下文中的 `this` 指向了 `tempObj` 对象
> 4. 最后返回 tempObj 对象，这里建议永远不要更改构造函数返回 `this` 的指向（此为默认行为）

> 对于箭头函数，它的 `this` 绑定继承于该函数所在作用域中 `this` 的绑定

### 特殊情况

```js
// 显式绑定传入 null 或 undefined 实际使用的是默认绑定规则
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2
foo.call(); // 2
foo.apply(); // 2
foo.bind()(); // 2
```

```js
// 间接引用（赋值引用）会使用默认绑定规则
// 这里说的是函数作为值使用时 this 在内部不会同步传入对应值，使用的是当前作用域的 this
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
p.foo(); // 4
```

### 软绑定技巧

```js
// 软绑定即可变绑定，同时保留隐式绑定或者显式绑定修改 this 的能力；一种技巧
Function.prototype.softBind = function (obj) {
  var fn = this;
  // 捕获所有 curried 参数
  var curried = [].slice.call(arguments, 1);
  var bound = function () {
    return fn.apply(
      !this || this === (window || global) ? obj : this,
      curried.concat.apply(curried, arguments)
    );
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};
function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj <---- 应用了软绑定
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2
fooOBJ.call(obj3); // name: obj3
setTimeout(obj2.foo, 10); // name: obj   <---- 应用了软绑定
```

## `eval` 中的 `this`

> `eval` 只在被直接调用时， `this` 指向才是当前作用域

```js
var a = {
  show: function () {
    eval("console.log(this)");
  },
};
a.show(); //{show: ƒ}对象
```

```js
var a = {
  show: function () {
    var test = eval;
    test("console.log(this)");
  },
};
a.show(); //Window 对象
```
