---
title: Vue3源码分析-mini-vue
date: 2023-07-09 00:29:21
tags:
  - Vue3
  - 源码理解
description: 学习Vue框架的底层逻辑是怎么实现的
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/102840030_1.1w4upuv6qmsg.webp
---

# VUE3框架的三大模块

1. compiler 编译系统
2. runtime 渲染系统
3. reactive 响应系统

**1.Reactive的实现**
在Vue2中实现响应式是使用Object.defineProperty来实现数据劫持如下
```javascript
let number = 18
let person = {
  name: '月晕',
}
Object.defineProperty(person,'age',{
  value:18 // 设置属性的值
  writable: true // 如果为 true，属性的值可以被修改；如果为 false，属性的值是只读的。
  enumerable:true //如果为 true，属性可以通过对象的迭代方法（例如 for...in 循环）枚举；如果为 false，属性不可枚举。
  configurable:true // 如果为 true，属性的特性可以被修改或者删除；如果为 false，属性的特性不可更改。
  get(){
    console.log('有人访问age属性了')
    return number
  },
  set(value){
    number = value  
    console.log('有人修改了age属性',value)
  }
})
```
在Vue3中使用Proxy来实现数据劫持
```javascript
let number = 18
let person = {
  name: '月晕',
}
let proxy = new Proxy(person,{
  get(target,key，reactive){
    console.log('有人访问get属性了')
    return Reflect.get(target,key,reactive)
  },
  set(target,key,value,reactive){
    console.log('有人修改了age属性',value)
    return Reflect.set(target,key,value,reactive)
  }
})
```
>Proxy的优势
> 1. Proxy可以直接监听对象而非属性
> 2. Proxy 用于创建一个对象的代理，从而实现基本操作的拦截和自定义劫持整个对象，并返回一个新对象。
> 3. Object.defineProperty 无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实施响应。
> 4. Object.defineProperty 只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历。Vue2.X 里，是通过递归 + 遍历 data 对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历，显然如果能劫持一个完整的对象才是更好的选择。 


**Reflect**
  - 不是一个函数对象，因此它是不可构造的。直接使用静态方式即可。
  - 反射
  - 作用：可以通过编程的方式操作对象
  - 用法和Object类似,但是Object具有局限性
  - 比如增加删除属性需要写try catch，而Reflect不需要 直接if else判断即可
  - 比如在object的key只能是String，而Reflect可以value-value
  - Reflect 提供的是一整套反射能力 API，它们的调用方式，参数和返回值都是统一风格的，我们可以使用 Reflect 写出更优雅的反射代码。

Reactive的实现
 - reactive.js
```javascript
// 引入一些工具函数
import {isObject,hasChanged,isArray} from './utils'
// 引入track trigger 更新触发函数
import {track,trigger} from './effect'
// 建立proxyMap映射表 用于存储代理对象(代理对象相同时直接引用就行)
const proxyMap = new WeakMap()
export function reactive(target) {
  // 1. 判断传入的target是否是对象
  if (!isObject(target)) {
    return target
  }
  // 2.判断是否是reactive包reactive
  if(isReactive(target)) {
    return target
  }
  if(proxyMap.has(target)) {
    return proxyMap.get(target)
  }
  const proxy = new Proxy(target,{
    // receiver 代理对象本身
    get(target,key,receiver){
      const res = Reflect.get(target,key,receiver)
      // 如果是(reactive(reacitve))的情况（重复代理情况）
      if(key==='__isReactive') return true
      // 收集依赖
      track(target,,key)
      // 递归遍历深层次对象
      return isObject(res) ? reactive(res) : res
    },
    set(target,key,value,receiver){
      // 处理数组
      const oldLength = target.length
      const oldVlaue = target[key]
      const res = Reflect.set(target,key,value,receiver)
      if(hasChanged(oldVlaue,value)) {
        // 触发更新
        trigger(target,key)
        if(isArray(target)&&hasChanged(oldLength,target.length)) {
          trigger(target,'length')
        }
      }
    }
  })
  proxyMap.set(target,proxy)
  return proxy
}
// 多次代理
export function isReactive(target) {
  // 强行转化成布尔值
  return !!(target && target.__isReactive)
}
```
 - effect.js
```javascript
/**
 * activeEffect 用于存储当前的effect函数
 * 作用：用于在track中存储依赖收集
 */
let activeEffect
// effectStack 用于存储effect函数的栈防止丢失effect函数
const effectStack = []
export function effect(fn,options={}) {
  const effectFn = () => {
    try {
      activeEffect = effectFn
      // 入栈
      effectStack.push(effectFn)
      return fn()
    } 
    finally{
      // 出栈
      effectStack.pop()
      // 恢复activeEffect
      activeEffect = effectStack[effectStack.length-1]
    }
  }
  // options.lazy 为true时不会立即执行effect函数（区别computed和watch和普通的响应）
  if(!options.lazy) {
    effectFn()
  }
  if(options.sheduler) {
    effectFn.sheduler = options.sheduler
  }
  return effectFn
}
// 依赖收集
const targetMap = new WeakMap()
export function track(target,key){
  // 如果没有activeEffect 说明不是在effect中执行的则不需要收集依赖直接返回
  if(!acctiveEffect) {
    return
  }
  //depsMap Map对象 用于存储目标对象与其属性之间的依赖关系。它的作用是将目标对象映射到一个包含属性依赖的 Map，以便在需要时快速找到对应属性的依赖集合。
  let depsMap = targetMap.get(target)
  // 如果没有depsMap 说明是第一次收集依赖
  if(!depsMap) {
    // 初始化depsMap
    targetMap.set(target,(depsMap = new Map()))
  }
  // dep是Set对象，它用于存储具体属性的依赖集合。每个属性都有一个对应的 dep 集合，其中存储了依赖于该属性的副作用函数（effects）。
  let dep = depsMap.get(key)
  if(!dep){
    depsMap.set(key,(dep = new Set()))
  }
  dep.add(acctiveEffect)
}

export function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(!depsMap) {
    return
  }
  const dep = depsMap.get(key)
  if(!dep){
    return
  }
  dep.forEach(effectFn => {
    if(effectFn.sheduler) {
      effectFn.sheduler()
  } else {
    effectFn()
  }
  })
}
```
- utils.js
```javascript
export function isObject(val) {
  // 类型是null 类型是object
  return typeof val === 'object' && val !== null
}

export function haschanged(oldValue, newValue) {
  return oldValue !== newValue && !(Number.isNaN(oldValue) && Number.isNaN(newValue))
}

export function isArray(target){
  return Array.isArray(target)
}

export function isFunction(target){
  return typeof target === 'function'
}
```
