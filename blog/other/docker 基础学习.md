# docker 基础学习

- 官网： https://www.docker.com/
- github:
  - https://github.com/docker
  - https://github.com/docker/docker-ce
- 文档：
  - https://docs.docker.com/
  - http://c.biancheng.net/docker/
- 镜像： https://hub.docker.com/
- 下载： https://www.docker.com/products/docker-desktop
- 参考：
  - http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
  - https://blog.csdn.net/qq_26870933/article/details/81675201
  - http://c.biancheng.net/view/3118.html

## 命令使用

### 辅助命令

- 查看版本、信息、帮助
  ```s
  docker version
  ```
  ```s
  docker info
  ```
  ```s
  docker --help
  ```

### 镜像命令

#### 查看当前镜像

```s
docker image ls
```

```s
docker images
```

#### 镜像查找

> 建议使用[网站](https://hub.docker.com/)

```s
docker search [imageName]
```

```s
docker search mysql --filter=STARS=3000
```

#### 下载镜像

```s
docker pull [imageName]
```

```s
docker pull mysql:5.7
```

#### 删除镜像

```s
docker rmi [imageName]
```

```s
docker image rm [imageName]
```

```s
docker rmi -f  $(docker images -aq)
```

### 容器命令

> 容器内退出使用 `exit` ；使用 `Ctrl + P + Q` 可不停止退出

#### 查看当前容器

```s
docker ps [OPTIONS]
```

```s
docker container ls -l
```

```s
docker container ls -l --all
```

```s
# 查看容器占用
docker stats
```

#### 启动容器

##### 第一次 `run`

> 每运行一次生成一个新的容器

```s
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

下面介绍 `OPTIONS` ：

- `--name="demo"` 设置容器名
- `-d` 后台运行， docker 有特性，如果发现没有任务，自动停掉
- `-i` 以交互模式运行
- `-t` 为容器重新分配终端
- `-P` 随机端口映射
- `-p` 指定端口映射

下面是测试命令：

```s
docker run hello-world
# 设置终止后自动删除容器
docker run --rm hello-world
```

###### 详解

```s
# 示例命令
docker run -it -p 8022:22 --ipc host --name docker_example --gpus all -v ~/work:/work tensorflow/tensorflow:latest-gpu-py3-jupyter /bin/bash
```

下面介绍参数：

- `-i` 表示 Allocate a pseudo-tty
- `-t` 表示 Keep STDIN open even if not attached
- `-p 8022:22` 表示对端口号进行映射，即将 docker 容器的 22 号端口映射到宿主机的 8022 端口，这样设置的目的是方便后续使用 VSCode 连接容器，可以根据需要进行设置
- `-ipc host` 此参数目的是为了增加主机与容器共享内存用的，如果这个参数报错，还可以采用`--shm-size` 参数
- `--name docker_example` 此参数将容器命名为 docker_example，docker 有长 id、短 id、name 三个标识，如果不指定名称则会随机名称
- `--gpus all` 是使用全部宿主机 GPU，这里的设置可以参考 nvidia-docker 的 Usage 具体设置使用哪个卡
- `-v ~/work:/work` 是将宿主机的 ~/work 目录映射到容器的 /work 目录，方便主机和宿主机间共享数据，这里的 -v 是 volumes 的意思，而这个共享是有两种情况的，具体信息可以参考 [use volumes](https://docs.docker.com/storage/volumes/)
- `tensorflow/tensorflow:latest-gpu-py3-jupyter` 指定使用的镜像版本，这里的版本可以在 docker-hub 查到

##### 第二次使用 `start`

```s
docker start [containerID]
```

#### 进入容器

##### 直接进入当前运行的终端

```s
docker attach [containerID]
```

##### 打开新的终端

```s
docker exec -it [containerID] /bin/bash
```

#### 重启容器

```s
docker restart [containerID]
```

#### 关闭容器

```s
docker stop [containerID]
```

```s
docker kill [containerID]
```

#### 删除容器

```s
docker rm [containerID]
```

```s
docker container rm [containerID]
```

```s
docker rm -f $(docker ps -aq)
```

#### 导出容器

```s
docker export [OPTIONS] CONTAINER
```

#### 导入容器

```s
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

### 其他命令

#### 查看日志

```s
docker logs -f -t --tail [number] [containerID]
```

#### 查看容器进程信息

```s
docker top [containerID]
```

#### 查看容器元信息

```s
docker inspect [containerID]
```

## 配置

### Docker Engine

- 参考：
  - https://docs.docker.com/engine/reference/commandline/dockerd/

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

## 常见技巧

### 使用图形化管理工具

```s
docker run -d -p 8088:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
```

然后登录 8088 端口，进行设置
