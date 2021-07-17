# js 内置对象 Math

## 对象方法

### 取整方法

#### `Math.ceil()`

- 向上取整，无论多少都向上

#### `Math.floor()`

- 向下取整，无论多少都向下

#### `Math.round()`

- 返回四舍五入的整数
- 恰好 `0.5` 时，去向 `+∞` 方向的整数，注意负数

### 其他实用方法

#### `Math.random()`

- 返回一个 `[0，1)` 的伪随机数，浮点型

```js
// 返回 1 ~ 100
var r = Math.random() * 100 + 1;
// 标准随机数封装
function random(min, max) {
  return Math.floor(Math.radom() * (max - min) + min);
}
```

#### `Math.abs()`

- 求绝对值

> 注意 `Math.abs(null);` 结果为 `0`

#### `Math.max()`

- 返回一组数字的最大值

#### `Math.min()`

- 返回一组数字的最小值

#### `Math.trunc()`

- 去除一个数的小数部分，返回整数部分

```js
Math.trunc =
  Math.trunc ||
  function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
```

#### `Math.sign()`

- 判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
  - 参数为正数，返回 `+1`
  - 参数为负数，返回 `-1`
  - 参数为 `0` ，返回 `0`
  - 参数为 `-0` ，返回 `-0`
  - 其他值，返回 `NaN`

```js
Math.sign =
  Math.sign ||
  function (x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  };
```

#### `Math.pow(x,y)`

- 返回 x 的 y 次幂

#### `Math.sqrt()`

- 开方

#### `Math.cbrt()`

- 计算一个数的立方根

```js
Math.cbrt =
  Math.cbrt ||
  function (x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
```

#### `Math.clz32()`

- 将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 `0`

> 对于小数， `Math.clz32()` 方法只考虑整数部分

#### `Math.imul()`

- 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数

> 对于那些很大的数的乘法，低位数值往往都是不精确的， `Math.imul()` 方法可以返回正确的低位数值

#### `Math.fround()`

- 返回一个数的 32 位单精度浮点数形式

```js
Math.fround =
  Math.fround ||
  function (x) {
    return new Float32Array([x])[0];
  };
```

#### `Math.hypot()`

- 返回所有参数的平方和的平方根

```js
Math.hypot(3, 4); // 5
Math.hypot(3, 4, 5); // 7.0710678118654755
```

#### `Math.expm1()`

- 返回 `ex - 1` ，即 `Math.exp(x) - 1`

```js
Math.expm1 =
  Math.expm1 ||
  function (x) {
    return Math.exp(x) - 1;
  };
```

#### `Math.log1p()`

- 返回 `1 + x` 的自然对数，即 `Math.log(1 + x)` 。如果 `x` 小于 `-1` ，返回 `NaN`

```js
Math.log1p =
  Math.log1p ||
  function (x) {
    return Math.log(1 + x);
  };
```

#### `Math.log10()`

- 返回以 `10` 为底的 `x` 的对数。如果 `x` 小于 `0` ，则返回 `NaN`

```js
Math.log10 =
  Math.log10 ||
  function (x) {
    return Math.log(x) / Math.LN10;
  };
```

#### `Math.log2()`

- 返回以 `2` 为底的 `x` 的对数。如果 `x` 小于 `0` ，则返回 `NaN`

```js
Math.log2 =
  Math.log2 ||
  function (x) {
    return Math.log(x) / Math.LN2;
  };
```

### 双曲函数方法

> ES6 新增了 6 个双曲函数方法

- `Math.sinh(x)` 返回 `x` 的双曲正弦（hyperbolic sine）
- `Math.cosh(x)` 返回 `x` 的双曲余弦（hyperbolic cosine）
- `Math.tanh(x)` 返回 `x` 的双曲正切（hyperbolic tangent）
- `Math.asinh(x)` 返回 `x` 的反双曲正弦（inverse hyperbolic sine）
- `Math.acosh(x)` 返回 `x` 的反双曲余弦（inverse hyperbolic cosine）
- `Math.atanh(x)` 返回 `x` 的反双曲正切（inverse hyperbolic tangent）

## 常量

- `Math.PI` 常量 π
- `Math.E` 常量 e
