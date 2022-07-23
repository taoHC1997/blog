# git 基础学习

- https://git-scm.com/

## 快速开始

### 本地使用

1. 安装
   - 对照官网教程安装
   - https://git-scm.com/downloads
2. 设置 git 用户名、邮箱
   - `git config --global user.name "Your name"`
   - `git config --global user.email "email@example.com"`
3. 仓库创建
   ```s
   # 以 linux 为例，win 看中文说明
   # 首先创建目录
   mkdir demo
   # 进入目录
   cd demo
   # 使用 git 命令创建仓库
   git init
   ```
   > 注意，在有东西的项目文件中使用 `git init` 也是可取的。
4. 建立说明文档
   ```s
   echo "# A Demo" >> ./readme.md
   ```
5. 本地 commit 确认
   ```s
   # 先添加文件
   git add readme.md
   # commit 加 描述
   git commit -m "Add a readme file"
   ```
   ```s
   # 对应多个文件一 commit 上传
   git add file1.txt
   git add file2.txt file3.txt
   git commit -m "Add 3 files"
   ```
6. 修改文件操作
   ```s
   # 查看修改，这里需要确认修改
   git diff readme.md
   # 文件确立
   git add readme.md
   # 状态显示
   git status
   # commit 确定
   git commit -m "update readme.md"
   ```
7. 版本历史查看
   ```s
   # 最近几次
   git log
   # 只显示版本号及描述
   git log --pretty=oneline
   ```
8. 回退
   ```s
   # 回退至最近的 commit
   git reset --hard HEAD^
   # 回退至任意版本（需 git log 命令配合），版本号不必写全
   git reset --hard 1527a
   ```
   ```s
   # 文件已修改，未 add 或 commit 操作，将文件还原
   git checkout -- readme.md
   ```
   ```s
   # 文件已 add ，现在想回退且文件还原
   git reset HEAD readme.md
   git checkout -- readme.md
   ```
9. 回退的撤销
   ```s
   # 查看 git 命令历史，可以看见原来的版本
   git reflog
   # 回退
   git reset --hard 124ba
   ```
10. 出现删除文件时的 commit 操作
    ```s
    rm test.txt
    git rm test.txt
    git commit -m "remove test.txt"
    ```

### 配合远程使用

> 这里配合 github 使用

11. 生成我的 ssh key
    ```s
    ssh-keygen -t rsa -C "email@example.com"
    ```
