# canvas 学习

- https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial
- https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

> canvas 主要用来辅助动画实现

## 基础介绍

所谓动画，本质上是一帧一帧图片，在 canvas 中，一帧即：

1. 清空 canvas
   除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 clearRect 方法。
2. 保存 canvas 状态
   如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
3. 绘制动画图形（animated shapes）
   这一步才是重绘动画帧。
4. 恢复 canvas 状态
   如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

canvas 没有动画相关的 api ，一般实现动画使用系统的定时 api ：

- `window.setInterval(function, delay)`
  设置间隔，函数定期循环执行
- `window.setTimeout(function, delay)`
  设置时间，函数定时执行一次
- `window.requestAnimationFrame(callback)`
  告诉浏览器你希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画，一般采用此方法实现动画

> 动画没有特有 api ，故下方给出一些简单动画示例

> // TODO : 研究动画函数

## 动画示例

### 时钟

```js
function clock() {
  // 获取时间
  var now = new Date();
  // 获取画布
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.save();
  // 设置时钟刻度样式
  // 清除画布
  ctx.clearRect(0, 0, 150, 150);
  // 中心移动到表心
  ctx.translate(75, 75);
  // 设置缩放
  ctx.scale(0.4, 0.4);
  // 坐标旋转
  ctx.rotate(-Math.PI / 2);
  // 边设置黑色
  ctx.strokeStyle = "black";
  // 填充设置白色
  ctx.fillStyle = "white";
  // 设置线宽，画时钟刻度
  ctx.lineWidth = 8;
  // 刻度设置线端点圆形
  ctx.lineCap = "round";
  // 画时钟刻度
  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();
  // 画分钟刻度，其样式除线宽为默认样式
  ctx.save();
  ctx.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();
  // 此处得到时间数值
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;
  ctx.fillStyle = "black";
  // 画时针
  ctx.save();
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();
  // 画分针
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();
  // 画秒针
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  // 画秒针头部
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.restore();
  // 下一帧
  window.requestAnimationFrame(clock);
}
// 起始帧
window.requestAnimationFrame(clock);
```

### 小球动画

#### 简单小球绘制

```js
// 简单绘制一个小球
var ctx = document.getElementById("canvas").getContext("2d");
var ball = {
  // 起始坐标
  x: 100,
  y: 100,
  // 半径
  radius: 25,
  // 颜色
  color: "#f0f012",
  draw: function () {
    ctx.beginPath();
    // 画球的边界
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
ball.draw();
```

#### 小球加上速度

```js
// 绘制小球并加上一个速度
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// 动画状态
var raf;
var ball = {
  x: 100,
  y: 100,
  // 各坐标对应方向速度
  vx: 5,
  vy: 2,
  radius: 25,
  color: "#f0f012",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
// 画布动画函数
function draw() {
  // 下面是清除画布
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 下面是保留小球残影
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  // 设置加速度
  // ball.vy *= 0.98;
  // 控制画布边界行为，到边反转
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  raf = window.requestAnimationFrame(draw);
}
// 动画设置非自动，鼠标覆盖才变换
canvas.addEventListener("mouseover", function (e) {
  raf = window.requestAnimationFrame(draw);
});
canvas.addEventListener("mouseout", function (e) {
  window.cancelAnimationFrame(raf);
});
ball.draw();
```

#### 多球动画

> 球有碰撞体积，这里假设其质量为面积，速度碰撞公式见 https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional

