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
```

