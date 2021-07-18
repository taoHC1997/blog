# js 内置对象 Boolean

## 基础使用

```js
Boolean(0); // false
Boolean(undefined); // false
Boolean(null); // false
Boolean(NaN); // false
Boolean(""); // false
Boolean(new Boolean(false)); // true
// 注意 !! 和 Boolean 效果一致
!!"foo"; // true
!!""; // false
!!"0"; // true
!!"1"; // true
!!"-1"; // true
!!{}; // true
!!true; // true
```

特别说明一点：

```js
var flag = new Boolean(false);
var result = flag && true; // true
// 原因在于：
// 对象&&true	结果 true
// true&&对象	结果是对象
```
