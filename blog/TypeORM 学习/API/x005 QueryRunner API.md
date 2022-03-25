# QueryRunner API

## 基本创建

```ts
const queryRunner = dataSource.createQueryRunner();
await queryRunner.connect();
const users = await queryRunner.manager.find(User);
await queryRunner.release();
```

## 迁移用

- `.getDatabases(): Promise<string[]>` 返回所有可用的数据库名称，包括系统数据库
- `.getSchemas(database?: string): Promise<string[]>` 返回所有可用的模式名称，包括系统模式。 仅对 SQLServer 和 Postgres 有用
  > 如果指定了 database 参数，则返回该数据库的模式
- `.getTable(tableName: string): Promise<Table|undefined>` 从数据库中按给定名称加载表
- `.getTables(tableNames: string[]): Promise<Table[]>` 从数据库中按给定名称加载表
- `.hasDatabase(database: string): Promise<boolean>` 检查是否存在具有给定名称的数据库
- `.hasSchema(schema: string): Promise<boolean>` 检查是否存在具有给定名称的模式。 仅用于 SqlServer 和 Postgres
- `.hasTable(table: Table|string): Promise<boolean>` 检查表是否存在
- `.hasColumn(table: Table|string, columnName: string): Promise<boolean>` 检查表中是否存在列
- `.createDatabase(database: string, ifNotExist?: boolean): Promise<void>` 创建一个新数据库， `ifNotExist` 为 `true` 则跳过创建，否则如果数据库已存在则抛出错误
- `.dropDatabase(database: string, ifExist?: boolean): Promise<void>` 删除数据库，`ifNotExist` 为 `true` 则跳过删除，否则如果数据库找不到则抛出错误
- `.createSchema(schemaPath: string, ifNotExist?: boolean): Promise<void>` 创建一个新的表模式
  - `schemaPath` - 架构路径。 对于 SqlServer，可以接受模式路径（例如'dbName.schemaName'）作为参数
  - `ifNotExist` - 如果为`true`则跳过创建，否则如果 schema 已存在则抛出错误
- `.dropSchema(schemaPath: string, ifExist?: boolean, isCascade?: boolean): Promise<void>` 删除表架构
  - `schemaPath` - 架构名称。 对于 SqlServer，可以接受模式路径（例如'dbName.schemaName'）作为参数
  - `ifExist` - 如果为`true`则跳过删除，否则如果找不到模式则抛出错误
  - `isCascade` - 如果为`true`，则自动删除模式中包含的对象（表，函数等），仅在 Postgres 中使用
- `.createTable(table: Table, ifNotExist?: boolean, createForeignKeys?: boolean, createIndices?: boolean): Promise<void>` 创建一个新表
  - `table` - 表对象。
  - `ifNotExist` - 如果`true`则跳过创建，否则如果表已经存在则抛出错误。 默认`false`
  - `createForeignKeys` - 指示是否将在创建表时创建外键。 默认为`true`
  - `createIndices` - 指示是否将在创建表时创建索引。 默认为`true`
- `.dropTable(table: Table|string, ifExist?: boolean, dropForeignKeys?: boolean, dropIndices?: boolean): Promise<void>` 删除一张表
  - `table` - 要删除的表对象或表名
  - `ifExist` - 如果`true`则跳过，否则抛出错误，如果表不存在则抛出错误
  - `dropForeignKeys` - 表示删除表时是否删除外键。 默认为`true`
  - `dropIndices` - 指示删除表时是否删除索引。 默认为`true`
- `.renameTable(oldTableOrName: Table|string, newTableName: string): Promise<void>` 重命名一张表
- `.addColumn(table: Table|string, column: TableColumn): Promise<void>` 添加一个新列
- `.addColumns(table: Table|string, columns: TableColumn[]): Promise<void>` 添加多个新列
- `.renameColumn(table: Table|string, oldColumnOrName: TableColumn|string, newColumnOrName: TableColumn|string): Promise<void>` 重命名一列
- `.changeColumn(table: Table|string, oldColumn: TableColumn|string, newColumn: TableColumn): Promise<void>` 更改表中的列
- `.changeColumns(table: Table|string, changedColumns: { oldColumn: TableColumn, newColumn: TableColumn }[]): Promise<void>` 更改表中的列
- `.dropColumn(table: Table|string, column: TableColumn|string): Promise<void>` 删除表中单列
- `.dropColumns(table: Table|string, columns: TableColumn[]|string[]): Promise<void>` 删除多个列
- `.createPrimaryKey(table: Table|string, columnNames: string[]): Promise<void>` 创建一个新的主键
- `.updatePrimaryKeys(table: Table|string, columns: TableColumn[]): Promise<void>` 更新复合主键
- `.dropPrimaryKey(table: Table|string): Promise<void>` 删除主键
- `.createUniqueConstraint(table: Table|string, uniqueConstraint: TableUnique): Promise<void>` 创建新的唯一约束
  > 注意：不适用于 MySQL，因为 MySQL 将唯一约束存储为唯一索引。 请改用`createIndex()`方法
