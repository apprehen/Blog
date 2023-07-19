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

## **Reactive的实现**
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

**Ref实现**

ref.js 如下
```javascript
import {isObject,hasChanged} from './utils'
import {track,trigger} from './effect'
import {reactive} from './reactive'
export function ref (value) {
  if(isRef(value)) return value
  return new RefImpl(value)
}
export function isRef(value) {
  return value.__isRef
}
class RefImpl {
  constructor(value) {
    this._value = convert(value)
    this.__isRef = true
  }
  get value () {
    track(this,'value')
    return this._value
  }
  set value (newValue) {
    if (hasChanged(newValue,this._value)) {
      this._value = convert(newValue)
      tigger(this,'value')
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}
```

**computed实现**  
computed.js 如下
```javascript
import { isFunction } from "../utils"
import { effect,track,trigger } from "./effect"
export function computed(getterOrOptions){
  let getter,setter;
  if(isFunction(getterOrOptions)){
    getter = getterOrOptions
    setter = () => {
      console.warn('computed value must be readonly')
    }
  }else{
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedRefImpl(getter,setter)
}

class ComputedRefImpl{
  constructor(getter,setter){
    this._dirty = true
    this._value = null
    this._setter = setter
    this.effect = effect(getter, {
      lazy: true,
      // 调度机制
      scheduler: () => {
        if(!this._dirty){
          this._dirty = true
          trigger(this, 'value')
        }
      }
    })
  }
  get value(){
    if(this._dirty){
      this._value = this.effect()
      this._dirty = false
    }
    track(this, 'value')
    return this._value
  }
  set value(newValue){
    this._setter(newValue)
  }
}
```



## **runtime 渲染系统**  
首先介绍一下什么是虚拟DOM

虚拟DOM：
- 用JS对象来描述DOM节点
- 种类有：Element、Text、Fragment、

1. Element:  
   对应普通元素，如div、p、span等,使用doucment.createElement创建,type指定标签名，props指定元素属性，children指定子元素，可以为数组或者字符串，为字符串时代表只有一个文本子节点
  ```javascript
  // 类型定义
  {
    type: string,
    props: Object,
    children: string | VNode[]
  }
  // 例子
  {
    type: 'div',
    props: {
      id: 'app'
    },
    children: 'hello world'
  }
  ```

2. Text:  
   对应文本节点，使用document.createTextNode创建，text指定文本内容
  ```javascript
  {
    type: symbol,
    props: null,
    text: string
  }
  ```

3. Fragment:  
   对应Fragment，不会渲染的节点，相当于templete或react的Fragment，type为symbol，props为null，children为数组表示子节点，最后渲染时会将子节点的所有子节点挂载到Fragment父节点上
  ```javascript
  {
    type: symbol,
    props: null,
    children: VNode[]
  }
  ```
4. Components:  
   Component是组件，组件有自己特殊的一套渲染方法，但组件的最终产物，也是上面三种VNode的集合。组件的type，就是组件定义的对象，props即是外部传入组件的props数据，children是组件的slot
  ```javascript
  // 类型定义
  {
    type: Object,
    props: Object,
    children: null
  }
  // 例子
  {
    type:{
      template: `{{msg}} {{name}}`
      props: ['name'],
      setup(){
        return {
          msg: 'hello'
        }
      }
    },
    props: {
      name: 'world'
    },
  }
  ```

ShaperFlags
  - 一组标记，用于快速识别VNode的类型和他的子节点类型
  - 使用位运算
