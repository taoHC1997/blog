# 从现有数据库生成 typeorm 模型文件

- https://github.com/Kononnable/typeorm-model-generator

## 简单使用

安装：

```s
npm i -g typeorm-model-generator
# 局部安装然后 npx 使用也是推荐的
```

> 注意，如果需要 `oracle` 的支持，请 `npm i oracledb`

使用：

- 针对 MSSQL
  ```s
  typeorm-model-generator -h localhost -d tempdb -u sa -x !Passw0rd -e mssql -o .
  ```
- 针对 Postgres
  ```s
  typeorm-model-generator -h localhost -d postgres -u postgres -x !Passw0rd -e postgres -o . -s public --ssl
  ```
- 针对 SQLite
  ```s
  typeorm-model-generator -d "Z:\sqlite.db" -e sqlite -o .
  ```
