# TypeORM 0.2.x

> 此文档主要包含使用示例，仅供参考

- github：
  - https://github.com/typeorm/typeorm
- 文档：
  - 老版中文： https://typeorm.bootcss.com/

## 基础介绍

> TypeORM 支持 **Data Mapper** 与 **Active Record**

快速开始：

1. 安装
   ```s
   # 这两个库请全局导入
   npm i typeorm
   npm i reflect-metadata
   npm i -D @types/node
   ```
2. 安装对应数据库
   ```s
   # mysql 或 MariaDB
   npm i mysql
   npm i mysql2
   # PostgreSQL
   npm i pg
   # SQLite
   npm i sqlite3
   # Microsoft SQL Server
   npm i mssql
   # sql.js
   npm i sql.js
   # Oracle
   npm i oracledb
   # MongoDB
   npm i mongodb
   # SAP Hana
   npm config set @sap:registry https://npm.sap.com
   npm i @sap/hana-client
   npm i hdb-pool
   ```
3. 配置 `tsconfig.json`
   ```json
   {
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true
   }
   ```

## 简单使用

### 创建数据模型（表）

> 注意： 数据模型也可以对象的方式配置，官方叫 `entity schemas` ，这里我不做说明

#### 普通示例

##### 简单创建实体

```ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column("double")
  views: number;

  @Column()
  isPublished: boolean;
}
```

##### 复杂键

###### `enum` 类型

> `postgres`和`mysql`都支持`enum`列类型，支持字符串，数字和异构枚举

- 使用 typescript 枚举
  ```typescript
  export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost",
  }
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.GHOST,
    })
    role: UserRole;
  }
  ```
- 使用带枚举值的数组
  ```typescript
  export type UserRoleType = "admin" | "editor" | "ghost",
  @Entity()
  export class User {
      @PrimaryGeneratedColumn()
      id: number;
      @Column({
          type: "enum",
          enum: ["admin", "editor", "ghost"],
          default: "ghost"
      })
      role: UserRoleType
  }
  ```

###### `simple-array` 类型

> 有一种称为`simple-array`的特殊列类型，它可以将原始数组值存储在单个字符串列中。所有值都以逗号分隔。注意**不能**在值里面有任何逗号

定义：

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  names: string[];
}
```

使用：

```typescript
const user = new User();
user.names = ["Alexander", "Alex", "Sasha", "Shurik"];
```

###### `simple-json` 类型

> 还有一个名为`simple-json`的特殊列类型，它可以存储任何可以通过 JSON.stringify 存储在数据库中的值。当你的数据库中没有 json 类型而你又想存储和加载对象，该类型就很有用了。

定义：

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-json")
  profile: { name: string; nickname: string };
}
```

使用：

```typescript
const user = new User();
user.profile = { name: "John", nickname: "Malkovich" };
// 获取时会有一个默认的 JSON.parse
```

#### 表关联

##### 单表关联

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  photo: Photo;
}
```

```ts
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

// 创建 photo
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.isPublished = true;

// 创建 photo metadata
let metadata = new PhotoMetadata();
metadata.height = 640;
metadata.width = 480;
metadata.compressed = true;
metadata.comment = "cybershoot";
metadata.orientation = "portait";
metadata.photo = photo; // 联接两者

createConnection(config)
  .then(async (connection) => {
    // 获取实体 repositories
    let photoRepository = connection.getRepository(Photo);
    let metadataRepository = connection.getRepository(PhotoMetadata);

    // 先保存photo
    await photoRepository.save(photo);

    // 然后保存photo的metadata
    await metadataRepository.save(metadata);

    // 完成
    console.log(
      "Metadata is saved, and relation between metadata and photo is created in the database too"
    );
  })
  .catch((error) => console.log(error));
```

##### 互建关联

###### 一对一

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  /* ... other columns */

  @OneToOne(() => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo: Photo;
}
```

```ts
@Entity()
export class Photo {
  /* ... other columns */

  @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata: PhotoMetadata;
}
```

###### 一多互对

```ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  photos: Photo[];
}
```

```ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { Author } from "./Author";

@Entity()
export class Photo {
  /* ... other columns */

  @ManyToOne((type) => Author, (author) => author.photos)
  author: Author;
}
```

###### 多对多

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Photo, (photo) => photo.albums)
  @JoinTable()
  photos: Photo[];
}
```

```ts
export class Photo {
  /// ... other columns

  @ManyToMany((type) => Album, (album) => album.photos)
  albums: Album[];
}
```

使用：

```ts
let connection = await createConnection(config);

