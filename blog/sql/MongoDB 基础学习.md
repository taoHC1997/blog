# MongoDB 基础学习

- github： https://github.com/mongodb/mongo
- 官网： https://www.mongodb.com/zh-cn
- 文档： https://docs.mongodb.com/manual/
- Nodejs 驱动： https://github.com/mongodb/node-mongodb-native

## 快速使用

### windows 使用

#### 安装

打开 https://www.mongodb.com/download-center/community ，选择社区版，确认系统，点击下载安装即可。

安装成功后，安装目录下 mongod.exe 为服务端， mongo.exe 为 shell 端。

#### 配置使用

> 如果安装后采用典型安装，一般无需下列配置。

如果使用自定义安装，一般需要新建 `data` 、 `data\db` 、 `data\log` 目录。

配置好后，`mongod --dbpath .\...\data\db` 启动服务端；`mongo` 启动 shell 端；此时可以在安装目录下新建 `mongod.cfg` 文件，默认配置如下：

```conf
# mongod.conf
storage:
  dbPath: C:\Program Files\MongoDB\Server\4.4\data
  # 设置数据库持久保存
  journal:
    enabled: true
# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path:  C:\Program Files\MongoDB\Server\4.4\log\mongod.log
# network interfaces
net:
  # 默认端口 27017
  port: 27017
  bindIp: 127.0.0.1
```

配置成功后，将 MongoDB 注册为服务：`mongod --config "C:\Program Files\MongoDB\Server\4.4\mongod.cfg" --install`

这里：

- `--dbpath` 配置备用数据库路径
- `--serviceName` `--serviceDisplayName` 配置不同实例名用于多服务情况（两者之一即可）

#### 服务管理

- 启动服务
  `net start MongoDB`
- 关闭服务
  `net stop MongoDB`
- 移除服务
  `mongod --remove`

### linux 使用

见 https://www.runoob.com/mongodb/mongodb-linux-install.html

// TODO

### shell 的简单使用

> 此处已进入 `mongo` 端
> 此处环境是 js 环境

```s
# 查看帮助
help
# 可以运行简单的算术运算
4 + 8
# 查看当前数据库
db
# 对 xxx 表插入数据；xxx 可为任意表名
db.xxx.insert({x:10})
# 查找 xxx 表的字段；可输入某字段值
db.xxx.find()
```

## 基础知识

### 基本概念

#### 术语对应表

| SQL 术语    | MongoDB 术语 | 说明                                    |
| ----------- | ------------ | --------------------------------------- |
| database    | database     | 数据库                                  |
| table       | collection   | 数据表\集合                             |
| row         | document     | 数据行\文档                             |
| column      | field        | 字段\域                                 |
| index       | index        | 索引                                    |
|             | cursor       | 游标，查询时会返回游标，它不是读操作    |
| primary key | primary key  | 主键，MongoDB 里自动将 `_id` 设置为主键 |

这里，比较不同的是关系数据库在表处定义字段，而 MongoDB 这个面向文档的数据库是在文档处定义域的。

#### 系统保留字段表

| 命名空间                 | 说明                                          |
| ------------------------ | --------------------------------------------- |
| dbname.system.namespaces | 列出所有名字空间                              |
| dbname.system.indexes    | 列出所有索引,可插入数据，创建索引，其他不可变 |
| dbname.system.profile    | 包含数据库概要(profile)信息，可删除           |
| dbname.system.users      | 列出所有可访问数据库的用户，可修改            |
| dbname.system.sources    | 包含复制对端（slave）的服务器信息和状态       |

#### 数据类型表

| 数据类型             | 说明                                                       |
| -------------------- | ---------------------------------------------------------- |
| `String`             | 字符串，以 **UTF-8** 为编码                                |
| `Integer`            | 整型数值，有 32 位和 64 位                                 |
| `Boolean `           | 布尔值                                                     |
| `Double`             | 双精度浮点值                                               |
| `Min/Max keys`       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比 |
| `Array`              | 用于将数组或列表或多个值存储为一个键                       |
| `Timestamp`          | 时间戳，有一个专门用于 MongoDB 的特殊时间戳，通常唯一      |
| `Object`             | 用于内嵌文档                                               |
| `Null`               | 空值                                                       |
| `Symbol`             | 符号，用于采用特殊符号类型的语言                           |
| `Date`               | 日期时间。用 UNIX 时间格式来存储当前日期或时间             |
| `Object ID`          | 对象 ID，用于创建文档的 ID                                 |
| `Binary Data`        | 二进制数据                                                 |
| `Code`               | 代码类型                                                   |
| `Regular expression` | 正则表达式类型                                             |