```
// 例子
// 与运算，只有两个都为1时才为1
0 0 1 0 0 0 1 1
0 0 1 0 1 1 1 1
&
0 0 1 0 0 0 1 1
// 或运算，只要有一个为1就为1
0 0 1 0 0 0 1 1
0 0 1 0 1 1 1 1
|
0 0 1 0 1 1 1 1
```
```javascript
const ShapeFlags = {
  ELEMENT: 1, // 普通元素 00000001
  TEXT: 1 << 1, // 文本节点 00000010
  FRAGMENT: 1 << 2, // Fragment 00000100
  COMPONENT: 1 << 3, // 组件 00001000
  TEXT_CHILDREN: 1 << 4, // 子节点是文本 00010000
  ARRAY_CHILDREN: 1 << 5, // 子节点是数组 00100000
  CHILDREN: (1<<4)|(1<<5) // 子节点是文本或数组
}
```
采用二进制位运算`<<`和`|`,使用时用`&`运算判断,如下:
```javascript
if(flag & ShapeFlags.ELEMENT){
  // 是普通元素
}
let flag = 33
flag & ShapeFlags.ELMENT // 1 true
flag & ShapeFlags.TEXT // 0 false
flag & ShapeFlags.FRAGMENT // 0 false
flag & ShapeFlags.ARRAY_CHILDREN //    true
flag & ShapeFlags.CHILDREN // true
```
生成可以用
```let flag = ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN```

VNode的初步形成
```javascript
{
  type,
  props,
  children,
  shapeFlag
}
```

**vnode.js**
```javascript
import {isArray,isNumber,isString} from '../utils'
// ShapeFlags: 二进制位运算
export const ShapeFlags = {
  ELEMENT: 1, 
  TEXT: 1 << 1, 
  FRAGMENT: 1 << 2, 
  COMPONENT: 1 << 3, 
  TEXT_CHILDREN: 1 << 4, 
  ARRAY_CHILDREN: 1 << 5,
  CHILDREN: (1<<4)|(1<<5)
}

// Text：类型Symbol
export const Text = Symbol('Text')
// Fragment：类型SymbolS
export const Fragment = Symbol('Fragment')

/**
 * vnode有四种类型：dom元素，纯文本，Fragment，组件
 * @param {string | Object | Text | Fragment} type 
 * @param {Object | null} props 
 * @param {String | Array | null | number} children
 * @returns {VNode} 
 */

export function h (type, props, children) {
  let shapeFlag = 0
  if (isString(type)) {
    shapeFlag = ShapeFlags.ELEMENT
  } else if (type === Text) {
    shapeFlag = ShapeFlags.TEXT
  } else if (type === Fragment) {
    shapeFlag = ShapeFlags.FRAGMENT
  } else {
    shapeFlag = ShapeFlags.COMPONENT
  }
  if(isString(children)||isNumber(children)){
    // a|=b ==> 
    shapeFlag |= ShapeFlags.TEXT_CHILDREN
    children = children.toString()
  } else if (isArray(children)) {
    shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
  return {
    type,
    props,
    children,
    shapeFlag
  }
}
```

**render.js**
```javascript
import { ShapeFlags } from './vnode'
export funtion render (vnode,container) {
  mount(vnode,container)
} 

funtion mount (vnode,container) {
  const { shapeFlag } = vnode
  // 判断不同类型的vnode
  if(shapeFlag & ShapeFlags.ELEMENT){
    mountElement(vnode,container)
  }else if(shapeFlag & ShapeFlags.TEXT){
    mountText(vnode,container)
  }else if(shapeFlag & ShapeFlags.FRAGMENT){
    mountFragment(vnode,container)
  }else if(shapeFlag & ShapeFlags.COMPONENT){
    mountComponent(vnode,container)
  }
}

function mountElement (vnode,container) {
  const { type,props } = vnode
  const el = document.createElement(type)
  // 挂载属性
  mountProps(props,el)
  // 挂载子节点
  mountChildren(vnode,el)
  // 挂载到容器
  container.appendChild(el)
}

function mountText (vnode,container) {
  const textNode = doucment.createTextNode(vnode.children)
  container.appendChild(textNode)
}

function mountFragment (vnode,container) {
  mountChildren(vnode,container)
}

function mountComponent (vnode,container) {

}

// 区别 attributes 和 直接的dom api
const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/

function mountProps (props,el) {
  for (const key in props) {
    const value = props[key]
    switch (key) {
      case 'class':
        el.className = value
        break;
      case 'style':
        for(const styleName in value){
          el.style[styleName] = value[styleName]
        }
        break;
      default:
        if(/^on[^a-z]/.test(key)){
          const eventName = key.slice(2).toLowerCase()
          el.addEventListener(eventName,value )
        } else if(domPropsRE.test(key)){
          // {"checked":''}
          if(value === '' && typeof el[key] === 'boolean'){
            value = true
          }
          el[key] = value
        } else {
          if(value == null || value === false){
            el.removeAttribute(key)
          } else{
            el.setAttribute(key,value)
          }
        }
        break;
    }
  }
}

function mountChildren (vnode,container) {
  const {shapeFlag,children} = vnode
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    mountText(vnode,container)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // 遍历子节点 递归
    children.forEach(child => mount(child,container))
  }
}
```