// create a few albums
let album1 = new Album();
album1.name = "Bears";
await connection.manager.save(album1);

let album2 = new Album();
album2.name = "Me";
await connection.manager.save(album2);

// create a few photos
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.albums = [album1, album2];
await connection.manager.save(photo);

// now our photo is saved and albums are attached to it
// now lets load them:
const loadedPhoto = await connection.getRepository(Photo).findOne(1, { relations: ["albums"] });
```

#### 单表继承

> 普通的继承创建的表并无关联，语法也与 ts 语法一致，故不介绍
> 这里介绍单表继承，此时数据在同一个表中

```ts
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
```

```ts
@ChildEntity()
export class Photo extends Content {
  @Column()
  size: string;
}
```

```ts
@ChildEntity()
export class Question extends Content {
  @Column()
  answersCount: number;
}
```

```ts
@ChildEntity()
export class Post extends Content {
  @Column()
  viewCount: number;
}
```

#### 嵌入式实体

> 除继承外，还可以创建一个嵌入列完成属性值复用，可多层

嵌入列：

```ts
import { Entity, Column } from "typeorm";

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}
```

使用：

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Name } from "./Name";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column((type) => Name)
  name: Name;

  @Column()
  isActive: boolean;
}
```

此时：

```s
+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| nameFirst   | varchar(255) |                            |
| nameLast    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+
```

#### 树形结构

##### 邻接列表

> 这种方法的好处是简单，缺点是你不能因为连接限制而立刻加载一个树实体

```ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((type) => Category, (category) => category.children)
  parent: Category;

  @ManyToOne((type) => Category, (category) => category.parent)
  children: Category;
}
```

##### 嵌套集

> 对读取非常有效，但对写入不，且只能有一个根

```ts
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from "typeorm";

@Entity()
@Tree("nested-set")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

##### 物化路径(又名路径枚举)

```ts
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from "typeorm";

@Entity()
@Tree("materialized-path")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

##### 闭合表

```ts
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from "typeorm";

@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
```

##### Closure 表

> closure 表以特殊方式在单独的表中存储父和子之间的关系，它在读写方面都很有效

```typescript
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
} from "typeorm";

@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @TreeChildren()
  children: Category;

  @TreeParent()
  parent: Category;

  @TreeLevelColumn()
  level: number;
}
```

#### 视图实体

> 视图实体是使用 `@ViewEntity()` 定义的类，用来映射到数据库视图

##### 视图实体定义

```ts
import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
        SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
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
```

```ts
@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("post.id", "id")
        .addSelect("post.name", "name")
        .addSelect("category.name", "categoryName")
        .from(Post, "post")
        .leftJoin(Category, "category", "category.id = post.categoryId")
        // 视图实体不支持参数绑定，要用文字参数
        // .where("category.name = :name", { name: "Cars" })
        .where("category.name = 'Cars'") // <-- 这是对的
})
```

##### 视图实体完整示例

先有两个基础示例：

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

```ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;
}
```

视图整合：

```ts
import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select("post.id", "id")
      .addSelect("post.name", "name")
      .addSelect("category.name", "categoryName")
      .from(Post, "post")
      .leftJoin(Category, "category", "category.id = post.categoryId"),
})
export class PostCategory {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  categoryName: string;
}
```

使用：

```ts
import { getManager } from "typeorm";
import { Category } from "./entity/Category";
import { Post } from "./entity/Post";
import { PostCategory } from "./entity/PostCategory";

const entityManager = getManager();

const category1 = new Category();
category1.name = "Cars";
await entityManager.save(category1);

const category2 = new Category();
category2.name = "Airplanes";
await entityManager.save(category2);

const post1 = new Post();
post1.name = "About BMW";
post1.categoryId = category1.id;
await entityManager.save(post1);

const post2 = new Post();
post2.name = "About Boeing";
post2.categoryId = category2.id;
await entityManager.save(post2);

const postCategories = await entityManager.find(PostCategory);
const postCategory = await entityManager.findOne(PostCategory, { id: 1 });
```

### 连接数据库

#### 单个数据库

```ts
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

// 连接时 type host port username password database 应当正确设置
const config = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  entities: [Photo],
  synchronize: true,
  logging: false,
};
createConnection(config)
  .then((connection) => {
    // 这里可以写实体操作相关的代码，此函数支持 async/await
  })
  .catch((error) => console.log(error));
```

#### 多个数据库

```ts
import { createConnections, Connection } from "typeorm";

const connections = await createConnections([
  {
    // 对应多个 name 必须不同
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
  },
  {
    name: "test2-connection",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test2",
  },
]);
```

