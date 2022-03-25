# Query Builder API

> `QueryBuilder`是 TypeORM 最强大的功能之一 ，它允许你使用优雅便捷的语法构建 SQL 查询，执行并获得自动转换的实体

## 基础使用

### 入口获取

- 使用 DataSource:
  ```ts
  const user = await dataSource
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```
- 使用 entity manager:
  ```ts
  const user = await dataSource.manager
    .createQueryBuilder(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```
- 使用 repository:
  ```ts
  const user = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```

### 五种类型

#### `SelectQueryBuilder`

> 对应 `SELECT` ，使用 `.select("user")`

```ts
const user = await dataSource
  .createQueryBuilder()
  .select("user")
  .from(User, "user")
  .where("user.id = :id", { id: 1 })
  .getOne();
```

```ts
// select() 可限制获取字段
const user = await dataSource.createQueryBuilder("user").select(["user.id", "user.name"]).getMany();
```

#### `InsertQueryBuilder`

> 对应 `INSERT` ，使用 `.insert()` ，此语句性能最好

```ts
await dataSource
  .createQueryBuilder()
  .insert()
  .into(User)
  .values([
    { firstName: "Timber", lastName: "Saw" },
    { firstName: "Phantom", lastName: "Lancer" },
  ])
  .execute();
```

```ts
await dataSource
  .createQueryBuilder()
  .insert()
  .into(User)
  .values({
    firstName: "Timber",
    lastName: () => "CONCAT('S', 'A', 'W')",
  })
  .execute();
```

#### `UpdateQueryBuilder`

> 对应 `UPDATE` ，使用 `.update(User)` ，此语句性能最好

```ts
await dataSource
  .createQueryBuilder()
  .update(User)
  .set({ firstName: "Timber", lastName: "Saw" })
  .where("id = :id", { id: 1 })
  .execute();
```

```ts
// 可使用 SQL
await dataSource
  .createQueryBuilder()
  .update(User)
  .set({
    firstName: "Timber",
    lastName: "Saw",
    age: () => "'age' + 1",
  })
  .where("id = :id", { id: 1 })
  .execute();
```

#### `DeleteQueryBuilder`

##### 基本 `DELETE`

> 对应 `DELETE` ，使用 `.delete()` ，此语句性能最好

```ts
await dataSource.createQueryBuilder().delete().from(User).where("id = :id", { id: 1 }).execute();
```

##### `Soft-Delete` 软删除

```ts
await dataSource.getRepository(Entity).createQueryBuilder().softDelete();
```

##### `Restore-Soft-Delete` 撤销软删除

```ts
await dataSource.getRepository(Entity).createQueryBuilder().restore();
```

#### `RelationQueryBuilder`

> `RelationQueryBuilder` 是 `QueryBuilder` 的一种允许你使用关系来查询的特殊类型。 通过使用你可以在数据库中将实体彼此绑定，而无需加载任何实体，或者可以轻松地加载相关实体

```ts
await dataSource.createQueryBuilder().relation(User, "photos").of(id).loadMany();
```

上面代码相当于（注意，上面代码更合适）：

```ts
const postRepository = dataSource.manager.getRepository(Post);
const post = await postRepository.findOne({
  where: {
    id: 1,
  },
  relations: {
    categories: true,
  },
});
post.categories.push(category);
await postRepository.save(post);
```

下面给出更多示例：

```ts
// 在 id 为 1 的 post 中添加 id = 3 的 category ，如果使用了复合主键，必须都查
await dataSource.createQueryBuilder().relation(Post, "categories").of(1).add(3);
```

```ts
// 此代码从给定的post中删除一个category （针对`多对多`和`一对多`）
await dataSource
  .createQueryBuilder()
  .relation(Post, "categories")
  .of(post) // 也可以使用post id
  .remove(category); // 也可以只使用category ID

// 此代码set给定post的category （针对`一对一`和`多对一`）
await dataSource
  .createQueryBuilder()
  .relation(Post, "categories")
  .of(post) // 也可以使用post id
  .set(category); // 也可以只使用category ID
```

