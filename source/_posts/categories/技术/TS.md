---
title: TS
description: 纪录学习typescript
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/6CBAEB415316784394DC127767AD80A1.70vsunrm9uk0.webp
date: 2023-03-20 13:37:56
tags: ts,TS
---

# TS作用：

**js的超集，支持ES标准有类型检查等一系列功能**

# **TS基础语法**

**基础类型**

```typescript
// 
let a:number = 1
let b:string = '123'
let c:booblean = true
let d:null = null
let e:undefined = undefined
```

**any: 任意类型  unknown :未知类型**

```typescript
// 1. top type 顶级类型 any unknown
// 2. Object type 
// 3. Number String Boolean
// 4. number string boolean
// 5. 1  '月晕' 
// 6. never 
let a:any = 1
a = '123'
a = false
let b:unknown = 10
b = '123'
// unknown 只能赋值给自身和any
// unknown 没有办法读任何属性，方法也不能调用
// unknown 比 any 更安全
let yueyun: unknown = {"name": "月晕" ,open:()=>111}
// console.log(yueyun.name) // 报错
```

**Object / object / {}**

```typescript
// Object 原型链 所有都包含
let a:Object = 111
let a2:Object = '111'
let a3:Object = true
let a4:Object = []
let a5:Object = {}
let a6:Object = ()=>{}
// object 泛型约束 限制类型 只能使用引用类型
let a7:object = []
let a8:object = {}
let a9:object = ()=>{}
// {} -- new Object() 但是赋值之后没有办法做修改
let a10:{} = {} 
let a11:{} = 111
```

**数组**

```typescript
let b: number[] = [1,2,3]
let b1: Array<number> = [1,2,3]
// 对象数组
interface X {
  name:string
  age?:number
}
let c:X[] = [{name:'月晕'},{name:'月晕',age:18}]
// 二维数组
let d:number[][] = [[1,2,3],[1,2,3]]
let e:Array<Array<number>> = [[1,2,3],[1,2,3]]
// 大杂烩数组
let f:any[] = [1,'月晕',true,{},[],()=>{}]
// 元组
let g:[string,number,boolean] = ['月晕',18,true]
// 函数
function aa (...args:any[]):number {
  // console.log(args)
  console.log(arguments)
  let a:IArguments = arguments
  console.log(typeof a)
  return 1
}
aa(1,2,3,4,5,6,7,8,9,10)
```

**接口(interface)**
**基本用法**：

```typescript
interface Person {
    name:string
    age:number
}
let yueyun:Persion = {
    name: "月晕",
    age:18
}
```

**interface 重名 重合**

```typescript
interface Person {
    name:string
    age:number
}
interface Person {
    IKUN:boolean
}
let yueyun:Persion = {
    name: "月晕",
    age:18,
    IKUN:true
}
```

**interface 任意 key**

```typescript
interface Person {
    name: string
    age?: number
    [proName:string]:any // 任意属性
}
let yueyun:Persion = {
    name: "月晕",
    age:18,
    a:1,
}
```

**interface ?(可选) readonly**

```typescript
interface Person {
    name: string
    age?: number
    [proName:string]:any // 任意属性
    readonly cb:()=>boolean
    readonly id:number
}
let yueyun: Person = {
    name: '月晕',
    Ikun: 'ikun',
    id: 1,
    //age: 18,
    cb:()=>true,
    a:1,
}
```

**interface 接口继承**

```typescript
interface human {
    xxx: string
}

interface Person extends human {
    name: string
    age?: number
    [proName:string]:any // 任意属性
    readonly cb:()=>boolean
    readonly id:number
}
let yueyun: Person = {
    xxx: 'xxx',
    name: '月晕',
    Ikun: 'ikun',
    id: 1,
    //age: 18,
    cb:()=>true,
    a:1,
}
```

**interface 定义函数类型**

```typescript
interface Fn {
  (name:string):number[]
}
const myfun:Fn = (name:string) => {
  return [1]
}
```

**函数**

