---
title: 异步Promise
tags: Promise.异步
description: 使用异步的踩坑和一些心得
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/102629230_p0.3yd2fxgj0100.webp
abbrlink: e6cca6f4
date: 2022-11-15 10:07:00
---
### 什么是异步

先了解一下进程和线程
	进程：程序的运行环境 ----------- 工厂环境
	线程：线程是实际进行运算的东西 ------------- 工人
同步：代码是自上而下执行，前面的代码不执行后面的代码也不会执行，同步代码会出现阻塞的情况，一行代码执行慢的时候总共都执行的慢
解决同步的问题：
	`java python` ---- 通过多线程解决
	`node.js` ----- 单线程异步解决	
异步：一段代码的执行不会影响到其他的程序

> 注意：异步代码无法通过 return 来设置返回值 返回的新的promise

异步的特点：不会阻塞其他代码的执行，需要调用回调函数来返回结果
什么东西可以代替回调函数来给我们返回结果？？ ----- `Promise`
promise 是一个用来存储数据的对象，存储的数据方式很特殊，这种特殊的方式使得promise可以存储异步调用的数据

### Promise的基本演示

无promise使用异步的时候

```javascript
function sum (a,b) {
  setTimeout(()=>{
    return a+b
  },3000)
}
let result = sum(123,456)
console.log(result)
```

此时我们打印到的 result 是 undefined 这就是由于sum函数中开了定时器导致result先执行并没有拿到任何数据,这时我们可以为sum设置回调函数来拿到结果

```javascript
function sum(a,b,callback) {
    setTimeout(()=>{
        callback(a+b)
    },300)
}
sum(123,456,result=>{
    console.log(result)
})
```

此时过300ms就会打印出579，但是这样存在一个问题那就是回调地狱,如果想调用多次函数就会形成很恶心的情况

```javascript
sum(123,456,result=>{
  sum(result,1,result=>{
    sum(result,2,result=>{
      sum(result,3,result=>{
        //.....
        console.log(result)
      })
    })
  })
})
// 打印 123+456+1+2+3 = 585
```

使用promise完美解决这个问题

```javascript
//创建promise
const promise = new Promise((resolve,reject)=>{
    // 构造函数中需要一个函数作为参数传递进去
    // Promise构造函数的回调函数，在创建Promise时调用，调用时会有两个参数(也是函数)传递进去
    resolve('Explosion')
})
console.log(promise)
```

打印结果如下![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.3oe9jgkwej20.webp)

当然promise中也能存异步数据

```javascript
const promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
    resolve('我是setTimeout中的存储数据')
  	},2000)
})
console.log(promise)
```

resolve 是执行正常时存储的数据
reject 是执行错误时存储的数据 这个都是函数