注意，关于文档（数据行）有唯一主键 `Object ID` ，它有如下定义：

- 12 bytes
  - 前 4 字节表示创建的 unix 时间戳， UTC 时间
  - 接下来 3 字节是机械识别码
  - 接下来 2 字节是进程 id 组成的 PID
  - 最后 3 字节是随机数
- 一般此主键默认为 `_id` ，它其实可以为任意类型，默认为 `Object ID`
- 可以使用 `getTimestamp()` 方法得到创建时间
  ```js
  var newObject = ObjectId();
  newObject.getTimestamp();
  // ISODate("2020-09-09T07:21:10Z")
  ```

对于日期 `Date` 的创建，有注意：

- 日期有负数，1970 年之前的情况。
- 日期有两种创建情况可以在 js 中使用：
  ```js
  var mydate1 = new Date(); //格林尼治时间
  mydate1; // ISODate("2018-03-04T14:58:51.233Z")
  var mydate2 = ISODate(); //格林尼治时间
  mydate2; //ISODate("2018-03-04T15:00:45.479Z")
  ```

### 基础使用

> 以下讲解 shell 命令。

#### 数据库

MongoDB 可以有多个数据库，默认数据库为 db 。

- 显示所有数据库
  ```s
  show dbs
  ```
- 显示当前数据库
  ```s
  db
  ```
- 切换数据库（如果数据库不存在，就新建并切换，这时新数据库必须有数据才可显示）
  ```s
  use local
  ```

对于数据库名，有规范：

- 不能为空字符串
- 不能有 ` ` 、 `.` 、 `$` 、 `/` 、 `\` 、 `\0`
- 全部小写
- 最多 64 字节
- 不要用 `admin` 、 `local` 、 `config` 这些名字

#### 集合（数据表）

MongoDB 的集合没有固定结构，但是作为一般使用，应该录入有关联性的数据进去。

- 得到全部集合名
  ```js
  db.getCollectionNames();
  ```
- 集合插入文档
  ```js
  db.xxx.insert({ name: "tom" });
  ```
- 获取集合的更多信息
  ```js
  db.stats();
  // 可以看见索引
  db.xxx.find().explain();
  ```

对于集合的命名，有规范：

- 不能为空字符串
- 不能有空字符（`\0`），空字符作为结尾标识
- 不能以 `system.` 为开头，此为保留前缀
- 非特殊情况，不要使用保留字符如 `$`

下面介绍特殊集合定量集合（ Capped collections）：

- 它是固定大小的 collection
- 性能高，且有队列过期的特性
- 插入有时间顺序，保存也是
- 适合于记录日志
- 创建时必须指定大小（单位为字节）
- 按照插入顺序而不是索引确定插入位置
- 在进行更新时，不要超过指定的大小，不然就会失败
- 不能删除单个文档，可以使用 `drop()` 方法删除全部
- 删除后必须显式的重新创建
- 创建命令： `db.createCollection("logs", {capped:true, size:100000})`
- 在这里，可以使用 `db.getLastError()` 获取数据库最近一次错误信息

#### 文档（数据行）

一组键值对即可称为行，在 MongoDB 中，数据集合（数据表）无需相同字段。

- 数据库某集合插入文档
  ```js
  db.xxx.insert({ name: "tom" });
  ```
- 查找全部文档
  ```js
  # 这里的集合为 xxx
  db.xxx.find()
  ```
- 删除某文档（使用查询构造器，必须有大括号）
  ```js
  db.xxx.remove({ name: "tom" });
  ```
- 得到全部文档数目
  ```js
  db.xxx.count();
  ```
- 覆盖式更新文档（只更新头一个）
  ```js
  db.xxx.update({ name: "tom" }, { name: "tom", age: 18 });
  ```
- 非覆盖式更新文档（只更新头一个）
  ```js
  db.xxx.update({ name: "tom" }, { $set: { age: 18 } });
  ```
- 获取文档信息
  ```js
  db.xxx.stats();
  ```

这里要注意：

- 文档中的键值对是有序的
- 文档中的值可以取多种类型，甚至文档也行
  ```js
  // 定义
  db.employees.insert({
    _id: ObjectId("4d85c7039ab0fd70a117d734"),
    name: "Ghanima",
    family: {
      mother: "Chani",
      father: "Paul",
      brother: ObjectId("4d85c7039ab0fd70a117d730"),
    },
  });
  // 查找
  db.employees.find({ "family.mother": "Chani" });
  ```
- 区分类型和大小写
- 键唯一
- 键是字符串，一般可以使用任意 UTF-8 字符

对于文档的命名，有规范：

- 键不能有空字符（`\0`），空字符作为结尾标识
- 一般不要使用 `.` 和 `$` ，他们有特殊意义
- 以下划线为开头的我们约定为保留键，一般不要使用

#### 索引

- 索引的创建（以 name 域的值为索引）
  ```js
  db.unicorns.ensureIndex({name: 1});
  // 索引可以在嵌入域（使用.符号）和数组域上。也可以创建复合索引
  db.unicorns.ensureIndex({xxx.name: 1});
  ```
- 索引弃用
  ```js
  db.unicorns.dropIndex({ name: 1 });
  ```
- 创建唯一的索引
  ```js
  db.unicorns.ensureIndex({ name: 1 }, { unique: true });
  ```
- 设置索引顺序
  ```js
  // 这里 1 为升序；-1 为降序
  db.unicorns.ensureIndex({ name: 1, vampires: -1 });
  ```

更多信息见： https://docs.mongodb.com/manual/indexes/

## 进阶使用

> 注意，这里是 shell 环境使用的规则，如果是其他语言封装，请参照其文档细节。

### 连接

标准的 url 连接格式：

```
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

