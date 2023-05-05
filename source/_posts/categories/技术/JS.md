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

# JS数据类型

## 数据类型

**数据类型可以分成 原始数据类型 和 非原始数据类型(对象引用)**

### 原始数据类型

**JavaScript中的原始数据类型包括：**

1.Numbers  - Integers,floats (整数，浮点数)

2.String - 单引号('')，双引号("")，或者反引号下的任何数据(``)

3.Booleands - 真(true)或假(false)

4.Null - 空值 或者 无值

5.undefined - 声明的变量没有值

6.Symbol - 可以由Symbol构造函数生成的唯一值

**JavaScript 中的非原始数据类型包括:**

1.对象

2.数组

*原始*数据类型是不可变的（不可修改的）数据类型。一旦创建了原始数据类型，我们就无法修改它。

例如

```javascript
let word = 'JavaScript'
word[0] = 'P' //报错
```

此表达式不会更改存储在变量*word*中的字符串。因此，我们可以说字符串是不可修改的，或者换句话说是不可变的。原始数据类型按其值进行比较。让我们比较不同的数据值。

```javascript
let num1 = 3
let num2 = 3
console.log(num1 == num2) // true
let js = 'JavaScript'
let py = 'Python'
console.log(js == py) // false
let lightOn = true
let lightOff = false
console.log(lightOn == lightOff) // false
```

### 非原始数据类型

*非原始*数据类型是可修改的或可变的。我们可以在创建后修改非原始数据类型的值。让我们通过创建一个数组来查看。数组是方括号中的数据值列表。数组可以包含相同或不同的数据类型。数组值由它们的索引引用。在 JavaScript 中，数组索引从零开始。即，数组的第一个元素位于索引 0，第二个元素位于索引 1，第三个元素位于索引 2，依此类推。

```javascript
let nums = [1,2,3]
nums[0] = 10
console.log(nums) // [10,2,3]
```

非原始数据类型的数组是可变的。非原始数据类型不能按值进行比较。即使两个非原始数据类型具有相同的属性和值，它们也不是严格相等的。

```javascript
let nums = [1, 2, 3]
let numbers = [1, 2, 3]

console.log(nums == numbers)  // false

let userOne = {
name:'Asabeneh',
role:'teaching',
country:'Finland'
}

let userTwo = {
name:'Asabeneh',
role:'teaching',
country:'Finland'
}

console.log(userOne == userTwo) // false
```

数组，函数，对象等一些非原始值被称为引用类型，因为他们是通过引用而不是值进行比较的，两个对象只有在引用相同的底层对象时才是严格相等的(调用所指向相同的对象地址时)

```javascript
let nums = [1, 2, 3]
let numbers = nums

console.log(nums == numbers)  // true

let userOne = {
name:'Asabeneh',
role:'teaching',
country:'Finland'
}

let userTwo = userOne

console.log(userOne == userTwo)  // true
```

### Number

数字是可以进行所有的算术运算的整数和小数值，如下

#### 声明数字数据类型

```javascript
let age = 35
const gravity = 9.81
let mass = 72
const PI = 3.14
console.log(age,gravity,mass,PI)
```

#### 数学对象

```javascript
const PI = Math.PI
console.log(PI) // 3.141592653589793
// Math.round --> 取最接近的整数(四舍五入)
console.log(Math.round(PI)) // 3
console.log(Math.round(9.81)) // 10
console.log(Math.floor(PI)) // 3 
console.log(Math.ceil(PI))  // 4
console.log(Math.min(-5, 3, 20, 4, 5, 10)) // -5
console.log(Math.max(-5, 3, 20, 4, 5, 10)) // 20
const randNum = Math.random() //随机数 between 0 to 0.999999
const num = Math.floor(Math.random () * 11) //number between 0 and 10
console.log(Math.abs(-10)) // 10
console.log(Math.sqrt(100))  // 10
console.log(Math.sqrt(2)) // 1.4142135623730951
console.log(Math.pow(3, 2)) // 9
console.log(Math.E) // 2.718 (自然对数的底数)
```

