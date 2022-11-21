---
title: Ajax介绍和用法
description: 'Ajax学习记录,xhr,fetch,axios'
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_21_13_07_73.gojqpxla7h4.webp
tags: 'Ajax,前后端交互'
abbrlink: f7509f2
date: 2022-11-21 13:20:51
---

### AJAX简介

在 js 中向服务器发送的请求加载数据的技术叫AJAX
AJAX:
	A  -- 异步(async) J -- JavaScript A X -- xml
	异步的JS和xml
	其作用就是通过js向服务器发送请求来加载数据
	xml是早期AJAX使用的数据格式
	<student>
		<name>megumi</name>
	</student>
	目前使用的格式都使用json(简单，体积小，易懂)
	{"name":"megumi"}
AJAX:
	可以选择的通信方案
	1.XMLHTTPRequest (xhr)
	2.Fetch
	3.Axios（二次封装）

### 跨域的原因和解决办法

CORS (跨域资源共享)
	跨域请求：
		如果两个网站的完整域名不相同
			如 a网站: http://haha.com
			b 网站 :http://heihei.com 就不相同
	跨域需要检查三个东西：
		①：协议   ②域名  ③端口号
		只要有一个不相同即算跨域
		当我们通过AJAX去发送跨域请求时
		浏览器为了服务器的安全，会阻止JS读取到服务器的数据
解决方案：
	在服务器中设置一个允许跨域的头即可
	Access-Control-Allow-Origin
		允许客户端访问我们的服务器(详细可见下文)

### Xhr使用(技术很老，基本不使用，了解即可)

前端部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xhr</title>
</head>
<body>
  <h1>AJAX测试</h1>
  <hr>
  <button id="btn">
    点我加载数据
  </button>
  <div class="root"></div>
  <script>
    const btn = document.querySelector("#btn")
    btn.onclick = ()=>{
      // 创建一个xhr对象
      const xhr = new XMLHttpRequest()
      const root = document.querySelector(".root")
      // 设置响应体类型，自动转化
      xhr.responseType = "json"
      // 设置请求信息
      xhr.open("get","http://localhost:3000/students")
      // 发送请求
      xhr.send()
      // 读取响应信息
      // console.log(xhr.response) //异步代码不能同步加载
      // 放在加载完之后响应即可()
      xhr.onload = ()=> {
        //xhr表示响应状态码
        if(xhr.status === 200) {
          // console.log(xhr.response)
          const result = xhr.response
          // console.log(result)
          if(result.status === 'ok'){
            // 创建ul
            const ul = document.createElement("ul")
            // 将ul插入到root中
            root.appendChild(ul)
            // 遍历数组
            for (let stu of result.data) {
              ul.insertAdjacentHTML(
                "beforeend",
                `<li>${stu.name}--${stu.age}--${stu.gender}--${stu.add}</li>`
              )
            }
          }
        }
      }
    }
  </script>
</body>
</html>
```

node编写的后端部分

```javascript
const express = require("express")
const app = express()
const STUDENT_ARR=[{
   id:'1',name:'megumi',age:18,add:'heart',gender:'♀'
},{
   id:'2',name:'kurumi',age:18,add:'heart',gender:'♀'
}]
// 配置允许跨域的中间件
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
})
app.get("/students",(req,res)=>{
    console.log("student收到了get请求")
    res.send({
        status: 'ok',
        data:STUDENT_ARR
    })
})
app.listen(3000,()=>{
    console.log("Explosion!!")
})
```

### Fetch

fetch是xhr的升级版，采用的是Promise异步API
作用和AJAX是一样的，但是使用起来更加友好
fetch元素js只支持这种ajax请求的方法
演示一下前端的部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>AJAX测试</h1>
  <hr>
  <button id="btn">
    点我加载数据
  </button>
  <br>
  <button id="btn2">
    点我加载数据2
  </button>
  <div class="root"></div>
  <script>
    const btn = document.querySelector("#btn")
    const btn2 = document.querySelector("#btn2")
    btn.onclick = ()=>{
      fetch("http://localhost:3000/students")
        .then(res=>{
          if(res.status === 200){
			// reurn 出来的是promise还需要去then一下获取数据
            return res.json()
          } else {
            throw new Error("加载失败")
          }
        })
        .then(res=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log("出错辣",err)
        })
    }
    btn2.onclick = ()=>{
      fetch("http://localhost:3000/students",{
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        // 通过 body 去发送数据时，必须通过请求头来指定数据的类型
        body: JSON.stringify({
          name:"megumi",
          age: 18,
          gender: '♀',
          address: "heart"
        })
      })
    }
  </script>
</body>
</html>
```