### CRUD

```ts
// 现有数据
let photo = new Photo();
photo.name = "Me and Bears";
photo.description = "I am near polar bears";
photo.filename = "photo-with-bears.jpg";
photo.views = 1;
photo.isPublished = true;
```

#### 普通模式

##### 增

```ts
createConnection(config)
  .then(async (connection) => {
    return connection.manager.save(photo).then((photo) => {
      console.log("Photo has been saved. Photo id is", photo.id);
    });
  })
  .catch((error) => console.log(error));
```

##### 删

```ts
createConnection(config)
  .then(async (connection) => {
    await connection.manager.remove(Photo);
  })
  .catch((error) => console.log(error));
```

##### 改

```ts
createConnection(config)
  .then(async (connection) => {
    Photo.name = "Me, my friends and polar bears";
    let savedPhotos = await connection.manager.save(Photo);
  })
  .catch((error) => console.log(error));
```

##### 查

```ts
createConnection(config)
  .then(async connection => {
    let savedPhotos = await connection.manager.find(Photo);
    console.log("All photos from the db: ", savedPhotos);
  });
  })
  .catch((error) => console.log(error));
```

#### 树形结构使用

```ts
const manager = getManager();

const a1 = new Category("a1");
a1.name = "a1";
await manager.save(a1);

const a11 = new Category();
a11.name = "a11";
a11.parent = a1;
await manager.save(a11);

const a12 = new Category();
a12.name = "a12";
a12.parent = a1;
await manager.save(a12);

const a111 = new Category();
a111.name = "a111";
a111.parent = a11;
await manager.save(a111);

const a112 = new Category();
a112.name = "a112";
a112.parent = a11;
await manager.save(a112);

// 获取树
const trees = await manager.getTreeRepository(Category).findTrees();
```

#### 使用 Repository

##### 增

```ts
createConnection(config)
  .then(async (connection) => {
    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo);
    console.log("Photo has been saved");
  })
  .catch((error) => console.log(error));
```

##### 删

```ts
createConnection(config)
  .then(async (connection) => {
    let photoRepository = connection.getRepository(Photo);

    let photoToRemove = await photoRepository.findOne(1);
    await photoRepository.remove(photoToRemove);
  })
  .catch((error) => console.log(error));
```

##### 改

```ts
createConnection(config)
  .then(async (connection) => {
    let photoRepository = connection.getRepository(Photo);

    let photoToUpdate = await photoRepository.findOne(1);
    photoToUpdate.name = "Me, my friends and polar bears";
    await photoRepository.save(photoToUpdate);
  })
  .catch((error) => console.log(error));
```

##### 查

```ts
createConnection(config)
  .then(async (connection) => {
    let photoRepository = connection.getRepository(Photo);

    let savedPhotos = await photoRepository.find();
    console.log("All photos from the db: ", savedPhotos);
  })
  .catch((error) => console.log(error));
```

### 主从复制

> mysql ，postgres 和 sql server 数据库都支持复制

```ts
{
  type: "mysql",
  logging: true,
  replication: {
    master: {
      host: "server1",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    },
    slaves: [{
      host: "server2",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    }, {
      host: "server3",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    }]
  }
}
```

> 所有模式更新和写入操作都使用 `master` 服务器执行。 `find` 方法或 `select query builder` 执行的所有简单查询都使用随机的 `slave` 实例

## Active Record

> 数据以模型的方式操作

表定义：

```ts
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// 所有 active-record 实体都必须扩展`BaseEntity`类，它提供了与实体一起使用的方法
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }
}
```

使用：

```ts
// 示例如何保存AR实体
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await user.save();

// 示例如何删除AR实体
await user.remove();

// 示例如何加载AR实体
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

const timber = await User.findByName("Timber", "Saw");
```

## Data Mapper

> 先获取到一个对应到表的仓库（中间层），然后再调用这个仓库上的方法

表定义：

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
```

扩展 `UserRepository` ：

```ts
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository()
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }
}
```

使用：

```ts
// 标准使用
const userRepository = connection.getRepository(User);

// 示例如何保存DM实体
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await userRepository.save(user);
// 示例如何删除DM实体
await userRepository.remove(user);
// 示例如何加载DM实体
const users = await userRepository.find({ skip: 2, take: 5 });
const newUsers = await userRepository.find({ isActive: true });
const timber = await userRepository.findOne({ firstName: "Timber", lastName: "Saw" });

// 扩展使用
const userRepository = connection.getCustomRepository(UserRepository);

const timber = await userRepository.findByName("Timber", "Saw");
```
