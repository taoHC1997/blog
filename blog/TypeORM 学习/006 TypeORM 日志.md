# TypeORM 日志

## 日志配置

```ts
{
  type: "mysql",
  // ...
  logging: true
}
```

处理开启日志外，还可以配置一些选项：

- 日志级别
  - `logging: ["query"]` 所有查询
  - `logging: ["error"]` 失败的查询和错误
  - `logging: ["schema"]` 架构构建过程
  - `logging: ["warn"]` 内部 orm 警告
  - `logging: ["info"]` 内部 orm 信息性消息
  - `logging: ["log"]` 内部 orm 日志消息
  - `logging: "all"` 所有日志均记录
- 超时记录到日志
  - `maxQueryExecutionTime: 1000`
- 更改默认记录器
  - `logger: "advanced-console"` 默认记录器，它将使用颜色和 sql 语法高亮显示所有记录到控制台中的消息
  - `logger: "simple-console"` 简单的控制台记录器，与高级记录器完全相同，但它不使用任何颜色突出显示
  - `logger: "file"` 这个记录器将所有日志写入项目根文件夹中的 `ormlogs.log`
  - `logger: "debug"` 此记录器使用[debug package](https://github.com/visionmedia/debug)打开日志记录设置你的 env 变量`DEBUG = typeorm：*`

### 自定义记录器

```typescript
import { Logger } from "typeorm";

export class MyCustomLogger implements Logger {
  // 实现logger类的所有方法
}
```

```typescript
import { DataSource } from "typeorm";
import { MyCustomLogger } from "./logger/MyCustomLogger";

const dataSource = new DataSource({
  name: "mysql",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  logger: new MyCustomLogger(),
});
```

> 此日志记录器可在连接后（覆盖）配置：
>
> ```ts
> // user sends request during entity save
> postRepository.save(post, { data: { request: request } });
> // in logger you can access it this way:
> logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
>   const requestUrl = queryRunner && queryRunner.data["request"] ? "(" + queryRunner.data["request"].url + ") " : "";
>   console.log(requestUrl + "executing query: " + query);
> }
> ```
