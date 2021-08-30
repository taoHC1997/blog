# svg 学习

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/SVG
- 元素： https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element
- 属性： https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute
- 教程： https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial

SVG 即可缩放矢量图形（Scalable Vector Graphics，SVG）

## 基础介绍

```html
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="red" />
  <circle cx="150" cy="100" r="80" fill="green" />
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">
    SVG
  </text>
</svg>
```

SVG 就是 html 上的矢量图，它具备 DOM 的接口，在 `<svg>` 根内可写多个元素，这些元素后来居上

## 简单元素使用

> 此处介绍一些简单的样式元素，部分通用属性不予介绍

### `<path>` 基础路径

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <path
    d="M50 100L200 200L100 100ZM300 100L300 300"
    stroke="black"
    stroke-width="5"
    fill="none"
  ></path>
  <path d="M50 100H200V200" stroke="black" stroke-width="5" fill="none"></path>
</svg>
```

属性介绍：

- `d` 路径
  - `M L Z` M 代表线条的开始， L 代表线条或者折线的下一个点， Z 代表连接到第一个点自动闭合
  - `H V` 水平绘制、垂直绘制，值代表坐标
- ``
- ``

### `<g>` 多基本图形共享属性设置

> 可以包含多个基本图形，它只可以设置所有图形共享的属性

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <g style="cursor:pointer">
    <circle
      cx="200"
      cy="200"
      r="50"
      fill="transparent"
      stroke="red"
      stroke-width="5"
    ></circle>
    <text x="200" y="208" font-size="20" text-anchor="middle">科鲁兹</text>
  </g>
</svg>
```

### `<line>` 线

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <line
    x1="50"
    y1="50"
    x2="200"
    y2="300"
    stroke="black"
    stroke-width="5"
    stroke-opacity="0.5"
  ></line>
</svg>
```

属性介绍：

- `x1` `y1` `x2` `y2`

### `<polyline>` 折线

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <polyline
    points="50 50 200 300 230 300 250 200"
    fill="none"
    stroke="black"
    stroke-width="5"
  ></polyline>
</svg>
```

属性介绍：

- `points` 每两个数字确定一个坐标点

### `<rect>` 矩形

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect width="200" height="200" x="100" y="100" fill="red" rx="30"></rect>
</svg>
```

属性介绍：

- `rx` 矩形的圆角 x 轴半径值
- `ry` 矩形的圆角 y 轴半径值

### `<polygon>` 多边形

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <polygon
    points="50,50,200,300,230,300,250,200"
    fill="none"
    stroke="black"
    stroke-width="5"
  ></polygon>
</svg>
```

属性介绍：

- `points` 每两个数字确定一个坐标点

### `<circle>` 圆

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <circle
    cx="100"
    cy="100"
    r="40"
    fill="transparent"
    stroke="black"
    stroke-width="5"
  ></circle>
  <circle
    cx="100"
    cy="100"
    r="40"
    style="fill:white;stroke:black;stroke-width:5;"
  ></circle>
</svg>
```

属性介绍：

- `cx` 圆心的 x 轴坐标
- `cy` 圆心的 y 轴坐标
- `r` 半径

### `<text>` 文本

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <text x="200" y="208" font-size="20" text-anchor="middle">科鲁兹</text>
</svg>
```

### `<image>` 图片

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <image
    x="150"
    y="149"
    width="100"
    height="103"
    xlink:href="img/main.png"
  ></image>
</svg>
```

### `<animate>` 动画

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <animate attributeName="width" dur="1" from="50" to="200"></animate>
</svg>
```

## 通用属性介绍

> 下面介绍一些常见的属性

// TODO

- `style` 样式设置
- `fill` 填充颜色
- `stroke` 边框颜色
- `stroke-width` 边框宽度
- `stroke-opacity` 边框透明度
- `text-anchor` 文字锚点；默认 start ，可以是 middle 、 start 、 end