这里介绍参数：

- `mongodb://` 协议头，必须
- `username:password@` 用户&密码，可选项
- `host1` 主机 host 地址，必须
- `[:port1]` 端口号，默认 27017
- `/database` 不指定默认连接 test 数据库，否则需要用户&密码配合登录
- `?options` 配置参数，键值对，最前必须有 `/` ，键值对通过 `&` 或分号分开

对于 `?options` ，同样有说明：

- `replicaSet=name`
  - 验证 replica set 的名称
- `slaveOk=true|false`
  - true:在 connect=direct 模式下，驱动会连接第一台机器，即使这台服务器不是主。在 connect=replicaSet 模式下，驱动会发送所有的写请求到主并且把读取操作分布在其他从服务器
  - false: 在 connect=direct 模式下，驱动会自动找寻主服务器. 在 connect=replicaSet 模式下，驱动仅仅连接主服务器，并且所有的读写命令都连接到主服务器
- `safe=true|false`
  - true: 在执行更新操作之后，驱动都会发送 getLastError 命令来确保更新成功。(还要参考 wtimeoutMS)
  - false: 在每次更新之后，驱动不会发送 getLastError 来确保更新成功
- `w=n`
  - 驱动添加 { w : n } 到 getLastError 命令. 应用于 safe=true
- `wtimeoutMS=ms`
  - 驱动添加 { wtimeout : ms } 到 getlasterror 命令. 应用于 safe=true
- `fsync=true|false`
  - true: 驱动添加 { fsync : true } 到 getlasterror 命令.应用于 safe=true
  - false: 驱动不会添加到 getLastError 命令中
- `journal=true|false`
  - 如果设置为 true, 同步到 journal (在提交到数据库前写入到实体中). 应用于 safe=true
- `connectTimeoutMS=ms`
  - 可以打开连接的时间
- `socketTimeoutMS=ms`
  - 发送和接受 sockets 的时间

下面给出一些连接实例：

```s
# 简单连接
mongodb://admin:123456@localhost/test
# 多服务器连接
mongodb://example1.com:27017,example2.com:27017
mongodb://localhost,localhost:27018,localhost:27019
# 连接 replica set 三台服务器, 写入操作应用在主服务器 并且分布查询到从服务器
mongodb://host1,host2,host3/?slaveOk=true
# 直接连接第一个服务器，无论是replica set一部分或者主服务器或者从服务器
mongodb://host1,host2,host3/?connect=direct;slaveOk=true
#安全模式连接
mongodb://localhost/?safe=true
```

