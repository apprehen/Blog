---
title: PostgreSQL学习日记
description: 纪录学习PostgreSQL
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_02_19_05_31.22s7w3yg3wsg.webp
categories: 技术
tags: 数据库库库
abbrlink: c008bbd9
date: 2022-11-01

---

# 关系型数据库`Postgresql`教程

## 简介   

​	使用的是 服务端/客户端 的模型  

​	1.一个服务器进程，管理数据库文件，接受客户端应用与数据库的联接，并且让客户端可以在数据库上执行操作，数据库服务器程序叫做`postgres`

​	2.需要执行数据库操作的用户的客户端(前端)应用

​	3.`PostgreSQL`服务器可以处理客户端的多个并发请求，它的每一个连接启动一个新的进程，主服务器进程总是在运行并等待客户端的连接  

建议使用UI界面 pgadmin4 进行可视化管理 如下图所示  
![image-20221103112443662](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.5bqxmbwemms0.webp)

## 初级部分

### postgreSQL建表

在postgreSQL中，`CREATE TABLE` 语句用于在任何给定的数据库中创建一个新表
具体语法如下

```sql
CREATE TABLE table_name(
	column1 datatype,
    column2 datatype,
    column3 datatype,
    ...
    columnN datatype,
    PRIMARY KEY(one or more cloumns)
);
```

首先我们尝试使用pgadmin4的UI来操作一下
![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.6smjdwiqsbk0.webp)

选择插入的column 和 字符类型

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.m6noqce8um8.webp)

使用sql语法创建表如下

```sql
CREATE TABLE public.student2
(
  id integer NOT NULL,
  name character(100),
  major character(100),
  CONSTRAINT student2_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.student2
  OWNER TO postgres;
COMMENT ON TABLE public.student2
  IS '这是一个学生信息表2';
```

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.2tg57ofk6vq0.webp)

使用python语言操作创建表的写法如下

```python
import psycopg2 as pg
conn = pg.connect(database="test_db", user="postgres", password="Apprehen", host="127.0.0.1", port="xxxx")
print("Opened database successfully")
cur = conn.cursor()
cur.execute('''CREATE TABLE students3
  (ID INT PRIMARY KEY   NOT NULL,
  EMPNO           INT   NOT NULL,
  ENAME           CHAR(50),
  JOB             TEXT  NOT NULL,
  SALARY          REAL);''')
print("Table created successfully")
```

### 	postgreSQL插入数据

```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);

```

* column1,column2,column3,columnN 是插入数据的表中的列的名称 （如下图所示）

  ![image-20221103114349180](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.b80igj3o8tc.webp)

​		若想用python操作这个数据库可以

```python
pip install psycopg2 # 安装包模块
# 创建实例对象
conn = pg.connect(database="test_db", user="postgres", password="xxxx", host="127.0.0.1", port="5432")
print("Opened database successfully")

# 插入操作
cur = conn.cursor()
cur.execute("INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) \
  VALUES(3,'kurumi',18,'bigdate',10000)")
cur.execute("INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) \
  VALUES(4,'megumi',18,'explosion',20000)")
conn.commit()
print("Records created successfully")
conn.close()
```

​	执行完成后在观察数据库的表我们发现

![image-20221103153703381](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.3lqupzkh0m00.webp)

### 	postgreSQL查询数据

​	在postgresql中，使用SELECT语句可以从数据库中检索数据，数据以表格形式返回，这些结果表称为结果集

```sql
SELECT "column1", "column2".."column" FROM "table_name";
```

![image-20221103155748050](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.5olf3g0l87g0.webp)

​	`column1 column2 column3 ...` 指定检索的数据的列,如果想查询所有的则用 * 表示匹配全部

```sql
SELECT * FROM table_name
```

![image-20221103155929730](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.66c21oo9occ0.webp)

​	若使用python语言来操作则

```python
# 查询操作
cur.execute("SELECT id,name,address,salary from COMPANY")
rows= cur.fetchall()
for row in rows:
  print(f"ID = {row[0]}")
  print(f"NAME = {row[1]}")
  print(f"ADDRESS = {row[2]}")
  print(f"SALARY = {row[3]}")
  print("\n")
print("Operation done successfully")
conn.close()
# 则会在控制台一一打印出来
```

### 	postgreSQL更新数据

​		在postgresql中，update语句用于修改现有的记录，更新所选行，必须使用WHERE子句

```sql
UPDATE table_name  
SET column1 = value1, column2 = value2...., columnN = valueN  
WHERE [condition]
```

![image-20221103163443695](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.6aveplgklmc0.webp)

​	使用python操作如下所示

```python
# 更新操作
cur.execute("UPDATE COMPANY set name='二乃',salary=100000 where ID=1")
conn.commit()
print("Operation done successfully")
conn.close()
```

![image-20221103171624601](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.21znxedw5qps.webp)

### 	postgreSQL删除数据

​		DELETE语句用于从表中删除现有记录。WHERE子句用于指定所选记录的条件，如果不指定条件则删除所有的记录

```sql
DELETE FROM table_name  
WHERE [condition];
```

![image-20221103172410798](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.6btkq1gbxfk0.webp)

​	使用python语言来操作则是

```python
# 删除操作
cur.execute("DELETE FROM COMPANY where ID=3;")
conn.commit()
print("Total number of rows deleted :",cur.rowcount)
# cur.rowcount 表示的删除多少行数据
```

### 	postgreSQL排序

postgresql中使用 `ORDER BY` 子句用于按升序或者降序对数据进行排列

```sql
SELECT column-list  
FROM table_name  
[WHERE condition]  
[ORDER BY column1, column2, .. columnN] [ASC | DESC];
```

