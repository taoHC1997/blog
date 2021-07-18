# js 内置对象 Date

- 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date

## 前置背景知识

- Date 对象是基于 `1970-01-01 08:00:00` 到指定日期的毫秒数，不是 `00:00:00`
  ```js
  var begin = new Date(1970, 0, 1, 0, 0, 0); // -28800000
  begin = new Date(1970, 0, 1, 8, 0, 0); // 0
  ```
- 一天由 86,400,000 毫秒组成

## 对象创建

- 当前时间对象
  ```js
  // 不加 new 会返回字符串而非对象
  var now = new Date();
  ```
- 生成时间对象
  ```js
  // new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
  // 注意 month 0-11 ； day 由 1 开始
  var d = new Date(2020, 1, 1, 11, 11, 11); // 注意月份从 0~11
  // 注意：在 IE 环境下，建议使用 `/` 而不是 `-` ；一定要用就先 `string.replace(/-/g, '/')`
  var d = new Date("2020-01-01 11:11:11");
  var d = new Date("2020/01/01 11:11:11");
  // 英文写法
  var d = new Date("January 20,2017 11:11:05");
  var d = new Date("January 20,2017");
  // 使用时间戳生成对象
  var t = new Date(+1577848271000);
  ```
- 获取时间戳
  ```js
  var unixTimestamp = Date.now(); // 豪秒数
  ```

## 时间对象函数汇总

### `to` 系列

> 注意 `to` 系列需要记一下，其他的函数是直观语义化的。

- `toString`
  默认使用；当前时区时间全部格式： `Sat Feb 01 2020 11:11:11 GMT+0800 (中国标准时间)`
- `toDateString`
  当前时区时间年月日： `Sat Feb 01 2020`
- `toTimeString`
  当前时区时间时分秒及时区： `11:11:11 GMT+0800 (中国标准时间)`
- `toISOString`
  标准化时间格式（ `YYYY-MM-DDTHH:mm:ss.sssZ` ）： `2020-02-01T03:11:11.000Z`
- `toUTCString`
  世界标准时间（世界协调时间）： `Sat, 01 Feb 2020 03:11:11 GMT`
- `toGMTString`
  格林尼治时间，已弃用，返回与世界标准时间一致： `Sat, 01 Feb 2020 03:11:11 GMT`
- `toLocaleString`
  当前本地时间全部格式： `2020/2/1 上午11:11:11`
- `toLocaleDateString`
  当前本地时间年月日： `2020/2/1`
- `toLocaleTimeString`
  当前本地时间时分秒： `上午11:11:11`

### `get` 系列

- `getDate()`
  返回一个月中的某一天 (1 ~ 31)
- `getDay()`
  返回一周中的某一天 (0 ~ 6)
- `getMonth()`
  返回月份 (0 ~ 11) 注意使用加一
- `getFullYear()`
  以四位数字返回年份
- `getYear()`
  请使用 `getFullYear()` 方法代替
- `getHours()`
  返回小时 (0 ~ 23)
- `getMinutes()`
  返回 Date 对象的分钟 (0 ~ 59)
- `getSeconds()`
  返回 Date 对象的秒数 (0 ~ 59)
- `getMilliseconds()`
  返回 Date 对象的毫秒 (0 ~ 999)
- `getTime()`
  返回 1970 年 1 月 1 日至今的毫秒数
- `getTimezoneOffset()`
  返回本地时间与格林威治标准时间 (GMT) 的分钟差
- `getUTCDate()`
  根据世界时返回月中的一天 (1 ~ 31)
- `getUTCDay()`
  根据世界时返回周中的一天 (0 ~ 6) 周日 0 ；周六 6
- `getUTCMonth()`
  根据世界时返回月份 (0 ~ 11)
- `getUTCFullYear()`
  根据世界时返回四位数的年份
- `getUTCHours()`
  根据世界时的小时 (0 ~ 23)
- `getUTCMinutes()`
  根据世界时的分钟 (0 ~ 59)
- `getUTCSeconds()`
  根据世界时的秒钟 (0 ~ 59)
- `getUTCMilliseconds()`
  根据世界时的毫秒 (0 ~ 999)

### `set` 系列

