---
title: yaml基本使用入门
description: 一些程序所需要的配置文件写法
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/102587184.1jiu32u74uqo.webp
categories: 技术
tags: yaml配置文件
date: 2022-11-09
abbrlink: d0a1c72f
---

## yaml文件的写入

```python
import yaml

# 写入
my_dict = {
  'name': 'yueyun',
  'dictName': 'megumi',
  'address': 'heart',
  'age': 18,
  'testcom': ['test1','test2','test3'],
  'love': {
    'name': 'me',
    'age': 19
  }
}
# 转化成字符串
ayml = yaml.dump(my_dict)
# 写入文件
try: 
  with open("config.yaml","a+") as f:
    yaml.dump(my_dict,f)
except:
  print("出错辣")
# 注意 'r'--读 'w'--写 'a'--追加 'r+' 'w+' 'a+' (二进制文件加b就行)
```

## yaml文件的读

```python
import yaml
with open("config.yaml",'r') as f:
    ayml = yaml.load(f.read(),Loader = yaml.Loader)
print(type(ayml))
print(ayml)
```

