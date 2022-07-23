# js 判断类型

## 基本类型

在 ECMAScript 规范中，共定义了 7 种数据类型，分为 `基本类型` 和 `引用类型` 两大类，如下所示：

> **基本类型**： `String` 、 `Number` 、 `Boolean` 、 `Symbol` 、 `Undefined` 、 `Null`
>
> **引用类型**： `Object`

> **基于 Object 的其他类型**: `Function` 、 `Array` 、 `RegExp` 、 `Date`

基本类型也称为简单类型，由于其占据空间固定，是简单的数据段，为了便于提升变量查询速度，将其存储在栈中，即按值访问。

引用类型也称为复杂类型，由于其值的大小会改变，所以不能将其存放在栈中，否则会降低变量查询速度，因此，其值存储在堆(heap)中，而存储在变量处的值，是一个指针，指向存储对象的内存处，即按址访问。引用类型除 Object 外，还包括 **Function** 、**Array**、**RegExp**、**Date** 等等。

## 检验手段

### typeof

> 检测基本类型的最佳方式，但是对于封装对象完全无能为力了
> 在实际使用中，用来检测一个对象是否已经定义或者是否已经赋值（即是不是 `undefined` ）： `typeof foo !== 'undefined'`

`typeof` 是一个**操作符**(当然也可以跟括号运算符)，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 7 种： `number` 、 `boolean` 、 `symbol` 、 `string` 、 `object` 、 `undefined` 、 `function` 等。

```js
typeof ""; // string 有效
typeof 1; // number 有效
typeof Symbol(); // symbol 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof []; //object 无效
typeof new Function(); // function 有效
typeof new Date(); //object 无效
typeof new RegExp(); //object 无效
```

有些时候， `typeof` 操作符会返回一些令人迷惑但技术上却正确的值：

- 对于基本类型，除 `null` 以外，均可以返回正确的结果。
- 对于引用类型，除 `function` 以外，一律返回 `object` 类型。
- 对于 `null` ，返回 `object` 类型。
- 对于 `function` 返回 `function` 类型。

### instanceof

> 检测引用类型的一种方式，只有在比较自定义的对象时才有意义

`instanceof` 是用来判断 `A` 是否为 `B` 的实例，表达式为： `A instanceof B` ，如果 `A` 是 `B` 的实例，则返回 `true` ,否则返回 `false` 。 在这里需要特别注意的是：

> **instanceof 检测的是原型**

```js
[] instanceof Array; // true
{} instanceof Object;// true
new Date() instanceof Date;// true

function Person(){};
new Person() instanceof Person;

[] instanceof Object; // true
new Date() instanceof Object;// true
new Person instanceof Object;// true
```

```js
function Foo() {}
function Bar() {}
Bar.prototype = new Foo();
new Bar() instanceof Bar; // true
new Bar() instanceof Foo; // true
```

```js
function Foo() {}
function Bar() {}
// 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
Bar.prototype = Foo;
new Bar() instanceof Foo; // false
new Bar() instanceof Bar; // true
```

因为有原型链，**instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。**

### Array.isArray()

> 检测数组的一种方式

`instanceof` 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

```js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
xArray = window.frames[0].Array;
var arr = new xArray(1, 2, 3); // [1,2,3]
arr instanceof Array; // false ;
```

针对数组的这个问题，ES5 提供了 `Array.isArray()` 方法 。该方法用以确认某个对象本身是否为 `Array` 类型，而不区分该对象在哪个环境中创建。

```js
if (Array.isArray(value)) {
  //对数组执行某些操作
}
```

`Array.isArray()` 本质上检测的是对象的 `Class` 值，`Class` 是对象的一个内部属性，里面包含了对象的类型信息，其格式为 `object Xxx` ， `Xxx` 就是对应的具体类型 。对于数组而言，`Class` 的值就是 `object Array` 。

### constructor

> 检测自定义类型；除不适用于 `null` 和 `undefined`

当一个函数 `F` 被定义时，JS 引擎会为 `F` 添加 `prototype` 原型，然后再在 `prototype` 上添加一个 `constructor` 属性，并让其指向 `F` 的引用。

当执行 `var f = new F()` 时，`F` 被当成了构造函数，`f` 是 `F` 的实例对象，此时 `F` 原型上的 `constructor` 传递到了 `f` 上，因此 `f.constructor == F`

```js
console.log(f.constructor === F);
```

