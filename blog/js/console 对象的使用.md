# console 对象的使用

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/Console

## 方法汇总

- `console.log()`
- `console.info()`
- `console.debug()`
- `console.warn()`
- `console.error()`
- `console.clear()`
- `console.group()`
- `console.groupCollapsed()`
- `console.groupEnd()`
- `console.dir()`
- `console.table()`
- `console.dirxml()`
- `console.assert()`
- `console.trace()`
- `console.time()`
- `console.timeEnd()`
- `console.count()`
- `console.profile()`
- `console.profileEnd()`

## 方法介绍

### 信息的基本显示

> 注意每次输出的结尾，有换行符

```js
// 基础文本
console.log("基本文本");
// 信息 info ;最前面有蓝色图标
console.info("这是info");
// 测试 debug ；默认情况下，console.debug 输出的信息不会显示，只有在打开显示级别在 verbose 的情况下，才会显示
console.debug("这是debug");
// 警告 warn ；最前面有黄色三角
console.warn("这是warn");
// 错误 error ；最前面有红色的叉，还会高亮显示输出文字和错误发生的堆栈
console.error("这是error");
// 清除控制台输出；如果用户选中了控制台的 Preserve log 选项，console.clear 方法将不起作用
console.clear();
// 别名
clear();
```

### 占位符

> 不同类型的数据必须使用对应的占位符

1. 字符 `%s`
   ```js
   console.log("输出是%s", "abc");
   ```
2. 整数 `%d` 或 `%i`
   ```js
   console.log("输出是%d", 5);
   console.log("输出是%i", 9);
   ```
3. 浮点数 `%f`
   ```js
   console.log("输出是%f", 3.1415);
   ```
4. 对象 `%o`
   ```js
   var d = {
     name: "dog",
     color: "red",
   };
   console.log("输出是%o", d);
   ```
5. CSS 格式字符串 `%c`
   ```js
   console.log(
     "%c Merry Christmas!!",
     "color:green;background:yellow;text-shadow:2px 2px black;padding: 10px;font-size: 30px"
   );
   ```

> 占位符可以多次使用
>
> ```js
> console.log("%d年%d月%d日", 2020, 2, 22);
> ```

### 分组式显示

- 开始语句 `console.group()`
- 中间折叠语句 `console.groupCollapsed()`
- 结束语句 `console.groupEnd()`

```js
console.group("第一组信息");
console.log("第一组第一条");
console.log("第一组第二条");
console.groupEnd();
console.group("第二组信息");
console.log("第二组第一条");
console.log("第二组第二条");
console.groupEnd();
console.group("第三组信息");
console.groupCollapsed("第三组折叠信息");
console.log("第三组第一条");
console.log("第三组第二条");
console.groupEnd();
```

### 完整的显示对象

- `console.dir()`
- 别名 `dir()`

```js
var d = {
  name: "dog",
  color: "red",
};
d.say = function () {
  alert("[○･｀Д´･ ○]");
};
console.dir(d);
```

```js
// Node 可指定颜色高亮
console.dir(obj, { colors: true });
```

### 复杂数据表格显示

- `console.table()`

```js
var languages = {
  csharp: { name: "C#", paradigm: "object-oriented" },
  fsharp: { name: "F#", paradigm: "functional" },
};
console.table(languages);
```

### 显示网页节点代码

- `console.dirxml()`
- 别名 `dirxml()`

```js
// 以目录树的形式，显示 DOM 节点
var table = document.getElementById("table1");
console.dirxml(table);
```

### 打印真值（判断某表达式是否为真）

- `console.assert()`

```js
// 接受两个参数，第一个为 false 打印第二个参数；仅报错，不跳出
var result = 0;
console.assert(result);
var year = 2000;
console.assert(year == 2011, "error for year");
```

### 辅助调试函数栈调用

- `console.trace()`

```js
function add(a, b) {
  console.trace();
  return a + b;
}
function add3(a, b) {
  return add2(a, b);
}
function add2(a, b) {
  return add1(a, b);
}
function add1(a, b) {
  return add(a, b);
}
var x = add3(1, 1);
```

### 辅助计时

- `console.time()`
- `console.timeEnd()`

```js
console.time("计时器一");
for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {}
}
console.timeEnd("计时器一");
```

### 辅助计数

- `console.count()`

```js
// 该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类
for (var i = 0; i < 10; i++) {
  console.count("a");
}
```

### 辅助性能分析

> 似乎有另外的使用技巧

- `console.profile()`
- `console.profileEnd()`

```js
function Foo() {
  for (var i = 0; i < 10; i++) {
    funcA(1000);
  }
  funcB(10000);
}
function funcA(count) {
  for (var i = 0; i < count; i++) {}
}
function funcB(count) {
  for (var i = 0; i < count; i++) {}
}
console.profile("性能分析器一");
Foo();
console.profileEnd("性能分析器一");
```

## 特殊技巧

### 输出绑定时间

```js
["log", "info", "warn", "error"].forEach(function (method) {
  console[method] = console[method].bind(console, new Date().toISOString());
});
console.log("出错了！");
```
