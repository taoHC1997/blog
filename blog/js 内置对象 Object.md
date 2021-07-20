# js 内置对象 Object

## 对象创建

### 字面量方式

> 注意，一般采用此方式构建对象

```js
var cat = {
  name: "Tom",
  color: "blue",
};
```

> ES6 可以定义重复属性，不过后者会覆盖前者

### 构造函数式

```js
var cat = new Object();
cat.name = "Tom";
cat.color = "blue";
```

```js
// Object 方法的参数是一个对象，它总是返回该对象
// Object 方法有一些自然封装
Object(); // {}
Object({}); // {}
Object(undefined); // {}
Object(null); // {}
Object(1); // 同 new Number(1)
Object(NaN); // 同 new Number(NaN)
Object("Tom"); // 同 new String('Tom')
Object(false); // 同 new Boolean(false)
Object([1, 2, 3]); // [1,2,3]
Object({ name: "Tom" }); // {name: "Tom"}
var x = Object(function x() {}); // function x(){}
```

### 面向对象式（构造函数进阶）

```js
// 此形式主要利用闭包
function Cat() {
  // this.barking = "mimi"; // 此构造函数 return 破坏了 this 的指向，导致此语句无效
  // 默认都是私有变量，外部无法访问
  var name = "cat";
  var status = {
    x: 1,
  };
  var eat = function () {
    console.log("eating");
  };
  var age = 10;
  // 这里最后返回的属性暴露在外面，故可访问；不建议使用此方式暴露外部变量，建议使用 this ，见下一个示例
  return {
    name: name,
    eat: eat,
    status: status,
  };
}
var x = new Cat();
x.name; // cat
x.age; // undefined 这个没有暴露故结果如此
// x.barking; // undefined 如果不破坏 return 中的 this 指向，结果就是预期值
x["eat"](); // eating
x.status.x = 5; // 不影响其他实例
```

```js
// 正确的实例变量使用
function Cat() {
  Cat.love = "fish"; // 静态变量，只能通过自身去访问
  this.barking = "mimi"; // 实例变量；实例使用
  this.name = "cat";
}
var x = new Cat();
Cat.love; // fish
Cat.name; // undefined
x.love; // undefined
x.name; // cat
```

## 对象使用

js 有很多内置对象；所有的内置对象都是 `Object` 的子类型；这里只是将他们列举出来：

- `String`
- `Number`
- `Boolean`
- `Math`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`
- `Symbol`

### 内置对象判断类型

`Object.prototype.toString.call("")` 可以检验这些内置对象的类型：

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
// 封装
function isType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
```

### 原型上扩展方法

基于 js 对象具有原型链的原因，可以在原型上封装扩展方法，这里试举一例（其他技巧见技巧目录）：

```js
// 数组去重
Array.prototype.unique = function () {
  return [...new Set(this)];
};
[(1, 2, 3, "4", 3, 4, 3, 1, "34", 2)].unique(); //[1, 2, 3, "4", 4, "34"]
```

### 判断是否是对象

```js
function isObject(value) {
  return value === Object(value);
}
```

### 对象遍历

> 这里单独重复对象属性遍历的方法， ES6 共 5 种

1. `for...in`
   `for...in` 循环遍历对象自身的和继承的可枚举属性（不含 `Symbol` 属性）
2. `Object.keys(obj)`
   `Object.keys` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 `Symbol` 属性）的键名
3. `Object.getOwnPropertyNames(obj)`
   `Object.getOwnPropertyNames` 返回一个数组，包含对象自身的所有属性（不含 `Symbol` 属性，但是包括不可枚举属性）的键名
4. `Object.getOwnPropertySymbols(obj)`
   `Object.getOwnPropertySymbols` 返回一个数组，包含对象自身的所有 `Symbol` 属性的键名
5. `Reflect.ownKeys(obj)`
   `Reflect.ownKeys` 返回一个数组，包含对象自身的所有键名，不管键名是 `Symbol` 或字符串，也不管是否可枚举

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 `Symbol` 键，按照加入时间升序排列

## 对象属性使用

### 对象属性值访问

- `obj.xxx`
- `obj['xxx']`
  此形式可获取动态参数、不符合命名规范的参数

### 对象遍历

- `for...in` 用来枚举对象的属性，为遍历对象属性设计
  ```js
  var cat = {
    name: "Tom",
    color: "blue",
  };
  for (var i in cat) {
    console.log(i);
    console.log(cat[i]);
  }
  ```

### 属性描述符

对象具有属性描述符，描述属性的可操作性：

```js
var cat = {
  name: "Tom",
  color: "blue",
};
Object.getOwnPropertyDescriptor(cat, "name");
// configurable: true  是否可配置
// enumerable: true 是否可写
// value: "Tom" 值
// writable: true 是否可枚举
// __proto__: Object
```

这里先介绍这些属性配置值：

