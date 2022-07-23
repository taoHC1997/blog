# css 图像处理学习

> TODO: 这方面有很多东西，加之兼容方面还不普遍，以后再记录吧

## 滤镜

### `filter`

文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter

```css
.test {
  /* URL to SVG filter */
  filter: url("filters.svg#filter-id");
  /* 滤镜函数，总共十个 */
  filter: blur(5px); /* 模糊 */
  filter: brightness(0.4); /* 亮度 */
  filter: contrast(200%); /* 对比度 */
  filter: drop-shadow(
    16px 16px 20px blue
  ); /* 阴影； X 轴与 Y 轴的偏移、模糊半径以及颜色 */
  filter: grayscale(50%); /* 灰度 */
  filter: hue-rotate(90deg); /* 色相旋转 */
  filter: invert(75%); /* 反色 */
  filter: opacity(25%); /* 透明，取值 0~1 */
  filter: saturate(30%); /* 饱和度 */
  filter: sepia(60%); /* 褐色 */
  /* 多滤镜 */
  filter: contrast(175%) brightness(3%);
  /* Use no filter */
  filter: none;
  /* Global values */
  filter: inherit;
  filter: initial;
  filter: unset;
}
```

### svg 滤镜

> `<svg>` 博大精深，此处仅记录一例

下面给一个模糊滤镜的示例：

```html
<svg height="0" xmlns="http://www.w3.org/2000/svg">
  <filter id="blur" x="-5%" y="-5%" width="110%" height="110%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
  </filter>
</svg>
```

```css
div {
  filter: url(./filter.svg#blur);
}
```

## 图片合成

### 元素混合

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode
- 取值： https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode

```css
.test {
  mix-blend-mode: normal;
  mix-blend-mode: multiply;
  mix-blend-mode: screen;
  mix-blend-mode: overlay;
  mix-blend-mode: darken;
  mix-blend-mode: lighten;
  mix-blend-mode: color-dodge
  mix-blend-mode: color-burn;
  mix-blend-mode: hard-light;
  mix-blend-mode: soft-light;
  mix-blend-mode: difference;
  mix-blend-mode: exclusion;
  mix-blend-mode: hue;
  mix-blend-mode: saturation;
  mix-blend-mode: color;
  mix-blend-mode: luminosity;
  mix-blend-mode: initial;
  mix-blend-mode: inherit;
  mix-blend-mode: unset;
}
```

使用：

```html
<style>
  div {
    background: linear-gradient(
      to right,
      rgb(48, 129, 242) 10%,
      rgb(255, 204, 0) 66%,
      rgb(255, 102, 0)
    );
  }
  img {
    mix-blend-mode: darken;
  }
</style>
<div>
  <img src="./avatar.png" />
</div>
```

### 背景混合

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode
- 取值： https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode

```css
.test {
  /* 单值 */
  background-blend-mode: normal;
  /* 双值，每个背景一个值 */
  background-blend-mode: darken, luminosity;
  background-blend-mode: initial;
  background-blend-mode: inherit;
  background-blend-mode: unset;
}
```

使用：

```html
<style>
  div {
    background: url(./avatar.png) no-repeat center, url(./lake.png);
    background-size: 40% 40%, cover;
    background-blend-mode: lighten;
  }
  .color {
    background-color: #f60;
  }
</style>
<div></div>
<div class="color"></div>
```

### 隔离

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation
- 取值： https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode

```css
.test {
  isolation: auto;
  isolation: isolate;
  isolation: initial;
  isolation: inherit;
  isolation: unset;
}
```

> 注意， `isolation` 属性需要声明到某个容器元素中，并且不能和混合模式存在于同一个元素上

使用：

```html
<style>
  section {
    background: linear-gradient(to right, #3081f2 10%, #fc0 66%, #f60);
  }
  .blend {
    mix-blend-mode: lighten;
  }
  .isolation {
    isolation: isolate;
  }
</style>
<section>
  <div>
    <img src="./avatar.png" class="blend" />
  </div>
</section>
<section>
  <div class="isolation">
    <img src="./avatar.png" class="blend" />
  </div>
</section>
```

## 裁剪

> css2.1 有一个 `clip` ，已废弃

### `clip-path`

文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path

```css
.test {
  /* Keyword values */
  clip-path: none;
  /* <clip-source> values */
  clip-path: url(resources.svg#c1);
  /* <geometry-box> values */
  clip-path: margin-box;
  clip-path: border-box;
  clip-path: padding-box;
  clip-path: content-box;
  clip-path: fill-box;
  clip-path: stroke-box;
  clip-path: view-box;
  /* <basic-shape> values */
  clip-path: inset(100px 50px);
  clip-path: circle(50px at 0 100px);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  clip-path: path(
    "M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z"
  );
  /* Box and shape values combined */
  clip-path: padding-box circle(50px at 0 100px);
  /* Global values */
  clip-path: inherit;
  clip-path: initial;
  clip-path: unset;
}
```

### svg 裁剪

此处仅记录一例：

```html
<svg height="0" width="0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cross">
      <rect y="110" x="137" width="90" height="90" />
      <rect x="0" y="110" width="90" height="90" />
      <rect x="137" y="0" width="90" height="90" />
      <rect x="0" y="0" width="90" height="90" />
    </clipPath>
  </defs>
</svg>
```

```css
/* 外部引用，兼容性差 */
.url-cross {
  clip-path: url(./shapes.svg#cross);
}
/* 行内引用，注意标 id */
.inline-cross {
  clip-path: url(#cross);
}
```

## 遮罩

### 蒙版

蒙版（masking）与裁剪类似，也是让元素以某种形状显示，但蒙版能根据透明度和灰度值计算裁剪边缘，并且有更多的蒙版属性可供选择，例如定位、尺寸、填充方式等

文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask

使用：

```html
<style>
  .lake {
    background: url(./lake.png);
  }
  .star {
    background: url(./star-shadow.png);
    background-position: center;
    background-repeat: no-repeat;
  }
  .star-mask {
    mask-image: url(./star-shadow.png);
    mask-position: center;
    mask-repeat: no-repeat;
  }
</style>
<div class="lake"></div>
<div class="star"></div>
<div class="lake star-mask"></div>
```
