---
title: Python基本语法
description: 纪录学习Python的日记捏
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/20221006/yuzhi.7ew8d6bi3fs0.webp
swiper_index: 1
top_group_index: 1
categories: 技术
tags: Python
abbrlink: b90ddedd
---
# Python

### 											--从入门到入土

###### 1.I/O流

input/output (指输入和输出)

输入：

```python
name = input('Please enter your name:') #注意用变量接受一下
print("You Name is:",name)
```

输出：

```python
a = '1'
b = 1
c = true
print("My name is yueyun",a,b,c) #可以直接输出字符串也能直接变量
```

有了简单的输入输出，不如来做一个加法的小练习

```python
a = int(input("Please entry the first number:")) #int为转为整形类型
b = int(input("Please entry the second number:"))
print("The result:",a,'+',b,"=",a+b)
```

###### 2.Python的语法规则

​	Python的语法比较简单,采用缩进的方式，写出来的代码比如下面这样

```python
a = int(input("Please enter a Number:"))
if a >= 0:
  print(a)
else:
  print(-a)
# 语句以冒号:结尾时候，缩进的语句视为代码块，类似于{} (粘贴复制注意格式鸭)
# 注意Python是对大小写很敏感的(感觉不如JS)
```

###### 3.数据类型

​	1.整数:

​		Python可以处理任意的整数，如1，100，0，-8 等

​		当然也可以用0x 表示十六进制 如0xff00（对于学了计组的人一定不陌生焯）

​		当数字有很多时也可用_来区分，不影响结果如 100_0000_000等

​	2.浮点数

​		如0.00123 1.2e4(这种表示也行)浮点数运算可能会有四舍五入的误差，在计算机内部浮点数的储存方式的问题捏

​	3.字符串

​		字符串是以''或者""括起来的任意文本，如'yueyun',"handsome",等，但是如果字符串内部包括**''**和**""**怎么办？？                                                                                               			----使用转义字符\来标识一下就行

```python
a='I\'M\"OK\"'
print(a)
```

​		转义字符：\n 表示换行，\t 表示制表符，\\ \ 表示转义的\  如果有很多的\为了简化可用用r默认不转义                                                                                                                       

```python
print('\\\t\\')
print(r'\\\t\\')
```

​		如果字符串内有很多内容，用\n 写在一行里代码可读性就会很差所以Python为我们提供了|```...``` |的写法

```python
print('''这是一首简单的小情歌，唱着我们心头的~~~
~~~
~~~
~~~''')
#当然我们也可用使用r
print(r'''Welcome To \n
My Blog''')
```

​	4.布尔值
​		布尔值和布尔代数的表示完全一样，一个布尔值只有True,False（注意大写）,在Python中可以直接用True,False表示
​		如下面

```python
a = 3 > 2
b = 3 > 5
print(a,b)
```

​		布尔值可以采用 and,or,not 运算
​		类似于 && || ! (与或非)
​		---- and 为与运算 所有都为真时 运算结果才是True
​		---- or 为或运算 只要其中一个为真，结果就为True (注意穿透)
​		---- not 为单目运算符 取反就对了！

​	5.Python 为动态语言 = 是赋值语句，可以把任意数据类型赋值给变量，同一个变量可以反复赋值，且可以是不同的变量

```python
a =  123 # a为整数
print(a)
a = 'ABCD' # a为字符串
print(a)
```

不同于静态语言的(java,C)这个更加灵活，理解下面一行代码

```python
a = 'yueyun'
```

1.定义一个a的变量    2.将a这个变量指向储存着'yueyun'字符串的地址
常量
		--所谓常量就是不能变化的量，数学中的Π就是一个常量，Python中常量一般用全部大写表示,当然你要让他变化也可以，这只是习惯上的用法

```python
PI = 3.14159265359
```

​	在Python中除法也是精确的，在Python中有两种除法，一种是/(得到浮点数) 另外一种是// (地板除)得到的任然是整数捏

```python
>>> 10/3
3.3333333333333
>>> 9/3
3.0
>>> 10//3
3
```

###### 4.Python中的字符串和编码方式

​	在python3版本中，字符串是以Unicode编码的，Python的字符串支持多种语言

```python
>>> print("有一吗？？")
有一吗？？
```

​	对于单个的字符编码，Python提供了ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符串

```python
>>> ord('A')
65
>>> ord("中")
20013
>>> chr(66)
'B'
>>> chr(25991)
'文'
>>> '\u4e2d\u6587' #知道对应的字符编码
'中文'
```

​	Python中的字符串类型是str，在内存中以unicode表示，一个字符对应若干个字节，如果要在网络上传输，或者保存在磁盘里面需要把str类型变成以字节为单位的**bytes**
​	Python对bytes类型的数据用带b前缀的单引号或双引号表示 (str 与 bytes 就只是存储方式不同捏)|

```python
x = b'ABC'  #bytes类型
print(x)
```

​	将str---->bytes   通过encode() 方法可以编码为指定的bytes

```python
>>> 'ABC'.encode('utf-8')
b'ABC'
>>> '中文'.encode('utf-8')  # 注意编码方式一般都是utf-8
b'\xe4\xb8\xad\xe6\x96\x87'
```

