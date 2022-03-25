# Repository API

## 基础 Repository

```ts
// 创建实例
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { AppDataSource } from "./index";

const photoRepository = AppDataSource.getRepository(Photo);
```

- `manager` - 存储库使用的`EntityManager`
  ```ts
  const manager = repository.manager;
  ```
- `metadata` - 存储库管理的实体的`EntityMetadata`
  ```ts
  const metadata = repository.metadata;
  ```
- `queryRunner` - `EntityManager`使用的查询器。仅在 EntityManager 的事务实例中使用
  ```ts
  const queryRunner = repository.queryRunner;
  ```
- `target` - 此存储库管理的目标实体类。仅在 EntityManager 的事务实例中使用
  ```ts
  const target = repository.target;
  ```
- `createQueryBuilder` - 创建用于构建 SQL 查询的查询构建器
  ```ts
  const users = await repository
    .createQueryBuilder("user")
    .where("user.name = :name", { name: "John" })
    .getMany();
  ```
- `hasId` - 检查是否定义了给定实体的主列属性
  ```ts
  if (repository.hasId(user)) {
    // ... do something
  }
  ```
- `getId` - 获取给定实体的主列属性值。复合主键返回的值将是一个具有主列名称和值的对象
  ```ts
  const userId = repository.getId(user); // userId === 1
  ```
- `create` - 创建`User`的新实例。 接受具有用户属性的对象文字，该用户属性将写入新创建的用户对象（可选）
  ```ts
  const user = repository.create(); // 和 const user = new User(); 一样
  const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw",
  }); // 和 const user = new User(); user.firstName = "Timber"; user.lastName = "Saw"; 一样
  ```
- `merge` - 将多个实体合并为一个实体
  ```ts
  const user = new User();
  repository.merge(user, { firstName: "Timber" }, { lastName: "Saw" }); // 和 user.firstName = "Timber"; user.lastName = "Saw";一样
  ```
- `preload` - 从给定的普通 javascript 对象创建一个新实体。 如果实体已存在于数据库中，则它将加载它（以及与之相关的所有内容），并将所有值替换为给定对象中的新值，并返回新实体。 新实体实际上是从数据库加载的所有属性都替换为新对象的实体
  ```ts
  const partialUser = {
    id: 1,
    firstName: "Rizzrak",
    profile: {
      id: 1,
    },
  };
  const user = await repository.preload(partialUser);
  // user将包含partialUser中具有partialUser属性值的所有缺失数据：
  // { id: 1, firstName: "Rizzrak", lastName: "Saw", profile: { id: 1, ... } }
  ```
- `save` - 保存给定实体或实体数组
  ```ts
  // 如果该实体已存在于数据库中，则会更新该实体
  // 如果数据库中不存在该实体，则会插入该实体
  // 它将所有给定实体保存在单个事务中（在实体的情况下，管理器不是事务性的）
  // 因为跳过了所有未定义的属性，还支持部分更新
  await repository.save(user);
  await repository.save([category1, category2, category3]);
  ```
- `remove` - 删除给定的实体或实体数组，它将删除单个事务中的所有给定实体（在实体的情况下，管理器不是事务性的）
  ```ts
  await repository.remove(user);
  await repository.remove([category1, category2, category3]);
  ```
- `insert` - 插入新实体或实体数组
  ```ts
  await repository.insert({
    firstName: "Timber",
    lastName: "Timber",
  });
  await manager.insert(User, [
    {
      firstName: "Foo",
      lastName: "Bar",
    },
    {
      firstName: "Rizz",
      lastName: "Rak",
    },
  ]);
  ```
- `update` - 通过给定的更新选项或实体 ID 部分更新实体
  ```ts
  await repository.update({ firstName: "Timber" }, { firstName: "Rizzrak" });
  // 执行 UPDATE user SET firstName = Rizzrak WHERE firstName = Timber
  await repository.update(1, { firstName: "Rizzrak" });
  // 执行 UPDATE user SET firstName = Rizzrak WHERE id = 1
  ```
- `upsert` - 插入新的实体或实体数组，除非它们已经存在，否则会更新它们； AuroraDataApi Cockroach Mysql Postgres Sqlite 支持
  ```ts
  await repository.upsert(
    [
      { externalId: "abc123", firstName: "Rizzrak" },
      { externalId: "bca321", firstName: "Karzzir" },
    ],
    ["externalId"]
  );
  /** executes
   *  INSERT INTO user
   *  VALUES
   *      (externalId = abc123, firstName = Rizzrak),
   *      (externalId = cba321, firstName = Karzzir),
   *  ON CONFLICT (externalId) DO UPDATE firstName = EXCLUDED.firstName
   **/
  ```
- `delete` -根据实体 id, ids 或给定的条件删除实体
  ```ts
  await repository.delete(1);
  await repository.delete([1, 2, 3]);
  await repository.delete({ firstName: "Timber" });
  ```
