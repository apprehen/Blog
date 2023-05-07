---
title: Linux技巧
tags: Linux
description: 在日常运用中一些Linux好用的指令和技巧和遇到一些错误的解决办法和Linux服务器上怎么挂代理
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/76A563FF42CF2F3735174A1CA66107AD.6iplu6wony40.webp
categories: 技术
abbrlink: afbcb418
date: 2023-05-04 10:11:11
---

# Linux上的常用指令

**ls**

> ls 列出目录内容及其一些所属信息
> ls -a 列出隐藏文件
> ls -l (ll) 使用较长格式列出信息

# Linux下使用Clash科学上网

> 在 Linux 服务器上通过 Clash 科学上网
> 如果出现权限不足的情况请在指令前面加上 `sudo` 

**安装`Clash`**

- 下载当前操作系统与 CPU 架构对应的包文件，我这儿是 X86_64 平台下的Ubuntu所以对应使用的是[clash-linux-amd64-v1.6.5.gz](https://github.com/Dreamacro/clash/releases/download/v1.6.5/clash-linux-amd64-v1.6.5.gz)即ok(当然取github上面找到不同的安装包只要能够对应也ok)

  ```shell
  wget -O clash.gz https://github.com/Dreamacro/clash/releases/download/v1.6.5/clash-linux-amd64-v1.6.5.gz
  ```

- 下载好后解压安装包中 clash 到 `/usr/local/bin/` 目录下，并删除压缩包文件

  ```shell
  gzip -dc clash.gz > /usr/local/bin/clash
  chmod +x /usr/local/bin/clash
  rm -f clash.gz
  ```

- 创建配置文件目录，并下载 MMDB 文件(注意这一步很可能失败建议直接在网上找Country.mmdb文件下载并手动上传比较好) [下载网址](https://github.com/Dreamacro/maxmind-geoip/releases)

  ```shell
  mkdir /etc/clash
  wget -O /etc/clash/Country.mmdb https://www.sub-speeder.com/client-download/Country.mmdb
  ```

- 创建 `systemd` 脚本，脚本文件路径为 `/etc/systemd/system/clash.service`，内容如下：

  ```shell
  [Unit]
  Description=clash daemon
  
  [Service]
  Type=simple
  User=root
  ExecStart=/usr/local/bin/clash -d /etc/clash/
  Restart=on-failure
  
  [Install]
  WantedBy=multi-user.target
  ```

- 重载 systemctl daemon

  ```shell
  systemctl daemon-reload
  ```

**配置代理**

- 导入已有的`vpn` 链接 (订阅链接啦) 

  ```shell
  wget -O /etc/clash/config.yaml [你的订阅链接]
  ```

- 设置系统代理，添加配置文件 `/etc/profile.d/proxy.sh` 并在其中写入如下内容：

  ```shell
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy="http://127.0.0.1:7890"
  export HTTP_PROXY="http://127.0.0.1:7890"
  export HTTPS_PROXY="http://127.0.0.1:7890"
  ```

- 重载 `/etc/profile` 配置

  ```shell
  source /etc/profile
  ```

- 启动 `clash` 服务，并设置为开机自动启

  ```shell
  systemctl start clash
  systemctl enable clash
  ```

- 测试 goolge.com 访问

  ```shell
  # curl google.com
  <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
  <TITLE>301 Moved</TITLE></HEAD><BODY>
  <H1>301 Moved</H1>
  The document has moved
  <A HREF="http://www.google.com/">here</A>.
  </BODY></HTML>
  ```

**配置web-UI**

- 克隆 [clash-dashboard](https://github.com/Dreamacro/clash-dashboard) 项目到本地

  ```shell
  git clone -b gh-pages --depth 1 https://github.com/Dreamacro/clash-dashboard /opt/clash-dashboard
  ```

- 修改 `clash` 配置文件中 `external-ui` 的值为 `/opt/clash-dashboard`

  ```shell
  sed -i "s/^#\{0,1\} \{0,1\}external-ui.*/external-ui: \/opt\/clash-dashboard/" /etc/clash/config.yaml
  ```

- 重启clash服务

  ```shell
  systemctl restart clash
  ```

- 通过浏览器访问 `localhost:9090/ui`，其中 `localhost` 替换为 clash 部署服务器的 IP

