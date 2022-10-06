---
title: Python基本语法
description: 纪录学习Python的日记捏
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/20221006/yuzhi.7ew8d6bi3fs0.webp
swiper_index: 1
top_group_index: 1
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