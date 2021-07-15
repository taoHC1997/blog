# js 正则学习

> 注意：部分使用细节详见： https://es6.ruanyifeng.com/#docs/regex

## 正则基础使用

### 正则对象声明

- 字面量声明（推荐）
  ```js
  var reg = /reg/;
  var reg = /reg/gi;
  var reg = /\d{1,5}/;
  ```
- 对象式声明
  ```js
  var reg = new RegExp("reg");
  var reg = new RegExp("reg", "ig");
  var reg = new RegExp(/reg/, "ig");
  // 这里要注意，会有转义情况
  var reg = new RegExp("\\w+");
  ```

注意以下字符需要转义（ `RegExp()` 需要使用 `\\` 进行转义）：

- `^`
- `.`
- `[`
- `$`
- `(`
- `)`
- `|`
- `*`
- `+`
- `?`
- `{`
- `\`

### js 使用

下面介绍正则对象特有的正则方法：

- `RegExp.test()` 检验匹配成功
  ```js
  var reg = /test/i;
  var str = "This is a test";
  console.log(reg.test(str)); // true
  console.log(/test/i.test(str)); // true
  ```
- `RegExp.exec()` 检验并返回匹配的信息（数组表示）
  ```js
  var reg = /test/i;
  var str = "This is a test";
  console.log(reg.exec(str)); // ["test", index: 10, input: "This is a test", groups: undefined]
  console.log(/abc/i.exec(str)); // null
  ```
  ```js
  var str = "中国移动:10086,中国联通:10010,中国电信:10000";
  var reg = /\d{5}/g;
  //通过正则表达式匹配这个字符串
  var array = reg.exec(str);
  while (array != null) {
    //输出匹配的内容
    console.log(array[0]);
    array = reg.exec(str);
  }
  ```

下面介绍 `String` 对象的可使用正则的方法：

> ES6 将这 4 个方法，在语言内部全部调用 RegExp 的实例方法

- `str.match(pattern)` 返回匹配的字符串或者 `null`
  对应 `RegExp.prototype[Symbol.match]`
  ```js
  var reg = /test/gi;
  var str = "This is a bad test and a good test.";
  console.log(str.match(reg)); // ["test", "test"]
  console.log(str.match(reg).length); // 2
  ```
  ```js
  var email = "ddlyyy@test.com.cn";
  email.match(/([0-9a-zA-Z_.-]+)[@]([0-9a-zA-Z_-]+)(([.][a-zA-Z]+){1,2})/);
  console.log(RegExp.$1); // ddlyyy
  console.log(RegExp.$2); // test
  console.log(RegExp.$3); // .com.cn
  ```
- `str.replace(pattern, replacement)` 将匹配字符换掉
  对应 `RegExp.prototype[Symbol.replace]`
  ```js
  var reg = /test/gi;
  var str = "This is a bad test and a good test.";
  console.log(str.replace(reg, "demo")); // This is a bad demo and a good demo.
  ```
- `str.search(pattern)` 查询匹配字符串的第一个索引，没有就返回 `-1`
  对应 `RegExp.prototype[Symbol.search]`
  ```js
  var reg = /test/i;
  var str = "This is a bad test and a good test.";
  console.log(str.search(reg)); // 14
  ```
- `str.split(pattern)` 返回指定正则拆分的数组
  对应 `RegExp.prototype[Symbol.split]`
  ```js
  var reg = / /i;
  var str = "This is a test";
  console.log(str.split(reg)); // ["This", "is", "a", "test"]
  ```

### 正则对象实例属性配置

- `reg.global` 布尔值，表示 `g` 是否已设置
- `reg.ignoreCase` 布尔值，表示 `i` 是否已设置
- `reg.multiline` 布尔值，表示 `m` 是否已设置
- `reg.sticky` 布尔值，表示 `s` 是否已设置
- `reg.lastIndex` 整数，代表下次匹配将从哪里字符位置开始
- `reg.source` 正则表达式的源字符串形式
- `reg.flags` 正则表达式的修饰符；ES6 新增

```js
var reg = /test/gi;
console.log(reg.global); //true，是否设置了全局
console.log(reg.ignoreCase); //true，是否设置了忽略大小写
console.log(reg.multiline); //false，是否设置了换行
console.log(reg.sticky); //false，是否设置粘滞匹配
console.log(reg.lastIndex); //0，下次匹配位置
console.log(reg.source); //test，正则表达式的源字符串
```

### 正则对象静态属性使用

> 注意：有部分别名在浏览器中仅替换函数可用

- `RegExp.input` `RegExp.$_` 当前被匹配的字符串
- `RegExp.lastMatch` `$&` 最后一个匹配字符串
- `RegExp.lastParen` `$+` 最后一对圆括号内的匹配子串
- `RegExp.leftContext` `` $` `` 最后一次匹配前的子串
- `RegExp.rightContext` `$'` 在上次匹配之后的子串