- `setDate()`
  设置 Date 对象中月的某一天 (1 ~ 31)
- `setMonth()`
  设置 Date 对象中月份 (0 ~ 11)
- `setFullYear()`
  设置年份（四位数字）
  ```js
  date.setFullYear(yearValue[, monthValue[, dayValue]]);
  ```
- `setYear()`
  请使用 `setFullYear()` 方法代替
- `setHours()`
  设置小时 (0 ~ 23)
- `setMinutes()`
  设置分钟 (0 ~ 59)
- `setSeconds()`
  设置秒钟 (0 ~ 59)
- `setMilliseconds()`
  设置毫秒 (0 ~ 999)
- `setTime()`
  以毫秒设置 Date 对象
- `setUTCDate()`
  根据世界时设置 Date 对象中月份的一天 (1 ~ 31)
- `setUTCMonth()`
  根据世界时设置月份 (0 ~ 11)
- `setUTCFullYear()`
  根据世界时设置年份（四位数字）
- `setUTCHours()`
  根据世界时设置小时 (0 ~ 23)
- `setUTCMinutes()`
  根据世界时设置分钟 (0 ~ 59)
- `setUTCSeconds()`
  根据世界时设置秒钟 (0 ~ 59)
- `setUTCMilliseconds()`
  根据世界时设置毫秒 (0 ~ 999)

### 其他函数

- `valueOf()`
  获取时间戳

## 使用技巧

### 时间戳技巧

- 当前时间戳
  ```js
  // 以秒为单位请除 1000
  +new Date();
  var timestamp = Date.parse(new Date());
  ```
- 今天 0 点时间戳
  ```js
  var timestamp = new Date().setHours(0, 0, 0, 0);
  ```
- 今天 24 点时间戳
  ```js
  var timestamp = new Date().setHours(24, 0, 0, 0);
  ```
- 六天前（近七天）时间戳
  ```js
  var timestamp = new Date().setHours(0, 0, 0, 0) - 6 * 24 * 60 * 60 * 1000;
  ```

### 天数技巧

- 相隔天数计算
  ```js
  Math.abs(start - end) / 60 / 60 / 1000 / 24;
  ```
- 某个月的第一天
  ```js
  new Date(date.getFullYear(), date.getMonth(), 1);
  ```
- 某个月的最后一天
  ```js
  new Date(date.getFullYear(), date.getMonth() + 1, 0);
  ```
- 某个月所在季度的第一天
  ```js
  // ~~作用是将数字转化为32位有符号整数 舍去小数不做四舍五入
  new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
  ```
- 某个月所在季度的最后一天
  ```js
  new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0);
  ```
- 某个月份的天数
  ```js
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  ```
- 前一天
  ```js
  new Date(date.getTime() - 24 * 60 * 60 * 1000);
  ```
- 后一天
  ```js
  new Date(date.getTime() + 24 * 60 * 60 * 1000);
  ```

### 年技巧

- 判断是否是闰年
  ```js
  new Date(date.getFullYear(), 2, 0).getDate() == 29;
  ```

### 格式化技巧

- 根据时间戳获取特定日期格式（自我封装，这里仅供参考）
  ```js
  function timestampToTime(timestamp) {
    const dateObj = new Date(+timestamp); // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
    const year = dateObj.getFullYear(); // 获取年，
    const month = dateObj.getMonth() + 1; // 获取月，必须要加1，因为月份是从0开始计算的
    const date = dateObj.getDate(); // 获取日，记得区分getDay()方法是获取星期几的。
    const hours = pad(dateObj.getHours()); // 获取时, pad函数用来补0
    const minutes = pad(dateObj.getMinutes()); // 获取分
    const seconds = pad(dateObj.getSeconds()); // 获取秒
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }
  function pad(str) {
    return +str >= 10 ? str : "0" + str;
  }
  timestampToTime(1577848271000);
  ```
- 日期格式化
  ```js
  Date.prototype.format = function (format) {
    var date = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S+": this.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? date[k]
            : ("00" + date[k]).substr(("" + date[k]).length)
        );
      }
    }
    return format;
  };
  console.log(newDate.format("yyyy-MM-dd h:m:s"));
  ```
