# linux 中 js 脚本搭配 nodejs 使用

> 简单示例：
>
> ```js
> #!/usr/bin/env node
> console.log("hello world");
> ```

## 基础语法

### 头部声明

```s
#!/usr/bin/env node
```

### 常用变量

- `process.argv` 获取外部输入参数
  ```js
  #!/usr/bin/env node
  console.log("Hello ", process.argv[2]);
  ```
  ```s
  ./hello Tom
  # Hello Tom
  ```

### 进程使用

- 一般通过 `child_process` 创建进程
  ```js
  #!/usr/bin/env node
  var name = process.argv[2];
  // 使用进程模块
  var exec = require("child_process").exec;
  var child = exec("echo hello " + name, function (err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
  });
  ```

## 脚本使用

### 简单使用

> 脚本无需编译，直接使用

```s
./hello
# 注意，此时实际执行 node ./hello
```

### 配置使用

1. 在当前目录创建 `package.json`
   ```json
   {
     "name": "hello",
     "bin": {
       "hello": "hello"
     }
   }
   ```
2. 链接命令
   ```s
   npm link
   ```
3. 执行命令即可
   ```s
   hello
   ```

> 注意，可将脚本加入环境变量全局使用。

## 扩展第三方包

### 辅助使用 shell 的 js 包 `shelljs`

- https://www.npmjs.com/package/shelljs
- `npm install --save shelljs`

### 辅助处理命令行参数和配置的 js 包 `yargs`

- https://www.npmjs.com/package/yargs
- `npm install --save yargs`
