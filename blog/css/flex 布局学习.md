# flex 布局学习

> Flex 是 Flexible Box 的缩写，意为"弹性布局"。

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout
- 练习游戏
  - https://flexboxfroggy.com/#zh-cn
  - https://github.com/thomaspark/flexboxfroggy
- 辅助参考
  - https://codepen.io/enxaneta/pen/adLPwv
  - http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

## 容器（flex container）

### 容器基础

- 所有容器均可设置为 Flex
  ```css
  .box {
    /** 有兼容性问题 **/
    display: -webkit-flex;
    display: flex;
  }
  .box {
    display: inline-flex;
  }
  ```
- 容器有两根轴
  - 水平的主轴（`main axis：[main start - main end]`）默认
  - 垂直的交叉轴（`cross axis：[cross start - cross end]`）

### 容器属性

#### `flex-direction` 主轴方向

- `flex-direction` 确定主轴方向
  - `row` 默认，水平轴，从左至右
  - `row-reverse` 水平轴，从右至左
  - `column` 垂直轴，从上至下
  - `column-reverse` 垂直轴，从下至上

#### `flex-wrap` 换行

> 默认项目是排一条线的

- `flex-wrap` 换行设置
  - `nowrap` 默认，不换行
  - `wrap` 第一行在上方
  - `wrap-reverse` 第一行在下方

#### `flex-flow` 主轴设置合写

- `flex-flow` 合写 `flex-direction` 和 `flex-wrap`
  - `row nowrap` 默认
  - 其他值见上面

```css
.box {
  flex-flow: row nowrap;
}
```

#### `justify-content` 主轴对齐

- `justify-content` 规定项目在主轴对齐方式（水平轴方向）
  - `flex-start` 左对齐
  - `flex-end` 右对齐
  - `center` 居中对齐
  - `space-between` 两端对齐，元素间隔相等
  - `space-around` 元素两端间隔相等

#### `align-items` 交叉轴对齐

- `align-items` 规定项目在交叉轴对齐方式（垂直轴方向）
  - `flex-start` 顶端对齐
  - `flex-end` 底端对齐
  - `center` 垂直居中对齐
  - `stretch` 默认，元素未设置高度或者高度自动的情况则占满
  - `baseline` 第一行文字基线对齐

#### `align-content` 多轴对齐

> 这里不懂可以看看 `justify-content` 和 `align-items` 。

- `align-content` 多轴线下的对齐方式（针对一行情况无效）
  - `flex-start` 两轴按起点对齐（左上角）
  - `flex-end` 两轴按终点对齐（右下角）
  - `center` 左右居中，垂直居中
  - `space-between` 两端对齐，间隔平均分布
  - `space-around` 每个元素间隔相等（垂直和左右分开计算）
  - `stretch` 默认，垂直会有一个占满效果（见 `align-items`）

## 子项目（flex item）

### 项目（元素）基础

- **子元素**的 `float` `clear` `vertical-align` 等属性会失效

### 项目（元素）容器属性

#### `order` 排列顺序优先级

- 此项目优先级（越小越前，默认为 `0` ，可以设置负数）
  ```css
  .item {
    order: 1;
  }
  ```

#### `flex-grow` 放大比例

- 此项目放大比例（存在剩余空间时动态计算，默认为 `0` ：表示存在剩余空间也不放大）
  ```css
  /** 此时 item2 的空间比 item1 多一倍 **/
  .item1 {
    flex-grow: 1;
  }
  .item2 {
    flex-grow: 2;
  }
  ```
  > 此处分的是除内容外的空间

#### `flex-shrink` 缩放比例

- 此项目缩放比例（没有空间时动态计算，默认为 `1` ：表示没有空间也不缩小）
  ```css
  /** 如果其他设置为 1 ，那么空间不足时其他元素等比缩放，此元素不变 **/
  .item {
    flex-shrink: 0;
  }
  ```

#### `flex-basis` 项目占主轴空间

- 此项目占据的主轴空间（浏览器根据此值计算）
  - 默认 `auto` ，项目本来大小
  - 还可以设置 `10px` 等值

#### `flex` 合写

注意：优先使用此属性设置。分开设置可能有达不到预期的情况。

> `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`

- `flex` 合写 `flex-grow` 和 `flex-shrink` 和 `flex-basis`
  - 默认 `0 1 auto`
  - 后两个值可选
  - 有特殊值 `auto` 表示 `1 1 auto`
  - 有特殊值 `none` 表示 `0 0 auto`

#### `align-self` 单独设置项目对齐

- 设置此项目单独的对齐方式（覆盖父容器设置的对齐方式）
  - `auto` 默认，表示继承父容器设置，没有父容器则等同 `stretch`
  - `flex-start` 顶端对齐
  - `flex-end` 底端对齐
  - `center` 垂直居中对齐
  - `stretch` 元素未设置高度或者高度自动的情况则占满
  - `baseline` 第一行文字基线对齐