**实现广义的diff算法 `patch`**

render.js
```javascript
import {ShapeFlags} from './vnode'
// 比较vnode的Props差异函数
import {patchProps} from './patchProp'
// 渲染render函数
export function render(vnode, container) {
  // 初次渲染
  // 上一次的vnode存储
  const prevVNode = container._vnode
  // first: 判断n2是否存在(即newVNode)
  if(!vnode) {
    // 如果n1存在,则卸载 
    if(prevNode) {
      // 卸载
      unmount(prevVNode)
      container._vnode = null
    }
  } else {
    // n2存在 进行patch差异化比较
    patch(prevVNode,vnode,container)
  }
  container._vnode = vnode
}

/**
 * @param {VNode | null} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 */
function patch(n1,n2,container,anchor) {
  if(n1 && !isSameVNode(n1,n2)) {
    // n1存在 且 n1和n2不是同一个vnode
    // n1被卸载后，n2将会创建，因此anchor至关重要。需要将它设置为n1的下一个兄弟节点
    anchor = (n1.anchor || n1.el).nextSibling
    umount(n1)
    n1 = null
  }
  const { shapeFlag } = n2
  if (shapeFlag & ShapeFlags.COMPONENT) {
    processComponent(n1,n2,container,anchor)
  } else if (shapeFlag & ShapeFlags.TEXT) {
    processText(n1, n2, container, anchor)
  } else if (shapeFlag & ShapeFlags.FRAGMENT) {
    processFragment(n1, n2, container, anchor)
  } else {
    processElement(n1, n2, container, anchor)
  }
}

/**
 * @param {VNode} vnode: vnode DOM节点
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 递归创建子节点
*/
function mountElement(vnode,container,anchor) {
  const { type,props,shapeFlag,children } = vnode
  const el = doucment.createElement(type)
  // 挂载属性
  if (props) {
    patchProps(null, props, el)
  }
  // 挂载子节点
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children // 子结点是文本
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(children, el) // 子结点是数组 遍历子节点挂载
  }
}

/**
 * @param {VNode} vnode:vnode DOM节点
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 
*/
function mountText(vnode, container, anchor) {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.insertBefore(el, anchor)
}

/**
 * @param {Array<VNode>} children:children DOM节点数组 分别挂载
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 挂载子节点(数组类型)
*/  
function mountChildren(children, container, anchor) {
  children.forEach(child => {
    patch(null, child, container, anchor)
  })
}

/**
 * @param {VNode} vnode:vnode DOM节点
 * @apprehen 卸载vnode
*/
function unmount (vnode) {
  const { shapeFlag,el } = vnode
  if(shapeFlag & ShapeFlags.COMPONENT) {
    unmountComponent(vnode)
  } else if (shapeFlag & ShapeFlags.FRAGMENT) {
    unmountFragment(vnode)
  } else {
    el.parentNode.removeChild(el)
  }
}

/**
 * @param {VNode} vnode:vnode DOM节点
 * @apprehen 卸载组件vnode
*/
function unmountComponent(vnode) {
  // TODO
}

/**
 * @param {VNode} vnode:vnode DOM节点
*/
function unmountFragment(vnode) {
  const { el: cur, anchor:end } = vnode
  const { parentNode } = cur
  while(cur !== end) {
    const next = cur.nextSibling
    parentNode.removeChild(cur)
    cur = next
  }
  parentNode.removeChild(end)
}

/**
 * @param {Array<VNode>} Children: children DOM节点数组 分别卸载
 * @apprehen 对比vnode是否相同
*/
function unmountChildren(Children) {
  Children.forEach(child => {
    unmount(child)
  })
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 对比元素Element并进行更新
*/
function processElement(n1, n2, container, anchor) {
  if( n1==null ) {
    // 直接挂载n2
    mountElement(n2,container,anchor)
  } else {
    patchElement(n1,n2)
  }
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 对比Fragment并进行更新
*/
function processFragment(n1, n2, container, anchor) {
  const fragmentStartAnchor = (n2.el = n1 ? n1.el : document.createTextNode(''))
  const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : document.createTextNode(''))
  if(n1 == null) {
    container.insertBefore(fragmentStartAnchor,anchor)
    container.insertBefore(fragmentEndAnchor,anchor)
    mountChildren(n2.children,container,fragmentEndAnchor)
  } else {
    patchChildren(n1,n2,container,fragmentEndAnchor)
  }
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 组件进行更新
*/
function processComponent(n1, n2, container, anchor) {
  // TODO
}


/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 对比文本并进行更新 
*/
function processText(n1, n2, container, anchor) {
  if (n1 == null) {
    mountText(n2, container, anchor)
  } else {
    n2.el = n1.el
    n2.el.textContent = n2.children
  }
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @apprehen 对比vnode是否相同(比较复用)
*/
function patchElement(n1, n2) {
  n2.el = n1.el
  patchProps(n1.props, n2.props, n2.el)
  patchChildren(n1,n2,n2.el)
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
 * @apprehen 对比vnode是否相同(比较复用)判断n1 n2 的子结点类型
 */
function patchChildren(n1,n2,container,anchor) {
  const { shapeFlag: prevShapeFlag, children: c1 } = n1
	const { shapeFlag, children: c2 } = n2
	if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
		// n2 是TEXT_CHILDREN 类型
		if (c2 !== c1) {
			container.textContent = c2
		}
		if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
			unmountChildren(c1)
		}
	} else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
		// n2 是ARRAY_CHILDREN 类型
		if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
			// n1 是TEXT_CHILDREN 类型
			container.textContent = ""
			mountChildren(c2, container, anchor)
		} else if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
			// n1 是ARRAY_CHILDREN 类型
			patchArrayChildren(c1, c2, container, anchor)
		} else {
			// n1 是EMPTY_CHILDREN 类型 null
			mountChildren(c2, container, anchor)
		}
	} else {
		// n2 是EMPTY_CHILDREN 类型 null
		if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
			// n1 是TEXT_CHILDREN 类型
			container.textContent = ""
		} else if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
			// n1 是ARRAY_CHILDREN 类型
			unmountChildren(c1)
		}
	}
}

/**
 * @param {VNode} n1:旧的vnode
 * @param {VNode} n2:新的vnode
 * @param {Element} container:容器
 * @param {Element | null} anchor:锚点 (插入位置)
*/
function patchArrayChildren(c1, c2, container, anchor) {
	const oldLength = c1.length
	const newLength = c2.length
	const commonLength = Math.min(oldLength, newLength)
	for (let i = 0; i < commonLength; i++) {
		patch(c1[i], c2[i], container, anchor)
	}
	if (oldLength > newLength) {
		unmountChildren(c1.slice(commonLength))
	} else {
		mountChildren(c2.slice(commonLength), container, anchor)
	}
}

function isSameVNode(prevVNode, vnode) {
	return prevVNode.type === vnode.type
}
```