### String

字符串是文本，位于***单引号\* 、*****双引号**\***和***反\***引号下。要声明一个字符串，我们需要变量名、赋值运算符、单引号、双引号或反引号下的值。让我们看一些字符串的例子：

```javascript
let space = ' '           // an empty space string
let firstName = 'Asabeneh'
let lastName = 'Yetayeh'
let country = 'Finland'
let city = 'Helsinki'
let language = 'JavaScript'
let job = 'teacher'
let quote = "The saying,'Seeing is Believing' is not correct in 2020."
let quotWithBackTick = `The saying,'Seeing is Believing' is not correct in 2020.`
```

#### 字符串连接

将两个或多个字符串连接在一起称为串联。使用在前面的字符串部分中声明的字符串：

```javascript
let fullName = firstName + space + lastName; 
console.log(fullName); // Asabeneh Yetayeh
```

#### 使用加法运算符连接

使用加法运算符连接是一种古老的方法。这种连接方式既乏味又容易出错。很高兴知道如何以这种方式连接，但我强烈建议使用 ES6 模板字符串

```javascript
// Declaring different variables of different data types
let space = ' '
let firstName = 'Asabeneh'
let lastName = 'Yetayeh'
let country = 'Finland'
let city = 'Helsinki'
let language = 'JavaScript'
let job = 'teacher'
let age = 250


let fullName =firstName + space + lastName
let personInfoOne = fullName + '. I am ' + age + '. I live in ' + country; // ES5 string addition

console.log(personInfoOne)
Asabeneh Yetayeh. I am 250. I live in Finland
```

#### 长字符串

字符串可以是单个字符或段落或页面。如果字符串长度太大，一行就放不下。我们可以在每行的末尾使用反斜杠字符（\）来表示该字符串将在下一行继续。

```javascript
const paragraph = "My name is Asabeneh Yetayeh. I live in Finland, Helsinki.\
I am a teacher and I love teaching. I teach HTML, CSS, JavaScript, React, Redux, \
Node.js, Python, Data Analysis and D3.js for anyone who is interested to learn. \
In the end of 2019, I was thinking to expand my teaching and to reach \
to global audience and I started a Python challenge from November 20 - December 19.\
It was one of the most rewarding and inspiring experience.\
Now, we are in 2020. I am enjoying preparing the 30DaysOfJavaScript challenge and \
I hope you are enjoying too."

console.log(paragraph)
```

#### 字符串中的转义

在 JavaScript 和其他编程语言中，\ 后跟一些字符是转义序列。**让我们看看最常见的转义字符**

- \n: 换行
- \t：制表符，表示8个空格
- \\\: 反斜杠
- \\'：单引号 (')
- \\": 双引号 (")

```js
console.log('I hope everyone is enjoying the 30 Days Of JavaScript challenge.\nDo you ?') // line break
console.log('Days\tTopics\tExercises')
console.log('Day 1\t3\t5')
console.log('Day 2\t3\t5')
console.log('Day 3\t3\t5')
console.log('Day 4\t3\t5')
console.log('This is a backslash  symbol (\\)') // To write a backslash
console.log('In every programming language it starts with \"Hello, World!\"')
console.log("In every programming language it starts with \'Hello, World!\'")
console.log('The saying \'Seeing is Believing\' isn\'t correct in 2020')
```

控制台输出:

```javascript
I hope everyone is enjoying the 30 Days Of JavaScript challenge.
Do you ?
Days  Topics  Exercises
Day 1 3 5
Day 2 3 5
Day 3 3 5
Day 4 3 5
This is a backslash  symbol (\)
In every programming language it starts with "Hello, World!"
In every programming language it starts with 'Hello, World!'
The saying 'Seeing is Believing' isn't correct in 2020
```

#### 模板文字(模板字符串)