​	将bytes---->str 通过decode() 方法可以编码为指定的str

```python
>>> b'ABC'.decode('ascii')
'ABC'
>>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
'中文'
```

​	如果bytes 有一小部分无效字节（即为无法解码的字符）可以传入errors = 'ignore' 忽略错误字节

```python
>>> b'\xe4\xb8\xad\xff'.decode('utf-8', errors='ignore')
'中'
```

​	len () 函数 计算的str的字符数，换成bytes就计算所占的字节数:

```python
>>> len(b'ABC')
3
>>> len(b'\xe4\xb8\xad\xe6\x96\x87')
6
>>> len('中文'.encode('utf-8'))
6
```

​	格式化，跟C语言中的格式化一样

```python
>>> 'Hello, %s' % 'world'
'Hello, world'
>>> 'Hi, %s, you have $%d.' % ('Michael', 1000000)
'Hi, Michael, you have $1000000.'
```

​	占位符：%d--->整数 %f---->浮点数  %s----> 字符串 %x -----> 十六进制整数

```python
print('%02d-%02d' % (3, 1))
```

###### 5.Python中的list和tuple

​	list：	
​		Python内置的一种数据类型是列表: list。list 是一种有序的集合，可以随时添加和删除其中的元素(类似于数组辣)
​		如下面班级里的同学就可以用list表示

```python
classmates = ['meigumi','toka','kurumi']
```

​		classmates 就是一个list，用len可以获取长度

```python
>>> len(classmates)
3
```

​		用索引来访问list中的每一个位置的元素，索引是从0开始的:

```python
>>> classmates[0]
'meigumi'
>>> classmates[1]
'toka'
>>> classmates[2]
'kurumi'
>>> classmates[3]
'error'  # 确保数不能越界噢
### 当然负数也能作为指引
>>> classmates[-1]
'kurumi' #等等等的操作
```

​		当然list是可变数组，可以往组数中添加和删除一些元素
​		1.追加到末尾的元素 --- **append**

```python
>>> classmates.append('nagesa')
>>> classmates
['meigumi','toka','kurumi','nagesa']
```

​		2.把元素插入到指定的位置 --- insert

```python
>>> classmates.insert(1,'funiya')
>>> classmates
['meigumi','funiya','toka','kurumi','nagesa']
```

​		3.要删除list末尾的元素 --- pop() 方法

```python
>>> classmates.pop()
'nagesa'
>>> classmates
['meigumi','funiya','toka','kurumi']
```

​		4.要删除指定位置的元素 --- pop(i)

```python
>>> classmates.pop(i) ## i 表示索引位置
'funiya'
>>> classmates
['meigumi','toka','kurumi']
```

​		list中的元素类型不确定，list里面也能再包含list list替换直接令值替换就行

```python
>>> MyList = ['yueyun',1,True,1.234]
>>> p = ['HTML','CSS','Javascript',['Vue','Reacte'],'C']
```

tuple:
	另外一种有序列表：tuple。 tuple与list非常类似，但是tuple一旦初始化之后就不能再修改，没有append，pop等方法

```python
>>> Mylist = ('meigumi','funiya','toka','kurumi','nagesa')
'meigumi','funiya','toka','kurumi','nagesa'
## 使用小括号定义tuple tuple不能被改变所以更加的安全
```

###### 6.Python的条件判断

​	注意python的缩进规则

```python
age = 20
if age > 18:
  print("you age is",age)
  print("adult")
else:
  print("your age is",age)
  print('teenager')
```

​	根据python的缩进规则,,if语句判断的是**True**，就把缩进的两行print语句都执行了
​	也可以给if语句添加**elif** 和 **else**

```python
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
    
>>> kid
```

 	if 语句执行有个特点，它是从上往下判断，如果找到True就执行，否则就是else
 	 if也可以写简写

```python
if x:
	print("True")
  ### X 是非零数组，非空字符串，非空list 即判断为True
```

###### 7.循环

​	Python的循环有两种 : for in 可以依次将list 或 tuple 的每个元素迭代出来

```python
names = ['meigumi','kurumi','toka']
for name in names:
  print(name)
```

​	range() 函数，生成一个整数数列，左闭右开，在通过list()函数可以转换为list。

```python
>>> list(range(5))
[0,1,2,3,4]
```

​	计算 0~100的合

```python
sum = 0
for x in range(101):
  sum = sum + x
print(sum)
```

​	第二种 while 循环，计算100以内的奇数和 (不再满足while条件时退出)

```python
sum = 0
n = 0
while n<=100:
  sum = sum + n
  n = n + 2
print(sum)
```

​	break
​	在循环种，break 语句可以提前退出循环，例如打印1~100的数字

```python
n = 1
while n<=100:
  print(n)
  n = n + 1
print("END")
```

​	如果让想让代码提交结束可以使用 break 语句

```python
n = 1
while n<=100:
  if n>10: # n=11时，条件满足，执行break语句
    break # break语句会结束当前循环
  print(n)
  n = n + 1
print("END")
>>> 0 1 2 3 4 5 6 7 8 9 10 
```