vnode.js
```javascript
//在return中新添加属性
return {
  types,
  props,
  children,
  shapeFlag,
  el:null,
  anchor:null,
  key: props && (props.key != null ? props.key : null),
	component: null, //专门用于存储组件的实例
}
```

**vue3中diff算法**  
首先是重新完成render.js
```javascript
import { ShapeFlags } from "./vnode"
import { patchProps } from "./patchProps"
import { mountComponent } from "./component"
export function render(vnode, container) {
	const prevVNode = container._vnode
	// first：判断n2是否存在
	if (!vnode) {
		if (prevVNode) {
			unmount(prevVNode)
		}
	} else {
		// n2存在
		patch(prevVNode, vnode, container)
	}
  // 存prevVNode
  container._vnode = vnode
}
// .... 
// 简单的diff比较
function patchUnkeyedChildren(c1, c2, container, anchor) {
  const oldLength = c1.length
  const newLength = c2.length
  const commonLenght = Math.min(oldLength, newLength)
  for(let i=0;i<commonlength;i++){
    patch(c1[i],c2[i],container)
  }
  if(oldLength > newLength){
    unmountChildren(c1.slice(commonLength))
  } else {
    mountChildren(c2.slice(commonLength),container,anchor)
  }
}
// react中的diff算法原理
function reactPathchKeyedChildren(c1,c2,container,anchor) {
  const map = new Map()
  c1.forEach((perv, j)=>{
    map.set(perv.key,{perv,j})
  })
  let maxNewIndexSoFar = 0
  for(let i=0;i<c2.length;i++) {
    const next = c2[i]
    const curAnchor = i-1<0 ? c1[0].el : c2[ i-1 ].el.nextSibling
    if (map.has(next.key)) {
      const { prev, j } = map.get(next.key)
      patch(prev,next,container,anchor)
      if (j < maxNewIndexSoFar) {
        container.insertBefore(next.el, curAnchor)
      } else {
        maxNewIndexSoFar = j
      }
      map.delete(next.key)
    } else {
      patch(null,next,container,curAnchor)
    }
  }
  map.forEach(({perv})=>{
    unmount(perv)
  })
}

// Vue3中的diff算法 双端 + 最长子序列算法
function patchKeyedChildren(c1, c2, container, anchor) {
  let i = 0
  let e1 = c1.length - 1
  let e2 = c2.length - 1
  // 1.从左向右依次对比
  while(i <= e1 && i<= e2 && c1[i].key === c2[i].key ) {
    patch(c1[i], c2[i], container, anchor)
    i++
  }
  // 2.从右向左一次对比
  while (i <= e1 && i <= e2 && c1[e1].key === c2[e2].key) {
		patch(c1[e1], c2[e1], container, anchor)
		e1--
		e2--
	}
  if (i > e1) {
		// 3. 经过1,2 直接将旧结点比对完，则剩下的新结点直接mount
		for (let j = i; j <= e2; j++) {
			const nextPos = e2 + 1
			const curAnchor = (c2[nextPos] && c2[nextPos].el) || anchor
			path(null, c2[j], container, curAnchor)
		}
	} else if (i > e2) {
		// 3. 经过1,2 直接将新结点比对完，则剩下的旧结点直接unmount
		for (let j = 1; j <= e1; j++) {
			unmount(c1[j])
		}
	} else {
    // 4. 若不满足3 采用传统的diff算法 但是不真的移动和添加，只做标记和删除
		const map = new Map()
		c1.forEach((perv, j) => {
			map.set(perv.key, { perv, j })
		})
		let maxNewIndexSoFar = 0
		let move = false
		const source = new Array(e2 - i + 1).fill(-1)
		const toMounted = []
		for (let k = 0; k < c2.length; k++) {
			const next = c2[k]
			if (map.has(next.key)) {
				const { prev, j } = map.get(next.key)
				patch(prev, next, container, anchor)
				if (j < maxNewIndexSoFar) {
					move = true
				} else {
					maxNewIndexSoFar = j
				}
				source[k] = j
				map.delete(next.key)
			} else {
				toMounted.push(k + i)
			}
		}
		map.forEach(({ perv }) => unmount(perv))
		if (move) {
			// 5.需要移动，则采用新的最长上升子序列算法
			const seq = getSequence(source)
			let j = seq.length - 1
			for (let k = source.length - 1; k >= 0; k--) {
				if (k === seq[j]) {
					// 不用移动
					j--
				} else {
					const pos = k + i
					const nextPos = pos + 1
					const curAnchor = (c2[nextPos] && c2[nextPos].el) || anchor
					if (source[k] === -1) {
						// mount
						patch(null, c2[pos], container, curAnchor)
					} else {
						// 移动
						container.insertBefore(c2[pos].el, curAnchor)
					}
				}
			}
		} else if (toMounted.length) {
			// 6.不需要移动，但还有未添加的元素
			for (let k = toMounted.length - 1; k >= 0; k--) {
				const pos = toMounted[k]
				const nextPos = pos + 1
				const curAnchor = (c2[nextPos] && c2[nextPos].el) || anchor
				patch(null, c2[pos], container, curAnchor)
			}
		}
	}
}

// 求最长子序列
function getSequence (nums) {
  const result = []
	const position = []
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === -1) {
			continue
		}
		// result[result.length - 1]可能为undefined，此时nums[i] > undefined为false
		if (nums[i] > result[result.length - 1]) {
			result.push(nums[i])
			position.push(result.length - 1)
		} else {
			let l = 0,
				r = result.length - 1
			while (l <= r) {
				const mid = ~~((l + r) / 2)
				if (nums[i] > result[mid]) {
					l = mid + 1
				} else if (nums[i] < result[mid]) {
					r = mid - 1
				} else {
					l = mid
					break
				}
			}
			result[l] = nums[i]
			position.push(l)
		}
	}
	let cur = result.length - 1
	// 这里复用了result，它本身已经没用了
	for (let i = position.length - 1; i >= 0 && cur >= 0; i--) {
		if (position[i] === cur) {
			result[cur--] = i
		}
	}
	return result
}
```  