```ts
const post = await dataSource.manager.findOneBy(Post, {
  id: 1,
});

post.categories = await dataSource
  .createQueryBuilder()
  .relation(Post, "categories")
  .of(post) // 也可以使用post id
  .loadMany();

post.author = await dataSource
  .createQueryBuilder()
  .relation(Post, "user")
  .of(post) // 也可以使用post id
  .loadOne();
```

### 子查询

```ts
const qb = await dataSource.getRepository(Post).createQueryBuilder("post");

const posts = qb
  .where(
    "post.title IN " +
      qb
        .subQuery()
        .select("user.name")
        .from(User, "user")
        .where("user.registered = :registered")
        .getQuery()
  )
  .setParameter("registered", true)
  .getMany();

const posts = await dataSource
  .getRepository(Post)
  .createQueryBuilder("post")
  .where((qb) => {
    const subQuery = qb
      .subQuery()
      .select("user.name")
      .from(User, "user")
      .where("user.registered = :registered")
      .getQuery();
    return "post.title IN " + subQuery;
  })
  .setParameter("registered", true)
  .getMany();
```

```ts
const userQb = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .select("user.name", "name")
  .where("user.registered = :registered", { registered: true });

const posts = await dataSource
  .createQueryBuilder()
  .select("user.name", "name")
  .from("(" + userQb.getQuery() + ")", "user")
  .setParameters(userQb.getParameters())
  .getRawMany();
```

### 基础 API

#### 创建

- `createQueryBuilder()`
- `createQueryBuilder("user")` 等同： `createQueryBuilder().select("user").from(User, "user")`

#### 查询

- `.select("user")`
- `.select(["user.id", "user.name"])`
- `.addSelect("user.password")` 查询隐藏列
  ```ts
  // 默认情况 @Column({ select: false }) 不会被查询
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder()
    .select("user.id", "id")
    .addSelect("user.password")
    .getMany();
  ```

#### 获取

- `.getOne()` 获取单个结果
- `.getOneOrFail()` 获取单个结果，找不到抛出 `EntityNotFoundError`
- `.getMany()` 获取多个结果
- `.getRawOne()` 获取单个原始数据
- `.getRawMany()` 获取多个原始数据
- `.stream()` 流式获取，返回的是原始数据
  ```ts
  const stream = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .stream();
  ```
- `.getCount()` 获取数目
- `.returning(['id'])`
  ```ts
  const insertQueryBuilder = dataSource
    .getRepository(User)
    .createQueryBuilder()
    .insert({
      name: "John Smith",
    })
    .returning(["id"]);
  ```

#### 分页功能

> 注意，下面方法与 `limit` `offset` 是不同的， TypeORM 做了更好的封装

- `.skip(5)` 跳过几个数据
- `.take(10)` 拿几个数据

```ts
const users = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.photos", "photo")
  .skip(5)
  .take(10)
  .getMany();
```

#### 锁定功能

> QueryBuilder 支持 optimistic 和 pessimistic 锁定，其中 Optimistic 锁定与`@Version`和`@UpdatedDate`装饰器一起使用

```ts
// 使用 pessimistic 读锁定
const users = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .setLock("pessimistic_read")
  .getMany();

// 使用 pessimistic 写锁定
const users = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .setLock("pessimistic_write")
  .getMany();
```

```ts
// 使用 optimistic 读锁定
const users = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .setLock("optimistic", existUser.version)
  .getMany();
```

```ts
// 使用 dirty 读锁定
const users = await dataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .setLock("dirty_read")
  .getMany();
```

#### 其他 api

- `.useIndex("my_index")` 使用特定索引（ mysql ）
  ```ts
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .useIndex("my_index") // name of index
    .getMany();
  ```
- `.maxExecutionTime(1000)` 设置超时时间（毫秒）
  ```ts
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .maxExecutionTime(1000)
    .getMany();
  ```
- `.withDeleted()`
  ```ts
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder()
    .select("user.id", "id")
    .withDeleted()
    .getMany();
  ```
