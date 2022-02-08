# mysql 基础学习

- github： https://github.com/mysqljs/mysql
- npm： https://www.npmjs.com/package/mysql

## 快速开始

1. 安装
   ```s
   npm install mysql
   ```
2. 使用
   ```js
   var mysql = require("mysql");
   var connection = mysql.createConnection({
     host: "localhost",
     port: "3306",
     user: "me",
     password: "secret",
     database: "my_db",
   });
   connection.connect(function (err) {
     if (err) {
       console.log("[query] - :" + err);
       return;
     }
     console.log("[connection connect]  succeed!");
   });
   connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
     if (error) {
       console.log("[query] - :" + err);
       return;
     }
     console.log("The solution is: ", results[0].solution);
   });
   connection.end(function (err) {
     if (err) {
       return;
     }
     console.log("[connection end] succeed!");
   });
   ```

### 配置介绍

> 在创建连接时会有一个配置 `options` ，这里介绍配置参数：
> 注意，部分参数未在此处说明，见文档

- `host` 主机地址 （默认 `localhost` ）
- `user` 用户名
- `password` 密码
- `port` 端口号 （默认 `3306` ）
- `database` 数据库名（可选）
- `charset` 连接字符集（默认 `'UTF8_GENERAL_CI'` ，注意字符集的字母都要大写）
- `localAddress` 此 IP 用于 TCP 连接
- `socketPath` 连接到 unix 域路径，当使用 `host` 和 `port` 时会被忽略
- `timezone` 时区（默认 `'local'` ）
- `connectTimeout` 连接超时（默认不限制；单位毫秒）
- `stringifyObjects` 是否序列化对象（默认 `'false'`）
- `typeCast` 是否将列值转化为本地 JavaScript 类型值 （默认 `true` ）
- `queryFormat` 自定义 `query` 语句格式化方法
- `supportBigNumbers` 数据库支持 `bigint` 或 `decimal` 类型列时，需要设此 `option` 为 `true` （默认 `false` ）
- `bigNumberStrings` `supportBigNumbers` 和 `bigNumberStrings` 启用 强制 `bigint` 或 `decimal` 列以 JavaScript 字符串类型返回（默认 `false` ）
- `dateStrings` 强制 `timestamp` 、 `datetime` 、 `data` 类型以字符串类型返回，而不是 JavaScript Date 类型（默认 `false` ）
- `debug` 开启调试（默认 false）
- `multipleStatements` 是否许一个 `query` 中有多个 MySQL 语句 （默认 `false` ）
- `flags` 用于修改连接标志
- `ssl` 使用 ssl 参数（与 `crypto.createCredenitals` 参数格式一至）或一个包含 ssl 配置文件名称的字符串，详见文档

## 使用详解

### 连接数据库

```js
// 创建连接
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "test",
});

// 创建连接后不论是否成功都会调用
conn.connect(function (err) {
  if (err) throw err;
  console.log("connect success!");
});

// 其他的数据库操作，位置预留

// 关闭连接时调用
conn.end(function (err) {
  if (err) throw err;
  console.log("connect end");
});

// 或者直接销毁连接
// connection.destroy()
```

### CURD 增删改查

> `query()` 方法可直接使用原生 sql 语句

> 配合占位符使用最佳（见占位符章节）

#### 查询

```js
conn.query("SELECT * FROM `user`", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
  // 返回数组
  // console.log(result[0].username);
});
console.log("select ended!");
```

#### 添加

```js
conn.query(
  "INSERT INTO `user` SET `username`='qwerty', `password`='741', `email`='qwerty@qq.com'",
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);
```

#### 更新

```js
conn.query('UPDATE `user` SET `password`="123456" WHERE `uid`=4', function (err, result) {
  if (err) throw err;
  console.log(result);
});
```

#### 删除

```js
conn.query("DELETE FROM `user` WHERE `uid`=4", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});
```

### 数据库连接池

> 数据库连接池负责分配、管理和释放数据库连接，允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个连接，释放空闲时间超过最大允许空闲时间的数据库连接以避免因为连接未释放而引起的数据库连接遗漏

#### 创建

```js
// 创建连接池
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123",
  database: "test",
});
```

这里介绍一些连接池配置

- `waitForConnections` 当连接池没有连接或超出最大限制时，设置为 `true` 且会把连接放入队列，设置为 `false` 会返回 `error`
- `connectionLimit` 连接数限制，默认 `10`
- `queueLimit` 最大连接请求队列限制，设置为 `0` 表示不限制，默认 `0`

#### 使用

