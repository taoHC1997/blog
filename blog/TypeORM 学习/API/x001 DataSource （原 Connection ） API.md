# DataSource （原 Connection ） API

- `options` - 用于创建此连接的连接选项
  ```typescript
  const dataSourceOptions: DataSourceOptions = dataSource.options;
  ```
- `isInitialized` - 指示是否建立了与数据库的真实连接
  ```typescript
  const isInitialized: boolean = dataSource.isInitialized;
  ```
- `driver` - 此连接中使用的基础数据库驱动程序
  ```typescript
  const driver: Driver = dataSource.driver;
  ```
- `manager` - `EntityManager` 用于连接实体
  ```typescript
  const manager: EntityManager = dataSource.manager;
  // 你可以调用 manager 方法，例如find：
  const user = await manager.find();
  ```
- `mongoManager` - `MongoEntityManager` 用于处理 mongodb 连接中的连接实体
  ```typescript
  const manager: MongoEntityManager = dataSource.mongoManager;
  // 你可以调用 manager 或 mongodb-manager 特定方法，例如 find ：
  const user = await manager.find();
  ```
- `initialize` - 连接初始化
  ```typescript
  await dataSource.initialize();
  ```
- `destroy` - 关闭与数据库的连接，通常需要在应用程序关闭时调用此方法
  ```typescript
  await dataSource.destroy();
  ```
- `synchronize` - 同步数据库架构。 当在连接选项中设置`synchronize：true`时，它会调用此方法。通常需要在应用程序关闭时调用此方法
  ```typescript
  await dataSource.synchronize();
  ```
- `dropDatabase` - 删除数据库及其所有数据，请谨慎使用此方法，因为此方法将清除所有数据库表及其数据
  ```typescript
  await dataSource.dropDatabase();
  ```
- `runMigrations` - 运行所有挂起的迁移
  ```typescript
  await dataSource.runMigrations();
  ```
- `undoLastMigration` - 恢复上次执行的迁移
  ```typescript
  await dataSource.undoLastMigration();
  ```
- `hasMetadata` - 检查是否已注册给定实体的元数据
  ```typescript
  if (dataSource.hasMetadata(User)) const userMetadata = dataSource.getMetadata(User);
  ```
- `getMetadata` - 获取给定实体的`EntityMetadata` ，你还可以指定表名，如果找到具有此类表名的实体元数据，则会返回该名称
  ```typescript
  const userMetadata = dataSource.getMetadata(User);
  // 现在可以获得有关用户实体的任何信息
  ```
- `getRepository` - 获取给定实体的`Repository` ，你还可以指定表名，如果找到给定表的存储库，则会返回该表
  ```typescript
  const repository = dataSource.getRepository(User);
  // 调用存储库方法，例如find：
  const users = await repository.findOne(1);
  ```
- `getTreeRepository` - 获取 `TreeRepository` ，你还可以指定表名，如果找到给定表的存储库，则会返回该表
  ```typescript
  const repository = dataSource.getTreeRepository(Category);
  // 调用树存储库方法，例如 findTrees ：
  const categories = await repository.findTrees();
  ```
- `getMongoRepository` -获取给定实体的`MongoRepository` ，此存储库用于 MongoDB 连接中的实体
  ```typescript
  const repository = dataSource.getMongoRepository(User);
  // 调用特定于mongodb的存储库方法，例如createEntityCursor：
  const categoryCursor = repository.createEntityCursor();
  const category1 = await categoryCursor.next();
  const category2 = await categoryCursor.next();
  ```
- `transaction` - 提供单个事务，在单个数据库事务中执行多个数据库请求
  ```typescript
  await dataSource.transaction(async (manager) => {
    // 注意：你必须使用给定的管理器实例执行所有数据库操作，
    // 它是一个使用此事务的EntityManager的特殊实例，并且不要忘记在处理操作
  });
  ```
- `query` - 执行原始 SQL 查询
  ```typescript
  const rawData = await dataSource.query(`SELECT * FROM USERS`);
  ```
- `createQueryBuilder` - 创建一个查询构建器，可用于构建查询
  ```typescript
  const users = await dataSource
    .createQueryBuilder()
    .select()
    .from(User, "user")
    .where("user.name = :name", { name: "John" })
    .getMany();
  ```
- `createQueryRunner` - 创建一个用于管理和使用单个真实数据库连接的查询运行器
  ```typescript
  const queryRunner = dataSource.createQueryRunner();
  // 只有在调用connect执行真正的数据库连接后才能使用它的方法
  await queryRunner.connect();
  // .. 使用查询运行器并调用其方法
  // 重要提示 -  一旦完成,不要忘记释放查询运行器
  await queryRunner.release();
  ```
