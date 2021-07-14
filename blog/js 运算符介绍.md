# js 运算符介绍

## 一元运算符

- 累加累减运算符 `++` `--`
  ```js
  var num = 123;
  num++; //把变量累加1，后加
  ++num; //把变量累加1，先加
  num--; //把变量累减1，后减
  --num; //把变量累减1，先减
  // 注意：
  var x = num++;
  ```
- 加减运算符（类型转换） `+` `-`
  ```js
  var a = "abc";
  +a; // NaN
  -a; // NaN
  var b = "123";
  +b; // 123
  -b; // -123
  var c = false;
  +c; // 0
  -c; // 0
  var d = "-123";
  +d; // -123
  d; // 123
  ```
- 判断类型运算符 `typeof`
  ```js
  // 只有七种返回值
  typeof ""; // string
  typeof 1; // number
  typeof Symbol(); // symbol
  typeof true; // boolean
  typeof undefined; // undefined
  typeof new Function(); // function
  typeof null; // object
  ```
- 删除运算符 `delete`
  ```js
  // 只适用于删除对象属性
  var a = { b: 1 };
  delete a.b;
  // 注意 delete 不能删除 var 定义变量
	// 删除数组某值后会置空
  ```
- 求值（执行一个表达式）然后返回 `undefined` 运算符 `void`
  ```js
  // 优先级很高，最好加括号
  void (function test() {})();
  ```

## 算术运算符

> 任何运算与 NaN 结合结果为 NaN

- 加
  ```js
  var num = 123 + 456; // 579
  var num = 123 + "abc"; // 123abc
  var num = 123 + {}; // 123[object Object]
  ```
- 减
  ```js
  var num = 123 - 12; // 111
  var num = 123 - true; // 122
  var num = 123 - "abc"; // NaN
  ```
- 乘
  ```js
  var num = 123 * 2; // 246
  var num = 123 * true; // 123
  var num = 123 * ""; // 0
  ```
- 除
  ```js
  var num = 123 / 3; // 41
  var num = 123 / 4; // 30.75
  var num = 123 / true; // 123
  var num = 123 / ""; // Infinity
  ```
- 取余
  ```js
  var num = 123 % 3; // 0
  var num = 123 % 4; // 3
  var num = 123 % true; // 0
  ```
- 求幂（ ES2016 新增）
  ```js
  var num = 123 ** 3; // 1860867
  var num = 123 ** true; // 123
  // 右结合
  2 ** (3 ** 2);
  // 相当于 2 ** (3 ** 2)
  ```

> 注意： `+` 运算符还可以连接字符串

## 关系运算符

- 小于 `<`
- 大于 `>`
- 小于等于 `<=`
- 大于等于 `>=`

大小于比较步骤如下：

1. 两个操作数都是数值，则数值比较
2. 两个操作数都是字符串，则比较两个字符串对应的字符编码值
3. 两个操作数有一个是数值，则将另一个转换为数值，再进行数值比较
4. 两个操作数有一个是对象，则先调用 `valueOf()` 方法或 `toString()` 方法，再用结果比较

- 相等 `==`
- 不等 `!=`
- 全等（恒等） `===`
- 不全等（不恒等） `!==`：

等于不等于比较步骤如下：

1. 一个操作数是布尔值，则比较之前将其转换为数值， `false` 转成 `0` ， `true` 转成 `1`
2. 一个操作数是字符串，则比较之前将其转成为数值再比较
3. 一个操作数是对象，则先调用 `valueOf()` 或 `toString()` 方法后再和返回值比较
4. 不需要任何转换的情况下， `null` 和 `undefined` 是相等的
5. 一个操作数是 `NaN` ，则 `==` 返回 `false` ， `!=` 返回 `true` ；并且 `NaN` 和自身不等
6. 两个操作数都是对象，则比较他们是否是同一个对象，如果都指向同一个对象，则返回 `true` ，否则返回 `false`
7. 在全等和全不等的判断上，只有值和类型都相等，才返回 `true` ，否则返回 `false`

- 判断某属性是否在原型链上 `in`

```js
// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees; // 返回true
3 in trees; // 返回true
6 in trees; // 返回false
"bay" in trees; // 返回false (必须使用索引号,而不是数组元素的值)
"length" in trees; // 返回true (length是一个数组属性)
Symbol.iterator in trees; // 返回true (数组可迭代，只在ES2015+上有效)
// 内置对象
"PI" in Math; // 返回true
// 自定义对象
var mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar; // 返回true
"model" in mycar; // 返回true
```

- 判断某实例对象的原型链是否是某构造函数 `instanceof`