```js
// query 语句使用，注意可能连接池中的 connection 不一致
pool.query("SELECT * FROM `user`", function (err, result) {
  if (err) throw err;
  console.log(result);
  // 关闭连接池
  pool.end(function (err) {
    if (err) throw err;
    console.log("connection ended");
  });
});
```

```js
// 连接共享
pool.getConnection(function (err, connection) {
  if (err) throw err;
  // 此处就是连接使用
  connection.query("SELECT * FROM `user`", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  connection.query("SELECT * FROM `uid`", function (err, result) {
    if (err) throw err;
    console.log(result);
    // 关闭语句，会把连接放回连接池，等待其它使用者使用
    connection.release();
    // 接下来 connection 已经无法使用，它已经被返回到连接池中
  });
});
```

#### 连接池事件

```js
// 连接池有事件绑定
// 此处表示新连接创建事件绑定
pool.on("connection", function (connection) {
  console.log("new connection");
});
```

### 防注入

#### 标准方法使用

可以使用如下方法对字符串转义（请视情况而定）：

- `mysql.escape()`
- `connection.escape()`
- `pool.escape()`

```js
var sql = "SELECT * FROM `user` WHERE `uid`=" + connection.escape('"123";//--');
console.log(sql); // SELECT * FROM `user` WHERE `uid`='\"123\";//--'
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});
```

此外，同样的 `escapeId()` 可以对不信任的表名，字段名进行转义：

```js
var sql = "SELECT * FROM " + connection.escapeId("user") + " WHERE `uid`=1";
connection.query(sql, function (err, result) {
  console.log(result);
});
console.log(query.sql); // SELECT * FROM `user` WHERE `uid`=1
```

这里有转义规则：

- `Numbers` 不进行转换
- `Booleans` 转换为 `true` / `false`
- `Date` 对象转换为 `YYYY-mm-dd HH:ii:ss` 字符串
- `Buffers` 转换为 hex 字符串
- `Strings` 进行安全转义
- `Arrays` 转换为列表，如 `['a', 'b']` 会转换为 `'a', 'b'`
- 多维数组转换为组列表，如 `[['a', 'b'], ['c', 'd']]` 会转换为 `('a', 'b'), ('c', 'd')`
- `Objects` 会转换为 `key=value` 键值对的形式。嵌套的对象转换为字符串
- `undefined` / `null` 会转换为 `NULL`
- MySQL 不支持 `NaN` / `Infinity` ，并且会触发 MySQL 错误

#### 占位符使用

使用 `?` 作为占位符会自动调用 `escape()` 方法

```js
var params = ["test", "test"];
var query = connection.query(
  "SELECT * FROM `user` WHERE `username`=? AND `password`=?",
  params,
  function (err, result) {
    console.log(result);
  }
);
console.log(query.sql); // SELECT * FROM `user` WHERE `username`='test' AND `password`='test'
```

```js
var params = {
  username: "dd_test",
  password: "dd_test",
  email: "dd_test@qq.com",
};
var query = connection.query("INSERT INTO `user` SET ?", params, function (err, result) {
  if (err) throw err;
  console.log(result);
});
console.log(query.sql); // INSERT INTO `user` SET `username` = 'dd_test', `password` = 'dd_test', `email` = 'dd_test@qq.com'
```

使用 `??` 作为占位符会自动加上反引号

```js
var params = ["user", "username", "test", "password", "test"];
var query = connection.query(
  "SELECT * FROM ?? WHERE ??=? AND ??=?",
  params,
  function (err, result) {
    console.log(result);
  }
);
console.log(query.sql); // SELECT * FROM `user` WHERE `username`='test' AND `password`='test'
```

> 可以使用 `mysql.format()` 查看编译语句
>
> ```js
> var userId = 1;
> var inserts = ["user", "uid", userId];
> var sql = "SELECT * FROM ?? WHERE ?? = ?";
> sql = mysql.format(sql, inserts); // SELECT * FROM `user` WHERE `uid` = 1
> ```

### 其他

#### 多语句查询

> 默认情况禁止

```js
// 传入此参数可多语句查询
var connection = mysql.createConnection({ multipleStatements: true });
connection.query("SELECT 1; SELECT 2", function (err, results) {
  if (err) throw err;
  // `results`是一个包含多个语句查询结果的数组
  console.log(results[0]);
  console.log(results[1]);
});
```

## 技巧

### 断线重连技巧

```js
var mysql = require("mysql");
var db_config = {
  host: "192.168.0.200",
  user: "root",
  password: "abcd",
  port: "3306",
  database: "nodesample",
};
var connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function (err) {
    if (err) {
      console.log("进行断线重连：" + new Date());
      setTimeout(handleDisconnect, 2000); //2秒重连一次
      return;
    }
    console.log("连接成功");
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();
```
