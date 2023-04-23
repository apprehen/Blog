---
title: OPENAI 的高阶玩法
description: 基于LangChain框架的大语言模型技术，可以用于总结，分段，联网，收缩等一系列功能
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/10DCD02E61835FB52BC7421D120F6B62.yr028y2cvao.webp
tags: 'openai,chatGPT'
abbrlink: 532d942c
date: 2023-04-20 20:25:50
---

**起因:** **因为`openAI`无法连接到互联网，且知识已经落后为了打照属于自己的`chatGPT` 找了很多资料，特地的做下总结！**

第三方开源库`LangChain` 

> 文档地址 ： [`Lang'Chain.com`](https://python.langchain.com/en/latest/) 

`Langchain` 是一个用于开发有语言模型驱动的应用程序框架，主要的功能如下

- 可以将`LLM`模型与外部数据源进行连接 (`LLM` : Large Language Model 大语言模型 )
- 允许与`LLM` 模型进行交互

# `Models`: LangChain 支持的各种模型类型 

`LLMS` :
大型语言模型 (LLM) 是我们涵盖的第一类模型。这些模型将文本字符串作为输入，并返回文本字符串作为输出。

```python
from langchain.llms import OpenAI

OPENAI_API_KEY = 'sk-xxxxxxxxx'

llm = OpenAI(model_name="text-ada-001", n=2,
             best_of=2, openai_api_key=OPENAI_API_KEY)

response = llm("Tell me a joke")
print(response)
```

输出如下

```shell
Why did the chicken cross the road?

To get to the other side.
```

生成文本：`LLM` 拥有的最基本的功能就是能够调用它，传入一个字符串并取回一个字符串。

`LLM` 调用有如下

- 支持多种模型接口, `OpenAI` `HuggingFace` `AzureOpenAI`  ...
- 支持数据库缓存 in-mem SQLite Redis， 等
