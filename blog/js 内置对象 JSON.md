# js 内置对象 JSON

> JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001 年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON

## JSON 格式规范

- 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象
- 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和 null（不能使用 `NaN` , `Infinity` , `-Infinity` 和 `undefined` ）
- 字符串必须使用双引号表示，不能使用单引号
- 对象的键名必须放在双引号里面
- 数组或对象最后一个成员的后面，不能加逗号

## 方法介绍

### `JSON.stringify()`

> 将一个值转为 JSON 字符串

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

```js
JSON.stringify(value[, replacer [, space]])
```

- `value` 转换值
- `replacer` 转换使用
  - 如果是函数，值的每个属性均经过此函数处理（针对对象：此函数传入键和值，返回值是 `undefined` 不会输出，其他值会再次序列化）
  - 如果是数组，输出只包括此数组的属性名
  - 如果是空，默认序列化
- `space` 缩进使用值
  - 如果是数字，表示空格个数，上限为 10 ，默认为 0
  - 如果是字符，最多取前 10 个字符

> 此函数转换规则详见文档，这里说几点：
>
> - 如果值有 `toJSON()` 方法，直接调用此方法，针对值的值也是如此
> - 以 `symbol` 为为键或值会被忽略或转空
> - BigInt 不能被序列化

```js
JSON.stringify({}); // '{}'
JSON.stringify(true); // 'true'
JSON.stringify("foo"); // '"foo"'
JSON.stringify([1, "false", false]); // '[1,"false",false]'
JSON.stringify({ x: 5 }); // '{"x":5}'
JSON.stringify({ x: 5, y: 6 });
// "{"x":5,"y":6}"
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// '[1,"false",false]'
JSON.stringify({ x: undefined, y: Object, z: Symbol("") });
// '{}'
JSON.stringify([undefined, Object, Symbol("")]);
// '[null,null,null]'
JSON.stringify({ [Symbol("foo")]: "foo" });
// '{}'
JSON.stringify({ [Symbol.for("foo")]: "foo" }, [Symbol.for("foo")]);
// '{}'
JSON.stringify({ [Symbol.for("foo")]: "foo" }, function (k, v) {
  if (typeof k === "symbol") {
    return "a symbol";
  }
});
// undefined
// 不可枚举的属性默认会被忽略：
JSON.stringify(
  Object.create(null, {
    x: { value: "x", enumerable: false },
    y: { value: "y", enumerable: true },
  })
);
// "{"y":"y"}"
```

### `JSON.parse()`

> 将 JSON 字符串还原为值

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

```js
JSON.parse(text[, reviver])
```

- `text` 要转换的字符串，必须符合格式，不允许逗号结尾
- `replacer` 转换使用
  - 函数，值的每个属性均经过此函数处理（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）

```js
JSON.parse("{}"); // {}
JSON.parse("true"); // true
JSON.parse('"foo"'); // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse("null"); // null

JSON.parse('{"p": 5}', function (k, v) {
  if (k === "") return v; // 如果到了最顶层，则直接返回属性值，否则将属性值变为原来的 2 倍
  return v * 2;
}); // { p: 10 }
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
  console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，最后一个属性名会是个空字符串
  return v; // 返回原始属性值，相当于没有传递 reviver 参数
});
// 1
// 2
// 4
// 6
// 5
// 3
// ""
```

## 技巧

### 打印技巧

```js
const person = { name: "Jerry", age: 29 };
// 普通打印对象
console.log(JSON.stringify(person));
// 仅打印某些值
console.log(JSON.stringify(person, ["name"]));
// 对值作处理
console.log(
  JSON.stringify(person, function (k, v) {
    if (typeof v === "string") {
      return undefined;
    }
    return v;
  })
);
// 输出对象使用空格间隔
console.log(JSON.stringify(person, null, 4));
// 输出对象使用字符间隔
console.log(JSON.stringify(person, null, "--"));
```

```js
// 控制对象序列化
const person = {
  name: "Jerry",
  age: 29,
  toJSON() {
    return `Now I am '${this.name}' and age is ${this.age}`;
  },
};
console.log(JSON.stringify(person));
// "'Now I am 'Jerry' and age is 29'"
```