- `.from(User, "user")`
- `.setParameter("registered", true)`
- `.addCommonTableExpression()` 公共表表达式（ Oracle 还不支持 ）
  ```ts
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .select("user.id", "id")
    .addCommonTableExpression(
      `
      SELECT "userId" FROM "post"
      `,
      "post_users_ids"
    )
    .where(`user.id IN (SELECT "userId" FROM 'post_users_ids')`)
    .getMany();
  ```

## 有对应 SQL 语句的 API

### `WHERE`

> 不要在查询构建器中为不同的值使用相同的参数名称，多次设置则后值将会把前面的覆盖

```ts
// 此语法防注入
createQueryBuilder("user").where("user.name = :name", { name: "Timber" });
createQueryBuilder("user").where("user.name IN (:...names)", {
  names: ["Timber", "Cristal", "Lina"],
});
```

> 参数也可如下设置：
>
> ```ts
> .where("user.name = :name")
> .setParameter("name", "Timber")
> ```

#### `AND WHERE`

```ts
createQueryBuilder("user")
  .where("user.firstName = :firstName", { firstName: "Timber" })
  .andWhere("user.lastName = :lastName", { lastName: "Saw" });
```

```sql
SELECT ... FROM users user WHERE user.firstName = 'Timber' AND user.lastName = 'Saw'
```

#### `OR WHERE`

```ts
createQueryBuilder("user")
  .where("user.firstName = :firstName", { firstName: "Timber" })
  .orWhere("user.lastName = :lastName", { lastName: "Saw" });
```

```sql
SELECT ... FROM users user WHERE user.firstName = 'Timber' OR user.lastName = 'Saw'
```

### `HAVING`

```ts
createQueryBuilder("user").having("user.name = :name", { name: "Timber" });
```

```sql
SELECT ... FROM users user HAVING user.name = 'Timber'
```

#### `AND HAVING`

```ts
createQueryBuilder("user")
  .having("user.firstName = :firstName", { firstName: "Timber" })
  .andHaving("user.lastName = :lastName", { lastName: "Saw" });
```

```sql
SELECT ... FROM users user HAVING user.firstName = 'Timber' AND user.lastName = 'Saw'
```

#### `OR HAVING`

```ts
createQueryBuilder("user")
  .having("user.firstName = :firstName", { firstName: "Timber" })
  .orHaving("user.lastName = :lastName", { lastName: "Saw" });
```

```sql
SELECT ... FROM users user HAVING user.firstName = 'Timber' OR user.lastName = 'Saw'
```

### `ORDER BY`

```ts
createQueryBuilder("user").orderBy("user.id");
```

```sql
SELECT ... FROM users user ORDER BY user.id
```

```ts
// 更多示例
createQueryBuilder("user").orderBy("user.id", "DESC");

createQueryBuilder("user").orderBy("user.id", "ASC");

createQueryBuilder("user").orderBy({
  "user.name": "ASC",
  "user.id": "DESC",
});
```

#### 添加 `ORDER BY`

```ts
createQueryBuilder("user").orderBy("user.name").addOrderBy("user.id");
```

#### `DISTINCT ON`

```typescript
createQueryBuilder("user").distinctOn(["user.id"]).orderBy("user.id");
```

```sql
SELECT DISTINCT ON (user.id) ... FROM users user ORDER BY user.id
```

### `GROUP BY`

```ts
createQueryBuilder("user").groupBy("user.id");
```

```sql
SELECT ... FROM users user GROUP BY user.id
```

#### 添加 `GROUP BY`

```ts
createQueryBuilder("user").groupBy("user.name").addGroupBy("user.id");
```

### `LIMIT`

> 如果使用分页，建议使用 `take` 代替

```ts
createQueryBuilder("user").limit(10);
```

```sql
SELECT ... FROM users user LIMIT 10
```

### `OFFSET`

> 如果使用分页，建议使用 `skip` 代替

```ts
createQueryBuilder("user").offset(10);
```

```sql
SELECT ... FROM users user OFFSET 10
```

### `LEFT JOIN`