**组件的实现方法**
> 从开发者的视角：组件分为状态组件和函数组件
> vue3中的状态组件和函数组件类似，下面只讨论状态组件的实现

React的组件示例(class组件)
```javascript
class Counter extends React.Component{
  state = {
    count: 0
  };
  add = ()=> {
    this.setState({
      count: this.state.count + 1
    })
  };
  render(){
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}
```
Vue3的组件示例(optional) (渲染函数)
```javascript
createApp({
  data () {
    return {
      count: 0
    }
  },
  methods: {
    add () {
      this.count++
    }
  },
  render (cxt) {
    return [
      h('div',{},[
      h('p',{},ctx.count),
      h('button',{onClick: ctx.add},'add')
      ])
    ]
  }
}).mount('#app')
```

Vue3的组件示例(composition) (渲染函数)
```javascript
createApp({
  setup () {
    const count = ref(0)
    const add = ()=> {
      count.value++
     }
    return {
      count,
      add
    }
  },
  render (cxt) {
    return [
      h('div',{},[
      h('p',{},ctx.count),
      h('button',{onClick: ctx.add},'add')
      ])
    ]
  }
}).mount('#app')
```
可以看出 从实现的角度上来说，组件都有以下几个共同点:
  - 都有 `instance` (实例) 以承载内部的状态，方法等
  - 都有一个 `render` 函数
  - 都通过 `render` 函数产出`VNode`
  - 都有一套更新的策略，以重新执行 `render` 函数 
  - 在此基础上附加各种能力，如生命周期，通信机制，slot，provide，inject等  

