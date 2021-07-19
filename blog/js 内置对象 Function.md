# js 内置对象 Function

> 部分使用见其他笔记

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function

## 函数声明

- `new Function ([arg1[, arg2[, ...argN]],] functionBody)`
  ```js
  // 注意，此方式声明函数并不推荐使用
  const sum = new Function("a", "b", "return a + b");
  ```
- `function (){}` 此方式声明请参考其他章节

## 基础介绍

### 函数作用域

函数可能有三个作用域：参数作用域、函数外层作用域和函数体内作用域（在使用默认参数时）

在对函数中的 `foo` 变量进行使用时，会：

1. 当前作用域内是否有 `var foo` 的定义
2. 函数形式参数是否有使用 `foo` 名称
3. 函数自身是否叫做 `foo`
4. 回溯到上一级作用域，然后从第一步重新开始

> 加深印象：对于 `f (){}` ；`()` 单独形成一个参数作用域；可以访问外层作用域中的变量，但不能访问函数体内的变量

### 命名函数

命名函数有变量提升：

```js
foo(); // 正常运行，因为 foo 在代码运行前已经被创建
function foo() {
  bar(); // 注意，命名函数内部总是可以调用它自身
}
```

但是命名函数赋值会弄掉这个变量提升：

```js
var foo = function bar() {};
bar(); // 出错：ReferenceError
```

### 匿名函数

js 有匿名函数：

```js
function (){
  console.log("abc");
}
// 一次性匿名函数
(function (){ console.log("abc");})();
```

```js
// 匿名函数赋值的变量提升就是变量的提升规则
foo; // 'undefined'
foo(); // 出错：TypeError
var foo = function () {};
```

### 构造函数

通过 `new` 关键字方式调用的函数都被认为是构造函数：

```js
function Foo() {
  this.bla = 1;
  // 此函数使用 new 时，默认返回 this ，此时 new Foo().constructor === Foo
  // 如果显示定义返回一个基础值，会被忽略
  // 如果返回一个其他对象， this 上的东西会被忽略
}
Foo.prototype.test = function () {
  console.log(this.bla);
};
var test = new Foo();
```

对应 `new CreateObj()` 命令，有如下行为：

1. 首先创建了一个空对象 `tempObj`
2. 接着调用 `CreateObj.call` 方法，并将 `tempObj` 作为 `call` 方法的参数，这样当 `CreateObj` 的执行上下文创建时，它的 `this` 就指向了 `tempObj` 对象，此时对象 `prototype` 指向构造函数的 `prototype`
3. 然后执行 `CreateObj` 函数，此时的 `CreateObj` 函数执行上下文中的 `this` 指向了 `tempObj` 对象
4. 最后返回 tempObj 对象，这里建议永远不要更改构造函数返回 `this` 的指向（此为默认行为）

### 块级函数

ES6 允许块级函数（Block-Level Function）的声明，即在块级作用域中声明函数，而在 ES5 中如此操作的话，将会抛出语法错误的异常

#### 严格模式

在严格模式中，块级函数的声明可提升至当前代码块的顶部，在代码块之外是不可见的，如下代码所示

```js
"use strict";
(function () {
  func("strick"); // 抛出未定义的引用错误
  if (true) {
    func("freedom"); // "freedom"
    function func(name) {
      return name;
    }
    {
      func("jane"); // "jane"
    }
  }
  func("justify"); // 抛出未定义的引用错误
})();
```

#### 普通模式

在普通模式（即非严格模式）中，只有当块级函数所在的代码块被成功执行后，它的声明才能被提升至当前脚本文件或函数体的顶部，如下代码所示

```js
(function () {
  func("strick"); // 抛出未定义的引用错误
  if (true) {
    func("freedom"); // "freedom"
    function func(name) {
      return name;
    }
    {
      func("jane"); // "jane"
    }
  }
  func("justify"); // "justify"
})();
```

### 尾调用优化

> 尾调用（Tail Call）是指函数中的最后一步会调用一个函数，并将其结果作为返回值

ES6 第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存

> ES6 的尾调用优化只在严格模式下开启，正常模式是无效的
> 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈
>
> - `func.arguments` ：返回调用时函数的参数，是一个伪数组
> - `func.caller` ：返回调用当前函数的那个函数
>
> 还有两个只读参数：
>
> - `func.name` 函数的名字
> - `func.length` 函数定义的时候形参的个数

```js
function Fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10); // 89
Fibonacci(100); // 超时
Fibonacci(500); // 超时
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100); // 573147844013817200000
Fibonacci2(1000); // 7.0330367711422765e+208
Fibonacci2(10000); // Infinity
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
function factorial(n) {
  return tailFactorial(n, 1);
}
factorial(5); // 120
// 上面代码通过一个正常形式的阶乘函数 factorial ，调用尾递归函数 tailFactorial ，看起来就正常多了
// 下面的也可以
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5); // 120
```

蹦床函数（trampoline）可以将递归执行转为循环执行

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```

上面就是蹦床函数的一个实现，它接受一个函数 `f` 作为参数。只要 `f` 执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题

```js
// 现在将求值函数优化
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
```

```js
// 这种方式不会调用栈溢出
trampoline(sum(1, 100000));
// 100001
```

蹦床函数并不是真正的尾递归优化，下面的实现才是

```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];
  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}
