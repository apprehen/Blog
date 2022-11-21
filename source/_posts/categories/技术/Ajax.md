---
title: Ajax介绍和用法
description: Ajax学习记录,xhr,fetch,axios
cover: https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_21_13_07_73.gojqpxla7h4.webp
date: 2022-11-21 13:20:51
tags: Ajax,前后端交互
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

```