​		continue
​		在循环过程中，也可以通过 contimie 语句 跳过当前循环 直接开始下一次循环

```
n = 0
while n < 10:
    n = n + 1
    if n % 2 == 0: # 如果n是偶数，执行continue语句
        continue # continue语句会直接继续下一轮循环，后续的print()语句不会执行
    print(n)
```

8.`dict` 和 `set`

​	dict：
​		Python中内置字典，类似于其他语言的map 使用键--值 (key-value) 存储，具有很快的查找速度
​		例子如下

```python
name = ['meigumi','toka','kurumi']
scores = [95,75,85]
```

​		如果使用list按顺序查找，则list越长，时间越慢
​		如果我们用`dict` 字典去查找

```python
>>> d = {'meigumi':95,'toka':75,'kurumi':85}
d['meigumi']
```

​		key - value存储方式，在放进去的时候，必须根据key算出value的存放位置，这样取的时候才能根据key 直接拿到value
​		把数据让入dict的方法，除了初始化时指定外，还可以通过key放入：

```python
d['meigumi'] = 67
```

​		一个key只能对应一个 value 所以，多次对一个key放入value 后面的值会把前面的题替换掉

```python
>>> d['meigumi'] = 90
>>> d['meigumi']
90
>>> d['meigumi'] = 88
>>> d['meigumi']
88
```

​		**注意：`dict` 的 `key` 必须是不可变对象**
​		要避免 `key` 不存在的错误，有两种办法
​			1.通过 in 判断

```python
>>> 'yueyun' in d
False
```

​			2.通过dict 提供的get() 方法，如果key不存在，则会返回None,

```python
>>> d.get('yueyun')  ##不存在则返回None
None
>>> d.get('yueyun',-1) ##返回 -1
-1
```

​		2.set:

​			set 和 dict 类似，也是一组key的集合，但是不能存储value，由于key不能重复，在set中，没有重复的key

```python
>>> s = set([1,2,3])
>>> s
{1,2,3}
```

​			重复元素在set中自动被过滤：

```python
s =set([1,1,2,3,2,3,3])
>>> s
{1,2,3}
```

​			通过 `add(key)` 方法可以添加到 `set` 中，可以重复添加，但不会有效果:

```python
>>> s.add(4)
>>> s
[1,2,3,4]
>>> s.add(4)
>>> s
[1,2,3,4]
```

 		通过 `remove(key)` 方法可以删除元素：

```python
>>> s.remove(4)
>>> s
{1, 2, 3}
```

​		set 可以看成是集合具有 交并 集的方法

```python
>>> s1 = set([1, 2, 3])
>>> s2 = set([2, 3, 4])
>>> s1 & s2
{2, 3}
>>> s1 | s2
{1, 2, 3, 4}
```

###### 8.函数

​	1.函数的调用：
​		调用 `abs` 函数

```python
>>> abs(100)
100
>>> abs(-20)
20
```

​		调用函数的时候，如果传入的参数数量不对，参数的类型不对会报错
​		调用 `max` 函数将max( ) 可以接收任意多个参数，并返回最大的那个

```python
>>> max(1,2)
2
>>> max(2,3,1,-5)
3
```

​		 **函数名其实就是指向一个函数对象的引用，完全可以把函数名赋给一个变量，相当于给这个函数起了一个“别名”**

```python
>>> Myabs = abs #变量Myabs指向abs函数
>>> Myabs(-100)
100
```

​		2.定义函数
​			在python中，定义一个函数要使用 `def` 语句，依次写出函数名，域名，括号中的参数和冒号`:` ,然后在缩进的代码块中编写函数体，返回值使用`return`语句
​			如下的自定义函数

```python
def my_abs(x):
  if x>=0:
    return x
  else:
    return -x
print(my_abs(-99))
```

​			如果函数没有return语句，函数执行完毕后也会返回结果，只是结果是`None` 
return None 可以简写为 `return`

​		3.空函数：
​			如果想定义一个什么事情也不做的函数，可以用 `pass` 占位符

```python
def nop():
  pass
```

​			`pass` 是没想好要写什么可以让代码运行起来
​		我们可以修改一下my_abs的定义，对参数做一下校验

```python
def my_abs(x):
  if not isinsance(x,(int,float)):
    raise TypeError('bad operand type')
  if x>=0:
    return x
  else:
    return -x
```

​		 函数值同样可以返回多个值

```python
import math
def move(x,y,step,angle=0):
  nx = x + step * math.cos(angle)
  ny = x + step * math.sin(angle)
  return nx,ny
x,y = move(100,100,60,math.pi/6)
print(x,y)
```

​			其实python的返回值依然是单一值，只是返回值成为了元组(tuple)而已

​		4.函数的参数
​			先写一个计算x^2的函数

```python
def power(x):
  return x * x
```

​			对于`power(x)`函数,参数`x` 就是一个位置参数
​			当我们调用`power` 函数时，必须传入有且仅有的一个参数`x`:

```python
>>> power(5)
25
>>> power(15)
225
```

​	