1.函数定义类型和返回值|箭头函数定义类型和返回值

```typescript
function add (a:number,b:number):number {
    return a+b
}
const add = (a:number,b:number):number => a+b
```

2.函数的默认的参数 | 函数可选参数

```typescript
function add (a:number = 10,b:number = 20):number {
    return a+b
}
console.log(add()) //30
console.log(add(1)) //21
console.log(add(1,2)) //3
function add (a:number = 10,b?:number):number {
    return a+b
}
console.log(add())// nan
```

3.如何定义一个对象

```typescript
interface user {
    name:string
    age:number
}
function add (user:user):user {
    return user
}
console.log(add({name:"月晕",age:18}))
```

4.函数类型this

```typescript
interface Obj {
    user:number[]
    add:(this:Obj,num:number)=>void
}
let obj:Obj = {
    user:[1,2,3],
    add:(this:Obj,num:number) => {
        this.user.push(num)
    }
}
obj.add(4)
console.log(obj)
```

5.函数重载

```typescript
let user:number[] = [1,2,3]
function FindNum (add:number[]):number[] // 如果传入的是number数组，那么就做添加
function FindNum (id:number):number[] // 如果传入的是number，那么就做查找
function FindNum ():number[] // 如果没有传入，那么就返回所有的
function FindNum (ids?:number|number[]):number[] {
  if (typeof ids === 'number') {
    return user.filter((id) => id === ids)
  } else if (ids instanceof Array) {
    user.push(...ids)
    return user
  } else {
    return user
  }
}
```

联合类型

```typescript
let fn = function (type:number|boolean):boolean {
    return !!type
}
console.log(fn(false))
console.log(fn(1))
```

交叉类型

```typescript
interface People {
    name:string
    age:number
}
interface Man {
    sex:string
}
const yueyun = (man:People&Man):void {
    console.log(man)
}
yueyun({name:'月晕',age:18,sex:"♂"})
```

类型断言

```typescript
const fn = (type:number|string):void => {
  console.log((type as string).length) // 断言成string类型否则报错
}
fn('12345') //5
fn(1)  // undefined
```

# TS内置对象

```typescript
//1.Number Date RegExp Eorror,XMLHttpRequest
let num: Number = new Number(123)
let data: Date = new Date()
let reg: RegExp = new RegExp(/abc/)
let err: Error = new Error('error')
let xhr: XMLHttpRequest = new XMLHttpRequest()

//2.dom, querySelector querySelectorAll MouseEvent
let div = document.querySelector('div')
let divs:NodeList= document.querySelectorAll('div')
let div2:NodeListOf<HTMLDivElement | HTMLElement> = document.querySelector('div footer')
let mouse:MouseEvent = new MouseEvent('click')

//3.bom window promise localsStorage location cookie
let win: Window = window
let p: Promise<string> = new Promise((resolve, reject) => {
    resolve('123')
})
// let loc: Location = window.location
let loc2: Location = location
let cookie:string = document.cookie
```

# **TS的类**

**1.class基本用法和约束类型 implements**

```typescript
// 虚拟dom简单版
interface Vnode {
  tag:string // div section footer
  text?:string //123
  children?:Vnode[]
}

class Dom {
  // 创造节点的方法
  createElement (el:string) {
    return document.createElement(el)
  }
  // 设置节点的文本
  setText (node:HTMLElement, text:string | null) {
    node.innerText  = text as string
  }
  // 渲染函数
  render (data:Vnode) {
    let el = this.createElement(data.tag)
    if (data.text) {
      this.setText(el, data.text)
    }
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item) => {
        el.appendChild(this.render(item))
      })
    }
    return el
  }
}


interface Options {
  el:string | HTMLElement
}

interface Vuecls {
  options:Options
  init():void
}

class Vue extends Dom implements Vuecls{
  options: Options
  init(): void {
    //通过js去渲染真实的dom
    let data:Vnode = {
      tag: "div",
      children:[
        {
          tag: "section",
          text: "我是子节点1"
        },
        {
          tag: "section",
          text: "我是子节点2"
        }
      ]
    }
    let app = typeof this.options.el === "string" ? document.querySelector(this.options.el): this.options.el
    app?.appendChild(this.render(data))
    // this.render(data)
  }
  constructor (options:Options) {
    super()
    this.options = options
    this.init()
  }
}

new Vue({
  el:"#app"
})
```