检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var auto = new Car("Honda", "Accord", 1998);
console.log(auto instanceof Car);
// expected output: true
console.log(auto instanceof Object);
// expected output: true
```

```js
// 定义构造函数
function C() {}
function D() {}
var o = new C();
o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof D; // false，因为 D.prototype 不在 o 的原型链上
o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
C.prototype instanceof Object; // true，同上
C.prototype = {};
var o2 = new C();
o2 instanceof C; // true
o instanceof C; // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.
D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true 因为 C.prototype 现在在 o3 的原型链上
```

## 逻辑运算符

- 逻辑与（ AND ） `&&`
  按真值比较，有：
  ```js
  // 到假截止，要求全对
  true && true; // true
  true && false; // false
  false && true; // false
  false && false; // false
  ```
  如果两边的操作数有一个操作数不是布尔值的情况，有步骤：
  1. 第一个操作数是对象（注意要 `({})` ，否则报错），则返回第二个操作数
  2. 第二个操作数是对象，则第一个操作数返回 `true` ，才返回第二个操作数，否则返回 `false`
  3. 有一个操作数是 `null` ，则返回 `null`
  4. 有一个操作数是 `undefined` ，则返回 `undefined`
- 逻辑或（ OR ） `||`
  按真值比较，有：
  ```js
  // 遇真返回，一对即可
  true || true; // true
  true || false; // true
  false || true; // true
  false || false; // false
  ```
  如果两边的操作数有一个操作数不是布尔值的情况，有步骤：
  1. 第一个操作数是对象（注意要 `({})` ，否则报错），则返回第一个操作数
  2. 第一个操作数的求值结果为 `false` ，则返回第二个操作数
  3. 两个操作数都是 `null` ，则返回 `null`
  4. 两个操作数都是 `NaN` ，则返回 `NaN`
  5. 两个操作数都是 `undefined` ，则返回 `undefined`
- 逻辑非（ NOT ） `!`
  ```js
  !{}; // false
  !0; // true
  ```
  此运算必然返回一个布尔值，有步骤：
  1. 操作数是一个对象，返回 `false`
  2. 操作数是一个空字符串，返回 `true`
  3. 操作数是一个非空字符串，返回 `false`
  4. 操作数是数值 `0` ，返回 `true`
  5. 操作数是任意非 `0` 数值（包括 `Infinity` ），`false`
  6. 操作数是 `null` ，返回 `true`
  7. 操作数是 `NaN` ，返回 `true`
  8. 操作数是 `undefined` ，返回 `true`

最新语法增加：

- `??` 只有在左侧为 `undefined` 或者 `null` 时，才会执行右侧的语句
  ```js
  // 针对 || 的改进运算符
  const getSCore = (score: number) => {
    return score ?? 1;
  };
  getScore(0); // 0
  ```

> 最新语法还支持形如 `num ||= 123` 这种赋值方式

## 位运算符

- 位非（ NOT ） `~`
- 位与（ AND ） `&`
- 位或（ OR ） `|`
- 位异或（ XOR ） `^`
- 左移 `<<`
- 有符号右移 `>>`
- 无符号右移 `>>>`

> `~~` 可用来取整：有字母一律为 `0` ；boolen 类型， `TRUE` 为 `1` ， `FALSE` 为 `0`

## 赋值运算符

- `=`
- `+=`
- `-=`
- `*=`
- `/=`
- `%=`
- `**=`
- `<<=`
- `>>=`
- `>>>=`
- `&=`
- `^=`
- `|=`

> ES 新标准中，还有一种解构赋值方法，这里就先不说明了

## 三元运算符

- `condition ? ifTrue : ifFalse`

```js
function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}
console.log(getFee(true)); // "$2.00"
console.log(getFee(false)); // "$10.00"
console.log(getFee(1)); // "$2.00"
```

## 逗号运算符

- `,`

先求值，最后返回最后一个表达式的值

```js
var x = 0;
var y = (x++, 10);
x; // 1
y; // 10
```

## 扩展运算符 `...`

- `...`

> 用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中

这里有规则：

- 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
- 浅拷贝
- 任何定义了遍历器（ `Iterator` ）接口的对象（参阅 `Iterator` 一章），都可以用扩展运算符转为真正的数组
- 数组会变为参数序列
- 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
// 等同
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

函数参数技巧：

```js
// ES5
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);
// ES6
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

合并数组技巧：

```js
// ES5
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

## 双冒号运算符

> ES6 提案

取代 `call` 、 `apply` 、 `bind` 调用

```js
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}

var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```