**component.js**
```javascript
import { reactive } from "../reactive/reactive"
import { effect } from "../reactive/effect"
import { patch } from "./render"
import { normalizeVNode } from "./vnode"
import { queueJob } from "./scheduler"
function updateProps(instance, vnode) {
	const { type: Component, props: vnodeProps } = vnode
	const props = (instance.props = {})
	const attrs = (instance.attrs = {})
	for (const key in vnodeProps) {
		if (Component.props?.includes(key)) {
			props[key] = vnodeProps[key]
		} else {
			attrs[key] = vnodeProps[key]
		}
	}
	// toThink: props源码是shallowReactive，确实需要吗?
	// 需要。否则子组件修改props不会触发更新
	instance.props = reactive(instance.props)
}
export function mountComponent(vnode, container, anchor) {
	const { type: Component } = vnode
	const instance = (vnode.component = {
		props: {},
		attrs: {},
		setupState: null,
		subTree: null,
		ctx: null,
		update: null,
		isMounted: false,
		next: null,
	})
	// setupComponent
	updateProps(instance, vnode)
	// 源码：instance.setupState = proxyRefs(setupResult)
	instance.setupState = Component.setup?.(instance.props, {
		attrs: instance.attrs,
		slot: null,
		emit: null,
	})
	instance.ctx = {
		...instance.props,
		...instance.setupState,
	}
	instance.update = effect(
		() => {
			if (!instance.isMounted) {
				// mount
				const subTree = (instance.subTree = normalizeVNode(
					Component.render(instance.ctx)
				))
				fullThrough(instance, subTree)
				patch(null, subTree, container, anchor)
				instance.isMounted = true
				vnode.el = subTree.el
			} else {
				if (instance.next) {
					// 被动更新
					vnode = instance.next
					instance.next = null
					updateProps(instance, vnode)
					instance.ctx = {
						...instance.props,
						...instance.setupState,
					}
				}
				const prev = instance.subTree
				const subTree = (instance.subTree = normalizeVNode(
					Component.render(instance.ctx)
				))
				fullThrough(instance, subTree)
				patch(prev, subTree, container, anchor)
				vnode.el = subTree.el
			}
		},
		{ scheduler: queueJob }
	)
}

function fullThrough(instance, subTree) {
	if (Object.keys(instance.attrs).length) {
		subTree.props = {
			...subTree.props,
			...instance.attrs,
		}
	}
}

```