要创建模板字符串，我们使用两个反引号。我们可以将数据作为表达式注入模板字符串中。为了注入数据，我们用大括号 ({}) 将表达式括起来，前面是 $ 符号。请参阅下面的语法。

```js
console.log(`The sum of 2 and 3 is 5`)              // statically writing the data
let a = 2
let b = 3
console.log(`The sum of ${a} and ${b} is ${a + b}`) // injecting the data dynamicall

let firstName = 'Asabeneh'
let lastName = 'Yetayeh'
let country = 'Finland'
let city = 'Helsinki'
let language = 'JavaScript'
let job = 'teacher'
let age = 250
let fullName = firstName + ' ' + lastName

let personInfoTwo = `I am ${fullName}. I am ${age}. I live in ${country}.` //ES6 - String interpolation method
let personInfoThree = `I am ${fullName}. I live in ${city}, ${country}. I am a ${job}. I teach ${language}.`
console.log(personInfoTwo)
console.log(personInfoThree)
I am Asabeneh Yetayeh. I am 250. I live in Finland.
I am Asabeneh Yetayeh. I live in Helsinki, Finland. I am a teacher. I teach JavaScript.
```

使用字符串模板或字符串插值方法，我们可以添加表达式，可以是一个值，也可以是一些操作（比较、算术运算、三元运算）。

```js
let a = 2
let b = 3
console.log(`${a} is greater than ${b}: ${a > b}`)
// 2 is greater than 3: false
```

#### 字符串方法

JavaScript 中的一切都是对象。字符串是一种原始数据类型，这意味着它一旦创建就无法修改。字符串对象有很多字符串方法。有不同的字符串方法可以帮助我们处理字符串。

1.*length*：字符串*长度*方法返回字符串中包含空格的字符数。

```javascript
let js = 'JavaScript'
console.log(js.length)         // 10
let firstName = 'Asabeneh'
console.log(firstName.length)  // 8
```

2.*访问字符串中的字符*：我们可以使用其索引访问字符串中的每个字符。在编程中，从0开始计数。字符串的第一个索引为零，最后一个索引为字符串的长度减一。

```javascript
let string = 'JavaScript'
let firstLetter = string[0]

console.log(firstLetter)           // J

let secondLetter = string[1]       // a
let thirdLetter = string[2]
let lastLetter = string[9]

console.log(lastLetter)            // t

let lastIndex = string.length - 1

console.log(lastIndex)  // 9
console.log(string[lastIndex])    // t
```

3.*toUpperCase()*：此方法将字符串更改为大写字母

```js
let string = 'JavaScript'

console.log(string.toUpperCase())     // JAVASCRIPT

let firstName = 'Asabeneh'

console.log(firstName.toUpperCase())  // ASABENEH

let country = 'Finland'

console.log(country.toUpperCase())    // FINLAND
```

4.*toLowerCase()*：此方法将字符串更改为小写字母。

```js
let string = 'JavasCript'

console.log(string.toLowerCase())     // javascript

let firstName = 'Asabeneh'

console.log(firstName.toLowerCase())  // asabeneh

let country = 'Finland'

console.log(country.toLowerCase())   // finland
```

5.substr(): 它有两个参数，起始索引和要切片的字符数

```js
let string = 'JavaScript'
console.log(string.substr(4,6))    // Script

let country = 'Finland'
console.log(country.substr(3, 4))   // land
```

6.*substring()*：它有两个参数，起始索引和停止索引，但它不包括停止索引处的字符。

```js
let string = 'JavaScript'

console.log(string.substring(0,4))     // Java
console.log(string.substring(4,10))    // Script
console.log(string.substring(4))       // Script

let country = 'Finland'

console.log(country.substring(0, 3))   // Fin
console.log(country.substring(3, 7))   // land
console.log(country.substring(3))      // land
```

7.*split()*：split 方法在指定位置拆分字符串。

