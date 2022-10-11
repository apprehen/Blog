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

​		5.将另外一组可迭代对象扩展至列表尾部--extend()

```python
a = [1,2,3,4,5,6]
a.extend([7,8,9])
print(a)
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

​		6.删除列表对象首次出现的指定元素--remove()

```python
a_list = [3,5,7,9,7,11]
a_list.remove(7)
print(a_list)
[3,5,9,7,11]
a_list.remove(7)
print(a_list)
[3,5,9,11]
###### 注意每次删除元素后 list会自动把元素往前移动一次，如果想去重则需要考虑数组移动问题
## 有问题的代码 ，如果元素重复则删除不彻底
x = [1,2,1,2,1,2,1,2,1]
for i in x:
    if i == 1:
      x.remove(i)
 ## 用如下代码
x = [1,2,1,2,1,1,1]  
for i in x[::]:  
    if i == 1:  
        x.remove(i)
x = [1,2,1,2,1,1,1]  
for i in range(len(x)-1,-1,-1): 
    if x[i]==1:  
        del x[i]
##del 防止数组下标发生错乱，一般是从后删起
## 可以使用.count方法辅助, .count 方法返数值的次数
x = [1,2,1,2,1,1,1] 
for i in range(x.count(1)):
    x.remove(1)
x
```

​		7.对象列表指定元素首次出现的下标--index

```python
aList = [1,2,3,4,9,9,1,5]
>>> aList
[1, 2, 3, 4, 9, 9, 1, 5]
>>> aList.index(9)
4
```

​		8.对象列表统计对象出现的次数--count

```python
aList = [7, 4, 5, 5.5, 5, 11, 7, 15, 7] 
aList.count(5)
2
```

​		9.连接多个数组形成tuple(元组)--zip

```python
aList = [3, 5, 7, 9, 11]
bList = ['a', 'b', 'c', 'd']
zip(aList, bList)
<zip at 0x4558ac8> ## 返回一个对象迭代器
list(zip(aList, bList))
[(3, 'a'), (5, 'b'), (7, 'c'), (9, 'd')]
aList = [3, 5, 7, 9, 11]
bList = ['a', 'b', 'c', 'd']
(3, 'a') in zip(aList, bList)
True
```


​	list中的元素类型不确定，list里面也能再包含list list替换直接令值替换就行

```python
>>> MyList = ['yueyun',1,True,1.234]
>>> p = ['HTML','CSS','Javascript',['Vue','Reacte'],'C']
```

​	当然判断列表中是否有值，可以使用count判断，或者直接使用 `in` 关键字返回结果

```python
aList = [7, 4, 5, 5.5, 5, 11, 7, 15, 7] 
3 in aList
True
16 in aList
False
16 not in aList
True
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

​	range() 函数，生成一个整数数列，左闭右开，在通过list()函数可以转换为list。(可以加上第三个参数，表示step,(步长))

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

​			将 `power(x)`修改为`power(x,n)` 用来计算x^n:

```python
def power(x,n):
  s = 1
  while n>0:
    n = n-1
    s = s*x;
  return s
```

 			对于这个修改后的power(x,n)函数可以计算任意次方
 			*** 由于我们经常计算x^2,所以可以把第二个参数n的默认值设定为2: ***

```python
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
  >>> power(5)
  25
  >>> power(5,2)
  25
```

​			默认参数：如果我们传入的是list(可变对象)

```python
def add_end(L=[]):
  L.append('END')
  return L;
```

​		  定义默认参数要牢记一点：默认参数必须指向不变对象！

```python
>>> add_end()
['END', 'END']
>>> add_end()
['END', 'END', 'END']
```

​		 Python 中有`str` `None` 这样的不变对象，这样创建后对象的内部数据就不会在被修改

```python
def add_end(L=None):
  if L is None:
    L=[]
  L.append('END')
  return L
```

​	**可变参数**：
​		可变参数就是传入的参数个数是可变的,
​		例如要求完成a^2+b^2+c^2 + ... 。

```python
def calc(number):
  sum = 0
  for n in number:
    sum = sum + n*n
   return sum
# 首先想到的是传入一个数组或者元组
>>> cacl([1,2,3])
14
>>> cacl((1,3,5,7))
84
```

​		我们将函数的参数如果改为可变参数:

