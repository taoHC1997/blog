# CRUD 操作选项

## `find` 选项

```ts
userRepository.find({
  select: {
    firstName: true,
    lastName: true,
  },
  relations: {
    profile: true,
    photos: true,
    videos: true,
  },
  where: {
    firstName: "Timber",
    lastName: "Saw",
    profile: {
      userName: "tshaw",
    },
  },
  order: {
    name: "ASC",
    id: "DESC",
  },
  skip: 5,
  take: 10,
  cache: true,
});
```

- `select` - 表示必须选择对象的哪些属性
  ```ts
  userRepository.find({
    select: {
      firstName: true,
      lastName: true,
    },
  });
  ```
  ```sql
  SELECT "firstName", "lastName" FROM "user"
  ```
- `relations` - 关系需要加载主体。 也可以加载子关系（`join` 和 `leftJoinAndSelect` 的简写）
  ```ts
  userRepository.find({
    relations: {
      profile: true,
      photos: true,
      videos: true,
    },
  });
  userRepository.find({
    relations: {
      profile: true,
      photos: true,
      videos: {
        videoAttributes: true,
      },
    },
  });
  ```
  ```sql
  SELECT * FROM "user"
  LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
  LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
  LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"
  SELECT * FROM "user"
  LEFT JOIN "profile" ON "profile"."id" = "user"."profileId"
  LEFT JOIN "photos" ON "photos"."id" = "user"."photoId"
  LEFT JOIN "videos" ON "videos"."id" = "user"."videoId"
  LEFT JOIN "video_attributes" ON "video_attributes"."id" = "videos"."video_attributesId"
  ```
- `where` -查询实体的简单条件。
  ```ts
  userRepository.find({
    where: {
      firstName: "Timber",
      lastName: "Saw",
    },
  });
  ```
  ```sql
  SELECT * FROM "user"
  WHERE "firstName" = 'Timber' AND "lastName" = 'Saw'
  ```
  ```ts
  // OR
  userRepository.find({
    where: [
      { firstName: "Timber", lastName: "Saw" },
      { firstName: "Stan", lastName: "Lee" },
    ],
  });
  ```
  ```sql
  SELECT * FROM "user" WHERE ("firstName" = 'Timber' AND "lastName" = 'Saw') OR ("firstName" = 'Stan' AND "lastName" = 'Lee')
  ```
  ```ts
  // 联查 WHERE
  userRepository.find({
    relations: {
      project: true,
    },
    where: {
      project: {
        name: "TypeORM",
        initials: "TORM",
      },
    },
  });
  ```
  ```sql
  SELECT * FROM "user"
  LEFT JOIN "project" ON "project"."id" = "user"."projectId"
  WHERE "project"."name" = 'TypeORM' AND "project"."initials" = 'TORM'
  ```
- `order` - 选择排序
  ```ts
  userRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });
  ```
  ```sql
  SELECT * FROM "user"
  ORDER BY "name" ASC, "id" DESC
  ```
- `withDeleted` - 包括被软删除的值，默认 `false`
  ```typescript
  userRepository.find({
    withDeleted: true,
  });
  ```
- `skip` - 偏移（分页）
  ```ts
  userRepository.find({
    skip: 5,
  });
  ```
  ```sql
  SELECT * FROM "user"
  OFFSET 5
  ```
- `take` - limit (分页) - 得到的最大实体数。
  ```ts
  userRepository.find({
    take: 10,
  });
  ```
  ```sql
  SELECT * FROM "user"
  LIMIT 10
  ```
  ```ts
  // 如果你正在使用带有 MSSQL 的 typeorm，并且想要使用`take`或`limit`，你必须正确使用 order，否则将会收到以下错误：`'FETCH语句中NEXT选项的使用无效。'`
  userRepository.find({
    order: {
      columnName: "ASC",
    },
    skip: 0,
    take: 10,
  });
  ```
- `cache` - 启用或禁用查询结果缓存
  ```ts
  userRepository.find({
    cache: true,
  });
  ```
- `lock` - 启用锁查询。 只能在`findOne`方法中使用
  ```ts
  userRepository.findOne(1, {
    lock: { mode: "optimistic", version: 1 },
  });
  userRepository.findOne(1, {
    lock: {
      mode:
        "pessimistic_read" |
        "pessimistic_write" |
        "dirty_read" |
        "pessimistic_partial_write" |
        "pessimistic_write_or_fail" |
        "for_no_key_update",
    },
  });
  ```

> 下面是 lock 对应各个数据库的设置：
>
> |               | pessimistic_read         | pessimistic_write       | dirty_read    | pessimistic_partial_write | pessimistic_write_or_fail | for_no_key_update |
> | ------------- | ------------------------ | ----------------------- | ------------- | ------------------------- | ------------------------- | ----------------- |
> | MySQL         | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED    | FOR UPDATE NOWAIT         |                   |
> | Postgres      | FOR SHARE                | FOR UPDATE              | (nothing)     | FOR UPDATE SKIP LOCKED    | FOR UPDATE NOWAIT         | FOR NO KEY UPDATE |
> | Oracle        | FOR UPDATE               | FOR UPDATE              | (nothing)     |                           |                           |                   |
> | SQL Server    | WITH (HOLDLOCK, ROWLOCK) | WITH (UPDLOCK, ROWLOCK) | WITH (NOLOCK) |                           |                           |                   |
> | AuroraDataApi | LOCK IN SHARE MODE       | FOR UPDATE              | (nothing)     |                           |                           |                   |
> | CockroachDB   |                          | FOR UPDATE              | (nothing)     |                           | FOR UPDATE NOWAIT         | FOR NO KEY UPDATE |