我们只需要在上面的代码添加添加students的路由即可

```js
// 定义添加学生的路由
app.post("/students",(req,res)=>{
  // 获取学生的信息
  // 一般会有校验但这里就不校验辣
  const { name,age,add,gender } = req.body
  // 将学生的信息添加到数组中
  console.log("students受到post请求")
  const stu = {
    id: +STUDENT_ARR.at(-1).id + 1 + '',
    name,
    age:+age,
    add,
    gender
  }
  STUDENT_ARR.push(stu)
  res.send({
    status:'ok',
    data:stu
  })
})
```

### 浏览器的本地存储

localStorage && sessionStorage （如下图所示）
![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.54t891g8b5g0.webp)

所谓本地存储就是指浏览器自身的存储空间
	可以将用户的数据存储到浏览器内部
	sessionStorage 中存储数据页面一关就会丢失
	localStorage 存储的时间比较长

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>本地存储的演示</h1>
  <button id="btn01">存</button>
  <button id="btn02">取</button>
  <script>
    const btn1 = document.querySelector("#btn01")
    const btn2 = document.querySelector("#btn02")
    btn01.onclick = ()=>{
      // setItem() 用来存储数据
      // getItem() 用来获取数据
      // removeItem() 删除数据
      // clear() 清空数据
      // sessionStorage.setItem("name","megumi")
      // sessionStorage.setItem("age","18")
      // sessionStorage.setItem("gender","♀")
      // sessionStorage.setItem("address","heart")
      localStorage.setItem("name","megumi")
    }
    btn02.onclick = ()=>{
      //getItem() 用来取数据
      const name = sessionStorage.getItem("name")
      console.log(name)
    }
  </script>
</body>
</html>
```

### axios

axios是二次封装的包axios官方文档：
https://www.axios-http.cn/docs/intro
演示效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axios</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <button id="btn">点击</button>
  <script>
    document.querySelector("#btn").onclick=()=>{
      // 直接调用
      axios({
        method:'POST',
        url:"http://localhost:3000/students",
        data: {
          name:'megami',
          age:18,
          gender:"♀"
        }
      })
      .then(result=>{
        // axios 默认只会在响应状态为2xx时才会调用then
        // result 是axios封装过
        console.log(result.data)
      })
      .catch(err=>{
        console.log("出错辣",err)
      })
    }
  </script>
</body>
</html>
```

点击发送网络请求后的控制台输出![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.3elgv62e8ao0.webp)

axios的配置

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axios</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <button id="btn">点击</button>
  <script>
    document.querySelector("#btn").onclick=()=>{
      // 直接调用
      axios({
        // 请求方法，默认是get
        method:'POST',
        // baseURL 指定服务器的根目录(路径的前缀)
        baseURL:'http://localhost:3000',
        // 请求地址
        url:"students",
        // 指定请求头
        headers: {"Content-type":"application/json"},
        // 请求头
        data: {
          name:'megami',
          age:18,
          gender:"♀"
        },
        // params 用来指定路径中的查询字符串
        params:{
          id:1,
          name:'xxx'
        },
        // timeout 过期时间
        timeout:10000,
        // signal 用来种终止请求
        // signal:AbortController,

        // transformRequest 可以用来处理请求数据(data)
        // 需要数组作为参数，数组可以接收多个函数，请求发送时多个函数会按照顺序执行
        // 函数在执行时，会接收到两个参数data和headers
        transformRequest:[(data,headers)=>{
          // 在函数中对data和headers进行修改
          data.name = "xxx"
          headers['Content-Type'] = "application/json"
          return data
        },(data,headers)=>{
          // 最后一个函数必须返回一个字符串，才能使得数据有效
          console.log(222)
          return JSON.stringify(data)
        }]
      })
      .then(result=>{
        // axios 默认只会在响应状态为2xx时才会调用then
        // result 是axios封装过
        console.log(result.data)
      })
      .catch(err=>{
        console.log("出错辣",err)
      })
    }
  </script>