- `softDelete` 和 `restore` - 根据实体 id 软删除实体及复原操作
  ```ts
  const repository = dataSource.getRepository(Entity);
  // 软删除
  await repository.softDelete(1);
  // 复原
  await repository.restore(1);
  ```
- `softRemove` 和 `recover` - 传入实体软删除实体及复原操作
  ```ts
  const entities = await repository.find();
  // 软删除
  const entitiesAfterSoftRemove = await repository.softRemove(entities);
  // 复原
  await repository.recover(entitiesAfterSoftRemove);
  ```
- `increment` - 增加符合条件的实体某些列值
  ```ts
  await repository.increment({ firstName: "Timber" }, "age", 3);
  ```
- `decrement` - 减少符合条件的实体某些列值
  ```ts
  await repository.decrement({ firstName: "Timber" }, "age", 3);
  ```
- `count` - 根据 `FindOptions` 统计指定条件的实体数量
  ```ts
  const count = await repository.count({
    where: {
      firstName: "Timber",
    },
  });
  ```
- `countBy` - 根据 `FindOptionsWhere` 统计指定条件的实体数量
  ```ts
  const count = await repository.countBy({ firstName: "Timber" });
  ```
- `find` - 根据 `FindOptions` 查找指定条件的实体
  ```ts
  const timbers = await repository.find({ firstName: "Timber" });
  ```
- `findBy` - 根据 `FindOptionsWhere` 查找指定条件的实体
  ```ts
  const timbers = await repository.findBy({
    firstName: "Timber",
  });
  ```
- `findAndCount` - 根据 `FindOptions` 查找指定条件的实体。还会计算与给定条件匹配的所有实体数量，会忽略分页设置 (`skip` 和 `take` 选项)
  ```ts
  const [timbers, timbersCount] = await repository.findAndCount({
    where: {
      firstName: "Timber",
    },
  });
  ```
- `findAndCountBy` - 根据 `FindOptionsWhere` 查找指定条件的实体。还会计算与给定条件匹配的所有实体数量，会忽略分页设置 (`skip` 和 `take` 选项)
  ```ts
  const [timbers, timbersCount] = await repository.findAndCount({
    firstName: "Timber",
  });
  ```
- `findOne` - 根据 `FindOptions` 查找匹配某些 ID 或查找选项的第一个实体
  ```ts
  const timber = await repository.findOne({
    where: {
      firstName: "Timber",
    },
  });
  ```
- `findOneBy` - 根据 `FindOptionsWhere` 查找匹配某些 ID 或查找选项的第一个实体
  ```ts
  const timber = await repository.findOne({ firstName: "Timber" });
  ```
- `findOneOrFail` - 根据 `FindOptions` 查找匹配某些 ID 或查找选项的第一个实体。 如果没有匹配，则 Rejects 一个 promise
  ```ts
  const timber = await repository.findOneOrFail({
    where: {
      firstName: "Timber",
    },
  });
  ```
- `findOneByOrFail` - 根据 `FindOptionsWhere` 查找匹配某些 ID 或查找选项的第一个实体。 如果没有匹配，则 Rejects 一个 promise
  ```ts
  const timber = await repository.findOneByOrFail({ firstName: "Timber" });
  ```
- `query` - 执行原始 SQL 查询
  ```ts
  const rawData = await repository.query(`SELECT * FROM USERS`);
  ```
- `clear` - 清除给定表中的所有数据(truncates/drops)
  ```ts
  await repository.clear();
  ```

## TreeRepository 使用

```ts
// 创建实例
let repository = await dataSource.getTreeRepository(Category);
```

- `findTrees` - 返回数据库中所有树，包括所有子项，子项的子项等
  ```ts
  const treeCategories = await repository.findTrees();
  // 返回包含子类别的根类别
  ```
- `findRoots` - 根节点是没有祖先的实体。 找到所有根节点但不加载子节点
  ```ts
  const rootCategories = await repository.findRoots();
  // 返回没有子类别的根类别
  ```
- `findDescendants` - 获取给定实体的所有子项（后代）。 将它们全部返回到数组中
  ```ts
  const childrens = await repository.findDescendants(parentCategory);
  // 返回parentCategory的所有直接子类别（没有其嵌套类别）
  ```
- `findDescendantsTree` - 获取给定实体的所有子项（后代）
  ```ts
  const childrensTree = await repository.findDescendantsTree(parentCategory);
  // 返回parentCategory的所有直接子类别（及其嵌套类别）
  ```
- `createDescendantsQueryBuilder` - 创建用于获取树中实体的后代的查询构建器
  ```ts
  const childrens = await repository
    .createDescendantsQueryBuilder("category", "categoryClosure", parentCategory)
    .andWhere("category.type = 'secondary'")
    .getMany();
  ```