参数解释：
	`column-list` : 指定检索的列或计算
	`table_name`:	指定从中检索记录的表,FROM子句中至少有一张表
	`WHERE condition` : 可选值，满足匹配条件的才能检索记录
	`ASC` : 可选，按照升序排列(默认值
	`DESC` : 可选，降序

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.1n53q9f0owtc.webp)

  也可以指定多个值来降序

```sql
SELECT * FROM public.students
ORDER BY salary,major DESC;
```

### PostgreSQL分组

PostgreSQL `GROUP BY` 子句用于将具有相同数据的表中的这些分组在一起，它与`SELECT` 语句一起使用
`GROUP BY` 字句通过记录收集数据，并将结果分组到一个或多个列,可以减少输出中的冗余
sql语法如下

```sql
SELECT column-list
FROM table_name
WHERE [conditions]
GROUP BY column1,column2,....columnN
ORDER BY column1, column2....columnN
```

> 注意：在`GROUP BY` 多个列的情况下，使用的任何列进行分组时，要确保这些列应在列表中可用(不能有null？)

如何减少数据的冗余
比如我们先往表里面插入一些重复的数据

```sql
INSERT INTO public.students VALUES(5,'Megumi','hahaha',19,20000);
INSERT INTO public.students VALUES(6,'kazimi','hahaha',19,20000);
INSERT INTO public.students VALUES(7,'kurumi','hahaha',19,20000);
INSERT INTO public.students VALUES(8,'kurumi','hahaha',19,20000);
SELECT * FROM public.students ORDER BY ID;
```

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.4gqg7xqtiza0.webp)

通过sql语句GROUP BY 去除耦合后

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.2s6undlzqiu0.webp)

### PostgreSQL的Having子句

在PostgreSQL中，HAVING子句在与`GROUP BY` 子句组合使用，用于选择函数结果满足某些条件的特定行，sql语句如下

```sql
SELECT column1,column2
FROM table1,table2
WHERE [conditions]
GROUP BY column1 column2
HAVING [conditions]
ORDER BY cloumn1,cloumn2
```

 用我们的数据库中的学生表演示一下

```sql
SELECT NAME FROM PUBILIC.STUDENTS GROUP BY NAME
HAVING COUNT(NAME) < 2
```

(我们发现并没有什么明显变化因为这个是语句的条件是名字次数小于二次都满足于是没什么变化)

```sql
-- 我们先插入一些重复数据之后在用having指定条件查询
INSERT INTO PUBLIC.STUDENTS VALUES(5,'Megumi','explosion',18,10000);
INSERT INTO PUBLIC.STUDENTS VALUES(6,'gujian','explosion',18,10000);
INSERT INTO PUBLIC.STUDENTS VALUES(7,'kazimi','explosion',18,10000);
SELECT NAME FROM PUBLIC.STUDENTS GROUP BY NAME
HAVING COUNT(NAME)<3;
```

> 1. 当name < 3时 -- 显然所有条件都满足
> 2. 当name < 2时 -- name为megumi和kazimi的都name有两个不满足条件于是被筛出在表外
> 3. 当name > 1时 -- name为megumi和kazimi的name唯一满足故在表内

### PostgreSQL条件查询

PostgreSQL条件用于从数据库获取更具体的结果，通常WHERE 子句一起使用，具有子句的条件就像双层过滤器

> - AND 条件
> - OR 条件
> - AND & OR 条件
> - NOT 条件
> - LIKE 条件
> - IN 条件
> - NOT IN 条件
> - BETWEEN 条件

#### `AND` 条件

`AND` 条件与`WHERE` 子句一起使用，以从表中的多个列中选择唯一的数据

```sql
SELECT column1,column2,...columnN
FROM table_name
WHERE [CONDITION] AND [CONDITION];
```

我们需要查询所有ID < 4 并且薪水 >1000 的员工信息

```sql
SELECT * FROM PUBLIC.STUDENTS WHERE SALARY>1000 AND ID > 4;
```

![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.2xndvn1l4960.webp)

执行sql语句后![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.4371xnozeh00.webp)

#### `OR` 条件

PostgreSQL OR条件与WHERE子句一起使用，以从表中的一列或多列中选择唯一的数据

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition]    
OR [search_condition];
```

查询名字是megumi 或 major是e'x'plosion的项

```sql
SELECT * FROM PUBLIC.STUNDETS 
WHERE NAME = 'Megumi' OR major = 'explosion'
```

#### `AND` & `OR` 语句的混合使用

PostgreSQL AND&OR综合使用的优点

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition]  AND [search_condition]     
OR [search_condition];
```

结合表中的数据 查询name为megumi和年龄为18或id值小于8的记录信息

```sql
SELECT *  
FROM PUBLIC.STUDENS  
WHERE (NAME = 'Megumi' AND age = 18)  
OR (ID<= 8);
```

#### `NOT` 条件

PostgreSQL NOT 条件与WHERE子句一起使用以否定查询中的条件

```sql
SELECT column1, column2, ..... columnN    
FROM table_name    
WHERE [search_condition] NOT [condition];
```

查询那些年龄不为`NULL`的记录信息，执行以下查询

```sql
SELECT *  
FROM Public.students 
WHERE age IS NOT NULL ;
```

再来看另外一个示例，查询那些年龄不是`21`和`24`的所有记录，执行以下查询

```sql
SELECT *  
FROM Public.students 
WHERE age NOT IN(18,19);
```

#### `LIKE` 条件

PostgreSQL LIKE条件与WHERE子句一起用于从指定条件满足`LIKE`条件的表中获取数据。