```js
var reg = /test/i;
var str = "This is a bad test and a good test.";
reg.test(str);
console.log(RegExp.input); // This is a bad test and a good test.
console.log(RegExp.leftContext); // This is a bad
console.log(RegExp.rightContext); //  and a good test.
console.log(RegExp.lastMatch); // test
console.log(RegExp.lastParen); //
```

下面介绍非标准属性 `$1` ~ `$9` 的使用：

```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
str.replace(re, "$2, $1"); // "Smith, John"
RegExp.$1; // "John"
RegExp.$2; // "Smith"
```

## 声明语法介绍

### 全局修饰符

- `i` 忽略大小写
- `g` 全局匹配；找到所有匹配，而不是在第一个匹配后停止
- `m` 多行匹配
- `u` 正确处理四个字节的 UTF-16 编码（ ES6 新增）
  ```js
  // 正确处理大于 \uFFFF 的 Unicode 字符
  /^\uD83D/u.test("\uD83D\uDC2A");
  /^\uD83D/.test("\uD83D\uDC2A");
  ```
- `y` 确保匹配必须从剩余的第一个位置开始（ ES6 新增）
  ```js
  // 每次首部第一个不匹配则不行
  // 注意 ^ 的头部和 y 的不一致
  // 规则和 g 类似；不过与 g 修饰符联用，才能返回所有匹配
  ```
- `s` dotAll 模式， `.` 将匹配任何字符（包括终止符 `\n` ）。

### 元字符

这里从举例来介绍；更详细的介绍见正则文档

#### 匹配单个字符和数字

- `.` 匹配除换行外所有字符
- `[a-z0-9]` 匹配括号中的任意字符
- `^[a-z0-9]` 匹配不在括号中的任意字符
- `\d` 匹配数字
- `\D` 匹配非数字
- `\w` 匹配字母数字和 `_`
- `\W` 匹配非字母数字和 `_`

#### 匹配空白字符

- `\0` 匹配空字符
- `\b` 匹配空格字符；实则匹配边界而非字符本身
- `\f` 匹配禁止字符，换页符
- `\n` 匹配换行符
- `\r` 匹配回车符
- `\t` 匹配制表符
- `\v` 匹配垂直制表符
- `\s` 匹配空字符、空格、制表、换行、换页
- `\S` 匹配非空字符

#### 匹配锚字符

> 锚点使用

- `^` 行尾匹配
- `$` 行首匹配
- `\A` 只匹配字符串开始处
- `\b` 匹配单词边界
- `\B` 匹配非单词边界
- `\G` 匹配当前搜索的开始位置
- `\Z` 匹配字符串结束处或行尾
- `\z` 只匹配字符结束处

#### 匹配重复字符

- `x?` 匹配 0 或 1 个 `x`
- `x*` 匹配 0~n 个 `x`
- `x+` 匹配至少一个 `x`
- `(xyz)+` 匹配至少一个 `xyz`
- `x{n}` 匹配 n 个 `x`
- `x{n,}` 匹配最少 n 个 `x`
- `x{m,n}` 匹配最少 m 个最多 n 个 `x`