### 查询选择器

MongoDB 具有一个查询选择器（query selector），在使用 `find()` 、 `update()` 和 `remove()` 时使用。为了演示查询选择器，先录入：

```js
db.unicorns.insert({
  name: "Horny",
  dob: new Date(1992, 2, 13, 7, 47),
  loves: ["carrot", "papaya"],
  weight: 600,
  gender: "m",
  vampires: 63,
});
db.unicorns.insert({
  name: "Aurora",
  dob: new Date(1991, 0, 24, 13, 0),
  loves: ["carrot", "grape"],
  weight: 450,
  gender: "f",
  vampires: 43,
});
db.unicorns.insert({
  name: "Unicrom",
  dob: new Date(1973, 1, 9, 22, 10),
  loves: ["energon", "redbull"],
  weight: 984,
  gender: "m",
  vampires: 182,
});
db.unicorns.insert({
  name: "Roooooodles",
  dob: new Date(1979, 7, 18, 18, 44),
  loves: ["apple"],
  weight: 575,
  gender: "m",
  vampires: 99,
});
db.unicorns.insert({
  name: "Solnara",
  dob: new Date(1985, 6, 4, 2, 1),
  loves: ["apple", "carrot", "chocolate"],
  weight: 550,
  gender: "f",
  vampires: 80,
});
db.unicorns.insert({
  name: "Ayna",
  dob: new Date(1998, 2, 7, 8, 30),
  loves: ["strawberry", "lemon"],
  weight: 733,
  gender: "f",
  vampires: 40,
});
db.unicorns.insert({
  name: "Kenny",
  dob: new Date(1997, 6, 1, 10, 42),
  loves: ["grape", "lemon"],
  weight: 690,
  gender: "m",
  vampires: 39,
});
db.unicorns.insert({
  name: "Raleigh",
  dob: new Date(2005, 4, 3, 0, 57),
  loves: ["apple", "sugar"],
  weight: 421,
  gender: "m",
  vampires: 2,
});
db.unicorns.insert({
  name: "Leia",
  dob: new Date(2001, 9, 8, 14, 53),
  loves: ["apple", "watermelon"],
  weight: 601,
  gender: "f",
  vampires: 33,
});
db.unicorns.insert({
  name: "Pilot",
  dob: new Date(1997, 2, 1, 5, 3),
  loves: ["apple", "watermelon"],
  weight: 650,
  gender: "m",
  vampires: 54,
});
db.unicorns.insert({
  name: "Nimue",
  dob: new Date(1999, 11, 20, 16, 15),
  loves: ["grape", "carrot"],
  weight: 540,
  gender: "f",
});
db.unicorns.insert({
  name: "Dunx",
  dob: new Date(1976, 6, 18, 18, 18),
  loves: ["grape", "watermelon"],
  weight: 704,
  gender: "m",
  vampires: 165,
});
```

下面介绍常用规则：

- `{field: value}`
  查找使用 field 等于 value 的文档
- `{field1: value1，field2: value2}`
  与 操作查找，需要同时满足
- `{weight: {$lt: 701}}`
  查找 weight 小于 701 的文档
- `{weight: {$lte: 701}}`
  查找 weight 小于等于 701 的文档
- `{weight: {$gt: 701}}`
  查找 weight 大于 701 的文档
- `{weight: {$gte: 701}}`
  查找 weight 大于等于 701 的文档
- `{weight: {$ne: 701}}`
  查找 weight 不等于 701 的文档
- `{vampires: {$exists: true}}`
  查找存在 vampires 域（属性）的文档，false 则表示不存在
- `{$or: [{loves: 'apple'}, {loves: 'orange'}]}`
  或 操作查找，满足其一即可
- `{loves: 'watermelon'}`
  此示例用于特殊说明：MongoDB 中数组是一级对象，此查找可找到 loves 中包含 watermelon 的所有文档，这个特性很实用。
  更多参数见 https://docs.mongodb.com/manual/reference/operator/query/

### 方法汇总

#### find 方法

对于 `find()` 方法，有第二个可选参数设置选择域：

- db.unicorns.find(null, {name: 1});
  仅获取 name 域以及 \_id
- db.unicorns.find(null, {name: 1, \_id: 0});
  此时排除 \_id ,注意：仅 \_id 可以如此的排除显示