12. 将公钥 `id_rsa.pub` 上传
    - 在 github 的 "Account settings" 的 "SSH Keys" 中上传
    - 使用时可以看看 github 的 [ssh key](https://docs.github.com/en/github/authenticating-to-github/githubs-ssh-key-fingerprints)
13. 在 github 直接生成仓库（与本地仓库名一致）
    ```s
    # 此时将我们的本地仓库同步至 github
    git remote add origin git@github.com:taoHC1997/demo.git
    # 现在远程仓库就是 origin ，这是 git 的默认写法
    ```
14. 本地库添加至远程仓库
    ```s
    # 此时本地 master 和远程的 master 会一致
    git push origin -u master
    # 以后同步时只需：
    git push origin master
    ```
15. 或者如果先有远程库，我们拉取到本地
    ```s
    git clone git@github.com:taoHC1997/demo.git
    ```

### 分支管理

16. 创建并切换分支
    ```s
    # 创建分支
    git branch develop
    # 切换分支
    git checkout develop
    # 合并，创建并切换分支
    git checkout -b develop
    ```
    ```s
    # 在最新版 git 中，切换分支可以使用 switch 命令
    # 切换分支
    git switch develop
    # 合并，创建并切换分支
    git switch -c develop
    ```
17. 分支查看
    ```s
    # 查看当前所有分支
    git branch
    # 查看分支加 commit 的合并情况
    git log --graph --pretty=oneline --abbrev-commit
    ```
18. 删除分支
    ```s
    git branch -d develop
    # 如果此分支尚未合并到任意分支，需要 -D
    git branch -D feature-201
    ```
19. 分支合并（快进式合并）
    ```s
    # 快进式合并，将 develop 的修改直接添加至主分支
    # 先切换
    git checkout master
    # 合并
    git merge develop
    ```
20. 需要解决冲突的分支合并（非快进式合并）
    ```s
    # 有些情况不能快进式合并，比如将 feature1 的修改添加至修改后主分支
    # 同样先切换
    git checkout master
    # 试试合并
    git merge feature1
    # 查看冲突文件
    git status
    # 此时去修改对应文件
    # 修改完成后提交
    git add readme.md
    git commit -m "conflict fixed"
    # 查看分支加 commit 的合并情况
    git log --graph --pretty=oneline --abbrev-commit
    # 最后，可以删除分支了
    git branch -d feature1
    ```
21. 分支如同 commit 的合并（禁止快进式合并）
    ```s
    # 将 develop 的修改作为 commit 添加至主分支
    # 同样先切换
    git checkout master
    # 合并， --on-ff 禁止快进式合并， -m 表示添加 commit 信息
    git merge --no-ff -m "merge with no--ff" develop
    ```
22. 突发式新建分支并修改合并（紧急修改 bug）
    ```s
    # 在 develop 修改中突然要改 bug 的情况
    # 先保存现在的修改情况
    git stash
    # 切换至主分支（需要修改 bug 的分支）
    git checkout master
    # 创建临时的修改 bug 分支
    git checkout -b 'issue-112'
    # 修改比如说是 abc.txt 上的 bug
    # 修改后添加修改
    git add abc.txt
    git commit -m "fix bug 112"
    # 切换回来
    git checkout master
    # 合并
    git merge --no-ff -m "mered bug fix 112" issue-112
    # 切换回开发分支，要继续开发
    git checkout develop
    # 先不要急，如果这个 bug 修改想在开发分支也来一次
    # 先得到 commit 'issue-112' 的 id 比如 5f654d
    # 在开发分支上提交此特定 commit
    git cherry-pick 5f654d
    # 查看冻存的工作状态
    git stash list
    # 冻存状态不删除式还原（不推荐）
    git stash apply
    # 冻存状态删除式还原（推荐）
    git stash pop
    # 如果想要还原指定的冻存状态，当然，形如此：
    # git stash apply stash@{0}
    ```
23. 配合远程仓库的分支管理（多人远程仓库解决分支合并冲突）
    ```s
    # 查看远程仓库信息
    git remote
    git remote -v
    # 推送到远程仓库 develop 分支
    git push origin develop
    # 对于来了个新人克隆仓库的情况
    git clone git@github.com:taoHC1997/demo.git
    # 需要重新创建开发分支
    git checkout -b develop origin/develop
    # 此时假如修改了东西，push 到远程时出现冲突
    # 先 git pull 看看情况
    git pull
    # 有问题则指定本地分支与远程仓库分支对应
    git branch --set-upstream-to=origin/develop develop
    # 然后拉取最新仓库
    git pull
    # 此时解决冲突，提 commit 并合并
    git commit -m "fix env conflict"
    git push origin develop
    ```
24. 多人协作下的版本线美观问题
    ```s
    # 为了 git 历史线美观可使用此命令
    git rebase
    ```

### 标签管理

> git 的标签和 commit 是绑定在一起的。

25. 创建标签
    ```s
    # 处于某分支时使用
    git tag v1.0
    # 找到某分支 id 给其打算标签
    git tag v0.9 fh5485a
    # 标签也可带说明信息
    git tag -a v1.1 -m "version 1.1 released" s45f548
    ```
26. 查看标签信息
    ```s
    # 标签排序按字母顺序
    git tag
    # 查看某标签详细
    git show V1.0
    ```
27. 删除标签
    ```s
    git tag -d v1.0
    # 对应于远程仓库的标签的删除
    # 本地先删除
    git tag -d v0.9
    # 然后远程删除
    git push origin :refs/tags/v0.9
    ```
28. 标签与远程仓库
    ```s
    # 默认标签只在本地存储
    # 但本地标签可传入远程仓库
    git push origin v1.0
    # 一次传入所有标签
    git push origin --tags
    ```

### git 配置

29. 配置忽略文件
    - 一般针对自动生成文件、编译后文件、敏感信息文件
    - 在此网站查看一般配置 https://github.com/github/gitignore
    - 修改得到一个 `.gitignore` 文件后需要将其提交，此外，还有一些特殊情况：
      ```s
      # 有文件格式被忽略，需要强制提交
      git add -f app.class
      # 检查某文件为什么不能提交
      git check-ignore -v app.class
      ```
30. 配置命令别名
    ```s
    # 以下为示例
    git config --global alias.st status
    git config --global alias.co checkout
    git config --global alias.ci commit
    git config --global alias.br branch
    # 比较实用的：
    # 修改撤回
    git config --global alias.unstage 'reset HEAD'
    # 显示最后提交
    git config --global alias.last 'log -1'
    # 显示版本信息
    git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
    ```
    注意，本地 `.git/config` 也可修改此，只是不全局可用

### 自建 git 服务器

31. 安装
    ```s
    sudo apt-get install git
    ```
32. 创建 git 用户
    ```s
    sudo adduser git
    ```
33. 证书管理
    - 将所有用户公钥导入 `/home/git/.ssh/authorized_keys` 文件夹
34. git 仓库管理
    ```s
    # 创建一个 sample 仓库
    sudo git init --bare sample.git
    # 权限给与
    sudo chown -R git:git sample.git
    ```
35. 禁用 shell 登录
    - 编辑 `/etc/passwd`
      ```
      # git:x:1001:1001:,,,:/home/git:/bin/bash
      # 修改为
      git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
      ```
36. 使用此远程仓库
    ```s
    git clone git@server:/srv/sample.git
    ```

## 语法学习

> 一般来说前面的快速学习足够使用，这里对一些命令做辅助讲解，补充用。

### git clone

- 远程克隆操作
  `git clone <版本库的网址> <本地目录名>`
- 支持多种协议（一般最好使用 ssh）
  ```s
  git clone http[s]://example.com/path/to/repo.git/
  git clone ssh://example.com/path/to/repo.git/
  git clone [user@]example.com:path/to/repo.git/
  git clone git://example.com/path/to/repo.git/
  git clone /opt/git/project.git
  git clone file:///opt/git/project.git
  git clone ftp[s]://example.com/path/to/repo.git/
  git clone rsync://example.com/path/to/repo.git/
  ```
- 远程克隆并命名远程仓库
  ```s
  # 此时远程仓库名为 jQuery
  git clone -o jQuery https://github.com/jquery/jquery.git
  ```

### git remote

- 管理远程主机
- 显示所有远程主机名
  ```s
  git remote
  # 注意，克隆版本库时远程主机默认 origin 为名字
  # 名字可以通过 git clone -o 修改
  ```
- 详细的显示远程主机详细
  ```s
  git remote -v
  # 会得到 fetch 和 push 的详细地址
  # origin  git@github.com:jquery/jquery.git (fetch)
  # origin  git@github.com:jquery/jquery.git (push)
  ```
- 详细的显示某主机详细详细
  ```s
  git remote show <主机名>
  ```
- 添加远程主机
  ```s
  git remote add <主机名> <网址>
  ```
- 删除远程主机
  ```s
  git remote rm <主机名>
  ```
- 远程主机改名
  ```s
  git remote rename <原主机名> <新主机名>
  ```

### git fetch

- 获取某远程主机的更新（全部）
  ```s
  # 默认情况获取所有分支的更新
  git fetch <远程主机名>
  ```
- 获取某个分支的更新
  ```s
  git fetch <远程主机名> <分支名>
  git fetch origin master
  ```
- 如果远程仓库删除分支，想要本地对应修改
  ```s
  git fetch --prune origin
  git fetch -p
  ```

### git branch

- 分支管理
- 查看分支
  ```s
  # 查看当前所有分支
  git branch
  # -r 表示查看远程分支
  # -a 表示查看所有分支
  ```
- 创建分支
  ```s
  git branch develop
  ```
- 删除分支
  ```s
  git branch -d develop
  # 如果此分支尚未合并到任意分支，需要 -D
  git branch -D feature-201
  # 删除远程分支
  git branch -dr [remote/branch]
  ```
- 手动建立分支关联
  ```s
  # 默认情况下，本地分支名与远程分支名对应
  # 在某些合并情况中需要自行设置对应
  git branch --set-upstream master origin/next
  ```

### git pull

- 取回远程主机某个分支的更新，再与本地的指定分支合并
- 完整格式
  ```s
  git pull <远程主机名> <远程分支名>:<本地分支名>
  git pull origin next:master
  ```
- 在分支对应关系确定的情况下，后面的参数可以不要
  ```s
  git pull origin
  # 甚至，在 origin 确定，其他关联唯一的情况，使用：
  git pull
  ```
- 如果远程仓库删除分支，想要本地也删除
  ```s
  git pull -p
  ```

### git push

- 将本地的更新推送到远程主机
- 完整格式
  ```s
  git push <远程主机名> <本地分支名>:<远程分支名>
  ```
- 在分支对应关系确定的情况下，后面的参数可以不要
  ```s
  git push origin
  # 甚至，在 origin 确定，其他关联唯一的情况，使用：
  git push
  ```
- 删除远程分支
  ```s
  git push origin -delete master
  # 如果不写 本地分支名 ，效果一样
  git push origin :master
  ```
- 指定默认主机
  ```s
  git push -u origin master
  # 指定了默认主机的，默认分支后，可以直接 git push
  ```
- 将本地所有分支推送到对应主机
  ```s
  git push --all origin
  # 此时可能出现解决冲突的情况
  # 如果不解决冲突，认为覆盖即可，使用 --force
  git push --force origin
  ```
- 推送标签
  ```s
  # 标签默认是不推送的， --tags 表示推送标签
  git push origin --tags
  ```
- 删除远程标签
  ```s
  git push origin :refs/tags/[tagName]
  ```

### git config

- git 的配置设置（文件名： `.gitconfig`）
- 显示配置
  ```s
  git config --list
  ```
- 编辑配置
  ```s
  git config -e [--global]
  ```
- 设置提交时的用户信息
  ```s
  # 用户名
  git config [--global] user.name "[name]"
  # 邮箱
  git config [--global] user.email "[email address]"
  ```

### git add

- 将文件添加至暂存区
- 添加指定文件
  ```s
  git add [file1] [file2]
  ```
- 添加目录（包括子目录）
  ```s
  git add [dir]
  ```
- 添加所有文件
  ```s
  git add .
  ```
- 单文件多变化多次提交
  ```s
  git add -p
  ```

### git rm

- 删除文件并将此删除放入暂存（非完全删除）
- 删除指定文件
  ```s
  git rm [file1] [file2]
  ```
- 文件不再被追踪（本地有，仓库无）
  ```s
  git rm --cached [file]
  ```

### git mv

- 改文件名并将改名放入暂存区
- 改名
  ```s
  git mv [file-original] [file-renamed]
  ```

### git commit

- commit 管理
- 提交暂存区到仓库区（非远程仓库）
  ```s
  git commit -m [message]
  ```
- 提交暂存区的指定文件到仓库区
  ```s
  git commit [file1] [file2] -m [message]
  ```
- 提交目前所有暂存区文件
  ```s
  git commit -a
  ```
- 提交时显示 diff 信息
  ```s
  git commit -v
  ```
- 修改上次提交信息
  ```s
  # 修改提交信息
  git commit --amend -m [message]
  # 对上次提交文件内容做修改
  git commit --amend [file1] [file2]
  ```

### git tag

- 标签管理
- 列出所有标签
  ```s
  git tag
  ```
- 在当前 commit 新建标签
  ```s
  git tag [tag]
  ```
- 在指定 commit 新建标签
  ```s
  git tag [tag] [commit]
  ```
- 删除标签
  ```s
  git tag -d [tag]
  ```

### git log

- git 的日志信息管理
- 显示当前分支的版本历史
  ```s
  git log
  ```
- 显示 commit 历史，以及每次 commit 发生变更的文件
  ```s
  git log --stat
  ```
- 根据关键词搜索提交历史
  ```s
  git log -S [keyword]
  ```
- 显示某个 commit 之后的所有变动，每个 commit 占据一行
  ```s
  git log [tag] HEAD --pretty=format:%s
  ```
- 显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件
  ```s
  git log [tag] HEAD --grep feature
  ```
- 显示某个文件的版本历史，包括文件改名
  ```s
  git log --follow [file]
  ```
- 显示指定文件相关的每一次 diff
  ```s
  git log -p [file]
  ```
- 显示过去 5 次提交
  ```s
  git log -5 --pretty --oneline
  ```

### git diff

- 比较变化
- 显示暂存区和工作区的差异
  ```s
  git diff
  ```
- 显示暂存区和上一个 commit 的差异
  ```s
  git diff --cached [file]
  ```
- 显示工作区与当前分支最新 commit 之间的差异
  ```s
  git diff HEAD
  ```
- 显示两次提交之间的差异
  ```s
  git diff [first-branch]...[second-branch]
  ```
- 显示今天你写了多少行代码
  ```s
  git diff --shortstat "@{0 day ago}"
  ```

### git show

- 显示提交信息
- 显示某次提交的元数据和内容变化
  ```s
  git show [commit]
  ```
- 显示某次提交发生变化的文件
  ```s
  git show --name-only [commit]
  ```
- 显示某次提交时，某个文件的内容
  ```s
  git show [commit]:[filename]
  ```
- 查看标签信息
  ```s
  git show [tag]
  ```

### git checkout

- 撤销修改、分支管理
- 恢复暂存区的指定文件到工作区
  ```s
  git checkout [file]
  ```
- 恢复某个 commit 的指定文件到暂存区和工作区
  ```s
  git checkout [commit] [file]
  ```
- 恢复暂存区的所有文件到工作区
  ```s
  git checkout .
  ```
- 新建一个分支，并切换到该分支
  ```s
  git checkout -b [branch]
  ```
- 切换到指定分支，并更新工作区
  ```s
  git checkout [branch-name]
  ```
- 切换到上一个分支
  ```s
  git checkout -
  ```
- 新建一个分支，指向某个 tag
  ```s
  git checkout -b [branch] [tag]
  ```
