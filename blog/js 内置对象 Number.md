# js 内置对象 Number

> 所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以， `1` 与 `1.0` 是相同的，是同一个数

## 对象方法

### `Number.isFinite()`

- 检查一个数值是否为有限的（finite），即不是 `Infinity`

> 不是数值一律返回 `false`
> 新方法，只对数值有效

### `Number.isNaN()`

- 检查一个值是否为 `NaN`

> 不是 `NaN` 一律返回 `false`
> 新方法，只对数值有效

### `Number.parseInt()` `Number.parseFloat()`

> `parseInt(string, radix);` `parseFloat(string)` 默认必须传字符串

```js
// ES5的写法
parseInt("12.34"); // 12
parseFloat("123.45#"); // 123.45
parseInt("1e", 16); // 30
parseInt("11110", 2); // 30
parseInt("u", 36); // 30
```

```js
// ES6的写法
Number.parseInt("12.54px"); // 12
Number.parseFloat("123.45#"); // 123.45
```

### `Number.isInteger()`

- 判断一个数值是否为整数

```js
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(3.0000000000000002); // true	这是误判
```

### `Number.isSafeInteger()`

- 判断一个整数是否落在这个范围之内

```js
function trusty(left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError("Operation cannot be trusted!");
}
trusty(9007199254740993, 990, 9007199254740993 - 990);
// RangeError: Operation cannot be trusted!
```

## 实例使用

### `num.toString()`

> 将一个十进制的数转换为一个其他进制数

```js
(30).toString(); // "30"
(30).toString(10); // "30"
(30).toString(16); // "1e" 十六进制
(30).toString(2); // "11110" 二进制
(30).toString(36); // "u" 36是允许的最大参数值
```

## 常量

### `Number.EPSILON`

- 它表示 1 与大于 1 的最小浮点数之间的差

```js
0.1 + 0.2 === 0.3; //false
// 这个判断浮点数计算
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
```

### `Number.MAX_SAFE_INTEGER` `Number.MIN_SAFE_INTEGER`

- 表示数字范围的上下限

```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
// true
Number.MAX_SAFE_INTEGER === 9007199254740991;
// true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;
// true
Number.MIN_SAFE_INTEGER === -9007199254740991;
// true
```

### `Number.MAX_VALUE` `Number.MIN_VALUE`

- 表示 Number 最大最小值

```js
Number.MAX_VALUE; // 1.797693....e+308
Number.MIN_VALUE; // 5e-324
```

### `Infinity` `-Infinity`

- 表示无穷大和无穷小
