# js 内置对象 String

## 简单使用

```js
// 定义
var str = "test string";
// 遍历
for (i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

> 不能通过 `str[0]="dgsg";` 赋值

## 对象方法

### `String.fromCodePoint()`

- Unicode 编码显示

### `String.raw()`

1. 无参数时
   ```
   // 效果就是：
   \ => \\
   ```
2. 有参数时
   ```js
   String.raw({ raw: "test" }, 0, 1, 2);
   // 't0e1s2t'
   // 等同于
   String.raw({ raw: ["t", "e", "s", "t"] }, 0, 1, 2);
   ```

## 实例方法

### `str.valueOf()`

- 返回其值字符串

### `str.indexOf()`

- 传入一个字符串，传出索引
- 传入一个字符串和数字，从数字开始找索引
- 没有就返回 `-1`

### `str.lastIndexOf()`

- 类似 `str.indexOf()` ，从尾部开始找

### `str.charAt()`

- 传入索引，返回此索引对应字符，超出返回 `null`

### `str.concat()`

- 连接字符串

### `str.replace()`

- 两值，查找第一个值替换为第二个值
- 第一个值可为正则

### `str.slice()`

- 传一数值，返回从 `0 ~ n-1` 的字符串
- 传两数值，返回从 `a ~ b-1` 的字符串

> 数字为负倒着传

```js
// 去除最后一个字符
str.slice(0, -1);
```

### `str.split()`

> `arr.join()` 反方法

- 传入一个字符，按字符切割，返回切割的字符串组
- 第二个参数为数字，可选，指切割后保留个数

### `str.substr()`

- 传入一个数字，从这个数字开始截后面
- 传入两个数字，从这个数字开始，截后面那个字符数的字符

### `str.substring()`

- 传一个数字，返回从 `n ~ length-1` 的字符串
- 传两个数字，返回从 `a ~ b-1` 的字符串

### `str.toLocaleLowerCase()` `str.toLowerCase()`

- 转小写

### `str.toUpperCase()` `str.toLocaleUpperCase()`

- 转大写

### `str.codePointAt()`

- 判断位置

> 注意，汉字两个字节，参数 0 汉字--参数 1 汉字尾部(这部分无用)

### `str.normalize()`

- 外文的合字方法

### `str.includes()` `str.startsWith() `str.endsWith()`

> 判断包含，有第二个参数（索引），注意 end 索引意义

### `str.repeat()`

- 返回一个新字符串，表示将原字符串重复 n 次

### `str.padStart()` `str.padEnd()`

```js
"x".padStart(5, "ab"); // 'ababx'
"x".padStart(4, "ab"); // 'abax'
"x".padEnd(5, "ab"); // 'xabab'
"x".padEnd(4, "ab"); // 'xaba'
```

### ` str.trimStart()` `str.trimEnd()` `str.trim()`

- 去除空格，请顾名思义

> 这里注意主要浏览器的方法名不一样

### `str.matchAll()`

- 匹配

## 其他方法

### `escape()` `unescape()`

- 将字符串转 UniCode 编码或反过来
