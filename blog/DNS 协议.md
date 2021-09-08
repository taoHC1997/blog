# DNS 协议

> 访问网站本质是寻找 ip 地址，所谓的域名解析就是根据 DNS 协议寻找服务器对应 ip 的过程。

## 域名服务器

- 域名分层级，下面是一般层级划分
  ```s
  主机名.次级域名.顶级域名.根域名
  ```
  - 根域名可为 `.` 或 `.root` ，一般省略
  - 顶级域名（top-level domain，缩写为 TLD）
  - 次级域名（second-level domain，缩写为 SLD）

> 目前，世界上一共有十三组根域名服务器，从 `A.ROOT-SERVERS.NET` 一直到 `M.ROOT-SERVERS.NET` 。

## 域名记录

域名与 IP 之间的对应关系，称为"记录"（record）。下面是常见记录类型：

- `A` ：地址记录（Address），返回域名指向的 IP 地址
- `NS` ：域名服务器记录（Name Server），返回保存下一级域名信息的服务器地址。该记录只能设置为域名，不能设置为 IP 地址
- `MX` ：邮件记录（Mail eXchange），返回接收电子邮件的服务器地址
- `CNAME` ：规范名称记录（Canonical Name），返回另一个域名，即当前查询的域名是另一个域名的跳转；一般设置此类型后不可设置其他类型，防冲突
- `PTR` ：逆向查询记录（Pointer Record），只用于从 IP 地址查询域名
