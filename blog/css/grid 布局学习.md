# grid 布局学习

> grid 是网页的二维布局方式

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout
- 练习游戏
  - http://cssgridgarden.com/#zh-cn
  - https://github.com/thomaspark/gridgarden
- 辅助参考
  - http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
  - https://css-tricks.com/snippets/css/complete-guide-grid/

## 容器（container）

### 容器基础

- 容器可设置为 grid
  ```css
  .box {
    display: grid;
  }
  .box {
    display: inline-grid;
  }
  ```
- 容器有行和列
  - 水平为行 row
  - 垂直为列 column
  - 行列交叉为单元格 cell
  - 划分网格为网格线 grid line

### 容器属性

#### `grid-template-columns` `grid-template-rows` 行列宽高

- `grid-template-columns` 定义列宽
- `grid-template-rows` 定义行高

取值：

- `px`
- `%`
- `fr` fraction 的缩写，意为"片段"
- `auto` 自动长度
- `repeat()` 实现重复功能
- `minmax()` 实现范围取值
- `[*]` 命名网格线
- `max-content` 是一个用来表示以网格项的最大的内容来占据网格轨道的关键字
- `min-content` 是一个用来表示以网格项的最大的最小内容来占据网格轨道的关键字

> 这里以 `grid-template-columns` 为例