**scheduler.js** (调度机制) nextTick原理
```javascript
const queue = []
let isFlushing = false
const resolvedPromise = Promise.resolve()
let currentFlushPromise = null

export function nextTick(fn) {
	return fn
		? (currentFlushPromise || resolvedPromise).then(fn)
		: currentFlushPromise || resolvedPromise
}

export function queueJob(job) {
	// 如果队列中没有这个job，或者队列为空，就把job推入队列
	if (!queue.includes(job) || !queue.length) {
		queue.push(job)
		queueFlush()
	}
}

function queueFlush() {
	if (!isFlushing) {
		isFlushing = true
		currentFlushPromise = resolvedPromise.then(flushJobs)
	}
}

function flushJobs() {
	try {
		for (let i = 0; i < queue.length; i++) {
			queue[i]()
		}
	} finally {
		isFlushing = false
		queue.length = 0
		currentFlushPromise = null
	}
}

```


## **编译步骤**

**模板代码** --> `parse` --> **AST** --> `transform` --> **AST+codegenNode** --> `codegen` --> **渲染函数代码**

parse: 原始的模板代码就是一段字符串，通过解析`parse` 转换为原始`AST`抽象语法树  
transform: 对`AST`进行转换，转换为`codegenNode`, `codegenNode` 是`AST`到生成渲染函数代码的中间步骤，它由解析原始`AST`的语义而得来
```html
<div v-if="ok" />
<div id="ok" />
```
没有什么区别，都是一个元素，带有一个不同的属性而已。然而`v-if`是带有特殊语义的，不能像一般的纯元素节点一样采用同样的代码生成方式。`transform`的作用就在于此，一方面解析原始`AST`的语义，另一方面要为生成代码做准备. transfrom 是整个vue compiler模块中最复杂的部分

codegen: 即是 `code generate` 遍历 codegenNode 递归地生成最终的渲染函数的代码




**parse实现**

认识AST  
```html
<div id="foo" v-if="ok">hello {{name}}</div>
```

AST Node的类型  
```javascript
const NodeTypes = {
  ROOT:'ROOT', // 根节点
  ELEMENT:'ELEMENT', // 元素节点
  TEXT:'TEXT', // 文本节点
  SIMPLE_EXPRESSION:'SIMPLE_EXPRESSION', // 简单表达式
  INTERPOLATION:'INTERPOLATION', // 插值表达式
  ATTRIBUTE:'ATTRIBUTE', // 属性节点
  DIRECTIVE:'DIRECTIVE', // 指令节点
}

const ElementTypes = {
  ELEMENT: 'ELEMENT', // 普通元素
  COMPONENT: 'COMPONENT', // 组件
}
```
1. 根节点
```javascript
{
  type: NodeTypes.ROOT,
  children: TemplateChildNode[], // 子节点
}
```
2. 纯文本节点
```javascript
type: NodeTypes.TEXT,
content: string
```
3. 表达式节点
```javascript
{
  type: NodeTypes.SIMPLE_EXPRESSION,
  content: string, // 表达式内容
  // 静态即content就是一段字符串,动态的content指的是一个变量，或一段js表达式
  isStatic: boolean, // 是否是静态的
}
```

4. 插值节点
``` javascript
{
  type: NodeTypes.INTERPOLATION,
  content: {
    type: NodeTypes.SIMPLE_EXPRESSION,
    content: string, // 表达式内容
    isStatic: boolean, // 是否是静态的
  }
}
```

