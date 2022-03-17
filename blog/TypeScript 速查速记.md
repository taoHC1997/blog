# TypeScript 速查速记

- 文档：
  - https://www.typescriptlang.org/zh/
  - 泛型工具类型（类型函数）： https://www.typescriptlang.org/docs/handbook/utility-types.html
  - DOM 使用： https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
- 常见包对应 type
  - https://github.com/DefinitelyTyped/DefinitelyTyped

## 类型

### 基础类型

- `boolean`
- `number`
- `string`
- `bigint`
- `object`
- `symbol`
- `array`
- `enum`
- `any`
- `void`
- `tuple`
- `null`
- `undefined`
- `never` 一般用在必然抛 `Error` 的函数（ any but never used）

### 高级类型

> 永远记住， ts 使用的是鸭式辩形法，判断类型不是根据名字来做的

#### 对象类型

一般应该用 `type` 和 `insterface` ，注意：可重名，重名合并

```ts
interface Hero {
  name: string;
  age: number;
  skill: string;
  skinNum?: number;
  say(): string; // say函数返回值为string
  [propname: string]: any; // 当前Hero可定义任意字符串类型的key
}
type Hero = {
  name: string;
  age: number;
  skill: string;
  skinNum?: number;
};
```

#### 数组类型

```ts
interface IItem {
  id: number;
  name: string;
  isGod: boolean;
}
const objectArr: IItem[] = [{ id: 1, name: "俊劫", isGod: true }];
// or
const objectArr: Array<IItem> = [{ id: 1, name: "俊劫", isGod: true }];
const numberArr: number[] = [1, 2, 3];
const arr: (number | string)[] = [1, "string", 2];
```

> 有一个只读数组 `let ro: ReadonlyArray<number> = [1, 2, 3];`

#### 元祖 tuple

```ts
// 数组 某个位置的值可以是注解中的任何一个
const LOL: (string | number)[] = ["zed", 25, "darts"];
// 元祖 每一项数据类型必须一致
const LOL: [string, string, number] = ["zed", "darts", 25];
```

#### 枚举

```ts
// 初始值默认为 0
enum JiShiEnum {
  REDJ,
  BLUEJ,
  GREENJ,
}
// 设置初始值
enum JiShiEnum {
  REDJ = 8,
  BLUEJ,
  GREENJ,
}
```

#### 泛型

> 注意泛型仍可约束： `extends`

```ts
// T 自定义名称
function myFun<T>(params: T[]) {
  return params;
}
myFun<string>(["123", "456"]);

// 定义多个泛型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`;
}
join<number, string>(1, "2");

function pop<T extends HasId[]>(list: T) {
  return list.pop();
}
```

#### `this`

在对象方法中， `return this` 会有一个 `this` 的类型约束

此外，对象方法的第一个参数可对 `this` 进行约束：

```ts
interface Obj {
  name: string;
  // 限定getName调用时的this类型
  getName(this: Obj): string;
}
const obj: Obj = {
  name: "yj",
  getName() {
    return this.name;
  },
};
obj.getName(); // check ok
const fn1 = obj.getName;
fn1(); // check error
```

### 类型声明辅助语法

> 这些辅助语法在泛型中常常会使用到

#### 基础符号

- `|`
- `&`
- `+`
- `-`

##### `in`

```ts
type Keys = "x" | "y" | "z";
type Obj = {
  // 使用 k:keys 会出错
  [k in Keys]: string;
};
// 注意，这里 k 和泛型同样是一个变量，可以在其他地方使用
```

##### `typeof`

```ts
interface Hero {
  name: string;
  skill: string;
}
const zed: Hero = { name: "影流之主", skill: "影子" };
type LOL = typeof zed; // type LOL = Hero
```

##### `keyof`

```ts
interface Point {
  x: number;
  y: number;
}
// type keys = "x" | "y"
type keys = keyof Point;
```

```ts
// 这里有一个特殊情况
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // number | string
// 原因在于 js 中 a['1'] 和 a[1] 是同样的东西
```

##### `extends` `infer`

> `extends` 表示继承约束，也可用作判断； `infer` 配合判断使用（它只有这么一个用途），从返回值推导泛型参数

```ts
// U 其实就是将要传入的类型， ts 对应此类型进行推断，多个会使用 &
type Flatten<T> = T extends Array<infer U> ? U : T;
// Flatten<string> <=> string
// Flatten<Array<number>> <=> number
```

##### 模板字符串式的声明

- 参考： https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

// 这里可以使用泛型工具
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

## 类属性关键字

- `public`
- `private` 类的外部不可用，继承也不行
- `protected` 类的外部不可用，继承可以
- `readOnly` 只读属性
- `static` 静态方法，不需要 new 就可以调用
- `abstract` 抽象类，所有子类都必须要实现其接口

## 常用场景

### 类型使用

#### 类型断言

##### `as` `<>`

```ts
function judgeWho(animal: Waiter | Teacher) {
  if (animal.anjiao) {
    (animal as Teacher).skill();
  } else {
    // (<Waiter>animal).say() 也可以，但不推荐
    (animal as Waiter).say();
  }
}
```

##### `!.` 非空断言

```ts
let v: null | undefined | string;
v!.toString(); // 排除了空值
```

##### `!:` 确定赋值断言

```ts
let x!: number;
init();
console.log(x + 1); // 表示确定在使用时已经赋值
function init() {
  x = 1;
}
```

#### 类型缩小

```ts
// 使用 typeof 或其他判断

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // 如果剩下的是非预期的，使用 never 类型
    const _exhaustiveCheck: never = strs;
    return _exhaustiveCheck;
  }
}
```

```ts
// in 当然也行

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}
```

```ts
// instanceof 自然也可以

class NumberObj {
  count: number;
}
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

```ts
// 某些联合类型就要用 switch 了

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}
```

#### 类型三元表达式（判断）

```ts
// 目前只有 extends 可以表示判断
type myThing<T> = T extends "string" ? string : boolean;

// 还有一个 infer ，它只能在判断中使用
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TTuple = [string, number];
type ToUnion = ElementOf<TTuple>; // string | number
```

#### 根据索引提取值类型

一般的，可以通过 `keyof` 提取所有键名；此外，又可以通过索引提取值类型：

```ts
interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  };
}

// 注意 [''] 不能少
let carColor: Car["color"];
let carProperty: Car["color" | "year"];
let carColorRedComponent: Car["color"]["red"];
```

#### 类型守卫函数

```ts
function isMan(man: any): man is Man {
  return man && typeof man === "object" && "sex" in man;
}

let mayMan: unknown;

if (isMan(mayMan)) {
  // 这里 mayMan 会被当做 Man 类型
}
```

```ts
// 断言
function assertsIsMan(man: any): asserts man is Man {
  if (!(man && typeof man === "object" && "sex" in man)) {
    throw new Error("NOT Man");
  }
}
```

### import 报错场景

#### CommonJS 模块导入报错

```ts
// 普通情况下（需要设置对应选项）：
const test = require("./test");
// 其实也可：
import test = require("./test");
```

#### 导入文件

```ts
// 全局定义一个文件模块 global.d.ts
declare module "*.png" {
  const imgUrl: string;
  export default imgUrl;
}

// 接下来可正常使用：
import img from "./file.png";
```

## 附录

### tsconfig

- 参考：
  - https://www.tslang.cn/docs/handbook/tsconfig-json.html

### 检验排除

- `// @ts-nocheck` 禁用整个文件的 ts 校验
- `// @ts-ignore` 禁用单行 ts 校验
