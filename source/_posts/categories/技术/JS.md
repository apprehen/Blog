---
title: JS
description: JS面向对象的弱类型语言！！
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_24_16_10_44.48slxzyjcgm0.webp
categories: 技术
tags: JS(面向对象)
abbrlink: b92db53e
date: 2022-11-24 16:05:15
---

# JS函数

## 函数简介

函数(Function)： 函数也是一种对象，它具有对象的所有功能，函数中可以存储代码，且在需要时候调用这些代码
函数语法：`function 函数名 () { pass... }`
调用函数：调用函数就是执行函数中的存储的代码
调用函数语法：`函数名()`  (可以使用type of)来检查

```js
function fn(){
    console.log('不中嘞，哥')
}
function fn2(){
    console.log('中嘞，哥')
}
fn()
console.log(fn)
console.log(typeof fn)
```

## 函数的创建方式

函数的定义方式
1.函数声明

```javascript
function 函数名 () {
    pass...
}
```

2.函数表达式

```javascript
const 变量 = function () {
    pass...
}
```

3.箭头函数

```javascript
() => {
    pass...
}
```

```javascript
function fn () {
    console.log("你是不是觉得我傻啦吧唧的.jpg")
}
fn()
const fn2 = function () {
    console.log("答案是寄")
}
fn2()
const fn3 = () => {
    console.log("寄寄寄")
}
// 当箭头函数只有一条语句时，可以简写
const fn4 = () => console.log("简写的箭头函数捏")
fn4()
```

## 函数的参数

### 参数的定义

比如现在定义一个求任意两个数的和

```javascript
function sum () {
    const a = 123
    const b = 456
    console.log(a+b)
}
// 垃圾函数没有功能
function sum (a,b) {
    console.log('a = ',a)
    console.log('b = ',b)
    console.log(a+b)
}
sum(123,456)
sum(123,321)
```

> 形式参数：在**定义函数**时，可在函数中指定数量不等的参数(形参)
> 在函数中指定了形参，就相当于在函数内部中声明了对应的变量但没赋值

> 实际参数：在**调用函数**时，可以在函数的()传递数量不等的实参，实参会赋值给对应的形参，如何实参多余形参，多余的不会使用，少于则会undefined

> **JS 中不会检查参数类型，可以传递任何类型的值为参数**

```javascript
function fn (a,b) {
    console.log("a =",a)
    console.log("b =",b)
}
fn(true,'Hello')
fn(null,11n)
fn({name: 'megumi'},()=>{console.log("explosion!")})
```

### 箭头函数的参数

```javascript
const fn = (a,b) => {
    console.log('a =',a)
    console.log('b =',b)
}
//当箭头函数中只有一个参数时，可以省略()
const fn2 = a => console.log('a =',a)
fn2(123)
//定义参数时，可以为参数指定默认值
//默认值，会在没有对应实参时生效
const fn3 = (a=10,b=20,c=30) => {
    console.log('a =',a)
    console.log('b =',b)
    console.log('c =',c)
}
fn3(1,2)
```

### 对象作为参数

```javascript
function fn (a) {
      console.log("a =",a)
      // a = {} //修改对象时，如果有其他变量指向该对象，则所有指向该对象的变量都会受到影响
      //a.name = '??' //修改变量时，只会影响当前的变量(重新指向)
      console.log(a.name)
      console.log(a.age)
    }
fn({name:'megumi',age:18})
// 对象作为参数传递
let obj = {name: 'Komi'}
fn(obj)
console.log(obj) // 传递实参时，传递的并不是变量本身，而是变量中储存的值
```

看看下面这个输出什么

```javascript
function fn2(a = {name:'megumi'}){
    console.log('a = ',a)
    a.name = 'komi'
    console.log('a = ',a)
}
fn2() //输出什么
fn2() //输出什么
```

### 以函数作为参数

在JS中，函数也是一个对象，别的对象能做的事，函数也可以

```javascript
function fn (a) {
    console.log('a = ',a)
    a()
}
function fn2 () {
    console.log('我是fn2')
}
fn(fn2)
fn(function () {
    console.log('我是匿名函数~~')
})
fn(() => console.log('我是箭头函数~~'))
```

## 函数的返回值

```javascript
function sum (a,b) {
    // console.log(a+b) 
    return a+b // 计算后直接返回而不打印
}
const result = sum(1,2)
```

在函数中,可以通过return关键字来指定函数的返回值返回值就是函数的执行结果,函数调用完毕返回值便作为结果返回
任何值都可以作为返回值使用(**包括对象和函数**)

> 如果return后不跟返回值,则相当于返回undefined
> 如果不写return函数的返回值依然是undefined
>
> **return 一执行函数立即结束**

```javascript
function fn () {
    //return "呀哈喽"
    //return {name: 'megumi'}
    return () => alert("Explosion!!")
}
const result = fn()
retult()
console.log(result)
console.log(fn())
```

**箭头函数的返回值可以直接写在箭头后**
**但是返回对象字面量的时候,对象字面量一定要用小括号括起来**

```javascript
const sum = (a,b) => a+b
const fn = () => ({name:'孙悟空'})
let result = sum(123,456)
console.log(result)
result = fn()
console.log(result)
```

## 函数作用域

pass...

## 立即执行函数

pass...

## window对象

pass...

## this

pass...

# JS数组

## 数组简介

### 数组(Array) 

数组是一种复合数据类型,在数组中可以存储多个不同类型的数据
数组中存储的是有序的数据,数组中的每个数据都有唯一的索引,可以通过索引来操作获取数据

### 数组创建

通过Array()来创建数组,也可以通过[ ]来创建数组

### 读取数组元素

数组[索引] 如果读取了一个不存在的元素,**不会报错而是返回undefined**

### length

获取数组的长度,获取的实际值就是数组的最大索引 + 1
向数组后面添加元素:
	`数组[数组.length] = 元素`
length是可以修改的

```javascript
const obj = {name:'kurumi',age:18}
const arr = new Array()
const arr2 = [] // 数组字面量
arr2[0] = () => {
    alert('嗨嗨嗨')
}
arr2[0]()
arr2[1] = 11
arr2[2] = null
//亚哒 非连续数组
arr2[100] = 99
```

## 遍历数组

### for循环遍历

任何类型的值都可以成为数组中的元素
`   let arr = [1,'Hello',true,null,undefined,{name:'komi'},()=>{}]`
创建数组时尽量要确保数组中的存储的数据的类型是相同的
`arr = ['十香','七罪','狂三','折纸'.]`
遍历数组就是获取到数组中的每个元素

```javascript
for (let i = 0;i<arr.length;i++) {
    console.log(arr[i])
}
class person {
    constructor(name,age){
        this.name = name
        this.age = age
    }
}
const personArr = [
    new person('十香',18),
    new person('七罪',15),
    new person('狂三',17)
]
for (let i = 0;i<personArr.length;i++) {
    if(personArr[i].age<18){
        console.log(personArr[i].name)
    }
}

```

### for - of 语句遍历可迭代对象

for - of 语句可以用来遍历可迭代对象
整体流程： for - of 的循环体会执行多少次，数组中有几个元素就会执行几次，每次执行都会给一个元素赋值给变量

```javascript
arr = ['十香','七罪','狂三','折纸'.]
for (let value of arr) {
    console.log(value)
}
// 若想同时获取index
for (let [index,value] of arr.entries()) {
    console.log(index,value)
}
```