```js
// 画布
var canvas;
var ctx;
var width;
var height;
var hua;
// 球组
var balls = [];
// 动画背景
function Hua(ctx, balls) {
  this.ctx = ctx;
  if (balls instanceof Ball) {
    this.balls = [balls];
  } else {
    this.balls = balls;
  }
}
// 清除上一帧效果（透明背景覆盖）
Hua.prototype.clearDisplay = function () {
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  this.ctx.fillRect(0, 0, width, height);
};
// 画所有球
Hua.prototype.drawBalls = function (balls) {
  for (var ball of balls) {
    if (ball instanceof Ball) {
      this.drawBall(ball);
    }
  }
};
// 画球
Hua.prototype.drawBall = function (ball) {
  this.ctx.beginPath();
  this.ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  this.ctx.closePath();
  this.ctx.fillStyle = ball.color;
  this.ctx.fill();
};
// 动画开始
Hua.prototype.startAnimation = function () {
  this.drawBalls(this.balls);
  this.runAnimation();
};
// 动画
Hua.prototype.runAnimation = function () {
  requestAnimationFrame(this.runAnimation.bind(this));
  balls = this.balls;
  lastId = genID();
  this.balls = balls.map((ball) => {
    return ball.update(balls, lastId);
  });
  this.sync(this.balls);
};
// 下一帧
Hua.prototype.sync = function (balls) {
  this.clearDisplay();
  this.drawBalls(balls);
};
// 球
function Ball(x, y, color, radius, vx, vy) {
  this.id = genID();
  this.color = color ? color : gc();
  this.radius = radius ? radius : gn(8, 30);
  this.position = new Vector(
    x != null ? x : gn(30, width - 30),
    y != null ? y : gn(30, height - 30)
  );
  this.velocity = new Vector(
    vx != null ? vx : gn(-3, 3),
    vy != null ? vy : gn(-3, 3)
  );
  // 球边界区域限制距离（最大和最小）
  this.upperLimit = new Vector(width - this.radius, height - this.radius);
  this.lowerLimit = new Vector(this.radius, this.radius);
  this.collisions = [];
}
// 面积
Ball.prototype.sphereArea = function () {
  return 4 * Math.PI * this.radius ** 2;
};
// 小球计算下一帧情况
Ball.prototype.update = function (balls, lastId) {
  // 清除碰撞检测数组
  if (this.collisions.length > 10) {
    this.collisions = this.collisions.slice(this.collisions.length - 3);
  }
  // 检测碰撞
  for (let ball of balls) {
    // 自己和已检测的跳过
    if (this === ball || this.collisions.includes(ball.id + lastId)) {
      continue;
    }
    // 此球与其他小球距离
    let distance = this.position
      .add(this.velocity)
      .subtract(ball.position.add(ball.velocity))
      .magnitude();
    // 碰撞逻辑
    if (distance <= this.radius + ball.radius) {
      let v1 = collisionVector(this, ball);
      let v2 = collisionVector(ball, this);
      this.velocity = v1;
      ball.velocity = v2;
      this.collisions.push(ball.id + lastId);
      ball.collisions.push(this.id + lastId);
    }
  }
  // 边界检测
  if (
    this.position.x >= this.upperLimit.x ||
    this.position.x <= this.lowerLimit.x
  ) {
    this.velocity.update(-this.velocity.x, this.velocity.y);
  }
  if (
    this.position.y >= this.upperLimit.y ||
    this.position.y <= this.lowerLimit.y
  ) {
    this.velocity.update(this.velocity.x, -this.velocity.y);
  }
  // 最终下一帧确定
  newX = Math.max(
    Math.min(this.position.x + this.velocity.x, this.upperLimit.x),
    this.lowerLimit.x
  );
  newY = Math.max(
    Math.min(this.position.y + this.velocity.y, this.upperLimit.y),
    this.lowerLimit.y
  );
  this.position.update(newX, newY);
  return this;
};
// 速度或者说向量对象
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.update = function (x, y) {
  this.x = x;
  this.y = y;
};
//加
Vector.prototype.add = function (vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};
// 减
Vector.prototype.subtract = function (vector) {
  return new Vector(this.x - vector.x, this.y - vector.y);
};
// 乘
Vector.prototype.multiply = function (scalar) {
  return new Vector(this.x * scalar, this.y * scalar);
};
Vector.prototype.dotProduct = function (vector) {
  return this.x * vector.x + this.y * vector.y;
};
Vector.prototype.magnitude = function () {
  return Math.sqrt(this.x ** 2 + this.y ** 2);
};
Vector.prototype.direction = function () {
  return Math.atan2(this.x, this.y);
};
// 速度碰撞判断，速度公式见 https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional
function collisionVector(t1, t2) {
  return t1.velocity.subtract(
    t1.position
      .subtract(t2.position)
      .multiply(
        t1.velocity
          .subtract(t2.velocity)
          .dotProduct(t1.position.subtract(t2.position)) /
          t1.position.subtract(t2.position).magnitude() ** 2
      )
      .multiply((2 * t2.sphereArea()) / (t1.sphereArea() + t2.sphereArea()))
  );
}
// 随机颜色
function gc() {
  var s = "0123456789ABCDEF";
  var c = "#";
  for (var i = 0; i < 6; i++) {
    c += s[Math.ceil(Math.random() * 15)];
  }
  return c;
}
// 随机数字
function gn(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机 id
function genID() {
  return Number(Math.random().toString().substr(2, 5) + Date.now()).toString(
    36
  );
}
// 起始函数
window.onload = function () {
  canvas = document.getElementById("ex1");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;
  for (var i = 0; i < 10; i++) {
    balls.push(new Ball());
  }
  hua = new Hua(ctx, balls);
  hua.startAnimation();
};
```