```css
grid-template-columns: 100px 100px 100px;
/** fr 单位表示占比 **/
grid-template-columns: 1fr 1fr;
/** fr 单位可结合 px 单位使用 **/
grid-template-columns: 150px 1fr 2fr;
/** 中间列自适应 **/
grid-template-columns: 100px auto 100px;
/** repeat() 方法实现重复平铺功能 **/
grid-template-columns: repeat(3, 33.33%);
/** 列宽不小于100px，不大于1fr **/
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

网格线命名：

```css
.container {
  display: grid;
  grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
/** 注意网格线可以有多个名字： [fifth-line row-5] **/
```

#### `grid-row-gap` `grid-column-gap` `grid-gap` 行列间距

> 最新标准中 `grid-` 已删除，改为 `row-gap` `column-gap` `gap`

- `grid-column-gap` 行间距
- `grid-row-gap` 列间距

- `grid-gap` 行列间距；它是上面属性的合写
  - `grid-gap: <grid-row-gap> <grid-column-gap>;`

```css
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```

#### `grid-template-areas` 区域命名

- `grid-template-areas` 定义区域
  - 此属性用字符串表示命名；有一些特别规范见示例

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i";
}
```

```css
/** 区域可合写 **/
grid-template-areas:
  "a a a"
  "b b b"
  "c c c";
grid-template-areas:
  "header header header"
  "main main sidebar"
  "footer footer footer";
/** 不需要的可用 . 表示 **/
grid-template-areas:
  "a . c"
  "d . f"
  "g . i";
```

这里请注意，区域命名会影响网格线：起始网格线会自动命名 `区域名-start` ；终止网格线会自动命名 `区域名-end`

#### `grid-auto-flow` 设置行列放置顺序

- `grid-auto-flow` 设置子元素放置顺序
  - `row` 默认，先行后列
  - `column` 先列后行
  - `row dense` 某些情况有元素固定排序，会出空位；此属性规定后续元素先占空位
  - `column dense` 同上，自己揣摩

> `dense` 表示强制剩下元素从第一个还未排的单元格开始

```css
grid-auto-flow: column;
```

#### `justify-items` `align-items` `place-items` 子元素对齐方式

- `justify-items` 水平方向
- `align-items` 垂直方向

  - `start` 对齐单元格的起始边缘
  - `end` 对齐单元格的结束边缘
  - `center` 单元格内部居中
  - `stretch` 默认；拉伸，占满单元格的整个宽度

- `place-items` 对齐方式合写
  - `place-items: <align-items> <justify-items>;`

```css
justify-items: start;
align-items: start;
place-items: start end;
```

#### `justify-content` `align-content` `place-content` 区域对齐方式

- `justify-content` 水平方向
- `align-content` 垂直方向

  - `start` 对齐容器的起始边框
  - `end` 对齐容器的结束边框
  - `center` 容器内部居中
  - `stretch` 默认；拉伸占据整个网格容器
  - `space-around` 每个项目两侧的间隔相等；项目之间的间隔比项目与容器边框的间隔大一倍
  - `space-between` 项目与项目的间隔相等；项目与容器边框之间没有间隔
  - `space-evenly` 项目与项目的间隔相等；项目与容器边框之间也是同样长度的间隔

- `place-content` 对齐方式合写
  - `place-content: <align-content> <justify-content>`

```css
justify-content: start;
align-content: start;
place-content: space-around space-evenly;
```

#### `grid-auto-columns` `grid-auto-rows` 多余网格行列宽高

默认遵从单元格内容的大小，决定新增网格的列宽和行高

> 用来弥补当元素放的位置超出 grid 时，在外部虚拟生成行/列的大小值

- `grid-auto-columns` 列宽
- `grid-auto-rows` 行高

取值：

- `px`
- `%`
- `fr` fraction 的缩写，意为"片段"
- `auto` 自动长度

```css
grid-auto-columns: 50px;
```

#### `grid-template`

> 合写，不建议使用

- `grid-template`
  - `grid-template-columns` `grid-template-rows` 和 `grid-template-areas` 这三个属性的合并简写形式

#### `grid`

> 合写，不建议使用

`grid` 属性是 `grid-template-rows` 、 `grid-template-columns` 、 `grid-template-areas` 、 `grid-auto-rows` 、 `grid-auto-columns` 、 `grid-auto-flow` 这六个属性的合并简写形式

## 子项目（item）

### 项目（元素）基础

- **子元素**的 `float` `clear` `display: inline-block` `display: table-cell` `vertical-align` `column-*` 等属性会失效
- 二级子元素和 grid 没关系

### 项目（元素）容器属性

#### `grid-column-start` `grid-column-end` `grid-row-start` `grid-row-end` 定义项目位置

- `grid-column-start` 左边框所在的垂直网格线
- `grid-column-end` 右边框所在的垂直网格线
- `grid-row-start` 上边框所在的水平网格线
- `grid-row-end` 下边框所在的水平网格线

```css
/** 指定项目一左边框是第二根垂直网格线，右边框是第四根垂直网格线 **/
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
```

```css
/* 除了默认数字序号，还可以使用命名 */
grid-column-start: header-start;
/* 也可以使用 span 表示跨越了多少个网格；而不指定线 */
grid-column-start: span 2; /** 此时 end 也是这个效果 **/
```

> 注意，如果产生了项目的重叠，则使用 `z-index` 属性指定项目的重叠顺序

#### `grid-column` `grid-row` 项目位置简写

- `grid-column`
  - `grid-column: <start-line> / <end-line>;`
- `grid-row`
  - `grid-row: <start-line> / <end-line>;`

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/** 等同于 **/
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

```css
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/** 等同于 **/
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

#### `grid-area` 项目所处区域

- `grid-area` 规定项目所处区域
  - 可使用区域名
  - 还可以做 `grid-row-start` 、 `grid-column-start` 、 `grid-row-end` 、 `grid-column-end` 合写： `grid-area: <row-start> / <column-start> / <row-end> / <column-end>;`

```css
grid-area: e;
grid-area: 1 / 1 / 3 / 3;
```

#### `justify-self` `align-self` `place-self` 单元格位置

- `justify-self` 水平位置
- `align-self` 垂直位置

  - `start` 对齐单元格的起始边缘
  - `end` 对齐单元格的结束边缘
  - `center` 单元格内部居中
  - `stretch` 默认；拉伸占满单元格的整个宽度

- `place-self` 对齐方式合写
  - `place-self: <align-self> <justify-self>;`

```css
justify-self: start;
align-self: start;
place-self: start end;
```

## css 方法

> 此处详细介绍使用 grid 时的方法

### `repeat()`

- `repeat()` 方法
  - 第一个参数是重复次数
  - 第二个参数是重复值

```
grid-template-columns: repeat(3, 33.33%);
grid-template-columns: repeat(2, 100px 20px 80px);
grid-template-columns: repeat(12, 1fr);
repeat(4, [col-start] minmax(100px, 1fr) [col-end])
/** auto-fill 表示自动（尽可能多的）填充 **/
grid-template-columns: repeat(auto-fill, 100px);
```

### `minmax()`

> `minmax( [ <length> | <percentage> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )`

- `minmax()` 方法
  - 第一个参数为最小值
  - 第二个参数为最大值

```
/** 列宽不小于100px，不大于1fr **/
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```
