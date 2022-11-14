---
title: Cookie&Session&token
tags: 'cookie,session,token'
categories: 技术
description: 弄懂cookie session token
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_14_18_13_42.54ulvka73xg0.webp
abbrlink: de045643
date: 2022-11-14 15:46:25
---

#### 1.Cookie

##### 	1.1 Cookie简介

​	cookie是HTTP协议中用来解决无状态问题的技术
​	cookie的本质就是一个头分有request cookie respon cookie

##### 1.2 Cookie本质

​	服务器以响应头的形式将cookie发送给客户端，客户端收到之后会将其存储并在下次向服务器请求时将其传回，这样服务器就可以根据cookie来识别客户端

##### 1.3 Cookie基本演示

​	这里我们使用nodejs中express快速构建服务器演示一下

```javascript
// 其中一个多余组件和一些包就不做具体称述
const express = require("express")
const app = express()
const path = require("node:path")
const fs = require("fs/promises")
// 使用express中的cookie-parser来解析
const cookieParser = require("cookie-parser")
app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded())
app.get("/set-cookie",(req,res)=>{
    // 给客户端发送一个cookie
    res.cookie("username","admin")
    res.send("cookie已发送")
})
app.get("/get-cookie",(req,res)=>{
    console.log(req.cookies)
})
```

​	这个时候我们就可以读到cookie值
![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.3qi6i9nme0w0.webp)

##### 1.4 Cookie的有效期

​	cookie是有有效期的

  - 默认情况下cookie的有效期就是一次会话(Session)
  - maxAge用来设置cookie有效时间，单位是ms

```javascript
app.get("/set",(req,res)=>{
    // 接收一个配置对象传入第三个参数就行
    res.cookie("name","admin",{
        expires: new Date(2022,12,25) // 设置到期的时间
        maxAge: 1000*60*60*24*30 // 使用期限的时间段 单位是ms
    })
})
```

##### 1.5 Cookie的修改和删除  

​	cookie一旦发送给浏览器我们就不能在修改了，但是我们可以去发送同名的cookie去替换旧的cookie，从而达到修改

```javascript
app.get("/delete-cookie",(req,res)=>{
    res.cookie("name","",{
        maxAge: 0
    })
    res.send("删除cookie成功")
})
```

#### 2.Session  

##### 2.1 为什么要使用Session

​	因为cookie存在严重的不足：cookie是由服务器创建，浏览器保存，每次浏览器访问服务器时都需要将cookie发回，这就导致不能在cookie中存放较多的数据，并且cookie直接存储在客户端，很容易被篡改伪造
并且注意  

>  使用cookie时一定不要存储一些敏感信息！！！

##### 2.2 Session的本质

​	每个用户的数据统一存储在服务器中，每一个用户的数据都对应一个id，我们只需要通过cookie将id发送给客户端浏览器，浏览器只需要每次访问时将id发回，既可读取到服务器中存储的数据

##### 2.3 Session的性质

​	a. session是服务器中的一个对象，这个对象用来存储用户的数据
​	b. 每一个session对象都有唯一的id，id会通过cookie的形式发送给客户端
​	c. 客户端每次访问只需要将存储有id的cookie发回既可获取它在服务器中的存储的数据
​	d. express中可以通过express-session 组件来实现session功能

##### 2.4 Session的演示

```javascript
// 引入session
const session = require("express-session")
// 设置session中间件
app.use(
    session({
        // 必要的配置文件
        secret: "explosion"
    })
)

app.get("/set",(req,res)=>{
    req.session.username = "megumi"
    res.send("查看session")
})

app.get("/get",(req, res) => {
    const username = req.session.username
    console.log(username)
    res.send("读取session")
})
```

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.1k69q3xz9tq8.webp)

##### 2.5 Session的配置

​	session 是服务器创建的一个对象，这个对象用来储存用户信息每一个session都会有唯一的id，session创建后id会以cookie的形式发送给浏览器，浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session
​	id(cookie) <---------> session 对象
​	session 什么时候会失效
​		1.浏览器的cookie没辣
​		2.服务器中的session对象没辣
​	express-session 默认是将session存储在内存中，所以服务器一旦重启session就失效辣，考虑使用session通常会对session进行一个持久化的操作(写到文件中或者数据库里)

```javascript
app.use(session({
    secret:"megumi",
		store: new FileStore({
			// path 用来指定存储路径
			path: path.resolve(__dirname,'./sessions'),
			// 指定加密
			secret: 'megumi',
			// session的最大闲置有效时间 秒 默认一小时
			ttl:3600,
			// 默认情况下，fileStore会间隔一小时，清除一次session对象
			// reapInterval 用来指定清除session的间隔 单位默认s 默认一小时
			reapInterval:3600
		}),
		cookie: {
			maxAge: 1000 * 3600
		}
}))
```