## `save|insert|update` 选项

```ts
// users包含用user实体数组
userRepository.insert(users, { chunk: users.length / 1000 });
```

- `data` - 使用 persist 方法传递的其他数据。这个数据可以在订阅者中使用
- `listeners`: boolean - 指示是否为此操作调用监听者和订阅者。默认启用，可以通过在 save/remove 选项中设置`{listeners：false}`来禁用
- `transaction`: boolean - 默认情况下，启用事务并将持久性操作中的所有查询都包裹在事务中。可以通过在持久性选项中设置`{transaction：false}`来禁用此行为
- `chunk`: number - 中断将执行保存到多个块组中的操作。 例如，如果要保存 100.000 个对象但是在保存它们时遇到问题，可以将它们分成 10 组 10.000 个对象（通过设置`{chunk：10000}`）并分别保存每个组。 当遇到基础驱动程序参数数量限制问题时，需要此选项来执行非常大的插入
- `reload`: boolean - 用于确定是否应在持久性操作期间重新加载正在保留的实体的标志。 它仅适用于不支持 RETURNING/OUTPUT 语句的数据库。 默认情况下启用

## `remove|delete` 选项

```ts
// users包含用user实体数组
userRepository.remove(users, { chunk: entities.length / 1000 });
```

- `data` - 使用 remove 方法传递的其他数据。 这个数据可以在订阅者中使用
- `listener`: boolean - 指示是否为此操作调用监听者和订阅者。默认启用，可以通过在 save/remove 选项中设置`{listeners：false}`来禁用
- `transaction`: boolean - 默认情况下，启用事务并将持久性操作中的所有查询都包裹在事务中。可以通过在持久性选项中设置`{transaction：false}`来禁用此行为
- `chunk`: number - 中断将执行保存到多个块组中的操作。 例如，如果要保存 100.000 个对象但是在保存它们时遇到问题，可以将它们分成 10 组 10.000 个对象（通过设置`{chunk：10000}`）并分别保存每个组。 当遇到基础驱动程序参数数量限制问题时，需要此选项来执行非常大的插入

## 扩展的运算符

- `Not`
  ```ts
  import { Not } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Not("About #1"),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" != 'About #1'
  ```
- `LessThan`
  ```ts
  import { LessThan } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: LessThan(10),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" < 10
  ```
- `LessThanOrEqual`
  ```ts
  import { LessThanOrEqual } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: LessThanOrEqual(10),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" <= 10
  ```
- `MoreThan`
  ```ts
  import { MoreThan } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: MoreThan(10),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" > 10
  ```
- `MoreThanOrEqual`
  ```ts
  import { MoreThanOrEqual } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: MoreThanOrEqual(10),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" >= 10
  ```
- `Equal`
  ```ts
  import { Equal } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Equal("About #2"),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" = 'About #2'
  ```
- `Like`
  ```ts
  import { Like } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Like("%out #%"),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" LIKE '%out #%'
  ```
- `ILike`
  ```ts
  import { ILike } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: ILike("%out #%"),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" ILIKE '%out #%'
  ```
- `Between`
  ```ts
  import { Between } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: Between(1, 10),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" BETWEEN 1 AND 10
  ```
- `In`
  ```ts
  import { In } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: In(["About #2", "About #3"]),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" IN ('About #2','About #3')
  ```
- `Any`
  ```ts
  import { Any } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: Any(["About #2", "About #3"]),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" = ANY(['About #2','About #3'])
  ```
- `IsNull`
  ```ts
  import { IsNull } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    title: IsNull(),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "title" IS NULL
  ```
- `ArrayContains`
  ```ts
  import { ArrayContains } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    categories: ArrayContains(["TypeScript"]),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "categories" @> '{TypeScript}'
  ```
- `ArrayContainedBy`
  ```ts
  import { ArrayContainedBy } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    categories: ArrayContainedBy(["TypeScript"]),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "categories" <@ '{TypeScript}'
  ```
- `ArrayOverlap`
  ```ts
  import { ArrayOverlap } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    categories: ArrayOverlap(["TypeScript"]),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "categories" && '{TypeScript}'
  ```
- `Raw`
  ```ts
  import { Raw } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    likes: Raw("dislikes - 4"),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "likes" = "dislikes" - 4
  ```
  ```ts
  import { Raw } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    currentDate: Raw((alias) => `${alias} > NOW()`),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "currentDate" > NOW()
  ```
  ```ts
  // 防注入
  import { Raw } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findBy({
    currentDate: Raw((alias) => `${alias} > :date`, { date: "2020-10-06" }),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "currentDate" > '2020-10-06'
  ```
  ```ts
  import { Raw } from "typeorm";
  const loadedPosts = await dataSource.getRepository(Post).findby({
    title: Raw((alias) => `${alias} IN (:...titles)`, {
      titles: ["Go To Statement Considered Harmful", "Structured Programming"],
    }),
  });
  ```
  ```sql
  SELECT * FROM "post" WHERE "titles" IN ('Go To Statement Considered Harmful', 'Structured Programming')
  ```

最后，运算符可组合使用：

```ts
import { Not, MoreThan, Equal } from "typeorm";

const loadedPosts = await dataSource.getRepository(Post).findBy({
  likes: Not(MoreThan(10)),
  title: Not(Equal("About #2")),
});
```

```sql
SELECT * FROM "post" WHERE NOT("likes" > 10) AND NOT("title" = 'About #2')
```