</body>
</html>
```

axios的默认配置

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axios</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <button id="btn">点击</button>
  <script>
    axios.defaults.baseURL = "http://localhost:3000"
    axios.defaults.headers.common["Authorization"] = "xxx"
    document.querySelector("#btn").onclick=()=>{
      // 直接调用
      axios({
        // 请求方法，默认是get
        method:'POST',
        // baseURL 指定服务器的根目录(路径的前缀)
        baseURL:'http://localhost:3000',
        // 请求地址
        url:"students",
        // 指定请求头
        headers: {"Content-type":"application/json"},
        // 请求头
        data: {
          name:'megami',
          age:18,
          gender:"♀"
        },
        params:{
          id:1,
          name:'xxx'
        },
        timeout:10000,
        transformRequest:[(data,headers)=>{
          data.name = "xxx"
          headers['Content-Type'] = "application/json"
          return data
        },(data,headers)=>{
          // 最后一个函数必须返回一个字符串，才能使得数据有效
          console.log(222)
          return JSON.stringify(data)
        }]
      })
      .then(result=>{
        // axios 默认只会在响应状态为2xx时才会调用then
        // result 是axios封装过
        console.log(result.data)
      })
      .catch(err=>{
        console.log("出错辣",err)
      })
    }
  </script>
</body>
</html>
```

axios的实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axios</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <button id="btn">点击</button>
  <script>
    axios.defaults.baseURL = "http://localhost:3000"
    axios.defaults.headers.common["Authorization"] = "xxx"

    // axios 实例相当于axios的一个副本，它的功能和axios一样
    // axios的默认配置在实例也同样会生效
    // 但是我们可以单独修改axios实例的默认配置
    // const instance = axios.create({
    //   baseURL: 'http://localhost:4000'
    // })
    const instance = axios.create()
    instance.defaults.baseURL = 'http://localhost:4000'
    document.querySelector("#btn").onclick=()=>{
      // 直接调用
      axios({
        // 请求方法，默认是get
        method:'POST',
        // baseURL 指定服务器的根目录(路径的前缀)
        baseURL:'http://localhost:3000',
        // 请求地址
        url:"students",
        // 指定请求头
        headers: {"Content-type":"application/json"},
        // 请求头
        data: {
          name:'megami',
          age:18,
          gender:"♀"
        },
        params:{
          id:1,
          name:'xxx'
        },
        timeout:10000,
        transformRequest:[(data,headers)=>{
          data.name = "xxx"
          headers['Content-Type'] = "application/json"
          return data
        },(data,headers)=>{
          // 最后一个函数必须返回一个字符串，才能使得数据有效
          console.log(222)
          return JSON.stringify(data)
        }]
      })
      .then(result=>{
        // axios 默认只会在响应状态为2xx时才会调用then
        // result 是axios封装过
        console.log(result.data)
      })
      .catch(err=>{
        console.log("出错辣",err)
      })
    }
  </script>
</body>
</html>
```

axios拦截器

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Axios</title>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <button id="btn">点击</button>
  <script>
    axios.defaults.baseURL = "http://localhost:3000"
    // axios的拦截器可以对请求或响应进行拦截，在请求发送前和响应读取前处理数据
    // 拦截器只对当前的实例有效
    // 添加请求拦截器
    axios.interceptors.request.use(
      function (config) {
        // config 表示axios的配置对象
        // console.log()
        // config.data.name = '啧啧啧'
        // 可以对请求做一些配置
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    document.querySelector("#btn").onclick=()=>{
      // 直接调用
      axios({
        method:'POST',
        url:"students",
        // 请求头
        data: {
          name:'megami',
          age:18,
          gender:"♀"
        },
        params:{
          id:1,
          name:'xxx'
        },
        timeout:10000,
        transformRequest:[(data,headers)=>{
          data.name = "xxx"
          headers['Content-Type'] = "application/json"
          return data
        },(data,headers)=>{
          // 最后一个函数必须返回一个字符串，才能使得数据有效
          console.log(222)
          return JSON.stringify(data)
        }]
      })
      .then(result=>{
        // axios 默认只会在响应状态为2xx时才会调用then
        // result 是axios封装过
        console.log(result.data)
      })
      .catch(err=>{
        console.log("出错辣",err)
      })
    }
  </script>
</body>
</html>
```