- `countDescendants` - 获取实体的后代数
  ```ts
  const childrenCount = await repository.countDescendants(parentCategory);
  ```
- `findAncestors` - 获取给定实体的所有父（祖先）。 将它们全部返回到数组中
  ```ts
  const parents = await repository.findAncestors(childCategory);
  // 返回所有直接childCategory的父类别（和"parent 的 parents"）
  ```
- `findAncestorsTree` - Gets all parent (ancestors) of the given entity. Returns them in a tree - nested into each other
  ```ts
  const parentsTree = await repository.findAncestorsTree(childCategory);
  // 返回所有直接childCategory的父类别 (和 "parent 的 parents")
  ```
- `createAncestorsQueryBuilder` - 创建用于获取树中实体的祖先的查询构建器
  ```ts
  const parents = await repository
    .createAncestorsQueryBuilder("category", "categoryClosure", childCategory)
    .andWhere("category.type = 'secondary'")
    .getMany();
  ```
- `countAncestors` - 获取实体的祖先数
  ```ts
  const parentsCount = await repository.countAncestors(childCategory);
  ```

> 对应 `findTrees` `findRoots` `findDescendants` `findDescendantsTree` `findAncestors` `findAncestorsTree` ，可以设置 `relations` 直接联查
>
> ```ts
> const treeCategoriesWithRelations = await repository.findTrees({
>   relations: ["sites"],
> });
> const parentsWithRelations = await repository.findAncestors(childCategory, {
>   relations: ["members"],
> });
> ```

## MongoRepository

> 针对 MongoDB 比较特别的有：
>
> - `MongoEntityManager extends EntityManager` 对应 `getMongoManager()` 方法
> - `MongoRepository extends Repository` 对应 `getMongoRepository()` 方法

- `createCursor` 为查询创建一个游标，可用于迭代 MongoDB 的结果
- `createEntityCursor` 为查询创建一个游标，可用于迭代 MongoDB 的结果，这将返回游标的修改版本，该版本将每个结果转换为实体模型
- `aggregate` 针对集合执行 aggregation framework 管道
- `bulkWrite` 在没有连贯 API 的情况下执行 bulkWrite 操作
- `count` 计算 db 中与查询匹配的文档的数量
- `createCollectionIndex` 在 db 和 collection 上创建索引
- `createCollectionIndexes` 在集合中创建多个索引，此方法仅在 MongoDB 2.6 或更高版本中受支持
- `deleteMany` 删除 MongoDB 上的多个文档
- `deleteOne` 删除 MongoDB 上的文档
- `distinct` distinct 命令返回集合中给定键的不同值列表
- `dropCollectionIndex` 从此集合中删除索引
- `dropCollectionIndexes` 删除集合中的所有索引
- `findOneAndDelete` 查找文档并在一个 atomic 操作中将其删除，在操作期间需要写入锁定
- `findOneAndReplace` 查找文档并在一个 atomic 操作中替换它，在操作期间需要写入锁定
- `findOneAndUpdate` 查找文档并在一个 atomic 操作中更新它，在操作期间需要写入锁定
- `geoHaystackSearch` 使用集合上的 geo haystack 索引执行 geo 搜索
- `geoNear` 执行 geoNear 命令以搜索集合中的项目
- `group` 跨集合运行组命令
- `collectionIndexes` 检索集合上的所有索引
- `collectionIndexExists` 检索集合中是否存在索引
- `collectionIndexInformation` 检索此集合索引信息
- `initializeOrderedBulkOp` 启动按顺序批量写入操作，将按添加顺序连续执行操作，为类型中的每个开关创建新操作
- `initializeUnorderedBulkOp` 启动乱序批量写入操作。 所有操作都将缓冲到无序执行的 insert/update/remove 命令中
- `insertMany` 将一组文档插入 MongoDB
- `insertOne` 将单个文档插入 MongoDB
- `isCapped` 如果集合是上限集合，则返回
- `listCollectionIndexes` 获取集合的所有索引信息的列表
- `mapReduce` 在集合中运行 Map Reduce。 请注意，out 的内联选项将返回结果数组而不是集合
- `parallelCollectionScan` 为集合返回 N 个并行游标，允许并行读取整个集合。 返回的结果没有顺序保证
- `reIndex` 重新索引集合上的所有索引警告：reIndex 是一个阻塞操作（索引在前台重建），对于大型集合来说速度很慢
- `rename` 更改现有集合的名称
- `replaceOne` 替换 MongoDB 上的一个文档
- `stats` 获取所有集合的统计信息
- `updateMany` 根据过滤器更新集合中的多个文档
- `updateOne` 根据过滤器更新集合中的单个文档

## 自定义 Repository

> 配合自定义 Repository 可更好的实现 Data Mapper 模式

```ts
// user.repository.ts
export const UserRepository = dataSource.getRepository(User).extend({
  findOneByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  },
});
```
