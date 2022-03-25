# TypeORM 缓存

> 针对 `QueryBuilder.getMany` `QueryBuilder.getOne` `QueryBuilder.getRawMany` `QueryBuilder.getRawOne` `QueryBuilder.getCount` `Repository.find` `Repository.count` 这些方法可设置缓存

## 使用缓存

### 一般使用

1. 启用缓存必须在连接选项中设置 `cache: true`
   ```ts
   const users = await dataSource
     .createQueryBuilder(User, "user")
     .where("user.isAdmin = :isAdmin", { isAdmin: true })
     .cache(true)
     .getMany();
   ```
   ```ts
   const users = await dataSource.getRepository(User).find({
     where: { isAdmin: true },
     cache: true,
   });
   ```
2. 缓存时间可手动设置（默认 `1000 ms` ）
   ```ts
   const users = await dataSource
     .createQueryBuilder(User, "user")
     .where("user.isAdmin = :isAdmin", { isAdmin: true })
     .cache(60000) // 1 分钟
     .getMany();
   ```
   ```ts
   const users = await dataSource.getRepository(User).find({
     where: { isAdmin: true },
     cache: 60000,
   });
   ```
   ```ts
   {
     type: "mysql",
     host: "localhost",
     username: "test",
     cache: {
       duration: 30000 // 30 seconds
     }
   }
   ```

### `cache id` 使用

设置 id ：

```ts
const users = await dataSource
  .createQueryBuilder(User, "user")
  .where("user.isAdmin = :isAdmin", { isAdmin: true })
  .cache("users_admins", 25000)
  .getMany();

const users = await dataSource.getRepository(User).find({
  where: { isAdmin: true },
  cache: {
    id: "users_admins",
    milliseconds: 25000,
  },
});
```

使用：

```ts
// 某些时候清缓存
await dataSource.queryResultCache.remove(["users_admins"]);
```

### 手动清除缓存

```s
typeorm cache：clear
```

## 缓存常见配置

### 默认缓存设置

```ts
{
  type: "mysql",
  host: "localhost",
  username: "test",
  // ...
  cache: {
    type: "database",
    tableName: "configurable-table-query-result-cache"
  }
}

```

### redis 缓存设置

- 参考：
  - https://github.com/NodeRedis/node_redis#options-object-properties
  - https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options

```ts
{
  type: "mysql",
  host: "localhost",
  username: "test",
  // ...
  cache: {
    type: "redis",
    options: {
      host: "localhost",
      port: 6379
    },
    ignoreErrors: true
  }
}
```

```ts
// ioredis 集群
{
  type: "mysql",
  host: "localhost",
  username: "test",
  cache: {
    type: "ioredis/cluster",
    options: {
      startupNodes: [
        {
          host: 'localhost',
          port: 7000,
        },
        {
          host: 'localhost',
          port: 7001,
        },
        {
          host: 'localhost',
          port: 7002,
        }
      ],
      options: {
        scaleReads: 'all',
        clusterRetryStrategy: function (times) { return null },
        redisOptions: {
          maxRetriesPerRequest: 1
        }
      }
    }
  }
}
```

## 自定义缓存处理

自定义：

```ts
class CustomQueryResultCache implements QueryResultCache {
  constructor(private dataSource: DataSource) {}
  // ...
}
```

配置：

```ts
{
  // ...
  cache: {
    provider(dataSource) {
      return new CustomQueryResultCache(dataSource);
    }
  }
}
```
