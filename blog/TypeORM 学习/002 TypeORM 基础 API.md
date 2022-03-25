# TypeORM 基础 API

## 创建连接

> 默认使用 `new DataSource(DataSourceOptions)` 构建数据库连接

```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
```

## 获取数据库连接

- `AppDataSource.manager`
- `AppDataSource.getRepository()` 获取某表
  ```ts
  const user = DataSource.getRepository(User).findOne(userId);
  ```
- `AppDataSource.getTreeRepository()` - 获取 `TreeRepository`
  ```typescript
  const categoryRepository = DataSource.getTreeRepository(Category);
  ```
- `AppDataSource.getMongoRepository()` - 获取给定实体的 `MongoRepository`
  ```typescript
  const userRepository = DataSource.getMongoRepository(User);
  ```
- `getMongoManager()` 获取针对 MongoDB 的管理
  ```ts
  const manager = getMongoManager();
  const timber = await manager.findOne(User, { firstName: "Timber", lastName: "Saw" });
  ```