这里还需注意， `find()` 方法其实先返回一个游标，此时还未读取数据，故后面可以使用一些其他方法。

#### update 方法

`db.xxx.update($1,$2)` 是 MongoDB 的更新操作，此存在先按查询选择器（`$1`）查找，然后使用 `$2` 覆盖。

我们可以使用 `$set` 更改这种默认行为：`db.unicorns.update({name: 'Roooooodles'}, {$set: {weight: 590}})`

此外，还有其他参数：

- `db.unicorns.update({name: 'Pilot'}, {$inc: {vampires: -2}})`
  `$inc` 设置在原有数值上加或见数值
- `db.unicorns.update({name: 'Aurora'}, {$push: {loves: 'sugar'}})`
  `$push` 设置给数组增加一个值
  更多信息见 https://docs.mongodb.com/manual/tutorial/update-documents/

`update` 除前两个参数外，后面还有一些可选参数：

- 第三个参数，默认为 `false` 时如果查找不存在什么也不做，如果为 `true` 则会将后面的设置插入到文档。
- 第四个参数，默认为 `false` 时更新找到的第一个文档，如果为 `true` 则会更新所有找到的文档

#### sort 方法

显而易见， `sort()` 是排序方法，它通常与 `find()` 配合使用（1 表示升序，-1 表示降序）：

- `db.unicorns.find().sort({weight: -1})`
  weight 按降序排序
- `db.unicorns.find().sort({name: 1, vampires: -1})`
  先 name 按升序；后 vampires 按降序

注意，MongoDB 应当按索引使用排序方法，无索引时会限制排序对象的大小。

#### limit 和 skip 游标方法

> 这两个方法一般辅助分页功能使用。

- limit 方法限制读取文档数
- skip 方法设置游标跳过数目

```js
db.unicorns.find().sort({ weight: -1 }).limit(2).skip(1);
// 获取第二、第三重的对象
```

#### count 方法

计数方法，返回数值

```js
// 一般使用
db.unicorns.count({ vampires: { $gt: 50 } });
// 本质使用
db.unicorns.find({ vampires: { $gt: 50 } }).count();
```

#### MapReduce 方法

MapReduce 方法用于对批量数据做处理，我们拿日期点击统计为例：

```js
// 原始数据结构
db.hits.insert({ resource: "index", date: new Date(2010, 0, 20, 4, 30) });
db.hits.insert({ resource: "index", date: new Date(2010, 0, 20, 5, 30) });
db.hits.insert({ resource: "about", date: new Date(2010, 0, 20, 6, 0) });
db.hits.insert({ resource: "index", date: new Date(2010, 0, 20, 7, 0) });
db.hits.insert({ resource: "about", date: new Date(2010, 0, 21, 8, 0) });
db.hits.insert({ resource: "about", date: new Date(2010, 0, 21, 8, 30) });
db.hits.insert({ resource: "index", date: new Date(2010, 0, 21, 8, 30) });
db.hits.insert({ resource: "about", date: new Date(2010, 0, 21, 9, 0) });
db.hits.insert({ resource: "index", date: new Date(2010, 0, 21, 9, 30) });
db.hits.insert({ resource: "index", date: new Date(2010, 0, 22, 5, 0) });
```

```js
// 定义映射方法
var map = function () {
  var key = {
    resource: this.resource,
    year: this.date.getFullYear(),
    month: this.date.getMonth(),
    day: this.date.getDate(),
  };
  emit(key, { count: 1 });
};
var reduce = function (key, values) {
  var sum = 0;
  values.forEach(function (value) {
    sum += value["count"];
  });
  return { count: sum };
};
```

```js
// MapReduce 使用
// 设置为 inline 即为命令行显示
db.hits.mapReduce(map, reduce, { out: { inline: 1 } });
// 设置为 hit_stats 表示结果存至 hit_stats 集合，结果见此集合
db.hits.mapReduce(map, reduce, { out: "hit_stats" });
// 此时结果会覆盖式的存入 hit_stats 集合
db.hits.mapReduce(map, reduce, { out: { merge: "hit_stats" } });
// 此方法第三个参数是一个可选项，比如可以用来过滤、排序或是限制需要分析的文档。也可以将一个finalize方法应用到reduce之后的结果上。
```