**2.class修饰符**

> 1.readonly -- 只读(属性)
>
> 2.private -- 只能在内部使用
>
> 3.protected -- 给子类和内部去使用
>
> 4.public -- 哪都能用(默认)

**3.super()原理**

```typescript
super()  // --父类的prototype.constructor.call
```

**4.静态方法**

```typescript
static version () {
    // this 只能指向static方法和static属性
    return '1.0.0'
}
静态方法只能通过类调用不能通过实例调用
```

**5.get和set**

```typescript
class Ref {
  _value: any;
  constructor (value:any) {
      this._value = value;
  }
  get value () {
      return this._value + 'get';
  }
  set value (value) {
      this._value = value + 'set';
  }
}
const ref = new Ref('哈哈');
ref.value = '嘿嘿';
```

**6.抽象类**

```typescript
//基类，抽象类
//abstract 所定义的抽象类
//abstract 所定义的方法，都只能描述不能进行一个实现
//抽象类无法被实例化
abstract class Vue {
  name:string
  constructor (name?:string) {
    this.name = name as string
  }
  getName () {
    return this.name
  }
  abstract init(name:string):void
}

class React extends Vue {
  constructor () {
    super()
  }
  init(name:string):void {
    console.log(name)
  }
  setName (name:string) {
    this.name = name
  }
}
const react = new React()
react.setName("react")
console.log(react.getName())
```

# **枚举类型**

**1.数字枚举**
例如 红绿蓝 Red = 0 Green = 1 Blue= 2 分别代表红色0 绿色为1 蓝色为2

```typescript
enum Types{
   Red,
   Green,
   BLue
}

enum Types{
   Red = 0,
   Green = 1,
   BLue = 2
}
//默认就是从0开始的 可以不写值
```

增长枚举

```typescript
enum Types{
   Red = 1,
   Green,
   BLue
}
```

如上，我们定义了一个数字枚举， Red使用初始化为 `1`。 其余的成员会从 `1`开始自动增长。 换句话说， Type`.Red`的值为 `1`， `Green`为 `2`， `Blue`为 `3`。

