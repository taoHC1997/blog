# css 常用单位

## 长度

### 绝对单位

> 换算： `1in = 2.54cm = 25.4 mm = 101.6q = 72pt = 6pc = 96px`

#### `px`

早期页面设计使用 `px` 为单位；表示像素

#### `cm`

`cm` 表示厘米

#### `mm`

`mm` 表示毫米

#### `q`

`q` 表示 1/4 毫米

#### `in`

`in` 表示英寸

#### `pt`

`pt` 表示点

#### `pc`

`pc` 表示派卡

### 相对单位

#### `em`

> 主要用来设置文本大小

因为 `px` 为单位时放大缩小效果功能达不到预期效果；此时使用 `em` 单位；此单位相对于其**父元素**的 `font-size`

```css
body {
  /* 默认字体大小为 16px */
  font-size: 62.5%; /*10 ÷ 16 × 100% = 62.5%*/
}
h1 {
  font-size: 2.4em; /*2.4 × 10px = 24px */
}
p {
  font-size: 1.4em; /*1.4 × 10px = 14px */
}
/* 这里根据父元素计算，故不确定 */
li {
  font-size: 1.4em; /*1.4 × ? = 14px ? */
}
```

> `em` 是一个相对值；有计算公式： `1 ÷ 父元素的font-size × 需要转换的像素值 = em值`

#### `ex`

`ex` 即相对于 x 的高度；通常为字体高度的一半。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

#### `rem`

在 CSS3 中，特地引入 `rem` 单位；此单位相对于其**根元素** `root element` ，是 `font-size` 计算值的倍数

```css
html {
  font-size: 62.5%; /*10 ÷ 16 × 100% = 62.5%*/
}
body {
  font-size: 1.4rem; /*1.4 × 10px = 14px */
}
h1 {
  font-size: 2.4rem; /*2.4 × 10px = 24px*/
}
```

#### `vw`

`vw` 即相对于**视口**的宽度。视口被均分为 100 单位的 `vw`

#### `vh`

`vh` 即相对于**视口**的宽度。视口被均分为 100 单位的 `vh`

#### `vmax`

`vmax` 即相对于**视口的宽度或高度中较大的那个**。其中最大的那个被均分为 100 单位的`vmax`

#### `vmin`

`vmin` 相对于**视口的宽度或高度中较小的那个**。其中最小的那个被均分为 100 单位的 `vmin`

#### `ch`

`ch` 表示数字 0 的宽度

## 角度单位

> 换算关系： `90deg = 100grad = 0.25turn ≈ 1.570796326794897rad`

## `deg`

`deg` 度（Degress）。一个圆共 360 度

## `grad`

`grad` 梯度（Gradians）。一个圆共 400 梯度

## `rad`

`rad` 弧度（Radians）。一个圆共 2π 弧度

## `turn`

`turn` 转。这里 `1turn = 1圈 = 360deg = 400grad = 2π`

## 颜色单位

### HEX

HEX ： `#RRGGBB` 或 `#RGB`

- RR：红色值。十六进制正整数
- GG：绿色值。十六进制正整数
- BB：蓝色值。十六进制正整数

### RGBA

RGBA(R,G,B,A)：(A 可有可无)

- R：红色值。正整数 | 百分数
- G：绿色值。正整数 | 百分数
- B：蓝色值。正整数 | 百分数
- A：Alpha 透明度。取值 0~1 之间

### HSLA

HSLA(H,S,L,A)：(A 可有可无)

- H：Hue (色调)。0 (或 360 )表示红色， 120 表示绿色， 240 表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
- S：Saturation (饱和度)。取值为：0.0% - 100.0%
- L：Lightness (亮度)。取值为：0.0% - 100.0%
- A：Alpha 透明度。取值 0~1 之间

### 颜色关键字

- `background: transparent;`
  `transparent` 关键字相当于 `rgba(0,0,0,0)` ，但是作为背景时，与 `opacity:0;` 有区别
  ```css
  p {
    /* 仅背景透明 */
    background: transparent;
  }
  /* 不同 */
  p {
    /* 连带内容透明 */
    opacity: 0;
  }
  ```
- `background: currentColor;`
  表示当前元素 color 的值
  ```css
  div {
    color: #f60;
  }
  div > p {
    /* 继承为 #f60 */
    background: currentColor;
  }
  ```
