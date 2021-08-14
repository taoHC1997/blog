# css 动画

> css 目前有两种方式得到动画效果

## 过渡属性 `transition`

> 可以在一个网站看能够实现的效果：https://leaverou.github.io/animatable/

### 基础使用

过渡属性利用 `transition` 关键字；参数详见使用分解章节

```css
img {
  height: 15px;
  width: 15px;
}
img:hover {
  height: 450px;
  width: 450px;
}
```

上面代码不加过渡属性，转换会直接转，不是动画。

```css
/* 此时整体变化只需 1s */
img {
  transition: 1s;
}
```

```css
/* 此时高度会在 1s 转换，宽度瞬间转换 */
img {
  transition: 1s height;
}
```

```css
/* 此时高度对应 1s ；宽度也是 */
img {
  transition: 1s height, 1s width;
}
```

注意，可以通过添加 class 来实现动画

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: #555;
    transition: width 1s, height 3s, background-color 1s;
  }
  div.on {
    width: 450px;
    height: 450px;
    background-color: #955;
  }
</style>
<div></div>
<script>
  $.('div').hover(function() {
    $('div').addClass('on');
  },function(){
    $('div').removeClass('on');
  });
</script>
```

### 延时

对于 `transition` 属性，有一个 transition-delay 的设定：

```css
/* 此时高度转换 1s；宽度在 1s 后转换，用 1s */
img {
  transition: 1s height, 1s 1s width;
}
```

### 速度曲线

最后，`transition` 属性有一个 transition-timing-function 设置速度曲线：

- ease ：逐渐变慢，**默认值**
- linear ：匀速
- ease-in ：加速
- ease-out ：减速
- cubic-bezier 函数 ：自定义速度模式
  曲线设置网站： https://cubic-bezier.com/#0,0,1,1

```css
/* 此时为匀速 */
img {
  transition: 1s linear;
}
```

```css
/* 这个实现一个最后阶段放大过度、然后回缩的效果 */
img {
  transition: 1s height cubic-bezier(0.83, 0.97, 0.05, 1.44);
}
```

### 使用分解

当然，这些属性可以拆开写：

```css
img {
  /* 规定那个属性过渡 */
  transition-property: height;
  /* 规定过渡时间，默认 0 */
  transition-duration: 1s;
  /* 固定过渡延时时间，默认 0 */
  transition-delay: 1s;
  /* 规定过渡速度效果，默认 ease */
  transition-timing-function: ease;
}
```

### 局限

- transition 需要事件触发，所以没法在网页加载时自动发生。

- transition 是一次性的，不能重复发生，除非一再触发。

- transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

- 一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

## 关键帧动画 CSS Animation `keyframes`

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation

### 基础使用

一般分为**动画使用**和**动画声明**两部分。

```css
/* 使用部分 */
div:hover {
  animation: 1s rainbow;
}
/* 定义部分 */
@keyframes rainbow {
  0% {
    background: #c00;
  }
  50% {
    background: orange;
  }
  100% {
    background: yellowgreen;
  }
}
```

### 动画使用技巧

> 注意，此使用技巧可能对浏览器来说可能支持不好。

注意，对应 `transition` 的一些设置， `animation` 通用。

- 设置次数
  ```css
  /* 3次 */
  div:hover {
    animation: 1s rainbow 3;
  }
  ```
- 无限次播放 `infinite`
  ```css
  div:hover {
    animation: 1s rainbow infinite;
  }
  ```
- 结束后保留为开始状态，**默认** `none`
  ```css
  div:hover {
    animation: 1s rainbow none;
  }
  ```
- 结束后保留为结束状态 `forwards`
  ```css
  /*  默认动画后会处于开始状态 */
  div:hover {
    animation: 1s rainbow forwards;
  }
  ```
- 动画会到第一帧状态 `backwards`
- 轮流应用 `forwards` 和 `backwards` 规则 `both`
- 每次动画从第一帧都最后一帧 `normal`
  ```css
  div:hover {
    animation: 1s rainbow 3 normal;
  }
  ```
- 每次动画从第一到最后到第一... `alternate`
  ```css
  div:hover {
    animation: 1s rainbow 3 alternate;
  }
  ```
- 每次动画从最后到第一 `reverse`
  ```css
  div:hover {
    animation: 1s rainbow 3 alternate;
  }
  ```
- 每次动画从最后到第一到最后... `alternate-reverse`
  ```css
  div:hover {
    animation: 1s rainbow 3 alternate-reverse;
  }
  ```
- 除了速度曲线外，还有一个分步曲线 `steps()`
  ```css
  div:hover {
    animation: 1s rainbow infinite steps(10);
  }
  ```
- 设置动画突然中止时的表现 `animation-play-state` 属性
  ```css
  /* 设置鼠标悬停时动画继续，否则中止 */
  div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
  }
  div:hover {
    animation-play-state: running;
  }
  ```

#### `animation-iteration-count:steps(10, start)`

> `steps` 函数表示无渐变纯跳步**帧动画**

- 第一个参数，表示动画被分几次
- 第二个参数可选，表示每段动画终点位置
  - `start`
  - `end`

### 使用拆解

```css
div:hover {
  /* 动画名称 */
  animation-name: rainbow;
  /* 动画周期时间，默认 0 */
  animation-duration: 1s;
  /* 动画速度曲线，默认 ease */
  animation-timing-function: linear;
  /* 动画延时时间，默认 0 */
  animation-delay: 1s;
  /* 动画时间之外的状况 */
  animation-fill-mode: forwards;
  /* 动画是否逆向，默认 normal */
  animation-direction: normal;
  /* 动画播放次数，默认 1 */
  animation-iteration-count: 3;
  /* 动画是否运行或暂停，默认 running */
  animation-play-state: running;
}
```

### 动画声明技巧

```css
@keyframes rainbow {
  0% {
    background: #c00;
  }
  50% {
    background: orange;
  }
  100% {
    background: #0c2;
  }
}
```

0% 和 from ； 100% 和 to ；是同一个东西。

```css
@keyframes rainbow {
  from {
    background: #c00;
  }
  50% {
    background: orange;
  }
  to {
    background: #0c2;
  }
}
```

如果省略一些状态，浏览器会自动推算。

状态也可以写在一行。

```css
@keyframes rainbow {
  to {
    background: #0c2;
  }
}
@keyframes pound {
  from，to {
    transform: none;
  }
  50% {
    transform: scale(1.2);
  }
}
```

## 附录

### 优化

#### `will-change`

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change

```css
.app-menu {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  transition: transform 300ms linear;
  /* 标注经常变化的属性 */
  will-change: transform;
}
```

### 兼容

为了维护兼容性，请使用前缀：

```css
transition
-webkit-transition
-moz-transition
-o-transition
```

```css
animation
-webkit-animation
-moz-animation
-o-animation
```