可以看出，`F` 利用原型对象上的 `constructor` 引用了自身，当 `F` 作为构造函数来创建对象时，原型上的 `constructor` 就被遗传到了新创建的对象上， 从原型链角度讲，构造函数 `F` 就是新对象的类型。这样做的意义是，让新对象在诞生以后，就具有可追溯的数据类型。

**细节问题：**

1. `null` 和 `undefined` 是无效的对象，因此是不会有 `constructor` 存在的，这两种类型的数据需要通过其他方式来判断。
2. 函数的 `constructor` 是不稳定的，这个主要体现在自定义对象上，当开发者重写 `prototype` 后，原有的 `constructor` 引用会丢失， `constructor` 会默认为 `Object` 。
   因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改。

### prototype.toString 最佳方式

> 符合规范的一种检测方式；推荐使用

`toString()` 是 `Object` 的原型方法，调用该方法，默认返回当前对象的 `Class` 。这是一个内部属性，其格式为 `object Xxx` ，其中 `Xxx` 就是对象的类型。

对于 `Object` 对象，直接调用 `toString()` 就能返回 `object Object` 。而对于其他对象，则需要通过 `call / apply` 来调用才能返回正确的类型信息。

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
Object.prototype.toString.call(new Error()); // [object Error]
Object.prototype.toString.call(document); // [object HTMLDocument]
Object.prototype.toString.call(window); //[object Window]
```

下面有简单封装：

```js
function isType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
isType({}); // "Object"
isType([]); // "Array"
```

```js
function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .slice(8, -1)
    .toLowerCase();
  return type ? dataType === type : dataType;
}
DataType("liner"); // "string"
DataType(2020630); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

### jquery 封装

> 参考用

一般使用 `jQuery.type()`

```js
// 如果对象是 undefined 或 null ，则返回相应的 undefined 或 null
jQuery.type(undefined) === "undefined";
jQuery.type() === "undefined";
jQuery.type(window.notDefined) === "undefined";
jQuery.type(null) === "null";
// 如果对象有一个内部的 Class 和一个浏览器的内置对象的 Class 相同，我们返回相应的 Class 名字
jQuery.type(true) === "boolean";
jQuery.type(3) === "number";
jQuery.type("test") === "string";
jQuery.type(function () {}) === "function";
jQuery.type([]) === "array";
jQuery.type(new Date()) === "date";
jQuery.type(new Error()) === "error"; // as of jQuery 1.9
jQuery.type(/test/) === "regexp";
// 其他一切都将返回它的类型 object
```

此外，还有一些方法：

- `$.isFunction()` 判断是否函数
- `$.isArray()` 判断是否数组
- `$.isWindow()` 判断当前变量是否为 `window`
- `$.isNumeric()` 判断是否为数值，可判断 `"+10"` `"-5"` `"0xF0"` 等数值
- `$.isEmptyObject()` 判断一个 object 类型是否为空

## 附录

### 单独验证

#### 数字验证

```js
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
```

#### 数组验证

```js
// 旧方法
function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
// 新方法
Array.isArray(obj);
```

### 类型检查对比表

| 类型判断 | typeof                   | instanceof                        | constructor                            | toString.call                     | $.type    |
| -------- | ------------------------ | --------------------------------- | -------------------------------------- | --------------------------------- | --------- |
| num      | number                   | false                             | true                                   | [object Number]                   | number    |
| str      | string                   | false                             | true                                   | [object String]                   | string    |
| bool     | boolean                  | false                             | true                                   | [object Boolean]                  | boolean   |
| arr      | object                   | true                              | true                                   | [object Array]                    | array     |
| json     | object                   | true                              | true                                   | [object Object]                   | object    |
| func     | function                 | true                              | true                                   | [object Function]                 | function  |
| und      | undefined                | false                             | -                                      | [object Undefined]                | undefined |
| nul      | object                   | false                             | -                                      | [object Null]                     | null      |
| date     | object                   | true                              | true                                   | [object Date]                     | date      |
| reg      | object                   | true                              | true                                   | [object RegExp]                   | regexp    |
| error    | object                   | true                              | true                                   | [object Error]                    | error     |
| 优点     | 使用简单，能直接输出结果 | 能检测出复杂的类型                | 基本能检测出所有的类型                 | 检测出所有的类型                  | -         |
| 缺点     | 检测出的类型太少         | 基本类型检测不出，且不能跨 iframe | 不能跨 iframe，且 constructor 易被修改 | IE6 下 undefined,null 均为 Object | -         |
