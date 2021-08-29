# navigation.geolocation 学习（地理位置）

- 文档：
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
  - https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API

> 这里仅做简单介绍
	
## 基础使用

```js
if ("geolocation" in navigator) {
  var options = {
    // 是否高精度
    enableHighAccuracy: true,
    // 超时时间
    timeout: 5000,
    // 数据过期时间
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
    },
    function (error) {
      console.log(error);
    },
    options
  );
}
```

对于 `position` 对象，有（部分 api 配合监视器使用）：

- `timestamp` 获取地理位置信息时的时间戳
- `coords.latitude` 纬度
- `coords.longitude` 经度
- `coords.altitude` 海拔高度
- `coords.accuracy` 获取经度纬度（米）
- `coords.altitudeAccurancy` 获取海拔（米）
- `coords.heading` 设备朝向
- `coords.speed` 前进速度

还有监视器：

- `Geolocation.watchPosition()` 创建监视器；参数同 `getCurrentPosition` ，返回监视器 id
- `Geolocation.clearWatch()` 取消监视器
