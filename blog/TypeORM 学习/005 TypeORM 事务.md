# TypeORM 事务

## 事务基础

### 创建事务

> 注意，事务**总是**使用 `transactionalEntityManager` 来管理实体的

```ts
await myDataSource.transaction(async (transactionalEntityManager) => {
  // execute queries using transactionalEntityManager
});

await myDataSource.manager.transaction(async (transactionalEntityManager) => {
  // execute queries using transactionalEntityManager
});
```

### 指定隔离级别

```ts
await myDataSource.manager.transaction("SERIALIZABLE", (transactionalEntityManager) => {});
```

1. 对应 `mysql` `Postgres` `SQL Server` 支持：
   - `READ UNCOMMITTED`
   - `READ COMMITTED`
   - `REPEATABLE READ`
   - `SERIALIZABLE`
2. 对应 `SQlite` ，支持：
   - `SERIALIZABLE` 默认
   - `READ UNCOMMITTED` 必须启用 `shared cache mode`
3. 对应 `Oracle` ，支持：
   - `READ COMMITTED`
   - `SERIALIZABLE`

### 使用 QueryRunner

```ts
// 获取连接并创建新的queryRunner
const queryRunner = dataSource.createQueryRunner();

// 使用我们的新queryRunner建立真正的数据库连
await queryRunner.connect();

// 现在我们可以在queryRunner上执行任何查询，例如：
await queryRunner.query("SELECT * FROM users");

// 我们还可以访问与queryRunner创建的连接一起使用的实体管理器：
const users = await queryRunner.manager.find(User);

// 开始事务：
await queryRunner.startTransaction();

try {
  // 对此事务执行一些操作：
  await queryRunner.manager.save(user1);
  await queryRunner.manager.save(user2);
  await queryRunner.manager.save(photos);

  // 提交事务：
  await queryRunner.commitTransaction();
} catch (err) {
  // 有错误做出回滚更改
  await queryRunner.rollbackTransaction();
}
```
