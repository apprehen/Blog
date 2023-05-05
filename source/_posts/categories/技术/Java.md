---
title: Java基础语法
description: 纪录学习Java的日记捏
tags: Java
categories: 技术
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/20221008/QQ图片20221008102211.3y1xw14ujoo0.webp
abbrlink: ea538f2a
date: 2022-10-08 10:20:55
---

#               Java基础学习

##### 1.第一个Java程序

```java
public class Hello {
  public static void main(String[] args){
    System.out.println("Hello World!")
  }
}
```

​	在Java程序中，总能找到类似:

```java
public class Hello {
  ...
}
```

​	这个定义被称为class(类)，类名为Hello，大小写敏感，class用来定义一个类，public表示类是公开的，public，class是java的关键字，Hello是类名,按照习惯，首写字母需要大写,其中的花括号是类的定义
​	注意我们在类中定义了一个方法 main方法:

```java
public static void main(String[] args){
  ...
}
```

​	方法是可执行的代码块，方法名main，用 ()括起来的方法参数，这里的main方法的参数，参数类型是string[ ]，参数名是args，public 和 static 用来修饰方法 （表示为一种静态方法）void 是方法的返回类型 { ... }表示中间代码
​	**注意：文件名必须是`Hello.java`，而且文件名也要注意大小写，因为要和我们定义的类名`Hello`完全保持一致**

##### 2.Java程序的基本结构

```java
public class Hello {
    public static void main(String[] args) {
        // 向屏幕输出文本:
        System.out.println("Hello, world!");
        /* 多行注释开始
        注释内容
        注释结束 */
    }
} // class定义结束
```

​	Java是面向对象的语言，一个程序的基本单位是 `class`  `class` 是关键字，上面定义的class名字就是`Hello` 
​	**注意public是访问修饰符，表示该class是公开的，在class内部，可以定义若干方法(method):** 

```java
public class Hello {
    public static void main(String[] args) { // 方法名是main
        // 方法代码...
    } // 方法定义结束
}
```

​	这里的方法名是`main` 返回值是`void` 表示没有任何的返回值
​	`public`除了可以修饰`class`外，也可以修饰方法。而关键字`static`是另一个修饰	符，它表示静态方法，后面我们会讲解方法的类型，目前，我们只需要知道，Java	入口程序规定的方法必须是静态方法，方法名必须为`main`，括号内的参数必须是String数组。

##### 3.Java的变量和数据类型

​	类型
​		整型：`int` ,`long` 后面要加L
​		浮点数：`float` (后面要加f) `double` 
​		布尔类型：`boolean`  true  false
​		字符类型：`char` 
​		引用类型：`String` 
​		常量：`final` 关键字定义

```java
String s = "Hello";
double r = 5.0;
final double PI = 3.14;
double area = PI * r * r;
System.out.println("area = " + area)
// 引用类型类似于C语言中的指针
```

​		var关键字 （来新建类型）

```java
var sss = new StringBuilder();
```