```python
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
  # 函数代码不用变，但是调用该函数时，可以传入任意参数
  >>> calc(1,2)
  5
  >>> calc()
  0
```

​		当然如果我们已经有了`list`或`tuple`  我们也可以用`*nums` 表示 `nums`将list或tuple中的参数都传进入

```python
num = [1,2,3,4]
>>>print(def calc(*num))
30
```

​		**关键字参数**：
​		可变参数允许传入0或者任意多个参数，这些可变参数在调用时组装成tuple，关键字参数运行传入0或者任意个含参数名的参数，会自动在参数内部组装成dict，如下

```python
def person(name,age,**kw):
  print('name:',name,'age:',age,'other:',kw)
>>> person('meigumi','18')
name: meigumi age: 18 other: {}
```

​			我们可以在调用参数的时候可以传入任意个数的关键字参数:

```python
>>> person('meigumi',18,city="二次元",tag="人妻")
name: meigumi age: 18 other: {'city': '二次元', 'tag': '人妻'}
```

​	很显然，关键参数可以用来扩展函数的功能捏
​	当然我们也可以先存在一个dict，然后作为关键字传入进去

```python
extra = {'city': 'yisijie', 'job': '...'}
person('kurumi', 18, city=extra['city'], job=extra['job'])
```

​	当然上面的复杂调用可以换成下面简单的**

```python
extra = {'city': 'yisijie', 'job': '...'}
person('kurumi', 18, **extra)
## 有点类似JS中es6 的展开运算符??
```

​	**命名关键字参数**：
​		如果我们想限制关键字参数的名字，就可以用命名关键字参数，例如，只接受 `city` 和 `job` 作为关键字参数，这种定义方式的函数如下：

```python
def person(name,age,*,city,job):
  print(name,age,city,job)
>>> person('Jack', 24, city='Beijing', job='Chaoyang')
Jack 24 Beijing Chaoyang
```

​	命名关键参数需要一个特殊的分隔符 * ,`*` 后面的参数被视为命名关键字参数。
​	如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不在需要`*` 了：

```python
def person(name,age,*args,city,job):
  print(name,age,args,city,job)
  ##注意指定对应的名称噢
def person(name, age, *, city='Beijing', job):
  print(name, age, city, job)
  ##给取默认值也是可行的
```

###### 9.列表List高级

​	取一个 `list` 或 `tuple` 的部分元素是很常见的操作

```python
L = ['Michael','Sarah','Tracy','Bob','Jack']
##取前三个元素
r = []
for i in range(3):
	r.append(L[i])
print(r)
```

​	**切片(Slice)**

```python
>>>L[0:3]
['Michael', 'Sarah', 'Tracy']
```

​	`L[0:3]` 表示，从索引 `0` 开始取，直到索引 `3` 为止，取不到`3` 
​	如果第一个索引是 `0` 可以省略:

```python
L[:3]
['Michael', 'Sarah', 'Tracy']
```

​	 当然我们也是可以取到负数的：

```python
>>> L = list(range(100))
[0,1,2,3,4 ...,98,99]
# 取出前十个数
>>> L[:10]
[0,1,2,3,4,5,6,7,8,9]
# 取出后十个数
>>> L[-10:]
[90,91,92,93,94,95,96,97,98,99]
# 前11~20个数
>>> L[10:20]
[10,11,12,13,14,15,16,17,18,19]
# step:可以决定每次取多少
>>> L[:10:2]
[0,2,4,6,8]
>>> L[::5]
[0,5,10...100]
## 甚至可以什么都不写复制一个一样的list (浅拷贝)
>>> L[:]
[0,1,2,3,4 ...,98,99]
## 当然tuple也可以进行切片操作，只是得到的还是tuple，值不可变
>>> (0,1,2,3,4,5)[:3]
(0,1,2)
## 字符串 `xxx` 也可以看成一种list 每一个元素就是一个字符，字符串也可以进行切片## 操作，操作的结果任然是字符串
>>> 'ABCDEFG'[:3]
'ABC'
>>> 'ABCDEFG'[::2]
'ACEG'
```

​	**列表排序**
​		使用列表对象的 `sort` 方法进行原地排序