```ts
const user = await createQueryBuilder("user")
  // 第一个参数是你要加载的关系，第二个参数是你为此关系的表分配的别名
  .leftJoinAndSelect("user.photos", "photo")
  .where("user.name = :name", { name: "Timber" })
  .andWhere("photo.isRemoved = :isRemoved", { isRemoved: false })
  .getOne();
```

```sql
SELECT user.*, photo.* FROM users user
    LEFT JOIN photos photo ON photo.user = user.id
    WHERE user.name = 'Timber' AND photo.isRemoved = FALSE
```

另一个示例（不使用条件的联查）：

```ts
const user = await createQueryBuilder("user")
  .leftJoin("user.photos", "photo")
  .where("user.name = :name", { name: "Timber" })
  .getOne();
// 这将会返回 Timber 如果他有 photos，但是并不会返回他的 photos
```

```sql
SELECT user.* FROM users user
    LEFT JOIN photos photo ON photo.user = user.id
    WHERE user.name = 'Timber'
```

#### 联查映射

- `leftJoinAndMapOne` 对应单个实体
- `leftJoinAndMapMany` 对应多个实体

```ts
// 这将加载 Timber 的个人资料照片并将其设置为`user.profilePhoto`
const user = await createQueryBuilder("user")
  .leftJoinAndMapOne("user.profilePhoto", "user.photos", "photo", "photo.isForProfile = TRUE")
  .where("user.name = :name", { name: "Timber" })
  .getOne();
```

### `INNER JOIN`

> `LEFT JOIN`和`INNER JOIN`之间的区别在于，如果没有任何 photos，`INNER JOIN`将不会返回 user。即使没有 photos，`LEFT JOIN`也会返回 user

```ts
const user = await createQueryBuilder("user")
  .innerJoinAndSelect("user.photos", "photo", "photo.isRemoved = :isRemoved", { isRemoved: false })
  .where("user.name = :name", { name: "Timber" })
  .getOne();
```

```sql
SELECT user.*, photo.* FROM users user
    INNER JOIN photos photo ON photo.user = user.id AND photo.isRemoved = FALSE
    WHERE user.name = 'Timber'
```

另一个示例（不使用条件的联查）：

```ts
const user = await createQueryBuilder("user")
  .innerJoin("user.photos", "photo")
  .where("user.name = :name", { name: "Timber" })
  .getOne();
// 这将会返回 Timber 如果他有 photos，但是并不会返回他的 photos
```

```sql
SELECT user.* FROM users user
    INNER JOIN photos photo ON photo.user = user.id
    WHERE user.name = 'Timber'
```

### `()` `Brackets`

```ts
createQueryBuilder("user")
  .where("user.registered = :registered", { registered: true })
  .andWhere(
    new Brackets((qb) => {
      qb.where("user.firstName = :firstName", {
        firstName: "Timber",
      }).orWhere("user.lastName = :lastName", { lastName: "Saw" });
    })
  );
```

```sql
SELECT ... FROM users user WHERE user.registered = true AND (user.firstName = 'Timber' OR user.lastName = 'Saw')
```

### `NOT()` `NotBrackets`

```ts
createQueryBuilder("user")
  .where("user.registered = :registered", { registered: true })
  .andWhere(
    new NotBrackets((qb) => {
      qb.where("user.firstName = :firstName", {
        firstName: "Timber",
      }).orWhere("user.lastName = :lastName", { lastName: "Saw" });
    })
  );
```

```sql
SELECT ... FROM users user WHERE user.registered = true AND NOT((user.firstName = 'Timber' OR user.lastName = 'Saw'))
```

### 获取生成的 sql 语句

- `.getSql()` 获取语句
- `.printSql()` 打印语句

```ts
const sql = createQueryBuilder("user")
  .where("user.firstName = :firstName", { firstName: "Timber" })
  .orWhere("user.lastName = :lastName", { lastName: "Saw" })
  .getSql();
```

```ts
const users = await createQueryBuilder("user")
  .where("user.firstName = :firstName", { firstName: "Timber" })
  .orWhere("user.lastName = :lastName", { lastName: "Saw" })
  .printSql()
  .getMany();
```
