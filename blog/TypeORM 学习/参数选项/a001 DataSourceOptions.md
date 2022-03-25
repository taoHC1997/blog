# `DataSourceOptions`

> `DataSourceOptions` 即常用连接数据库选项

- `type` - 数据库类型，**必需**
  > 你必须指定要使用的数据库引擎，该值可以是：
  >
  > - "mysql"
  > - "postgres"
  > - "cockroachdb"
  > - "sap"
  > - "mariadb"
  > - "sqlite"
  > - "cordova"
  > - "react-native"
  > - "nativescript"
  > - "sqljs"
  > - "oracle"
  > - "mssql"
  > - "mongodb"
  > - "aurora-mysql"
  > - "aurora-postgres"
  > - "expo"
  > - "better-sqlite3"
  > - "capacitor"
- `extra` - 要传递给底层驱动程序的额外连接选项
  > 如果要将额外设置传递给基础数据库驱动程序，请使用此配置
- `entities` - 要加载并用于此连接的实体
  > 此选项接受要加载的实体类和目录路径。示例：
  >
  > ```ts
  > `entities: [Post, Category, "entity/*.js", "modules/**/entity/*.js"]`;
  > ```
- `subscribers` - 要加载并用于此连接的订阅者
  > 接受要加载的实体类和目录。示例：
  >
  > ```ts
  > subscribers: [PostSubscriber, AppSubscriber, "subscriber/*.js", "modules/**/subscriber/*.js"];
  > ```
- `migrations` - 要加载和用于此连接的迁移
  > 接受要加载的迁移类和目录。示例:
  >
  > ```ts
  > migrations: [FirstMigration, SecondMigration, "migration/*.js", "modules/**/migration/*.js"];
  > ```
- `logging` - 指示是否启用日志记录
  > 如果设置为`true`，则将启用查询和错误日志记录。你还可以指定要启用的不同类型的日志记录，例如`["query", "error", "schema"]`
- `logger` - 记录器，用于日志的记录方式
  > 可能的值是"advanced-console", "simple-console" 和 "file"。默认为"advanced-console"。你还可以指定实现`Logger`接口的记录器类
- `maxQueryExecutionTime` - 如果查询执行时间超过此给定的最大执行时间（以毫秒为单位），则 logger 将记录此查询
- `namingStrategy` - 命名策略
  > 用于命名数据库中的表和列
- `entityPrefix` - 给此数据库连接上的所有表（或集合）加的前缀
- `dropSchema` - 每次建立连接时删除架构
  > 请注意此选项，**不要在生产环境中使用它**，否则将丢失所有生产数据。但是此选项在调试和开发期间非常有用
- `synchronize` - 指示是否在每次应用程序启动时自动创建数据库架构
  > 请注意此选项，**不要在生产环境中使用它**，否则将丢失所有生产数据。但是此选项在调试和开发期间非常有用。作为替代方案，你可以使用 CLI 运行 schema：sync 命令。请注意，对于 MongoDB 数据库，它不会创建模式，因为 MongoDB 是无模式的。相反，它只是通过创建索引来同步
- `migrationsRun` - 指示是否在每次启动应用程序时自动运行迁移
  > 或者，您可以使用 CLI run migrations:run command
- `migrationsTableName` - 数据库中将包含有关已执行迁移的信息的表的名称
  > 默认情况下，此表名为"migrations"
- `migrationsTransactionMode` - 设置迁移时的事务策略，默认 `all` 可为： `all` `none` `each`
- `metadataTableName` - 数据库中包含表元数据信息的表的名称，默认为 `"typeorm_metadata"`
- `cache` - 启用实体结果缓存
  > 你还可以在此处配置缓存类型和其他缓存选项
- `cli.entitiesDir` - CLI 默认情况下创建实体的目录
- `cli.migrationsDir` - CLI 默认情况下创建迁移的目录
- `cli.subscribersDir` - CLI 默认情况下创建订阅者的目录
