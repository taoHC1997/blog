# DeviceMotionEvent 学习（检测陀螺仪摇动）

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent

> 注意该功能为实验性功能

## 基础介绍

html5 有新增事件 `DeviceMotionEvent` 辅助实现网页摇一摇，这里配合有几个信息可以使用：

- `deviceorientation` 提供设备的物理方向信息，表示为一系列本地坐标系的旋角
- `devicemotion` 提供设备的加速信息，表示为定义在设备上的坐标系中的卡尔迪坐标；还提供了设备在坐标系中的自转速率
- `compassneedscalibration` 用于通知 Web 站点使用罗盘信息校准上述事件

> 信息从陀螺仪、加速器和磁力仪（罗盘）获取

## 使用示例

### 兼容检查

```js
if ((window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  document.getElementById("dmEvent").innerHTML = "不支持！！！"
}
```

### 重力加速度获取

```js
var acceleration = eventData.accelerationIncludingGravity;
```

### 摇一摇示例

#### 示例一

```js
var SHAKE_THRESHOLD = 800;
var last_update = 0;
var x, y, z, last_x, last_y, last_z;
function deviceMotionHandler(eventData) {
  var acceleration = eventData.accelerationIncludingGravity;
  var curTime = new Date().getTime();
  if (curTime - last_update > 300) {
    var diffTime = curTime - last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var speed =
      (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
    if (speed > SHAKE_THRESHOLD) {
      alert("shaked!");
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}
```

#### 示例二

```js
function deviceMotionHandler(eventData) {
  // 捕捉重力加速度
  var acceleration = eventData.accelerationIncludingGravity;
  // 打印加速数据
  var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " +Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";
// Z轴,可知设备朝上或者朝下
  var facingUp = -1;
  if (acceleration.z &gt; 0) {
    facingUp = +1;
  }
  // 根据重力通过 acceleration.x|y 转换得到加速值,
  // 运用重力加速度9.81来计算得到一个百分比然后乘以转换角度90
  var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
  var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
  // 打印加速度的计算结果
  document.getElementById("moAccel").innerHTML = rawAcceleration;
  document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
  document.getElementById("moCalcTiltFB").innerHTML = tiltFB;
  // 将2D和3D的转换应用到图片上
  var rotation = "rotate(" + tiltLR + "deg) (1,0,0, " + (tiltFB) + "deg)";
  document.getElementById("imgLogo").style.webkitTransform = rotation;
}
```
