# SASS 基础学习

> Sass （Syntactically Awesome StyleSheets）

> - https://www.sass.hk/docs/
> - https://sass-lang.com/

## 快速开始

1. 安装 Ruby
   - https://rubyinstaller.org/downloads/ 下载安装 Ruby
2. 安装 Sass
   ```s
   gem install sass
   ```
3. 测试安装是否成功
   ```s
   sass -v
   ```
4. 简单编译
   ```s
   # 将 styles.sass 编译为 styles.css
   # --watch 表示监测变动
   sass --watch styles.scss:styles.css
   # 下面的语句表示监测整个文件夹
   sass --watch app/sass:public/stylesheets
   ```

## 语法基础

### 版本

SASS 有两种版本： `.sass` 旧版和 `.scss` 新版：旧版有严格的缩进规则，新版和 CSS 类似。

我们的学习以 scss 为标准。

```scss
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 5px 10px
    text-decoration: none
    color: orange
```

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: orange;
  }
}
```

### css 扩展语法

#### 嵌套语法

```scss
#main p {
  color: #00ff00;
  width: 97%;
  // #main p .redbox
  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

#### 父选择器标识（占位） `&`

```scss
a {
  font-weight: bold;
  text-decoration: none;
  // a:hover
  &:hover {
    text-decoration: underline;
  }
  // body.firefox a
  body.firefox & {
    font-weight: normal;
  }
}
#main {
  color: black;
  // #main-sidebar
  &-sidebar {
    border: 1px solid;
  }
}
```

#### 属性的嵌套

> 针对一大堆属性的 css 值。

```scss
.funky {
  // font: 20px/24px;
  font: 20px/24px {
    // font-family: fantasy;
    family: fantasy;
    // font-size: 30em;
    size: 30em;
    // font-weight: bold;
    weight: bold;
  }
}
```

### 变量

#### 变量基础声明

scss 变量以 `$` 为头，变量和赋值用 `:` 分隔。

变量中 `-` 和 `_` 等价，即 `$primary_color` 和 `$primary-color` 是同一个变量。

```scss
$primary-color: orange;
$secondary-color: gold;
body {
  color: $primary-color;
  background: $secondary-color;
}
```

#### 局部变量

选择器内部也可以定义变量，为局部变量，局部变量有作用域。

```scss
header {
  $header-color: orange;
  color: $header-color;
}
```

#### 全局变量

可以用 `!global` 定义全局变量，全局变量可全局使用。

```scss
header {
  $header-color: orange !global;
  color: $header-color;
}
article {
  color: $header-color;
}
```

#### 变量值介绍

下面是各种值的示例：

```scss
// Numbers: 15 , 3.2 , 12px
$a: 12px;
// Strings: 'foo' , "foo" , foo
// 可以不要引号
$b: foo;
// Colors: red , #ff11dd , rgba(121,255,0,0.5)
$c: red;
// Booleans: true , false
$d: true;
// Nulls: null
$e: null;
// Lists 数组可使用逗号或者空格隔开
$f: "Open Sans", Helvetica, Sans-Serif;
// Maps: key1:value1, key2: value2
$g: key1:value1, key2: value2;
```

可以用 `!default` 设置变量默认值，注意，一旦在作用域内有修改，默认值即被覆盖。

```scss
$primary-color: orange;
$primary-color: gold !default;

body {
  color: $primary-color;
}
```

#### 插值语句 `#{}`

`#{}` 用来将变量字符输出和进行运算。

```scss
$abc: .abcdefg;
// $x: .abcdefg;
$x: #{$abc};
// $y: 17;
$y: #{5 + 12};
```

### `@import` 文件引入

文件引入比较简单，使用 `@import` 语句。

> 注意：以 `_` 为开头的 scss 默认不编译。
> css 文件也可以引入。

```scss
// _colors.scss
$primary-color: orange;
$secondary-color: gold;

// styles.scss
@import "colors";

body {
  color: $primary-color;
  background: $secondary-color;
}
```

此外，注意：

```scss
// example.scss
.example {
  color: red;
}
// main.scss
// #main .example {...
#main {
  @import "example";
}
```

### `@mixin` (混合)

mixin 是可以重用的一组 CSS 声明。相当于宏。

比如说要设置 css 多平台：

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

aside {
  border: 1px solid orange;
  @include border-radius(7px);
}
```

### `@extend` 继承

`@extend` 可以让一个 CSS 类继承另一个 CSS 类。

```scss
.alert {
  padding: 10px;
  background-color: silver;
  color: white;
}

.important {
  @extend .alert;
  font-weight: bold;
  font-size: larger;
}

.important-error {
  @extend .important;
  background-color: red;
}
```

如果被继承的声明不需要在 css 中出现，使用 `%` 实现占位选择器：

```scss
%alert {
  padding: 10px;
  background-color: silver;
  color: white;
}

.info {
  @extend %alert;
  background-color: dodgerblue;
}

.success {
  @extend %alert;
  background-color: green;
}

.error {
  @extend %alert;
  background-color: red;
}

.warning {
  @extend %alert;
  background-color: orange;
}
```

### 运算符（操作符）

#### 等号运算符

`==` 表示相等判断， `!=` 表示不相等判断，这两个可以用于所有变量。

`<` 、 `>` 、 `<=` 、 `>=` 可用于数组判断

#### 数学运算符

- `+` 加
- `-` 减
- `*` 乘
- `/` 除
- `%` 取模

> 注意带单位运算中单位必须一致

```scss
.container {
  width: 100%;
}

