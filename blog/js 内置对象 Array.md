# js 内置对象 Array

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

## 数组创建

```js
var arr = [];
var arr = [1, 2, 3];
var arr = [[1], 2, [2, [123]]];
var arr = new Array(); // []
var arr = new Array(1, 2, 3); // [1, 2, 3]
var arr = new Array(3); // [undefined,undefined,undefined] 参数3为数组length
var arr = new Array([1], 2, [2, [123]]); // [[1],2,[2,[123]]]
arr instanceof Array; // 判断是否是数组
```

## 数组属性

### `length` 属性

`length` 属性返回数组的长度，是一个可变属性，表示一个数组中的元素个数

```js
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 2; // 改变数组 length ，从后往前截取
arr; // [1,2],此时 arr.length 为 2 。所以平时我们可以用 length 来操作数组（删除，添加）
arr.length = 4;
arr; // [1,2,empty x 2] 此 empty 和 undefined 有差别
// 注意，此时使用 for 语句打印会出 undefined
// 但是使用 arr.forEach(...) 会跳过空项
4 in arr; // false
arr[4] = undefined; // 注意赋值后
4 in arr; // true
```

### `prototype` `constructor`

这两个对象基本属性有一些技巧：

```js
// 添加最大值方法
Array.prototype.max = function () {
  return Math.max.apply(null, this);
}[(1, 2, 3, 4)].max(); //4
// 添加去重方法
Array.prototype.unique = function () {
  return this.filter((item, index, arr) => arr.indexOf(item) === index);
}[(11, 2, 1, 1, 2, 3, 1, 2, 4, 5, 23, 2)].unique(); //[11, 2, 1, 3, 4, 5, 23]
```

```js
var arr = [1, 2, 3];
arr.constructor; //function Array() { [native code] }
arr.constructor === Array; //true  即 new Array
var a = new Array();
a.constructor === Array; //true
```

## 数组遍历

### `for`

```js
// for (var index = 0; index < arr.length; index++) { 会对性能损耗
for (var index = 0, length = arr.length; index < length; index++) {
  console.log(arr[index]);
}
```

### `forEach`

> ES5 ，不可以中间跳出

```js
// 后两个参数可选
arr.forEach(function (value, index, array) {
  console.log(value);
  console.log(index);
  console.log(array);
});
```

### `for...in`

> 这个是针对对象的，不建议使用

```js
for (var i in arr) {
  console.log(arr[i]);
}
```

### `for...of`

> ES5

```js
for (var value of arr) {
  console.log(value); // 1 2 3
}
```

> ES6 提供三个新的方法 `entries()` ， `keys()` 和 `values()` 用于遍历数组。它们都返回一个遍历器对象

```js
// 键名
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1
// 键值
for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'
// 键值对
for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

## 数组常用方法

> `forEach()` `filter()` `reduce()` `every()` 和 `some()` 都会跳过空位； `map()` 会跳过空位，但会保留这个值； `join()` 和 `toString()` 会将空位视为 `undefined` ，而 `undefined` 和 `null` 会被处理成空字符串

> ES6 则是明确将空位转为 `undefined`

### 对象方法

#### `Array.isArray()`

判断是否数组

```js
Array.isArray([]); // true
Array.isArray(); // false
Array.isArray({}); // false
Array.isArray(123); // false
```

自行实现：

```js
Array.prototype.isArray =
  Array.prototype.isArray ||
  function () {
    return Object.prototype.toString.call(this) === "[object Array]";
  };
[(1, 2, 3)].isArray(); //true
```

#### `Array.from()`

用于将两类对象转为真正的数组：

1. 类似数组的对象（array-like object）
   > 必须有 `length` 属性；任何有 `length` 属性的对象，都可以通过 `Array.from()` 方法转为数组，而此时扩展运算符就无法转换
   > 比如 `var obj={ 0:10,1:20,3:50,length:3};`
2. 可遍历（iterable）的对象（包括 ES6 新增的数据结构 `Set` 和 `Map` ）

```js
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

```js
const toArray = (() =>
  Array.from ? Array.from : (obj) => [].slice.call(obj))();
```

```js
// 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from(arrayLike, (x) => x * x);
// 等同于
Array.from(arrayLike).map((x) => x * x);
Array.from([1, 2, 3], (x) => x * x);
// [1, 4, 9]
```

#### `Array.of()`

用于将一组值，转换为数组

> `Array.of()` 基本上可以用来替代 `Array()` 或 `new Array()` ，并且不存在由于参数不同而导致的重载。它的行为非常统一
> `Array.of()` 总是返回参数值组成的数组。如果没有参数，就返回一个空数组

```js
Array.of(3, 11, 8); // [3,11,8]
```

