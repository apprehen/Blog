---
title: git的一些技巧和指令
date: 2022-12-31 01:47:22
tags: Git
description: AI注册和使用
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/8B4787E869B5FA6AB1FCBC196D389E7A.68cbv0l1m1s0.webp
---

有于最近做了一些协同开发的项目，对git的一些指令又有了了解，故想写一遍博客来增加自己的想法和理解

# git的最基本指令

`git init` : 初始化项目文件夹,为改项目的根目录下面添加.git文件

`git add .` : 将改项目的所有文件添加到暂存区里面(**可以方便merge**)

`git commit -m 'xxxx'` : (xxx) 是你提交要说明的消息,提交的备注

`git remote add origin/ 远程地址` : 本地的git文件关联到远程的Github仓库

`git pull` : 拉取远程分支的信息，并可以与本地合并信息

`git push -u -f origin/ 远程分支(master)` : 提交到远程仓库, -f是强制推送，不然会报错现在的分支没有对应的远程分支，强制推送可以覆盖mater

当然如果你已经有项目或者已经在网上找到了对应的项目对应的仓库你可以直接执行 `git clone xxx` 去拉取对应的代码 

注意：当我们使用`git clone` 的时候 若是很大的git存储库，但是我们的互联网很慢，很常见的问题就是连接关闭整个克隆取消如同下面的报错

```
Cloning into 'large-repository'...
remote: Counting objects: 20248, done.
remote: Compressing objects: 100% (10204/10204), done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining 
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```

要想解决这个问题我们可以先clone小一点的版本之后在`git fetch` 即可

`git clone http://github.com/large-repository --depth 1`

`git fetch --unshallow`

# git的远程分支和本地分支

