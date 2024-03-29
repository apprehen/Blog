---
title: 异步Promise
tags: Promise.异步
description: 使用异步的踩坑和一些心得
swiper_index: 2
top_group_index: 2
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/102629230_p0.3yd2fxgj0100.webp
abbrlink: e6cca6f4
categories: 技术
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
    // reject("出错辣")
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
reject 是执行错误时存储的数据 这两个个都是函数
promise获取数据用`then`获取,then需要两个回调函数作为参数做为成功接收的结果和拒绝接受的结果

```js
const promise = new Promise((resolve,reject)=>{
  resolve("Explosion")
  setTimeout(()=>{
    resolve('我是setTimeout中的存储数据')
  },2000)
})
promise.then((result)=>{
  console.log('1',result)
},(reason)=>{
  console.log('2',reason)
})

```
Promise中隐藏的两个属性

>###### PromiseResult
>  - 用来储存数据
>###### PromiseState
>  - 记录Promise的状态 (三种状态)
>  - pending (进行中)
>  - fulfilled (完成) 通过 `resolve` 存储数据
>  - State只能修改一次，修改以后永远不会在改

Promise工作的流程

> 当创建Promise时候，PromiseState初始值为pending
> ​	-  当通过resolve存储数据的时候 PromiseState会变成fulfilled
> ​	-	 PromiseResult 变成储存的数据
> ​	- 当通过reject储存数据或者出错时 PromiseState变成rejected
> 当我们通过then读取数据时，相当于为Promise设置了回调函数
> -	 如果PromiseState变成fulfilled 则调用then的第一个回调函数
> -	 如果PromiseState变为rejected 则调用then的第二个回调函数

catch() 用法和then类似,但catch只需要一个回调函数作为参数
	catch() 中的回调函数只会在Promise被拒绝的时候调用
	catch() 相当于 then(null,reason=>{  })
	catch() 就是专门用来处理Promise异常的方法
finally()
	无论是正常储存数据还是出现异常了，finally总会执行|
	但是finally的回调函数中不会接受到数据
	finally() 通常来编写一些无论成功与否都会执行代码

### Promise的链式调用

Promise就是一个用来存储数据的对象，因为存取方式特殊，可以直接将异步调用的结果存储到Promise中
对Promise 进行链式调用时
	1.后面的方法(then,catch)读取上一步的执行结果
	2.如果上一步的执行结果不是当前想要的结果则掉过当前方法
	3.Promise中出现异常时，如果整个流程没有catch，则异常会向外抛出

```javascript
const promise = new Promise((resolve,reject)=>{
  // resolve("数据存储成功")
  reject('出错辣')
})
promise
	.then(result => "hihihi")
	.catch(reason => {
    	throw new Error("亚哒~")
    	console.log('异常处理',reason)
    	return 'Explosion!!'
	})
	.then(result => console.log('第二个then',reason))
	.catch(reason => console.log('又出错辣',reason))
/*
	打印结果
	又出错辣 Error:亚哒~
*/
```

使用promise回调解决问题

```js
function sum(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },1000)
    })
}
sum(123,456)
	.then(result => result+7)
	.then(result => result+8)
	.then(result => result+9)
	.then(result => result+10)
	.then(result => console.log(result))
```

### JS中的事件循环机制

> ###### JS是单线程，它的运行时基于事件循环机制
>
>  - 调用栈  
>  1.栈：一种数据结构，后进先出  
>  2.调用栈：放入要执行的代码
>  - 任务队列  
>  1.队列：一种数据结构，先进先出  
>  2.任务队列中放入的是要执行的代码  
>  3.在JS中任务队列有两种  
>   ①：宏任务队列 (大部分代码都在宏任务队列中去排队)  
>   ②：微任务队列(Promise的回调函数(then,catch,finally))
>###### JS执行的整个流程：
> - 执行调用栈中的代码
> - 执行微任务队列中的所有任务
> - 执行宏任务中的所有任务

比如判断下面的输出顺序

```javascript
/*
  queueMicrotask () 向微任务中添加一个微任务中 (先进先出)
*/
console.log(333)
setTimeout(()=>{
  console.log(111)
})
Promise.resolve(1).then((result)=>{
  console.log(222) //第一种
  setTimeout(()=>{
    console.log('我是pro中的settime')
  },0)
  Promise.resolve(1).then(()=>{
    console.log('微中微')
  })
})

queueMicrotask(()=>{
  console.log('que中',111)
})
/*
	输出结果
	333
	222
	que中111
	微中微
	111
	我是pro中的settime
*/
```

### ASYNC和AWAIT语法糖

通过async可以快速创建异步函数,通过async声明的异步函数返回值会自动封装成一个Promise函数，在async声明的异步函数中可以使用await关键字来调用异步函数

```javascript
function fn1(){
    return Promise.resolve(10)
}
async function fn2(){
    return 10
}
// fn1 === fn2
```

当我们通过await去调用异步函数的时候，他会暂停代码的运行
直到异步代码执行有结果，才会将结果返回
await 只能用于async 声明的异步函数中或es模块的顶级作用域
await阻塞的只是异步函数内部的代码，不会影响外部代码
通过await调用异步代码需要通过try-catch来处理异常

```javascript
function sum(a,b){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(a+b)
    },2000)
  })
}
async function fn3(){
    try{
        let result = await sum(123,456)
        result = await sum(result,8)
        result = await sum(result,9)
        console.log(result)
    }
    catch(e){
        console.log("出错辣")
    }
}
async function fn4 () {
  console.log(1)
  /*
    当我们使用await调用函数后，当前函数后边的所有代码
        会在当前函数执行完毕后，被放入到微任务队伍中
  */
  await console.log(2)
  console.log(3)
}
fn4()
```

如果async声明的函数中没用写 await 那么它里边就会依次

```javascript
async function fn4 () {
  console.log(1)
  console.log(2)
  console.log(3)
}
fn4()
console.log(4)
function fn5 () {
  return new Promise((resolve,reject)=>{
    console.log(1)
    console.log(2)
    console.log(3)
    resolve()
  })
}
fn5()
//fn4 === fn5
```

我们还可以通过立即回调函数去调用异步函数

```javascript
;(async () => {
  await console.log("hhh")
})()
```