#### 替代字符

- `a|b` 匹配 `a` 或者 `b`

#### Unicode 属性类扩展（ES6 新增）

> 语法： `\p{UnicodePropertyName=UnicodePropertyValue}`
> 注意： 部分属性可只写值或属性名；必须要 `u` 修饰符

> 有一个 `\P` 表示反向匹配

- 希腊文字母
  ```js
  const regexGreekSymbol = /\p{Script=Greek}/u;
  regexGreekSymbol.test("π"); // true
  ```
- 十进制数字
  ```js
  const regex = /^\p{Decimal_Number}+$/u;
  regex.test("𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼"); // true
  ```
- 所有数字
  ```js
  const regex = /^\p{Number}+$/u;
  regex.test("²³¹¼½¾"); // true
  regex.test("㉛㉜㉝"); // true
  regex.test("ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ"); // true
  ```
- 所有空格
  `\p{White_Space}`
- 各种文字所有字母；类似 `\w`
  `[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]`
- 各种文字所有非字母；类似 `\W`
  `[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]`
- Emoji
  `/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu`
- 箭头字符
  ```js
  const regexArrows = /^\p{Block=Arrows}+$/u;
  regexArrows.test("←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩"); // true
  ```

### 贪婪模式和惰性模式

下面介绍贪婪模式：

- `+`
- `?`
- `\*`
- `{n}`
- `{n,}`
- `{n,m}`

```js
var reg = /[a-z]+/; // 贪婪匹配，全部替换
var str = "aaabbbccc";
var result = str.replace(reg, "xxx");
console.log(result); // xxx
```

下面介绍惰性模式：

- `+?`
- `??`
- `\*?`
- `{n}?`
- `{n,}?`
- `{n,m}?`

```js
var reg = /[a-z]+?/; // ?号关闭了贪婪匹配，只替换了第一个匹配项
var str = "aaabbbccc";
var result = str.replace(reg, "xxx");
console.log(result); // xxxaabbbccc
```

### 断言

> 注意，目前只支持先行断言

- `x(?=y)` 匹配 `x` 后面紧跟 `y` 的位置
- `x(?!y)` 匹配 `x` 后面不跟 `y` 的位置

```js
/\d+(?=%)/.exec("100% of US presidents have been male"); // ["100"]
/\d+(?!%)/.exec("that’s all 44 of them"); // ["44"]
```

```js
/(?<=\$)\d+/.exec("Benjamin Franklin is on the $100 bill"); // ["100"]
/(?<!\$)\d+/.exec("it’s is worth about €90"); // ["90"]
```

注意：

```js
/(?<=(\d+)(\d+))$/.exec("1053"); // ["", "1", "053"]
/^(\d+)(\d+)$/.exec("1053"); // ["1053", "105", "3"]
/(?<=(o)d\1)r/.exec("hodor"); // null
/(?<=\1d(o))r/.exec("hodor"); // ["r", "o"]
```

### 组匹配

> 使用括号可进行组匹配

下面介绍捕获性分组：

```js
var reg = /(\d+)([a-z])/; // 捕获性分组
var str = "123abc";
console.log(reg.exec(str)); // ["123a", "123", "a"]
```

下面介绍非捕获性分组（使用 `(?:x)` ）：

```js
var pattern = /(\d+)(?:[a-z])/; //非捕获性分组
var str = "123abc";
console.log(pattern.exec(str)); //["123a", "123"]
```

> ES2018 引入具名组匹配（Named Capture Groups）

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec("1999-12-31");
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
let {
  groups: { one, two },
} = /^(?<one>.*):(?<two>.*)$/u.exec("foo:bar");
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
"2015-01-02".replace(re, "$<day>/$<month>/$<year>");
// '02/01/2015'
```