```js
//注意：
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
// 自实现
function ArrayOf() {
  return [].slice.call(arguments);
}
```

### 修改器方法

> 会修改数组的方法

#### `arr.push()`

尾插入

```js
arr.push(4); // 返回 length
```

#### `arr.pop()`

尾删除

```js
arr.pop(); // 返回删除值
```

#### `arr.unshift()`

头插入

```js
arr.unshift(4); // 返回 length
```

#### `arr.shift()`

头删除

```js
arr.shift(); // 返回删除值
```

#### `arr.fill()`

使用给定值，填充一个数组

> 浅拷贝；可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

```js
["a", "b", "c"].fill(7);
// [7, 7, 7]
new Array(3).fill(7);
// [7, 7, 7]
```

```js
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

#### `arr.reverse()`

颠倒数组中元素的顺序

```js
console.log(arr.reverse()); // [3,2,1]
```

#### `arr.splice()`

> 不建议使用 `delete` 删除数组元素，它本质是将 `undefined` 替换原来项
> 此外，直接修改 `length` 可以删除元素或者将后续补 `undefined`

插入、删除、替换

1. 删除
   - 删除元素，传两个参数，要删除第一项的位置和第二个要删除的项数
   - 第一个参数可为负数表示 `length - n`
   - 第二个参数为空则把后续所有参数删除
2. 插入
   - 向数组指定位置插入任意项元素。三个参数，第一个参数（位置），第二个参数（0），第三个参数（插入的项）
3. 替换（实质是删除部分项再插入另一部分项）
   - 向数组指定位置插入任意项元素，同时删除任意数量的项，三个参数。第一个参数（起始位置），第二个参数（删除的项数），第三个参数（插入任意数量的项）

```js
var arr = ["q", "w", "e"];
```

```js
// 删除
var removed = arr.splice(1, 1);
console.log(arr); // q,e  已被改变
console.log(removed); // w ,返回删除的项
// 插入
var insert = arr.splice(0, 0, "r"); // 从第0个位置开始插入
console.log(insert); // 返回空数组
console.log(arr); // r,q,e
// 替换
var replace = arr.splice(1, 1, "t"); // 删除一项，插入一项
console.log(arr); // r,t,e
console.log(replace); // q,返回删除的项
```

#### `arr.copyWithin(target, start = 0, end = this.length)`

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

> 使用这个方法，会修改当前数组

三个参数：

1. `target` （必需）：从该位置开始替换数据。如果为负值，表示倒数
2. `start` （可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算
3. `end` （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

```js
// 将3号位开始到4号位，复制到0号位，原位置数据会给覆盖
[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]
```

#### `arr.sort()`

排序；默认按照字符串的 Unicode 码位点排序

```js
var arr = [1, 2, 4, 3, 1, 1, 2];
console.log(arr.sort()); //[1, 1, 1, 2, 2, 3, 4]
```

```js
var arr = [1, 2, 10, 4, 3, 1, 1, 2];
console.log(arr.sort()); //[1, 1, 1, 10, 2, 2, 3, 4]
```

```js
var arr = [1, 2, 10, 4, 3, 1, 1, 2];
console.log(
  arr.sort(function (a, b) {
    return a - b;
  })
); // [1, 1, 1, 2, 2, 3, 4, 10]
```

```js
// 标准写法
arr.sort(function (a, b) {
  if (a > b) {
    return 1;
  } else if (a == b) {
    return 0;
  } else {
    return -1;
  }
});
```

### 访问方法

> 返回一个新的数组或者返回一个其它的期望值

#### `arr.indexOf()`

获取元素索引，没有就返回 `-1`

```js
[1, 2, 3].indexOf(2); // 1
[1, 2, 3].indexOf(0); // -1
[NaN].indexOf(NaN); // -1
```

#### `arr.slice()`

截取、转化 `arguments` 伪数组

对于 `arr.slice(start,end)` ：

1. `start` 必需；规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
2. `end` 可选；规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 `start` 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素

```js
var arr = [1, 2, 3, 4, 5];
arr.slice(0, 3); //  [1,2,3]
arr.slice(3); //  [4,5]
arr.slice(1, -1); //  [2,3,4]
arr.slice(-3, -2); //  [3]
var arr1 = arr.slice(0); // 返回数组的拷贝数组，是一个新的数组，不是赋值指向
```

有技巧： `arguments` 转数组

```js
function test() {
  var arr = arguments;
  arr.push("abc");
  console.log(JSON.stringify(arr));
}
test(1, 2, 3); //arr.push is not a function(…) 因为伪数组没有push方法
// 转换后：
function test() {
  var arr = Array.prototype.slice.call(arguments);
  arr.push("abc");
  console.log(JSON.stringify(arr));
}
test(1, 2, 3); //[1,2,3,"abc"]
```

#### `arr.concat()`

连接数组

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2); // [1, 2, 3, 4, 5, 6]
arr3.concat(7); // [1, 2, 3, 4, 5, 6, 7]
var arr4 = arr1.concat("abc", arr2); // [1, 2, 3, "abc", 4, 5, 6]
// 不加参数相当于拷贝
var arr5 = arr1.concat(); // [1,2,3]
var arr6 = arr1;
arr5 === arr1; // false
arr6 === arr1; // true
```