- `configurable` 配置为不可配置后，再使用 `defineProperty` 会报错
- `enumerable` 配置为不可枚举后，使用 `for...in` 和 `Object.keys()` 无法读到此参数，但是仍可以访问
- `writable` 配置为不可写后，就是只读属性，无法更改；如果使用严格模式，赋值还会报错
- `value` 值

我们可以自行设置属性配置：

```js
Object.defineProperty(obj, "name", {
  value: "xzy-1",
  configurable: true, //是否可配置
  writable: false, //是否可写
  enumerable: true, //是否可枚举
});
obj.name; // xzy-1
obj.name = "xzy-2"; // 不会报错，但在"use strict"模式下，会报错TypeError
obj.name; // xzy-1  值没有被修改
```

ES6 对枚举属性有顺序，使用 `stringify()` 、 `Object.getOwnPropertyNames()` 、 `Object.keys()` 、 `Object.getOwnPropertySymbols()` 、 `Object.assign()` 均遵守此规则，具体如下：

1. 首先遍历数字类型或数字字符串的属性，按大小升序排列
2. 接着遍历字符串类型的属性，按添加时间的先后顺序排列
3. 最后遍历符号类型的属性，也按添加顺序排列

```js
var obj = {
  c: 1,
  1: 2,
  a: 3,
  0: 4,
  [Symbol("x")]: 5,
  [Symbol("y")]: 6,
};
var properties = [];
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    // 过滤掉继承属性
    properties.push(key);
  }
}
console.log(properties); // ["0", "1", "c", "a"]
JSON.stringify(obj); // {"0":4,"1":2,"c":1,"a":3}
Object.getOwnPropertyNames(obj); // ["0", "1", "c", "a"]
Object.keys(obj); // ["0", "1", "c", "a"]
Object.getOwnPropertySymbols(obj); // [Symbol(x), Symbol(y)]
Object.assign({}, obj); // {0: 4, 1: 2, c: 1, a: 3, Symbol(x): 5, Symbol(y): 6}
```

### 访问器描述符

与属性描述符类似，我们有访问器描述符：

```js
var obj = {
  get name() {
    return "Tom";
  },
};
```

- `configurable` 表示能否通过 `delete` 删除属性，能否修改属性的特性，能否将属性修改为数据属性 。默认值为 `true`
- `enumerable` 配置为不可枚举后，使用 `for...in` 和 `Object.keys()` 无法读到此参数，但是仍可以访问
- `get` 在读取属性时调用的函数。默认值为 `undefined`
- `set` 在写入属性时调用的函数。默认值为 `undefined`

```js
var person = {
  _name: "Spike",
  _age: 24,
};
Object.defineProperty(person, "name", {
  get: function () {
    return "My name is " + this._name;
  },
  set: function (newName) {
    console.log("The name has changed.");
    this._name = newName;
  },
});
console.log(person.name); // My name is Spike
person.name = "Hesea"; // The name has changed.
console.log(person.name); // My name is Hesea
```

### 自定义迭代器的使用

普通对象没有迭代器，这里可以自定义迭代器

```js
var myObject = {
  a: 2,
  b: 3,
};
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length,
        };
      },
    };
  },
});
// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); //{ value:2, done:false }
it.next(); //{ value:3, done:false }
it.next(); //{ value:undefined, done:true }
// 用 for..of 遍历 myObject
for (var v of myObject) {
  console.log(v);
}
// 2
// 3
```

### 原型 `__proto__` `prototype`

> JavaScript 规定，所有对象都有自己的原型对象（ `prototype` ）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（ prototype chain ）：对象到原型，再到原型的原型……
> `prototype` 对象有一个 `constructor` 属性，默认指向 `prototype` 对象所在的构造函数

通过原型可以解决数据共享，节省内存空间

`__proto__` 是 `prototype` 的别名，不是标准使用方式

> 目前，所有浏览器（包括 IE11）都部署了 `__proto__` ；但是不建议使用这个属性
> 在使用面向对象时：
>
> ```js
> // es5 的写法
> const obj = {
>   method: function() { ... }
> };
> obj.__proto__ = someOtherObj;
> ```
>
> ```js
> // es6 的写法
> var obj = Object.create(someOtherObj);
> obj.method = function() { ... };
> ```

## 对象方法使用

这里仅介绍 `Object` 自带方法（部分不常用请见文档）

### `Object.getOwnPropertyDescriptor()` `Object.getOwnPropertyDescriptors()`

- `Object.getOwnPropertyDescriptor()`
  此方法会返回某个对象属性的描述对象（descriptor）
- `Object.getOwnPropertyDescriptors()`
  此方法返回指定对象所有自身属性（非继承属性）的描述对象

```js
// getOwnPropertyDescriptors 的实现
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
```

### `Object.assign(target, ...sources)`

此方法用于从一个或多个源对象的所有可枚举属性的值复制到目标对象上，有相同属性的时候，目标对象上的属性会被覆盖，最终返回目标对象

```js
// 复制对象
var obj = { a: 1 };
var obj_1 = Object.assign({}, obj); // { a: 1 }
```

