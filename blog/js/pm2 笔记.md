# pm2 笔记

- github： https://github.com/Unitech/pm2
- 官网： https://pm2.keymetrics.io/
- 文档： https://pm2.keymetrics.io/docs/usage/quick-start/

## 快速开始

1. 安装
   ```s
   npm install pm2 -g
   npm install pm2@latest -g
   yarn global add pm2
   ```
2. 使用
   ```s
   # 查看版本
   pm2 -v
   # 后台启动命令
   pm2 start app.js
   ```
3. 升级
   ```s
   pm2 save
   npm install pm2@latest -g
   pm2 update
   ```
4. 卸载
   ```s
   npm uninstall pm2 -g
   ```

这里介绍 pm2 特点：

- 内建负载均衡（使用 Node cluster 集群模块）
- 后台运行
- 0 秒停机重载
- 具有 Ubuntu 和 CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 ）

## 常见命令介绍

- 创建静态服务器
  ```s
  pm2 serve ./dist 9090
  ```
- 启动服务
  ```s
  # 启动命令应用
  pm2 start app.js
  pm2 start app.sh
  # 设置 name
  pm2 start app.js --name demo
  # 启动两个并都命名 test （群集模式-自动负载均衡）
  pm2 start app.js -i 2 --name test
  # 配置命令参数
  pm2 start app.js -- arg1 arg2
  # 启动服务并监听文件变动（开发使用）
  pm2 start app.js --watch
  # 启动并配置输出
  pm2 start app.js -i max -e err.log -o out.log --name demo
  # 使用 fork 模式启动而不是 cluster
  pm2 start app.js -x
  ```
- 停止服务
  ```s
  pm2 stop all
  pm2 stop <name|id>
  ```
- 重启服务
  ```s
  # 普通重启进程
  pm2 restart all
  pm2 restart <name|id>
  # 0 秒停机重载进程 (用于 NETWORKED 进程)
  pm2 reload all
  pm2 reload <name|id>
  ```
- 删除服务
  ```s
  # 删除所有服务
  pm2 delete all
  pm2 delete <name|id>
  ```
- 查看
  ```s
  # 查看所有命令
  pm2 -h
  # 查看当前服务列表
  pm2 <list|ls|status>
  # 查看某服务状态
  pm2 show <name|id>
  # 查看日志
  pm2 logs
  pm2 logs <name|id>
  # 监视并显示每个 node 进程的 CPU 和内存的使用情况
  pm2 monit
  ```

## 配置型启动

- 文档： https://pm2.keymetrics.io/docs/usage/application-declaration/

```s
# 生成配置文件
pm2 ecosystem
# or
pm2 init
```

```s
# 使用配置
# Start all applications
pm2 start ecosystem.config.js
# Stop all
pm2 stop ecosystem.config.js
# Restart all
pm2 restart ecosystem.config.js
# Reload all
pm2 reload ecosystem.config.js
# Delete all
pm2 delete ecosystem.config.js
```

> 注意，部分参数未完全写明

```js
// 配置示例
module.exports = {
  apps: [
    {
      name: "demo",
      script: "index.js",
      cwd: "./",
      args: "",
      interpreter: "",
      interpreter_args: "",
      watch: true,
      ignore_watch: ["node_modules", "logs"],
      exec_mode: "cluster",
      instances: 2,
      max_memory_restart: "150M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/app-err.log",
      out_file: "./logs/app-out.log",
      merge_logs: true,
      min_uptime: "60s",
      max_restarts: 30,
      autorestart: true,
      cron_restart: "1 0 * * *",
      restart_delay: "60s",
      // 默认就是普通模式
      env: {
        NODE_ENV: "normal",
      },
      // 生产环境
      // pm2 start process.json --env production
      env_production: {
        NODE_ENV: "production",
      },
      // 开发环境
      // pm2 start process.json --env development
      env_development: {
        NODE_ENV: "development",
      },
      // 测试环境
      // pm2 start process.json --env test
      env_test: {
        NODE_ENV: "test",
        REMOTE_ADDR: "",
      },
    },
  ],
  // 远程部署时使用
  deploy: {
    production: {
      user: "root",
      host: "10.3.5.5",
      ref: "origin/master",
      // git 地址
      repo: "GIT_REPOSITORY",
      path: "/var/www/production",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
```

这里介绍参数：

- `apps` 数组，每一个数组成员对象就是一个服务
  - `{}` 配置对象，可多个
    - `name` 应用名称
    - `script` 实际启用脚本
    - `cwd` 项目根目录
    - `args` 传递给脚本的参数
    - `interpreter` 指定的脚本解释器
    - `interpreter_args` `node_args` 传递给解释器的参数
    - `watch` 是否监测文件变动
    - `ignore_watch` 数组，不监测变动目录
    - `exec_mode` 启动模式，默认 `fork` ，可选 `cluster` 或者 `fork`
    - `instances` 应用启动实例个数，仅在 cluster 模式有效，有关键字 `"max"`
    - `max_memory_restart` 最大内存限制数，超出自动重启
    - `log_date_format` 指定日志文件的时间格式
    - `error_file` 错误日志文件路径
    - `out_file` 正常日志文件路径
    - `merge_logs` `combine_logs` 设置追加日志而不是新建日志
    - `min_uptime` 应用运行少于时间被认为是异常启动
    - `max_restarts` 最大异常自动重启次数
    - `autorestart` 发生异常的情况是否自动重启，默认 `true`
    - `cron_restart` `crontab` 时间格式重启应用，目前只支持 `cluster` 模式
    - `restart_delay` 异常重启情况下，延时重启时间
    - `env` 环境参数，可有多个 `process.env.**` 参数
      - `NODE_ENV`
    - `env_**` 环境参数，见 `env` ，自行命名并配置