```python
import random
aList=[3,4,5,6,7,9,11,13,15,17]
## 类似于重新洗牌
random.shuffle(aList)
print(aList)
## 默认升序排列 且是改变原数组无返回值
aList.sort()
## 可以指定参数让数组逆序
aList.sort(reveser = True)
## sort 中的 参数 key的理解与用法
# 传递给key参数的是一个函数，他指定可迭代对象中的每个元素来按照该函数进行排序
aList =[[1, 7], [1, 5], [2, 4], [1, 1]]
aList.sort()
[[1, 1], [1, 5], [1, 7], [2, 4]] ## 默认按照0维排序
def fun(li):
  return li[i]
li.sort(key = fun)
[[1, 1], [2, 4], [1, 5], [1, 7]] ## 按照1维排序
## lambda函数 匿名函数 只包含函数的返回值 无名字
aList.sort(key = lambda x:len(str(x)))
## 对于每个元素中转化为字符串的长度进行排序
```

​		使用内置函数 `sorted` 对列表进行排序并返回新列表
​	**迭代**
​		如果给定一个l `list` 通过`for`循环遍历这个`list` 这种遍历我们称为迭代(Iteration)

```python
for i in range(100):
  print(i)
```

 	Python 也可以去作用在其他可迭代对象 (比如对象，dict 等)

```python
d = {'a':1,'b':2,'c':3}
for key in d:
	print(key)
a
b
c
# dict的存储不是按照list的方式排序，所以迭代的顺序可能不一样
for value in d.values():
	print(value)
for k,v in d.items():
	print(k,v)
# 字符串也是可迭代的对象，也可以作用于 for 循环:
for ch in 'ABC':
  print(ch)
```

​		我们判断是否为可迭代对象？可以通过 `collections.abc` 模块的 `Iterable` 类型

```python
from collections.abc import Iterable
>>> isinstance('abc',Iterable)
True
>>> isinstance([1,2,3],Iterable)
True
>>> isinstance(123,Iterable)
False
```

​		如果要对 `list` 实现类似的下标 Python 内置的`enumerate` 函数可以把一个`list` 变成索引-元素对

```python
for i,value in enumerate(['A','B','C']):
	print(i,value)
0 A
1 B
2 C
```

​		同时引用两个变量，在Python中可以同时迭代

```python
for x, y in [(1, 1), (2, 4), (3, 9)]:
  print(x, y)
1 1
2 4
3 9
```

​	**列表生成式**
​		指可以再列表中写循环和条件，生成特定的`list`

```python
>>> list(range(1,11))
[1,2,3,4,5,6,7,8,9,10]
## 如果要生成[1x1,2x2,3x3,...,10x10]
# 可以跟上for循环创建出list
>>> [x*x for x in range(1,11)]
[1,4,9,16,25,36,49,64,81,100]
# for循环后面当然可以跟上
>>> [x*x for x in range(1,11) if x%2==0]
[4,16,36,64,100]
## 还可以使用两层循环，可以生成全排列
>>> [m + n for m in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
## 列表生成式也可以使用两个变量来生成list:
d = ['x':'A','y':'B','z':'C']
>>> [k+'='+v for k,v in d.items()]
['x=A', 'y=B', 'z=C']
>>> L = ['Hello','World','IBM','Apple']
>>> [s.lower() for s in L]
## if 表达式的写法
>>> [x if x %2 == 0 else -x for x in range(1,11)]
[-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]
## 在列表推导式中使用多个循环，实现多序列元素的任意组合，并可结合条件语句过滤特定的元素
[(x, y) for x in range(3) for y in range(3)]
[(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y] ## 类似双层循环捏 
## 使用列表推导实现矩阵的转置
matrix = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] 
[[row[i] for row in matrix] for i in range(4)] 
## 使用推导式生成100以内的素数
import math
def isprime(x):
    for i in range(2, int(math.sqrt(x)) + 1):
        if (x % i) == 0:
            return False
    return True
  [x for x in  range(2, 100) if isprime(x)]
```

**10.生成器**
	Python的一种边循环边算的机制，称为生成器：generator
	要创建generator很简单把列表生成式用 () 表示就行

```python
g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x0000017B0A829A10>
# 可以通过next() 来打印generator
next(g)
next(g)
## 使用迭代对象
for n in g:
  print(n)
```

​	另外一种生成生成器是直接在 函数中包含 `yield` 关键字

###### 10.字符串的常用方法

​	1.