```js
// 合并对象
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign({}, o1, o2, o3); // { a: 1, b: 2, c: 3 }
```

```js
Object.assign([1, 2, 3], [4, 5]);
// [4, 5, 3]
```

有一些细节：

1. 只能拷贝可枚举的自有属性（定义在对象中），无法拷贝继承属性（定义在对象原型中）和不可枚举的属性
2. 遇到同名的属性，后面的会覆盖之前的
3. 是**浅拷贝**，如果属性的值是对象，那么只会拷贝引用该对象的指针
4. `Symbol` 类型的属性也能被拷贝
5. 当源对象的位置是基本类型的值时，它们会被包装成对象，再进行合并
   ```js
   // 基础类型拼接效果如下
   var obj = Object.assign({}, 1, "a", true, undefined, null);
   console.log(obj); // {0: "a"}
   ```
6. 源对象的访问器属性会变成目标对象的数据属性（复制的值是一个取值函数，那么将求值后再复制）
   ```js
   var obj = {
     get name() {
       return "Tom";
     },
   };
   Object.assign({}, obj); // {name:"Tom"}
   ```

### `Object.create(prototype, descriptors)`

此方法创建一个具有指定原型且可选择性地包含指定属性的对象，其中：

- `prototype` 必需，要用作原型的对象，可以为 `null`
- `descriptors` 可选，包含一个或多个属性描述符的对象

```js
// 创建新对象
var obj = {
  name: "Tom",
};
var o = Object.create(obj);
o.name; // 'Tom'
// 但是 name 属性并非 o 的自定义属性
o.hasOwnProperty("name"); // false 你在浏览器操作之后展开也可以清晰的看到
```

```js
// 创建一个无原型空对象；主要用作希望无副作用情况的数据存储时
var obj = Object.create(null);
```

```js
// 面向对象继承
function Parent() {}
Parent.prototype.say = function () {
  console.info("Hello World");
};
function Child() {
  Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype);
var child = new Child();
child instanceof Child; // true.
child instanceof Parent; // true.
child.say(); // Hello World
```

### `Object.is()`

> ES6 提出“ Same-value equality ”（同值相等）算法；辅助判断相等

判断对象是否严格相等

```js
// === 有一些判断
+0 === -0; //true
NaN === NaN; // false
// Object 一般与 === 相同，除下列情况有特殊处理
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

```js
// 自实现
Object.defineProperty(Object, "is", {
  value: function (x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true,
});
```

### `Object.getPrototypeOf()`

此方法返回参数对象的原型，这是获取原型对象的标准方法

```js
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype; // true
// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null; // true
// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype; // true
```

### `Object.setPrototypeOf()`

此方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象

### `Object.defineProperty()` `Object.defineProperties()`

`Object.defineProperty()` 方法用于自定义属性，在对象属性里已介绍了如何使用。这里介绍 ES5 新增的一个**批量**添加属性的方法 `Object.defineProperties()` ：

```js
var person = {};
Object.defineProperties(person, {
  _name: {
    value: "Spike",
    writable: false,
  },
  age: {
    value: 24,
    writable: true,
  },
  name: {
    set: function (newName) {
      this._name = newName;
    },
    get: function () {
      return "My name is " + this._name;
    },
  },
});
console.log(person.name); // My name is Spike
```

### `Object.keys()`

此方法参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有可遍历（enumerable）属性的键名

> ES2017 引入了跟 `Object.keys` 配套的 `Object.values` 和 `Object.entries` ，作为遍历一个对象的补充手段，供 `for...of` 循环使用

```js
function Cat() {
  this.name = "cat";
  this.age = 10;
}
var x = new Cat();
Object.keys(x); //  ["name", "age"]
```

### `Object.getOwnPropertyNames()`

此方法与 `Object.keys()` 类似，返回一个数组，包含了该对象自身的所有属性名

### `Object.fromEntries()` `Object.entries()`

这两个方法互为逆操作，用于将一个键值对数组转为对象

### `Object.prototype.valueOf()`

返回当前对象对应的值

### `Object.prototype.toString()`

返回当前对象对应的字符串形式

### `Object.prototype.toLocaleString()`

返回当前对象对应的本地字符串形式

### `Object.prototype.hasOwnProperty()`

此方法判断一个对象是否包含自定义属性而不是原型链上的属性；**是 js 中唯一一个处理属性但是不查找原型链的函数**

```js
function Cat() {
  this.name = "cat";
  this.age = 10;
}
Cat.prototype.eat = function () {
  console.log("eating");
};
var x = new Cat();
x.name; // cat
"age" in x; // true
x.hasOwnProperty("name"); // true
x.hasOwnProperty("eat"); // false
```

```js
// 在对待不信任对象时请如下使用
({}.hasOwnProperty.call(foo, "bar"));
```

### `Object.prototype.isPrototypeOf()`

判断当前对象是否为另一个对象的原型

### `Object.prototype.propertyIsEnumerable()`

判断某个属性是否可枚举