**2.字符串枚举**
字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串[字面量](https://so.csdn.net/so/search?q=字面量&spm=1001.2101.3001.7020)，或另外一个字符串枚举成员进行初始化。

```typescript
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

**3.异构枚举**

```typescript
enum Types{
   No = "No",
   Yes = 1,
}
```

**4.接口枚举**

定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
声明对象的时候要遵循这个规则

```typescript
enum Types {
    yyds,
    dddd
}
interface A {
    red:Types.yyds
}

let obj:A = {
    red:Types.yyds
}
```

**5.const枚举**
let 和 var 都是不允许的声明只能使用const大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。 常量枚举通过在枚举上使用 `const`修饰符来定义。

```typescript
const enum Types{
   No = "No",
   Yes = 1,
}
```

6.反向映射

它包含了正向映射（ `name` -> `value`）和反向映射（ `value` -> `name`）

```typescript
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```

**类型推断**
1.我声明了一个变量但是没有定义类型TypeScript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论
2.如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型可以进行任何操作

**类型别名**

type 关键字（可以给一个类型定义一个名字）多用于复合类型

```typescript
type str = string
let s:str = "我是yueyun"
console.log(s);

type str = () => string
let s: str = () => "我是yueyun"
console.log(s);

type str = string | number
let s: str = 123
let s2: str = '123'
console.log(s,s2);

type value = boolean | 0 | '213'
let s:value = true
//变量s的值  只能是上面value定义的值

type高级用法：
type a = 1 extends number ? 1 : 0 //1
type a = 1 extends Number ? 1 : 0 //1
type a = 1 extends Object ? 1 : 0 //1
type a = 1 extends any ? 1 : 0 //1
type a = 1 extends unknow ? 1 : 0 //1
type a = 1 extends never ? 1 : 0 //0
```

# **Never类型**

never使用联合逻辑会被忽略，且一般用于逻辑错误的地方

```typescript
function yueyun ():never {
    new throw error('出错辣')
}
type A = "唱" | "跳" | "rap"
function kun (value:A) {
    switch (value) {
            case: "唱"：
            	break
            case: "跳":
            	break
            case: "rap":
            	break
        	default:
            	// 兜底逻辑
            	const error:never = value
                break
    }
}

```

# symbol类型

```typescript
let a1:symbol = Symbol(1) // 唯一的
let a2:symbol = Symbol(1)
console.log(a1===a2)  // false
// for Symbol  for全局symbol有没有注册这个key如果有则直接拿来用，否则创建新的
console.log(Symbol.for('yueyun')===Symbol.for('yueyun')) //true
let obj = {
    name:'yueyun',
    [a1]:111,
    [a2]:222
}
//for in 不能读到symbol
for (let key in obj) {
    console.log(key)
}
//keys 不能读到symbol
console.log(Object.keys(obj))
//getOwnPropertyNames不能读到symbol
console.log(Object.getOwnPropertyNames(obj))
// 只能读到symbol
console.log(Object.getOwnPropertySymbols(obj))

// 全能
Reflect.ownkeys(obj)
```

# **生成器**

```typescript
function* gen () {
    yield Promise.resolve('小杯') //同步异步
    yield '中杯'
    yield '大杯'
    yield '超大杯'
}
const bei = gen()
bei.next() // 小 false
bei.next() // 中 false
bei.next() // 大 false
bei.next() // 超大 false
bei.next() // undefined true
```

# 迭代器

```typescript
// set map
let set:Set<number> = new Set([1,1,2,2,3,3])
let map:Map<any,any> = new Map()
let Arr:number[] = [1,2,3]
map.set(Arr,"月晕")
function args () {
    console.log(arguments) // 伪数组
}
//let list = doucment.querySelectorAll('div') //伪数组
const each = (value:any) => {
    let It:any = value[Symbol.iterator]()
    let next:any = {done:false}
    while (!next.done) {
        next = It.next()
        if(!next.done) {
            console.log(next.value)
        }
    }
}

//迭代器语法糖 for of (对象不能使用)
for(let value of Arr) {
    console.log(value)
}
// 解构 底层原理也是去调用 iterator
// 让对象也支持for of
let obj = {
    max:5,
    current:0,
    [Symbol.iterator] () {
        return {
            max:this.max
            current:this.current
            next(){
                if(this.current == this.max) {
                    return {
                        value:undefined,
                        done:true
                    } else {
                        return {
                            value:this.current++,
                            done:false
                        }
                    }
                }
            }
        }
    }
}
let x = [...obj]
console.log(x)   // [0,1,2,3,4]
```

# 泛型<动态类型>

```typescript
function yueyun(a:number,b:number):Array<number> {
    return [a,b]
}
function yueyun(a:string,b:string):Array<string> {
    return [a,b]
}
//---------------------
function yueyun<T>(a:T,b:T):Array<T> {
    return [a,b]
}
yueyun(1,2)
yueyun('1','2')
yueyun(true,false)
type A<T> = string | number | T
let a:A<null> = null
interface Data<T> {
    msg:T
}
let data:Data<string> = {
    mes:"EXPLOSION!"
}
function add<T,K>(a:T,b:K):Array<T|K> {
    return [a,b]
}
add(1.false)
// 提供默认类型
function add<T=number,k=number>(a:T,b:k):Array<T|K> {
    return [a,b]
}

const axios = {
    get<T>(url:string):Promise {
        return new Promise((res,rej)=>{
            let xhr:X
        })
    }
}
```

