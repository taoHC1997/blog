# js 数据类型转换

## 显式（强制）转换

### Number

先看示例：

```js
Number(123); // 123
Number("1234"); // 1234
Number("\t\v\r12.34\n"); // 12.34
Number("1234abcd"); // NaN
Number(""); // 0
Number(true); // 1
Number(false); // 1
Number(null); // 0
Number(undefined); // NaN
```

如果参数是一个对象，有：

1. 先调用对象自身的 `valueOf` 方法。如果返回原始类型的值，则直接对该值使用 `Number` 函数，返回结果
2. 如果 `valueOf` 返回的还是对象，继续调用对象自身的 `toString` 方法。如果 `toString` 返回原始类型的值，则对该值使用 `Number` 函数，返回结果
3. 如果 `toString` 返回的还是对象，报错

```js
Number([1]); //1
/**
 * 转换演变：
 * [1].valueOf(); 结果： [1];
 * [1].toString(); 结果： '1';
 * Number('1'); 结果： 1
 */
Number({
  valueOf: function () {
    return 2;
  },
});
// 2
Number({
  toString: function () {
    return 3;
  },
});
// 3
Number({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  },
});
// 2
```

#### `valueOf` 规则

这里介绍 `valueOf()` 的规则：

- 数字类型直接输出；注意对于其他进制数会转换为十进制
- `true` 转换为 `1`
- `false` 转换为 `0`
- `undefined` 转换为 `NaN`
- `null` 转换为 `0`
- `""` `[]` 转换为 `0`
- 最后，处理失败返回 `NaN`

#### `parseInt()` `parseFloat()` 显式解析

> 解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止

看示例：

```js
var a = "42";
var b = "42px";
Number(a); // 42
parseInt(a); // 42
Number(b); // NaN
parseInt(b); // 42
// 注意非字符串参数会首先被强制类型转换为字符串
parseInt(0.000008); // 0 (此时 "0.000008")
parseInt(0.0000008); // 8 (此时 "8e-7")
parseInt(false, 16); // 250 (此时 "0xfalse")
parseInt(parseInt, 16); // 15 (此时 "0xfunction..")
parseInt("0x10"); // 16 (此时 "0x10")
parseInt("103", 2); // 2 (此时 "0103")
parseInt("9e+10"); // 9
```

```js
// 对于 parseFloat() ，其他不变，注意此方法支持科学计数，有边界
parseFloat(0.000008); // 0.000008
parseFloat(0.0000000008); // 8e-10
parseFloat("9e+10"); // 90000000000
parseFloat("9e+100"); // 9e+100
parseFloat("9e+999"); // Infinity
```

### String

先看示例：

```js
String(1234); // "1234"
String("abcd"); // "abcd"
String(true); // "true"
String(undefined); // "undefined"
String(null); // "null"
```

如果参数是一个对象，有：

1. 先调用对象自身的 `toString` 方法。如果返回原始类型的值，则对该值使用 `String` 函数，返回结果
2. 如果 `toString` 返回的是对象，继续调用 `valueOf` 方法。如果 `valueOf` 返回原始类型的值，则对该值使用 `String` 函数，返回结果
3. 如果 `valueOf` 返回的还是对象，报错

```js
String([1, 2]); //"1,2"
/**
 * 转换演变：
 * [1,2].toString(); 结果： "1,2"
 */
String({
  toString: function () {
    return 3;
  },
});
// "3"
String({
  valueOf: function () {
    return 2;
  },
});
// "[object Object]"
String({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  },
});
// "3"
```

#### `ToString` 规则

这里介绍 `ToString()` 的规则：

- 字符类型直接输出
- `null` 转换为 `"null"`
- `undefined` 转换为 `"undefined"`
- `true` 转换为 `"true"`
- 极小和极大的数字使用指数形式；其他直接输出
  ```js
  var n = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
  console.log(n.toString()); // "1.07e21"
  ```
- 一般对象使用 `Object.prototype.toString()` 方法

### Boolean

先看示例：

```js
Boolean(0); // false
Boolean(undefined); // false
Boolean(null); // false
Boolean(NaN); // false
Boolean(""); // false
Boolean(new Boolean(false)); // true
// 注意 !! 和 Boolean 效果一致
!!"foo"; // true
!!""; // false
!!"0"; // true
!!"1"; // true
!!"-1"; // true
!!{}; // true
!!true; // true
```

这里说明一下： `Boolean` 除以下六类值转换为 `false` ；其他都是 `true`

- `0` `+0` `-0`
- `false`
- `NaN`
- `""` 空字符串
- `null`
- `undefined`

### `JSON.stringify()`

> 在使用 `JSON.stringify()` 时同样会显式转换

先看示例：

```js
JSON.stringify(undefined); // undefined
JSON.stringify(function () {}); // undefined
JSON.stringify([1, undefined, function () {}, 4]); // "[1,null,null,4]"
JSON.stringify({
  a: 2,
  b: function () {},
}); // "{"a":2}"
```

这里介绍一下：

- 如果对象有 `toJSON()` 方法，直接调用此方法
- 在对象中有 `undefined` `function` `symbol` 会忽略
- 在数组中有 `undefined` `function` `symbol` 变 `null`

## 隐式（自动）转换

下面给出隐式转换的场景：

- 相等比较
  ```js
  // 说明一下： === 比较不允许类型转换
  undefined == null; // true
  1 == true; // true
  2 == true; // false
  0 == false; // true
  0 == ""; // true
  NaN == NaN; // false  NaN不等于任何值
  [] == false; // true
  [] == ![]; // true
  ```
- 相减
  ```js
  // 转数字
  "6" - "3"; // 3
  ```
- 相加
  ```js
  // 参数为 Date 对象时，此对象使用 toString 方法
  new Date() + 55; // "Wed Dec 30 2020 16:28:32 GMT+0800 (中国标准时间)55"
  // 参数为非 Date 对象的其他对象时，使用 Number() 对此对象转换
  [1, 3, 5] + 1; //"1,3,51"
  [5] + 5; // "55"
  // 参数为 String 时，使用 String() 转换
  1234 + "abcd"; // "1234abcd"
  // 参数非对象非 String 时，使用 Number() 转换
  10 + true; //11
  8 + null; // 8
  12 + undefined; // NaN
  // 最后有一个小诡计
  // {}+{}; // NaN
  ({} + {}); // "[object Object][object Object]"
  ```
- 条件判断
  ```js
  if ("abc") {
    console.log("hello");
  } // "hello"
  ```
- 循环语句
  ```js
  for(..;..;..;){} // 第二个
  while(..){}
  do{}while(..)
  ```
- 三元运算
  ```js
  "abc" ? true : false; // true
  ```
- 运算符默认转换
  ```js
  +{ foo: "bar" } - // NaN
    [1, 2, 3]; // NaN
  ```
- 逻辑运算
  ```js
  // 这里左边的操作数有一个转换
  "x" || "y"; // 逻辑或
  "x" && "y"; // 逻辑与
  ```

注意：

- `undefined` 与 `null` 相等，但不恒等（ `===` ）
- 减法时： `number` 和 `string` 转 `number`
- 加法时： `number` 和 `string` 转 `string`
- 隐式转换将 `boolean` 转换为 `number` ， `0` 或 `1`
- 隐式转换将 `Object` 转换成 `number` 或 `string` ，取决于另外一个对比量的类型
- 对于 `0` 、空字符串的判断，建议使用 `===`
- `==` 会对不同类型值进行类型转换再判断， `===` 则不会。它会先判断两边的值类型，类型不匹配时直接为 `false`
