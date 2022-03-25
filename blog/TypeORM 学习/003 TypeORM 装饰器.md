# TypeORM 装饰器

## 普通实体装饰器

- `@Entity()` 创建实体，实体是一个映射到数据库表（或使用 MongoDB 时的集合）的类
  ```ts
  @Entity('my_users') // 实体使用自定义名
  @Entity({
    // 表名，默认使用实体类名
    name: "my_users",
    // 在表创建期间设置的数据库引擎（仅在某些数据库中有效）
    engine: "MyISAM",
    // 使用数据库的设置的名称
    database: 'secondDB',
    // 架构名称
    schema: 'public',
    // 架构更新中跳过标有 `false` 的实体
    synchronize: false,
    // 默认排序
    orderBy: {
      name: "ASC",
      id: "DESC"
    },
  })
  ```
- `@ViewEntity` 视图实体，映射到数据库视图的类
  ```ts
  @ViewEntity({
    // 可设置 `name` `database` `schema` `dependsOn`
    // 视图定义，必须设置
    expression: `
          SELECT "post"."id" "id", "post"."name" AS "name", "category"."name" AS "categoryName"
          FROM "post" "post"
          LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
      `,
  })
  export class PostCategory {
    @ViewColumn()
    id: number;
    @ViewColumn()
    name: string;
    @ViewColumn()
    categoryName: string;
  }
  // 另一个示例：
  @ViewEntity({
    expression: (dataSource: DataSource) =>
      dataSource
        .createQueryBuilder()
        .select("post.id", "id")
        .addSelect("post.name", "name")
        .addSelect("category.name", "categoryName")
        .from(Post, "post")
        .leftJoin(Category, "category", "category.id = post.categoryId"),
  })
  export class PostCategory {}
  ```

## 键列装饰器

### 普通键列装饰器

> 针对键类型有约束，见附录

