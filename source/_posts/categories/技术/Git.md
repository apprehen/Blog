---
title: git的一些技巧和指令
date: 2022-12-31 01:47:22
tags: Git
description: git的一些常见报错和一些指令
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

git管理的创库最大的好处就是多人可以协同开发，这里我们可以分成远程分支和本地分支,远程分支一般都是有origin的

`git branch -a` 可以观察出项目存在的那些分支,一般红色字体表示的是远程分支![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.4kx02oilql40.webp)

> 本地分支: 本地存在的不同分支版本
>
> 远程分支: 项目中存在的不同的版本

一般都是有一个主线 master 然后不同的程序员有不同的线，在自己的需求完成后去merge到主线上面,可以防止版本覆盖什么的

如何创建本地分支:
`git checkout -b my-test` : 在当前分支下面创建my-test的本地分支

然后可以将本地分支推送到远程,在远程创建同样的远程分支
`git push origin my-test` : 将本地分支推送到远程并且注意**名称要相同**

可以将本地分支与远程分支关联起来
`git branch --set-upstream-to origin/my-test` 将本地分支关联到远程分支

可以使用指令查看分支
`git branch` : 查看本地分支
`git branch -r` : 查看远程分支
`git branch -a` : 查看所有分支

使用指令可以查看本地分支和远程分支的关联:
`git branch -vv`

拉取远程分支到指定本地分支操作
`git pull origin <远程分支名> : <本地分支名>`
拉取远程分支到现在本地分支操作
`git pull origin <远程分支名>`
如果当前本地分支和远程分支相关联可以直接
`git pull`

推送指定分支到指定远程分支
`git push origin <本地分支名> : <远程分支名>`
将指定分支推送到同名远程分支
`git push origin <本地分支名>`
将本地分支推送到同名远程分支
`git push`

创建与本地同名远程分支
`git push -u origin <本地分支名>`

# git的解决冲突merge

当我们完成自己写的代码的时候需要提交到主分支上面，有时候就不得不去merge，merge是一个技术活，很容易一不小心就把别人写的代码覆盖掉

> 第一种情况就是你正在主分支上面写东西要提交到主分支上面但是你写之前不知道你的版本是否跟库里面的版本相同，你可以手动merge

`git add .`
`git commit -m 'xxx'`
`git pull`
输入三个指令之后会在本地生成待合并的文件，可以手动解决完冲突，重新push即可

> 第二种情况就是你提交在你自己写的分支上面然后需要合并到主分支上面下面假设我自己的分支名词叫 `yueyun` 主分支名词叫`master` 
> 注意是`master`需要合并`yueyun` 

`git checkout master` （切换到主分支master上面）
`git merge yueyun` (将现在的master分支合并yueyun)
`git push origin master` (把本地的分支master同步到远程)
**注意：此时的yueyun和master都是本地分支存在的不能直接用远程分支来操控,将本地分支合并完成后在提交到远程分支覆盖既可**

# git的指令回退版本

`git log` : 控制台输入git log 可以看到之前的版本信息
![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.4xb1l1aqh9m0.webp)

`git reset -- hard HEAD^` : 回退到上个版本
`git reset -- hard HEAD~3` : 回退到前3次提交之前,以此类推
`git reset -- hard commit-id` : 回退/进到 指定的commit的id码
`commit-id` : 不同的仓库管理会生成不同的commit-id
