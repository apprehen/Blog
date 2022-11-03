---
title: PostgreSQL学习日记
description: 纪录学习PostgreSQL
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_02_19_05_31.22s7w3yg3wsg.webp
categories: 技术
tags: 数据库库库
abbrlink: c008bbd9
---

### 关系型数据库`Postgresql`教程

## 1.简介   

​	使用的是 服务端/客户端 的模型  

​	1.一个服务器进程，管理数据库文件，接受客户端应用与数据库的联接，并且让客户端可以在数据库上执行操作，数据库服务器程序叫做`postgres`

​	2.需要执行数据库操作的用户的客户端(前端)应用

​	3.`PostgreSQL`服务器可以处理客户端的多个并发请求，它的每一个连接启动一个新的进程，主服务器进程总是在运行并等待客户端的连接  

建议使用UI界面 pgadmin4 进行可视化管理 如下图所示  
![image-20221103112443662](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.5bqxmbwemms0.webp)

## 2.初级部分

#### 	1.postgreSQL插入数据

```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);

```

* column1,column2,column3,columnN 是插入数据的表中的列的名称 （如下图所示）

  ![image-20221103114349180](C:\Users\35143\AppData\Roaming\Typora\typora-user-images\image-20221103114349180.png)

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

#### 	2.postgreSQL查询数据

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

#### 	3.postgreSQL更新数据

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

#### 	4.postgreSQL删除数据

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

