---
title: pm2 基本技巧和基本指令
description: 由于经常忘记一些常用的指令，于是打算记录下来方便自己查找
categories: 技术
date: 2023-05-21 14:22:36
tags:
  - Linux
  - pm2
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/IMG_20230521_153207.5m1csx7jah00.webp
---

# pm2指令

**PM2是node进程管理工具，可以利用其简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等**

1. 首先是安装`PM2` (确保你的电脑中有node环境)

```shell
npm install pm2@latest -g
# or
yarn global add pm2
```

2. pm2启动应用
   `pm2 start app.js` 即启动，守护和监视应用程序的简单方法

3. pm2启动其他的应用程序

   ```shell
   pm2 start clash.sh
   pm2 start python-app.py --watch
   pm2 start binary-file -- --port 1520
   pm2 start yarn -n "explosion" -- start
   pm2 start ./gocq
   # 等等等
   ```

4. 常用命令的参数说明:
   - `--watch`: 监听应用目录的变化，一旦发生变化，自动重启。如要准确监听深文件，可以自定义配置文件
   - `-i --instances`: 启用多少个实例，可以用于负载均衡，如果是`-i 0`或者`-i max`,则根据当前机器的核数确定实例数目
   - `--ignore-watch`:排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如 `--ignore-watch="test node_modules "some scripts""`
   - `-n --name`：应用的名称。查看应用信息的时候可以用到。
   - `-o --output <path>`：标准输出日志文件的路径。
   - `-e --error <path>`：错误输出日志文件的路径。
   - `--interpreter <interpreter>`：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。

5. 管理应用程序状态很简单，下面是一些常用的命令

   ```shell
   $ pm2 restart app_name|app_id
   $ pm2 reload app_name|app_id
   $ pm2 stop app_name|app_id
   $ pm2 delete app_name|app_id
   # 停止所有任务
   pm2 stop all
   # 查看进程状态
   pm2 ls
   # 查看某个进程信息
   pm2 describe 0
   ```

6. 配置文件

   - 配置文件里的设置项，跟命令参数基本是一一对应好的

   - 可以选择`yaml` 和 `json` 文件

   - `json`格式的配置文件，pm2当作普通的js文件来处理，所以可以在里面添加注释或者编写代码，这对于动态调整配置很有好处。

   - 如果启动的时候指定了配置文件，那么命令行参数会被忽略。（个别参数除外，比如--env）

     ```json
     {
       "name"        : "fis-receiver",  // 应用名称
       "script"      : "./bin/www",  // 实际启动脚本
       "cwd"         : "./",  // 当前工作路径
       "watch": [  // 监控变化的目录，一旦变化，自动重启
         "bin",
         "routers"
       ],
       "ignore_watch" : [  // 从监控目录中排除
         "node_modules", 
         "logs",
         "public"
       ],
       "watch_options": {
         "followSymlinks": false
       },
       "error_file" : "./logs/app-err.log",  // 错误日志路径
       "out_file"   : "./logs/app-out.log",  // 普通日志路径
       "env": {
           "NODE_ENV": "production"  // 环境参数，当前指定为生产环境
       }
     }
     ```

     .... 待完成