- `.createUniqueConstraints(table: Table|string, uniqueConstraints: TableUnique[]): Promise<void>` 创建新的唯一约束
  > 注意：不适用于 MySQL，因为 MySQL 将唯一约束存储为唯一索引。 请改用`createIndices()`方法
- `.dropUniqueConstraint(table: Table|string, uniqueOrName: TableUnique|string): Promise<void>` 删除一个唯一约束
  > 注意：不适用于 MySQL，因为 MySQL 将唯一约束存储为唯一索引。 请改用`dropIndex()`方法
- `.dropUniqueConstraints(table: Table|string, uniqueConstraints: TableUnique[]): Promise<void>` 删除多个唯一约束
  > 注意：不适用于 MySQL，因为 MySQL 将唯一约束存储为唯一索引。 请改用`dropIndices()`方法
- `.createCheckConstraint(table: Table|string, checkConstraint: TableCheck): Promise<void>` 创建新的检查约束
  > 注意：MySQL 不支持检查约束
- `.createCheckConstraints(table: Table|string, checkConstraints: TableCheck[]): Promise<void>` 创建新的多个检查约束
  > 注意：MySQL 不支持检查约束。
- `.dropCheckConstraint(table: Table|string, checkOrName: TableCheck|string): Promise<void>` 删除检查约束
  > 注意：MySQL 不支持检查约束
- `.dropCheckConstraints(table: Table|string, checkConstraints: TableCheck[]): Promise<void>` 删除多个检查约束
  > 注意：MySQL 不支持检查约束
- `.createForeignKey(table: Table|string, foreignKey: TableForeignKey): Promise<void>` 创建一个新的外键
- `.createForeignKeys(table: Table|string, foreignKeys: TableForeignKey[]): Promise<void>` 创建一个新的外键
- `.dropForeignKey(table: Table|string, foreignKeyOrName: TableForeignKey|string): Promise<void>` 删除一个外键
- `.dropForeignKeys(table: Table|string, foreignKeys: TableForeignKey[]): Promise<void>` 删除多个外键
- `.createIndex(table: Table|string, index: TableIndex): Promise<void>` 创建一个新索引
- `.createIndices(table: Table|string, indices: TableIndex[]): Promise<void>` 创建多个新索引
- `.dropIndex(table: Table|string, index: TableIndex|string): Promise<void>` 删除索引
- `.dropIndices(table: Table|string, indices: TableIndex[]): Promise<void>` 删除多个索引
- `.clearTable(tableName: string): Promise<void>` 清除所有表内容
  > 注意：此操作使用 SQL 的 TRUNCATE 查询，该查询无法在事务中恢复
- `.enableSqlMemory(): void` 启用特殊查询运行程序模式，其中不执行 sql 查询，而是将它们存储到查询运行程序内的特殊变量中
- `.disableSqlMemory(): void` 禁用不执行 sql 查询的特殊查询运行程序模式。 以前存储的 sql 将被刷新
- `.clearSqlMemory(): void` 刷新所有内存中的 sqls
- `.getMemorySql(): SqlInMemory` 获取存储在内存中的 sql。 sql 中的参数已被替换
  > 返回带有`upQueries`和`downQueries`squls 数组的`SqlInMemory`对象
- `.executeMemoryUpSql(): Promise<void>` 执行内存中的 Up SQL 查询
- `.executeMemoryDownSql(): Promise<void>` 执行内存中的 Down SQL 查询

## 事务用

- `.startTransaction()` 启动一个新事务
- `.commitTransaction()` 提交所有更改
- `.rollbackTransaction()` 回滚所有更改