```js
let string = '30 Days Of JavaScript'
console.log(string.split())     // Changes to an array -> ["30 Days Of JavaScript"]
console.log(string.split(' '))  // Split to an array at space -> ["30", "Days", "Of", "JavaScript"]
let firstName = 'Asabeneh'
console.log(firstName.split())    // Change to an array - > ["Asabeneh"]
console.log(firstName.split(''))  // Split to an array at each letter ->  ["A", "s", "a", "b", "e", "n", "e", "h"]
let countries = 'Finland, Sweden, Norway, Denmark, and Iceland'
console.log(countries.split(','))  // split to any array at comma -> ["Finland", " Sweden", " Norway", " Denmark", " and Iceland"]
console.log(countries.split(', ')) //  ["Finland", "Sweden", "Norway", "Denmark", "and Iceland"]
```

8.*trim()*：删除字符串开头或结尾的尾随空格。

```js
let string = '   30 Days Of JavaScript   '

console.log(string) //   30 Days Of JavasCript   
console.log(string.trim(' ')) //30 Days Of JavasCript

let firstName = ' Asabeneh '

console.log(firstName) //  Asabeneh 
console.log(firstName.trim()) //Asabeneh
```

9.*includes()*：它接受一个子字符串参数，并检查字符串中是否存在子字符串参数。*includes()*返回一个布尔值。如果字符串中存在子串，则返回真，否则返回假。

```js
let string = '30 Days Of JavaScript'

console.log(string.includes('Days'))     // true
console.log(string.includes('days'))     // false - it is case sensitive!
console.log(string.includes('Script'))   // true
console.log(string.includes('script'))   // false
console.log(string.includes('java'))     // false
console.log(string.includes('Java'))     // true

let country = 'Finland'

console.log(country.includes('fin'))     // false
console.log(country.includes('Fin'))     // true
console.log(country.includes('land'))    // true
console.log(country.includes('Land'))    // false
```

10.*replace()*：将旧子字符串和新子字符串作为参数。

```js
string.replace(oldsubstring, newsubstring)
let string = '30 Days Of JavaScript'
console.log(string.replace('JavaScript', 'Python')) // 30 Days Of Python

let country = 'Finland'
console.log(country.replace('Fin', 'Noman'))       // Nomanland
```

11.*charAt()*：采用索引并返回该索引处的值

```js
string.charAt(index)
let string = '30 Days Of JavaScript'
console.log(string.charAt(0))        // 3

let lastIndex = string.length - 1
console.log(string.charAt(lastIndex)) // t
```

12.*charCodeAt()*：采用索引并返回该索引处值的字符代码（ASCII 数字）

```
string.charCodeAt(index)
let string = '30 Days Of JavaScript'
console.log(string.charCodeAt(3))        // D ASCII number is 68

let lastIndex = string.length - 1
console.log(string.charCodeAt(lastIndex)) // t ASCII is 116
```

13.*indexOf()*：获取一个子字符串，如果该子字符串存在于字符串中，则返回该子字符串的第一个位置，如果不存在，则返回 -1

```js
let string = '30 Days Of JavaScript'

console.log(string.indexOf('D'))          // 3
console.log(string.indexOf('Days'))       // 3
console.log(string.indexOf('days'))       // -1
console.log(string.indexOf('a'))          // 4
console.log(string.indexOf('JavaScript')) // 11
console.log(string.indexOf('Script'))     //15
console.log(string.indexOf('script'))     // -1
```

14.*lastIndexOf()*：获取一个子字符串，如果子字符串存在于字符串中，则返回子字符串的最后位置，如果不存在，则返回 -1

```js
let string = 'I love JavaScript. If you do not love JavaScript what else can you love.'

console.log(string.lastIndexOf('love'))       // 67
console.log(string.lastIndexOf('you'))        // 63
console.log(string.lastIndexOf('JavaScript')) // 38
```

15.*concat()*：它需要很多子字符串并将它们连接起来。

```javascript
let string = '30'
console.log(string.concat("Days", "Of", "JavaScript")) // 30DaysOfJavaScript

let country = 'Fin'
console.log(country.concat("land")) // Finland
```