article {
  float: left;
  width: 700px / 960px * 100%;
}

.sidebar {
  float: right;
  width: 200px / 960px * 100%;
}
```

#### 颜色操作符

> 对于颜色属性，有一些实现。

```scss
.abc {
  // #993399
  color: #991100 + #002299;
}
.efg {
  // #224466
  color: #112233 * 2;
}
.hij {
  // color: rgba(255, 255, 0, 0.75);
  // 这里透明度必须相同
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
```

#### 字符串操作符

> 对于字符串，有一些实现。
> 如果左边有引号结果有引号，如果左边无引号结果无引号，

```scss
img {
  // zoom-in
  cursor: zoom + -in;
}
```

#### 逻辑运算符

```scss
p {
  // border: 1px solid;
  @if 1 + 1 == 2 {
    border: 1px solid;
  }
  @if 5 < 3 {
    border: 2px dotted;
  }
  @if null {
    border: 3px double;
  }
}
$type: monster;
div {
  // color: green;
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

此外，还有 `and` , `or` , `not` 等逻辑运算符。

#### 循环运算符

主要是 `@for` ， `@each` ， `@while`

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

```css
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}
```

```css
.puma-icon {
  background-image: url("/images/puma.png");
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}
.egret-icon {
  background-image: url("/images/egret.png");
}
.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

```css
.item-6 {
  width: 12em;
}

.item-4 {
  width: 8em;
}

.item-2 {
  width: 4em;
}
```

### 函数

函数作为 sass 的大头，这里介绍部分常用函数。

更多详见： https://sass-lang.com/documentation/modules

#### 颜色相关

- `lighten()` 调亮
  ```
  // #d6d65c
  lighten(#cc3, 10%);
  ```
- `darken()` 调暗
- `opacify()` 减少透明度
  ```
  // rgba(255, 0, 0, 0.8)
  color: opacify(rgba(255, 0, 0, 0.5), 0.3);
  ```
- `transparent()` 增加透明度
- `mix()` 混合颜色
  ```
  // 默认 50%
  background: mix(red, yellow);
  background: mix(red, yellow, 35%);
  ```

#### 字符串相关

- `quote()` 添加引号
- `string-length()` 字符串长度
- `string-insert()` 将内容插入字符串给定位置

#### 数值相关

- `percentage()` 无单位数值转百分比
- `round()` 四舍五入取整
- `min()` 得到最小值
- `max()` 得到最大值
- `random()` 随机数生成

#### 数组相关

- `length()` 列表长度
- `nth()` 获取特定项
- `join()` 两列表相连
- `append()` 尾部添加

#### Map 相关

- `map-get()` 根据键获取值
- `map-merge()` 两个 Map 合成为一个
- `map-values()` 得到映射中的所有值

#### 其他

- `selector-append()` 把一个选择符附加到另一个选择符
- `feature-exists()` 检查当前 Sass 版本是否存在某个特性
- `variable-exists()` 检查当前作用域中是否存在某个变量
- `mixin-exists()`检查某个 mixin 是否存在

#### 自定义函数

```scss
@function double($n) {
  @return $n * 2;
}
#sidebar {
  width: double(5px);
}
```

### 注释

scss 中以 `//` 为单行注释，`/* 注释 */` 为多行注释。其中单行注释编译后会消除，多行注释则保存。

将 `!` 作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。

```scss
// 下面的多行注释 #{$变量名} 可以使用变量值
$version: "1.2.3";
/* This CSS is generated by My Snazzy Framework version #{$version}. */
```

## 编译

### sass 命令基础使用

- `sass -i` 进入 sass 测试环境
- `sass -v` 查看版本

### 风格

Sass 编译输出的 CSS 格式可以自定义：

- :nested – 嵌套格式（默认）
- :expanded – 展开格式
- :compact – 紧凑格式
- :compressed – 压缩格式

#### :nested

编译命令：

```s
sass --watch styles.scss:styles.css --style nested
```

css 结果：

```
div {
  padding: 20px;
  margin: 20px; }

.one {
  background: red; }

.two {
  background: yellow; }

.three {
  background: #ff8000; }

.four {
  background: #ffa600; }

.five {
  background: #ff5900; }
```

#### :expanded

编译命令：

```s
sass --watch styles.scss:styles.css --style expanded
```

css 结果：

```
div {
  padding: 20px;
  margin: 20px;
}

.one {
  background: red;
}

.two {
  background: yellow;
}

.three {
  background: #ff8000;
}

.four {
  background: #ffa600;
}

.five {
  background: #ff5900;
}
```

#### :compact

编译命令：

```s
sass --watch styles.scss:styles.css --style compact
```

css 结果：

```
div { padding: 20px; margin: 20px; }

.one { background: red; }

.two { background: yellow; }

.three { background: #ff8000; }

.four { background: #ffa600; }

.five { background: #ff5900; }
```

#### :compressed

编译命令：

```s
sass --watch styles.scss:styles.css --style compressed
```

css 结果：

```
div{padding:20px;margin:20px}.one{background:red}.two{background:yellow}.three{background:#ff8000}.four{background:#ffa600}.five{background:#ff5900}
```