5. 元素节点
```javascript
{
  type: NodeTypes.ELEMENT,
  tag: string, // 标签名
  tagType: ElementTypes, // 元素类型(组件还是原生元素)
  props: Array<AttributeNode | DirectiveNode>, // 属性
  directives: DirectiveNode[], // 指令数组
  isSelfClosing: boolean, // 是否自闭合
  children: TemplateChildNode[], // 子节点
}
```
6. 属性节点
```javascript
{
  type: NodeTypes.ATTRIBUTE,
  name: string, // 属性名
  value: undefined | {
    type: NodeTypes.TEXT | , // 属性值类型
    content: string, // 属性值
  } // 纯文本节点
}
```
7. 指令节点
```javascript
{
  type: NodeTypes.DIRECTIVE,
  name: string, // 指令名
  exp: undefined | {
    type: NodeTypes.SIMPLE_EXPRESSION, // 表达式类型
    content: string, // 表达式内容
    isStatic: boolean, // 是否是静态的
  }, // 表达式节点
  arg: undefined | {
    type: NodeTypes.SIMPLE_EXPRESSION, // 表达式类型
    content: string, // 表达式内容
    isStatic: boolean, // 是否是静态的
  }, // 表达式节点
}
``` 
如 
```html
<div v-bind:class="myClass"></div>
<!-- name:bind arg:class exp:myClass -->
<div @click="handleClick"></div>
<!-- name:on arg:click exp:handleClick -->
```

最终展示结果  
`<div id="foo" v-if="ok">hello {{name}}</div>`

```javascript
{
  "type": "ROOT",
  "children": [
    {
      type: "ELEMENT",
      tag: "div",
      tagType: "ELEMENT",
      props:[
        {
          type: "ATTRIBUTE",
          name: "id",
          value: {
            type: "TEXT",
            content: "foo"
          }
        }
      ],
      directives: [
        {
          type: "DIRECTIVE",
          name: "if",
          exp: {
            type: "SIMPLE_EXPRESSION",
            content: "ok",
            isStatic: false
          }
        }
      ],
      isSelfClosing: false,
      children: [
        {
          type: "TEXT",
          content: "hello "
        },
        {
          type: "INTERPOLATION",
          content: {
            type: "SIMPLE_EXPRESSION",
            content: "name",
            isStatic: false
          }
        }
      ]
    }
  ]
}
```

**ast.js**
```javascript
export const NodeTypes = {
	ROOT: "ROOT", // 根节点
	ELEMENT: "ELEMENT", // 元素节点
	TEXT: "TEXT", // 文本节点
	SIMPLE_EXPRESSION: "SIMPLE_EXPRESSION", // 简单表达式
	INTERPOLATION: "INTERPOLATION", // 插值表达式
	ATTRIBUTE: "ATTRIBUTE", // 属性节点
	DIRECTIVE: "DIRECTIVE", // 指令节点
}

export const ElementTypes = {
	ELEMENT: "ELEMENT", // 普通元素
	COMPONENT: "COMPONENT", // 组件
}

export function createRoot(children) {
	return {
		type: NodeTypes.ROOT,
		children: children,
	}
}
```

**parse.js**
```javascript
import { NodeTypes, ElementTypes, createRoot } from "./ast"

export function parse(content) {
	const context = createParserContext(content)
	const children = parseChildren(context)
	return createRoot(children)
}
function createParserContext(content) {
	return {
		options: {
			delimiters: ["{{", "}}"], // 插值表达式的分隔符
		},
		source: content,
	}
}

function parseChildren(context) {
	const s = context.source
	if (s.startsWith(context.options.delimiters[0])) {
		// parseInterpolation
	} else if (s[0] === "<") {
		// parseElement
	} else {
		// parseText
	}
}

function advanceBy(context, numberOfCharacters) {
	context.source = context.source.slice(numberOfCharacters)
}

function advanceSpaces(context) {
	const match = /^[\t\r\n\f ]+/.exec(context.source)
	if (match) {
		advanceBy(context, match[0].length)
	}
}

```