16.*startsWith*：它接受一个子字符串作为参数，并检查字符串是否以指定的子字符串开头。它返回一个布尔值（真或假）。

```javascript
let string = 'Love is the best to in this world'

console.log(string.startsWith('Love'))   // true
console.log(string.startsWith('love'))   // false
console.log(string.startsWith('world'))  // false

let country = 'Finland'

console.log(country.startsWith('Fin'))   // true
console.log(country.startsWith('fin'))   // false
console.log(country.startsWith('land'))  //  false
```

17.*endsWith*：它接受一个子字符串作为参数，并检查字符串是否以指定的子字符串结尾。它返回一个布尔值（真或假）。

```javascript
let string = 'Love is the most powerful feeling in the world'

console.log(string.endsWith('world'))         // true
console.log(string.endsWith('love'))          // false
console.log(string.endsWith('in the world')) // true

let country = 'Finland'

console.log(country.endsWith('land'))         // true
console.log(country.endsWith('fin'))          // false
console.log(country.endsWith('Fin'))          //  false
```

18.*search*: 它接受一个子字符串作为参数，并返回第一个匹配项的索引。搜索值可以是字符串或正则表达式模式。

```javascript
let string = 'I love JavaScript. If you do not love JavaScript what else can you love.'
console.log(string.search('love'))          // 2
console.log(string.search(/javascript/gi))  // 7
```

19.*match*：它以子字符串或正则表达式模式作为参数，如果匹配则返回一个数组，否则返回 null。让我们看看正则表达式模式是什么样的。它以 / 符号开始并以 / 符号结束。

```javascript
let string = 'love'
let patternOne = /love/     // with out any flag
let patternTwo = /love/gi
let string = 'I love JavaScript. If you do not love JavaScript what else can you love.'
console.log(string.match('love'))
let pattern = /love/gi
console.log(string.match(pattern))   // ["love", "love", "love"]
let txt = 'In 2019, I ran 30 Days of Python. Now, in 2020 I am super exited to start this challenge'
let regEx = /\d+/
console.log(txt.match(regEx))  // ["2", "0", "1", "9", "3", "0", "2", "0", "2", "0"]
console.log(txt.match(/\d+/g)) // ["2019", "30", "2020"]
```

20.*repeat()*：它接受一个数字作为参数，并返回字符串的重复版本。

```javascript
let string = 'love'
console.log(string.repeat(10)) // lovelovelovelovelovelovelovelovelovelove
```

### 检查数据类型和转换

#### 检查数据类型

要检查某个变量的数据类型，我们使用*typeof*方法。

```javascript
let firstName = 'Asabeneh'      // string
let lastName = 'Yetayeh'        // string
let country = 'Finland'         // string
let city = 'Helsinki'           // string
let age = 250                   // number
let job                         // undefined, because a value was not assigned
console.log(typeof 'Asabeneh')  // string
console.log(typeof firstName)   // string
console.log(typeof 10)          // number
console.log(typeof 3.14)        // number
console.log(typeof true)        // boolean
console.log(typeof false)       // boolean
console.log(typeof NaN)         // number
console.log(typeof job)         // undefined
console.log(typeof undefined)   // undefined
console.log(typeof null)        // object
```

#### 更改数据类型

将一种数据类型转换为另一种数据类型。我们使用*parseInt()*、*parseFloat()*、*Number()*、*+ sign*、*str()* 当我们进行算术运算时，字符串数字应该首先转换为整数或浮点数，否则返回错误。

##### 字符串转整数

```js
let num = '10'
let numInt = parseInt(num)
console.log(numInt) // 10

let num = '9.81'
let numFloat = parseFloat(num)
console.log(numFloat) // 9.81

let num = '10'
let numInt = Number(num)
console.log(numInt) // 10

let num = '10'
let numInt = +num
console.log(numInt) // 10
```

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

