---
title: TS
description: 纪录学习typescript
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/6CBAEB415316784394DC127767AD80A1.70vsunrm9uk0.webp
tags: 'ts,TS'
abbrlink: 6d6c8ae1
date: 2023-03-20 13:37:56
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
            let xhr:XMLHttpRequest = new XMLHttpRequest()
            xhr.open('GET',url)
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                }
            }
            xhr.send(null)
        })
    }
}
axios.get('./data.json').then(res=>{
    cosole.log(res)
})
```

# **泛型约束key of**

```typescript
// 在类型后面跟着一个extends 在跟一个约束的类型
interface Len {
    length:number
}
function fn<T extends Len> (a:T){
    a.length // 不会报错
}

let obj = {
    name: 'yueyun',
    sex: '♂'
}
type key = keyof typeof obj
function obj<T extends object,K extends key of T> (obj:T,key:K) {
    return obj[key]
}

interface Data {
    name:string
    age:number
    sex:string
}

type Options<T extends object> = {
    readonly:[key in keyof T]?:T[key]
}
```

# ts的配置文件（tsconfig.json）

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

# namespace命名空间

我们在工作中无法避免全局变量造成的污染，TS提供了namespace 避免这个问题出现

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 `export` 暴露
- 通过 `namespace` 关键字定义

TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

命名空间中通过`export`将想要暴露的部分导出

如果不用export 导出是无法读取其值的

```typescript
namespace a {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
 
namespace b {
     export const Time: number = 1000
     export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
a.Time
b.Time
//嵌套命名空间
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
// 抽离命名空间
//a.ts
export namespace V {
    export const a = 1
}

//b.ts
import {V} from '../observer/index'
console.log(V);

//简化命名空间
namespace A  {
    export namespace B {
        export const C = 1
    }
}
import X = A.B.C
console.log(X);
```

合并命名空间:重名的命名空间会合并