- `@Column()` 普通键列，所有键列都可设置选项（ `ColumnOptions` ），默认传入类型约束
  - 示例：
    ```ts
    @Column("int")
    @Column({ type: "int" })
    @Column("varchar", { length: 200 })
    ```
  - 参数：
    - `type: ColumnType` 列类型
    - `name: string` 设置数据库表中的列名
    - `length: string|number` 列类型的长度
    - `width: number` 列类型的显示宽度。 仅用于 [MySQL integer types](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html)
    - `onUpdate: string` `ON UPDATE` 触发器。仅用于 [MySQL](https://dev.mysql.com/doc/refman/5.7/en/timestamp-initialization.html)
    - `nullable: boolean` 设置列值 `NULL` 或 `NOT NULL` ，默认 `false`
    - `update: boolean` - 指示 `save` 操作是否更新列值。如果为 `false` ，则只能在第一次插入对象时编写该值，默认值为 `true`
    - `insert: boolean` - 首次插入对象是否使用，默认值为 `true`
    - `select: boolean` - 定义在进行查询时是否默认隐藏此列。设置为`false`时，列数据不会显示标准查询，默认值 `true`
    - `default: string` 添加数据库级列的 `DEFAULT` 值
      ```ts
      // 可以使用函数
      @Column({ default: () => "NOW()" })
      ```
    - `primary: boolean` 将列标记为主列。 与 `@PrimaryColumn` 使用相同
    - `unique: boolean` 将列标记为唯一列（创建唯一约束）
    - `comment: string` 列的注释，并非所有数据库类型都支持
    - `precision: number` 十进制（精确数字）列的精度（仅适用于十进制列），这是为值存储的最大位数，用于某些列类型
    - `scale: number` 十进制（精确数字）列的比例（仅适用于十进制列），表示小数点右侧的位数，且不得大于精度。用于某些列类型
    - `zerofill: boolean` 将`ZEROFILL`属性设置为数字列。 仅在 MySQL 中使用，如果是`true`，MySQL 会自动将`UNSIGNED`属性添加到此列
    - `unsigned: boolean` 将`UNSIGNED`属性设置为数字列。 仅在 MySQL 中使用
    - `charset: string` 定义列字符集。 并非所有数据库类型都支持
    - `collation: string` 定义列排序规则
    - `enum: string[]|AnyEnum` 在`enum`列类型中使用，以指定允许的枚举值列表
    - `enumName: string` 生成的枚举类型的名称
    - `asExpression: string` 生成的列表达式。 仅用于 [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table-generated-columns.html)
    - `generatedType: "VIRTUAL"|"STORED"` 生成的列类型。 仅用于 [MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table-generated-columns.html)
    - `hstoreType: "object"|"string"` 返回类型`HSTORE`列。 以字符串或对象的形式返回值。 仅用于 [Postgres](https://www.postgresql.org/docs/9.6/static/hstore.html)
    - `array: boolean` 用于可以是数组的 postgres 列类型（例如 `int[]` ）
    - `transformer: ValueTransformer` 指定在读取或写入数据库时用于封送/取消封送此列的值转换器
    - `spatialFeatureType: string` 可选的要素类型（`Point` `Polygon` `LineString` `Geometry`）用作空间列的约束。 如果没有指定，默认为`Geometry`。 仅在 PostgreSQL 中使用
    - `srid: number` 可选的 [Spatial Reference ID](https://postgis.net/docs/using_postgis_dbmanagement.html#spatial_ref_sys) 用作空间列约束。如果未指定，则默认为`0`。 标准地理坐标（WGS84 基准面中的纬度/经度）对应于[EPSG 4326](http://spatialreference.org/ref/epsg/wgs-84/)。 仅在 PostgreSQL 中使用
- `@PrimaryColumn()` 创建一个主列，它可以获取任何类型的任何值。你也可以指定列类型。 如果未指定列类型，则将从属性类型自动推断。复合主列（多个主列）是可以的
- `@PrimaryGeneratedColumn()` 创建一个主列，该值将使用自动增量值自动生成
  - `increment` 默认
  - `uuid`
  - `identity`
  - `rowid`
- `@PrimaryGeneratedColumn("uuid")` 创建一个主列，该值将使用`uuid`自动生成。 Uuid 是一个独特的字符串 id。 你不必在保存之前手动分配其值，该值将自动生成
- `@ObjectIdColumn()` 针对 mongodb 的主列
- `@ViewColumn()` 视图实体列

> 注意，普通列可以使用辅助装饰器：

- `@Generated("uuid")` 使用 uuid 自动生成并存储到数据库中
- `@Generated("increment")` 自增
- `@Generated("identity")` 只有 PostgreSQL 10+ 支持：https://www.postgresql.org/docs/13/sql-createtable.html
- `@Generated("rowid")` 只有 CockroachDB 支持：https://www.cockroachlabs.com/docs/stable/serial.html

### 特殊列装饰器

- `@CreateDateColumn()` 是一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置
- `@UpdateDateColumn()` 是一个特殊列，在每次调用实体管理器或存储库的`save`时，自动更新实体日期。无需设置此列，该值将自动设置
- `@DeleteDateColumn()` 是一个特殊列，在每次调用实体管理器或存储库的删除时，自动更新实体日期。无需设置此列，该值将自动设置，此时是**软删除**
- `@VersionColumn()` 是一个特殊列，在每次调用实体管理器或存储库的`save`时自动增长实体版本（增量编号）。无需设置此列，该值将自动设置。此装饰器可用 `name` `transformer` ，注意 `transformer.to(value)` 永远不会使用

```ts
@Entity()
export class User {
  @CreateDateColumn()
  createdDate: Date;
}
```

### 索引、约束装饰器

- `@Index()` 设置索引
  ```ts
  @Entity()
  @Index(["firstName", "lastName"])
  @Index(["lastName", "middleName"])
  @Index(["firstName", "lastName", "middleName"], { unique: true })
  export class User {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    middleName: string;
  }
  ```
- `@Index("name1-idx")` 指定索引名称
- `@Index({ unique: true })` 创建唯一索引
- `@Index(["firstName", "middleName", "lastName"], { unique: true })` 配合 `@Entity()` 使用的联合索引
- `@Index({ spatial: true })` 空间索引
  ```ts
  // MySQL 和 PostgreSQL（当 PostGIS 可用时）都支持空间索引：
  // 要在 MySQL 中的列上创建空间索引，请在使用空间类型的列（`geometry`，`point`，`linestring`，`polygon`，`multipoint`，`multilinestring`，`multipolygon`，`geometrycollection`）上添加`index`，其中`spatial：true`）
  // 要在 PostgreSQL 中的列上创建空间索引，请在使用空间类型（`geometry`，`geography`）的列上添加带有`spatial：true`的`Index`
  @Entity()
  export class Thing {
    @Column("geometry", {
      spatialFeatureType: "Point",
      srid: 4326,
    })
    @Index({ spatial: true })
    point: Geometry;
  }
  ```
- `@Unique(["firstName"])` 唯一约束装饰器，只能作用于实体，注意：MySQL 将唯一约束存储为唯一索引
  ```ts
  @Entity()
  @Unique(["firstName"])
  @Unique(["lastName", "middleName"])
  @Unique("UQ_NAMES", ["firstName", "lastName", "middleName"])
  export class User {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    middleName: string;
  }
  ```
- `@Check(`"age" > 18`)` 检查约束装饰器，注意：MySQL 不支持检查约束
  ```ts
  @Entity()
  @Check(`"firstName" <> 'John' AND "lastName" <> 'Doe'`)
  @Check(`"age" > 18`)
  export class User {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    age: number;
  }
  ```
- `@Exclusion()` 为特定列或列创建数据库排除约束，注意：只有 PostgreSQL 支持
  ```ts
  @Entity()
  @Exclusion(`USING gist ("room" WITH =, tsrange("from", "to") WITH &&)`)
  export class RoomBooking {
    @Column()
    room: string;
    @Column()
    from: Date;
    @Column()
    to: Date;
  }
  ```

> 注意：TypeORM 不支持某些索引选项和定义（例如`lower`，`pg_trgm`），因为它们具有许多不同的数据库细节以及获取有关现有数据库索引的信息并自动同步的多个问题。 在这种情况下，你应该使用所需的任何索引签名手动创建索引（例如在迁移中）。 要使 TypeORM 在同步期间忽略这些索引，请在`@Index`装饰器上使用`synchronize：false`选项，下面是一个示例：
>
> ```sql
> CREATE INDEX "POST_NAME_INDEX" ON "post" (lower("name"))
> ```
>
> ```ts
> @Entity()
> // 禁用此索引的同步，以避免在下一个架构同步时删除
> @Index("POST_NAME_INDEX", { synchronize: false })
> export class Post {
>   @PrimaryGeneratedColumn()
>   id: number;
>   @Column()
>   name: string;
> }
> ```

### 关联关系装饰器

- `@OneToOne(() => Photo)` 一对一
  > 官方建议使用 `@OneToOne(type => Photo)` 语义直观
- `@OneToOne(() => Photo, (photo) => photo.metadata)` 互相一对一
  > 此装饰器配合 `@JoinColumn()` 可拿到另外的所有数据，建议仅（重要的）一方设置
- `@OneToOne(() => PhotoMetadata, metadata => metadata.photo, { cascade: true })` 互相一对一关联性自动保存（效果就是设置了保存一次即可）
- `@OneToMany(() => Photo, photo => photo.author)` 一对多，此表此数据设置多个
- `@ManyToOne(() => Author, author => author.photos)` 多对一，此表此数据设置一个
- `@ManyToMany(() => Photo, (photo) => photo.albums)` 多对多

> 注意，上列装饰器最后一个选项为一个配置对象，这里介绍下此对象：
>
> - `eager: boolean` 如果设置为 `true` ，则在此实体上使用`find *` 或`QueryBuilder`时，将始终使用主实体加载关系
> - `cascade: boolean|("insert" | "update" | "remove" | "soft-remove" | "recover")[]` 如果设置为 `true` ，则将插入相关对象并在数据库中更新
> - `onDelete: "RESTRICT"|"CASCADE"|"SET NULL"` 指定删除引用对象时外键的行为方式
> - `primary: boolean` 指示此关系的列是否为主列
> - `nullable: boolean` 指示此关系的列是否可为空，默认可空
> - `orphanedRowAction: "nullify" | "delete"` 将子行从其父行中删除后，确定该子行是孤立的（默认值）还是删除的
> - `createForeignKeyConstraints: boolean` 设置为 `false` 表示不需要外键约束，默认 `true`

关系装饰器也有辅助的装饰器：

- `@JoinColumn()` 定义了关系的哪一侧包含带有外键的连接列，在所有者定义
  ```ts
  @ManyToOne(type => Category)
  @JoinColumn([
    { name: "category_id", referencedColumnName: "id" },
    { name: "locale_id", referencedColumnName: "locale_id" }
  ]) // 这个装饰器对于@ManyToOne是可选的，但@OneToOne是必需的
  category: Category;
  ```
- `@JoinColumn({ name: "cat_id" })` 自定义连接列名
- `@JoinColumn({ referencedColumnName: "name" })` 自定义引用列名
- `@JoinTable()` 用于**多对多**关系，在所有者定义
  ```ts
  @ManyToMany(type => Category)
  // 如果目标表具有复合主键，必须设置
  @JoinTable({
      name: "question_categories" // 此关系的联结表的表名
      joinColumn: {
        name: "question",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "category",
        referencedColumnName: "id"
      }
  })
  categories: Category[];
  ```
- `@RelationId((post: Post) => post.category)` 将特定关系的 id 加载到属性中
  ```ts
  @Entity()
  export class Post {
    @ManyToOne((type) => Category)
    category: Category;
    // 此装饰器适用于所有关系，仅用于表现
    @RelationId((post: Post) => post.category) // 需要指定目标关系
    categoryId: number;
  }
  ```

## 单表继承

- `@TableInheritance({ column: { type: "varchar", name: "type" } })` 单表继承基础类
- `@ChildEntity()` 实现了单表继承的类

## 树形结构

- 参考： https://www.slideshare.net/billkarwin/models-for-hierarchical-data

### Adjacency 列表

- `@Tree("nested-set")` 嵌套集
  - `@TreeChildren()`
  - `@TreeParent()`
- `@Tree("materialized-path")` 物化路径(又名路径枚举)
  - `@TreeChildren()`
  - `@TreeParent()`
- `@Tree("closure-table")` 闭合表
  - `@TreeChildren()`
  - `@TreeParent()`

### Closure 表

- `@Tree("closure-table")` 约束实体
  - `@TreeChildren()`
  - `@TreeParent()`
  - `@TreeLevelColumn()`

## 事件装饰器

### 基础事件监听触发装饰器

> 在 `@Entity()` 中定义

- `@AfterLoad()` 对应任何加载查找方法
- `@BeforeInsert()` 对应 `save()`
- `@AfterInsert()` 对应 `save()`
- `@BeforeUpdate()` 对应 `save()` ，但必须有改动
- `@AfterUpdate()` 对应 `save()` ，但必须有改动
- `@BeforeRemove()` 对应 `remove()`
- `@AfterRemove()` 对应 `remove()`
- `@BeforeSoftRemove()` 对应 `softRemove()`
- `@AfterSoftRemove()` 对应 `softRemove()`
- `@BeforeRecover()` 对应 `recover()`
- `@AfterRecover()` 对应 `recover()`

这里是一个简单的示例：

```ts
@Entity()
export class Post {
  @BeforeInsert()
  updateDates() {
    this.createdDate = new Date();
  }
}
```

### 配置事件订阅者装饰器

- `@EventSubscriber()`

```ts
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
  /**
   * 表示此订阅者仅侦听 Post 事件
   */
  listenTo() {
    return Post;
  }

  /**
   * POST INSERTED 之前调用
   */
  beforeInsert(event: InsertEvent<Post>) {
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }
}
```

```ts
// 监听任何实体，你只需省略 `listenTo` 方法并使用 `any`
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  /**
   * Called after entity is loaded.
   */
  afterLoad(entity: any) {
    console.log(`AFTER ENTITY LOADED: `, entity);
  }

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<any>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<any>) {
    console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  }

  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<any>) {
    console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  }

  /**
   * Called before entity removal.
   */
  beforeSoftRemove(event: SoftRemoveEvent<any>) {
    console.log(`BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity);
  }

  /**
   * Called after entity removal.
   */
  afterSoftRemove(event: SoftRemoveEvent<any>) {
    console.log(`AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity);
  }

  /**
   * Called before entity removal.
   */
  beforeRecover(event: RecoverEvent<any>) {
    console.log(`BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
  }

  /**
   * Called after entity removal.
   */
  afterRecover(event: RecoverEvent<any>) {
    console.log(`AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
  }

  /**
   * Called before transaction start.
   */
  beforeTransactionStart(event: TransactionStartEvent) {
    console.log(`BEFORE TRANSACTION STARTED: `, event);
  }

  /**
   * Called after transaction start.
   */
  afterTransactionStart(event: TransactionStartEvent) {
    console.log(`AFTER TRANSACTION STARTED: `, event);
  }

  /**
   * Called before transaction commit.
   */
  beforeTransactionCommit(event: TransactionCommitEvent) {
    console.log(`BEFORE TRANSACTION COMMITTED: `, event);
  }

  /**
   * Called after transaction commit.
   */
  afterTransactionCommit(event: TransactionCommitEvent) {
    console.log(`AFTER TRANSACTION COMMITTED: `, event);
  }

  /**
   * Called before transaction rollback.
   */
  beforeTransactionRollback(event: TransactionRollbackEvent) {
    console.log(`BEFORE TRANSACTION ROLLBACK: `, event);
  }

  /**
   * Called after transaction rollback.
   */
  afterTransactionRollback(event: TransactionRollbackEvent) {
    console.log(`AFTER TRANSACTION ROLLBACK: `, event);
  }
}
```