#### `arr.join()`

把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔

```js
console.log(arr.join(",")); // 1,2,3
```

#### `arr.includes()`

返回一个布尔值，表示某个数组是否包含给定的值

```js
[NaN].indexOf(NaN);
// -1
[NaN].includes(NaN);
// true
```

#### `arr.toString()`

把数组转换为字符串，并返回结果

```js
console.log(arr.toString()); // 1,2,3
```

#### `arr.toLocaleString()`

把数组转换为本地字符串，并返回结果

```js
console.log(arr.toLocaleString()); // 1,2,3
```

#### `arr.valueOf()`

返回数组对象的原始值

```js
console.log(arr.valueOf()); // [1,2,3]
```

#### `arr.flat()`

用于将嵌套的数组“拉平”，变成一维的数组

> 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将 `flat()` 方法的参数写成一个整数，表示想要拉平的层数，默认为 `1` ；使用 `Infinity` 关键字可完全拉平为一维数组
> 如果原数组有空位， `flat()` 方法会跳过空位

```js
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]
```

### 迭代方法

> 一般用来对数组每项进行处理，不建议在使用过程中改变数组

说明一下，这些方法都是如 `arr.filter(function(currentValue,index,arr), thisValue)` ，其中参数为：

1. `function(currentValue, index,arr)` 必须；函数，数组中的每个元素都会执行这个函数
   - `currentValue` 必须，当前元素的值
   - `index` 可选，当期元素的索引值
   - `arr` 可选，当期元素属于的数组对象
2. `thisValue` 可选。对象作为该执行回调时使用，传递给函数，用作 `this` 的值。如果省略了 `thisValue` ，`this` 的值为 `undefined`

#### `arr.filter()`

使用指定的函数测试所有元素，并创建一个包含所有通过测试（返回 `true` ）的元素的**新数组**

```js
Array.prototype.unique = function () {
  // 去重，如果此值第一个索引为当前索引，则为真
  return this.filter((item, index, arr) => arr.indexOf(item) === index);
};
[(11, 2, 1, 1, 2, 3, 1, 2, 4, 5, 23, 2)].unique(); //[11, 2, 1, 3, 4, 5, 23]
```

#### `arr.map()`

返回一个由原数组中的每个元素作为参数调用一个指定方法后的**返回值**组成的新数组

```js
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt); // [1,2,3]
numbers; // [1,4,9]
roots; // [1,2,3]
```

#### `arr.every()`

测试数组的所有元素（跳过空值）是否都通过了指定函数的测试，返回布尔值

```js
[2, 5, 1, 4, 13].every(function (element, index, array) {
  return element >= 10;
}); // false
```

#### `arr.some()`

测试数组中的某些元素（跳过空值）是否通过了指定函数的测试

```js
[2, 5, 1, 4, 13].some(function (element, index, array) {
  return element >= 10;
}); //true
```

#### `arr.reduce()`

对数组中的每个元素执行一个一个方法，返回结果值

> 有一个反方向执行的 `arr.reduceRight()`

```js
// accumulator 初始值
var initialValue = 0;
[1, 2, 3, 4].reduce(function (accumulator, currentValue, index, array) {
  return accumulator + currentValue;
}, initialValue); // 10
```

#### `arr.find()`

找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 `true` 的成员，然后返回该成员。如果没有符合条件的成员，则返回 `undefined`

> 可以发现 `NaN` ，弥补了数组的 `indexOf` 方法的不足

```js
[1, 4, -5, 10].find((n) => n < 0);
// -5
[1, 5, 10, 15].find(function (value, index, arr) {
  return value > 9;
}); // 10
```

#### `arr.findIndex()`

与 `arr.find()` 类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 `-1`

> 可以发现 `NaN` ，弥补了数组的 `indexOf` 方法的不足

```js
function f(v) {
  return v > this.age;
}
let person = { name: "John", age: 20 };
[10, 12, 26, 15].find(f, person); // 26
```

```js
[NaN].indexOf(NaN);
// -1
[NaN].findIndex((y) => Object.is(NaN, y));
// 0
```

#### `arr.flatMap()`

对原数组的每个成员执行一个函数（相当于执行 `Array.prototype.map()` ），然后对返回值组成的数组执行 `flat()` 方法

> 只能展开一层数组

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
```