var sum = tco(function (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
});
sum(1, 100000);
// 100001
```

上面代码中， `tco` 函数是尾递归优化的实现，它的奥妙就在于状态变量 `active` 。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归 `sum` 返回的都是 `undefined` ，所以就避免了递归执行；而 `accumulated` 数组存放每一轮 `sum` 执行的参数，总是有值的，这就保证了 `accumulator` 函数内部的 `while` 循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层

## 箭头函数

ES6 允许使用“箭头”（ `=>` ）定义函数

- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 `return` 语句返回

```js
// 报错；大括号里识别成代码块了
let getTempItem = id => { id: id, name: "Temp" };
// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

```js
var getName = (name, age) => {
  return name;
};
```

```js
// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了
let fn = () => void doesNotReturn();
```

```js
const full = ({ first, last }) => first + " " + last;
// 等同于
function full(person) {
  return person.first + " " + person.last;
}
```

```js
// 支持 ES6 特性
var fn1 = ({ name, age }) => name + age;
var fn2 = (name, ...args) => name + args[0];
var fn3 = (name = "strick") => name;
```

有几个使用注意点：

1. 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象； `bind()` `apply()` `call()` 不可修改 `this` 指向
2. 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误
3. 没有 `super` `new.target` `prototype`
4. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
5. 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数

箭头函数可以让 `this` 指向固定化，这种特性很有利于封装回调函数

```js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log("id:", this.id);
      };
    };
  };
}
var f = foo.call({ id: 1 });
var t1 = f.call({ id: 2 })()(); // id: 1
var t2 = f().call({ id: 3 })(); // id: 1
var t3 = f()().call({ id: 4 }); // id: 1
// 上面代码之中，只有一个 this ，就是函数 foo 的 this ，所以 t1 、 t2 、 t3 都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的 this ，它们的 this 其实都是最外层 foo 函数的 this
```

## 属性

### `length`

函数参数个数

> ES6 新加解构参数，不过当有一个有默认值的参数，函数的 `length` 为此参数前面的参数之和

```js
(function rest(name, ...args) {}.length); // 1
(function rest(name, age = 28) {}.length); // 1
(function rest(name, age = 28, school) {}.length); // 1
```

### `name`

函数名；此属性既不可写，也不可枚举，只允许配置

> 如果将一个匿名函数赋值给一个变量，ES5 的 `name` 属性，会返回空字符串，而 ES6 的 `name `属性会返回实际的函数名

```js
var f = function () {};
// ES5
f.name; // ""
// ES6
f.name; // "f"
```

```js
// 默认情况
var expression1 = function () {};
expression1.name; // "expression1"
var expression2 = function named() {};
expression2.name; // "named"
```

```js
// Function 构造函数返回的函数实例， name 属性的值为 anonymous
new Function().name; // "anonymous"
```

```js
// bind 返回的函数， name 属性值会加上 bound 前缀
function foo() {}
foo.bind({}).name; // "bound foo"
(function () {}.bind({}).name); // "bound "
```

```js
// set 和 get 方法只能使用 Object.getOwnPropertyDescriptor() 引用
var obj = {
  get age() {},
  set age(value) {},
};
var descriptor = Object.getOwnPropertyDescriptor(obj, "age");
descriptor.get.name; // "get age"
descriptor.set.name; // "set age"
```

```js
// 使用 Symbol 的就是其描述
var sym = Symbol("age"),
  obj = {
    [sym]: function () {},
  };
obj[sym].name; // "[age]"
```

### 元属性 `new.target`

元属性（Meta Property）就是非对象的属性，能够以属性访问的形式读取特殊的元信息。 `new.target` 是由 ES6 引入的一个元属性，可检测一个函数是否与 `new` 运算符组合使用，并且只能存在于函数体内

```js
// 主要用于检测是否使用 new
function func1() {
  typeof new.target; //"function"
}
new func1();
function func2() {
  new.target === undefined; //true
}
func2();
```

### `arguments`

> 有一个 `Function.arguments` 已被废弃，现在推荐在函数内部使用 `arguments` 属性获取参数

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments

`arguments` 是一个伪数组，可以转化成数组：

```js
// arguments 转数组
Array.prototype.slice.call(arguments);
// ES6
const args = Array.from(arguments);
const args = [...arguments];
```

```js
// 此属性一般配合绑定函数使用
function Foo() {}
Foo.prototype.method = function (a, b, c) {
  console.log(this, a, b, c);
};
// 重写原型函数
Foo.method = function () {
  Function.call.apply(Foo.prototype.method, arguments);
};
// 此方式也可以
// Foo.method = function () {
//   var args = Array.prototype.slice.call(arguments);
//   Foo.prototype.method.apply(args[0], args.slice(1));
// };
```

注意， `arguments` 和形参值会有一个对应，修改则互相影响：

```js
function foo(a, b, c) {
  arguments[0] = 2;
  a; // 2
  b = 4;
  arguments[1]; // 4
  var d = c;
  d = 9;
  c; // 3
}
foo(1, 2, 3);
```

严格模式下 `arguments` 不再可修改，也不可追踪变化

最后，有一个 `arguments.callee` 指向当前函数，不建议使用

## 方法

### `toString()`

ES2019 对函数实例的 `toString()` 方法做出了修改； `toString()` 方法现在返回函数代码本身，以前会省略注释和空格

### `call()`

- 改变 `this` 指向并执行
- 参数多个
- 第一个参数为空指向全局对象

```js
ff.call(obj, 10, 20);
```

### `apply()`

- 改变 `this` 指向并执行
- 参数两个
- 第一个参数为空指向全局对象

```js
ff.call(obj, [10, 20]);
```

### `bind()`

- 改变 `this` 指向，返回新函数但不执行
- 参数一个
- 第一个参数为空指向全局对象

> `bind` 之后 `call` 等绑定失效

```js
ff.bind(obj);
ff.bind(obj)(10, 20);
```
