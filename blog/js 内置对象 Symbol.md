# js 内置对象 Symbol

> ES6 引入内置对象 Symbol （符号类型）；此对象表示独一无二的值，主要用来避免属性冲突

## 基础使用

> 注意不能使用 `new` 创建对象

```js
// 创建
var sym1 = Symbol(),
  sym2 = Symbol("name"),
  sym3 = Symbol("name");
// 注意，Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的
console.log(sym2 === sym3); // false
```

```js
// 鉴定
typeof sym1; // "symbol"
typeof sym2; // "symbol"
```

## 常见使用场景

### 对象转换

- `Symbol` 值可以显式转为字符串。
- `Symbol` 值也可以转为布尔值，但是不能转为数值。

```js
var sym = Symbol("age");
// 下面是可转换的情况
Boolean(sym); // true
!sym; // false
sym.toString(); // "Symbol(age)"
String(sym); // "Symbol(age)"
```

### 全局符号注册表

> ES6 内部有一个全局符号注册表，当需要一个全局可用的唯一符号值时，请使用 `Symbol.for()` > `Symbol.for` 和 `Symbol` 无关

```js
var sym1 = Symbol.for("name"),
  sym2 = Symbol.for("name");
console.log(sym1 === sym2); // true
```

### 获取符号 key 值

> ES2019 提供了一个实例属性 `description` ，直接返回 `Symbol` 的描述

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2); // undefined
```

### 作为对象的属性的使用

```js
var sym = Symbol("name"),
  obj = {};
obj[sym] = "strick";
// 作为对象属性名时，不能用点运算符
obj.sym = "strick";
console.log(obj); // {Symbol(name): "strick", sym: "strick"}
var obj2 = {
  [sym]: "freedom",
};
var obj3 = {};
Object.defineProperty(obj3, sym, { value: "justice" });
```

最后，符号类型的属性无法枚举，只能通过 `Object.getOwnPropertySymbols()` 获取对象的所有 `Symbol` 属性名

```js
let size = Symbol("size");
class Collection {
  constructor() {
    this[size] = 0;
  }
  add(item) {
    this[this[size]] = item;
    this[size]++;
  }
  static sizeOf(instance) {
    return instance[size];
  }
}
let x = new Collection();
Collection.sizeOf(x); // 0
x.add("foo");
Collection.sizeOf(x); // 1
Object.keys(x); // ['0']
Object.getOwnPropertyNames(x); // ['0']
Object.getOwnPropertySymbols(x); // [Symbol(size)]
```

> 将来有一个新的 API，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 `Symbol` 键名

## 对象内置符号属性介绍

> 此处介绍对象的内置符号属性；属于其他对象的扩展

### `Symbol.hasInstance`

对象的 `Symbol.hasInstance` 属性，指向一个内部方法。当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo` 在语言内部，实际调用的是 `Foo[Symbol.hasInstance](foo)`

### `Symbol.isConcatSpreadable`

对象的 `Symbol.isConcatSpreadable` 属性等于一个布尔值，表示该对象用于 `Array.prototype.concat()` 时，是否可以展开

```js
let arr1 = ["c", "d"];
["a", "b"].concat(arr1, "e"); // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable]; // undefined	默认展开
let arr2 = ["c", "d"];
arr2[Symbol.isConcatSpreadable] = false;
["a", "b"].concat(arr2, "e"); // ['a', 'b', ['c','d'], 'e']
let obj = { length: 2, 0: "c", 1: "d" };
["a", "b"].concat(obj, "e"); // ['a', 'b', obj, 'e']		默认不展开
obj[Symbol.isConcatSpreadable] = true;
["a", "b"].concat(obj, "e"); // ['a', 'b', 'c', 'd', 'e']
```

### `Symbol.species`

对象的 `Symbol.species` 属性，指向一个构造函数。创建衍生对象时，会使用该属性。
定义 `Symbol.species` 属性要采用 get 取值器。默认的 `Symbol.species` 属性等同于下面的写法

```js
static get [Symbol.species]() {
    return this;
}
// 这个是衍生对象的原型
```

`Symbol.species` 的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例

### `Symbol.match`

对象的 `Symbol.match` 属性，指向一个函数。当执行 `str.match(myObject)` 时，如果该属性存在，会调用它，返回该方法的返回值

```js
String.prototype.match(regexp);
// 等同于
regexp[Symbol.match](this);
class MyMatcher {
  [Symbol.match](string) {
    return "hello world".indexOf(string);
  }
}
"e".match(new MyMatcher()); // 1
```

### `Symbol.replace`

对象的 `Symbol.replace` 属性，指向一个方法，当该对象被 `String.prototype.replace` 方法调用时，会返回该方法的返回值

```js
String.prototype.replace(searchValue, replaceValue);
// 等同于
searchValue[Symbol.replace](this, replaceValue);
```

### `Symbol.search`

对象的 `Symbol.search` 属性，指向一个方法，当该对象被 `String.prototype.search` 方法调用时，会返回该方法的返回值。

```js
String.prototype.search(regexp);
// 等同于
regexp[Symbol.search](this);
```

### `Symbol.split`

对象的 `Symbol.split` 属性，指向一个方法，当该对象被 `String.prototype.split` 方法调用时，会返回该方法的返回值。

```js
String.prototype.split(separator, limit);
// 等同于
separator[Symbol.split](this, limit);
```

### `Symbol.iterator`

对象的 `Symbol.iterator` 属性，指向该对象的默认遍历器方法。

### `Symbol.toPrimitive`

对象的 `Symbol.toPrimitive` 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

`Symbol.toPrimitive` 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式：

- `Number` ：该场合需要转成数值
- `String` ：该场合需要转成字符串
- `Default` ：该场合可以转成数值，也可以转成字符串

```js
let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
            }
        }
    };
2 \* obj; // 246
3 + obj; // '3default'
obj == 'default'; // true
String(obj); // 'str'
```

### `Symbol.toStringTag`

对象的 `Symbol.toStringTag` 属性，指向一个方法。在该对象上面调用 `Object.prototype.toString` 方法时，如果这个属性存在，它的返回值会出现在 `toString` 方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制 `[object Object]` 或 `[object Array]` 中 `object` 后面的那个字符串。

```js
JSON[Symbol.toStringTag]：'JSON'
Math[Symbol.toStringTag]：'Math'
Module 对象 M[Symbol.toStringTag]：'Module'
ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
DataView.prototype[Symbol.toStringTag]：'DataView'
Map.prototype[Symbol.toStringTag]：'Map'
Promise.prototype[Symbol.toStringTag]：'Promise'
Set.prototype[Symbol.toStringTag]：'Set'
%TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
%MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
%SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
%StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
Symbol.prototype[Symbol.toStringTag]：'Symbol'
Generator.prototype[Symbol.toStringTag]：'Generator'
GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'
```

### `Symbol.unscopables`

对象的 `Symbol.unscopables` 属性，指向一个对象。该对象指定了使用 `with` 关键字时，哪些属性会被 `with` 环境排除
