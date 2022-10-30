---
title: 具体的源码以及分析(拙劣) --- Python 爬虫
description: 爬爬爬 (梦想爬p站)
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_10_29_20_38_10.3btx639tpec0.webp
swiper_index: 3
top_group_index: 3
categories: 技术
tags: 爬虫实战项目
abbrlink: 9def99ba
---

## 起因:
- 由于我们平常写博客的时候总是需要图片来让自己的博客系统变的更加好看和美观但是平常的时候一个一个收集又太麻烦，正在最近在学习python 于是打算做几个爬虫程序来收集一些网页好看的图片
### [PIXIV](https://www.pixiv.net/)
- 当然我们想到的第一个网页就是 `pixiv` 站辣，p站并没有做什么反爬的功能,我们用python中的 `requests` 库就能轻松完成任务  

1.首先安装 requests 库 
`pip install requests`
2.引入对应的模块
```python
# 转化成图片的二进制流
from io import BytesIO
import requests
# re写正则表达式
import re
# 读写文件
import os
# 储存图片
from PIL import Image
# 时间库 主要用于sleep
import time
# 伪装为任意响应头
from fake_useragent import UserAgent
# 随机库
import random
import urllib3
import datetime
```  
3.编写对应的功能
```python
# 设置随机请求头
ua = UserAgent(verify_ssl=False, path='./fake_useragent0.1.11.json')
# 随机请求头
def ua_random():
  headers = {
      'use_agent': ua.random
  }
  return headers

# 模式选择入口
def __init():
  # 今日 本周 本月 新人 原创 受男性欢迎 受女性欢迎
  mode = ''
  mark = int(input("请选择你需要下载的类型\n0---今日\n1---本周\n2---本月\n3---新人\n4---原创\n5---受男性欢迎\n6---受女性欢迎\n"))
  if mark==0:
    mode = 'daily'
  elif mark==1:
    mode = 'weekly'
  elif mark==2:
    mode = 'monthly'
  elif mark==3:
    mode = 'rookie'
  elif mark==4:
    mode = 'original'
  elif mark==5:
    mode = 'male'
  elif mark==6:
    mode = 'female'
  else:
    print("输入的选项不对，即将退出程序")
    os._exit(0)
  return mode

# 创建下载文件路径
def creatpath(mode,today):
  today = str(today)
  path = f'D:/pixiv_image_{mode}/'
  if not os.path.exists(path):
    os.mkdir(path)
    return path
  path_2 = f'D:/pixiv_image_{mode}_{today}'
  if not os.path.exists(path_2):
    os.mkdir(path_2)
    return path_2

# 爬取主函数
def scape(mode,today):
  father = "https://www.pixiv.net/"
  url = f'https://www.pixiv.net/ranking.php?mode={mode}'
  child_url_list = []
  resp = requests.get(url,headers=ua_random())
  # 找到img属性的 href 并爬取 
  obj=re.compile(r"<div class=\"ranking-image-item\"><a href=\"(?P<image_URL>.*?)\"class",re.S)
  results = obj.finditer(resp.text)
  # 将获取的href 放入数组中
  for result in results:
    list = result.group('image_URL')
    child_url=father+list.strip("/")
    child_url_list.append(child_url)
  # 获取原图片
  obj1 = re.compile(r"\"original\":\"(?P<download_URL>.*?)\"")
  # 注意 headers 应该从之前的网页进去
  headers = {'Referer':'https://www.pixiv.net/'}
  root = creatpath(mode,today)
  flag = 0
  for herf in child_url_list:
    if (flag>52):
      break
    final = requests.get(herf,headers=ua_random())
    real_image_url = obj1.search(final.text)
    DL_URL=real_image_url.group()
    path_img = root + str(DL_URL).split('/')[-1]
    pic = requests.get(DL_URL.split('"')[-2], headers=headers, verify=False, timeout=5)
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    # 储存在文件夹中
    image = Image.open(BytesIO(pic.content))
    image.save(f"{path_img.split('.')[-2]}.png", "png")
    print("SUCCESS!")
    flag = flag + 1
    # 防止被封
    time.sleep(1)

    # 主程序入口
if __name__ == '__main__':
  # 获取当前时间
  today = datetime.date.today()
  # 获取模式的选择
  mode = __init()
  # 进入程序
  scape(mode,today)
```
4.这样程序就能运行起来辣

### [vilipix](https://www.vilipix.com/)
- 国内p站，不需要小猫咪代理即可，而且代码简单任懂，功能比较完善(而且我从大佬哪里用到了多线程加速捏，不二选择)  
1.先下载我们需要的模块  
`pip install requests`  
`pip install PyQuery`
2.引入对应的库  
```python
import requests
from pyquery import PyQuery as pq
from fake_useragent import UserAgent
import os
import datetime
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
```
3.功能实现  
```python
# 随机请求头
ua = UserAgent(verify_ssl=False, path='./fake_useragent0.1.11.json')
# 网站url
base_url = 'https://www.vilipix.com'
# 获取当前日期
today = datetime.date.today()
# 获取昨天的日期，并用于构建url
today_str = (datetime.date.today() + datetime.timedelta(days=-1)).strftime('%Y%m%d')

mark = int(input("请选择要下载的榜单\n0---每日榜单\n1---每周榜单\n2---每月榜单\n"))
mode = ''
if (mark == 0):
    mode = 'daily'
elif mark == 1:
    mode = 'weekly'
elif mark == 2:
    mode = 'monthly'
else:
    print("输入有误，即将退出程序")
    os._exit(0)
# 分布创建属于榜单的文件夹
path_1 = f'D:/vilipix{mode}榜单'
if not os.path.exists(path_1):
    os.mkdir(path_1)

path_2 = f'D:/vilipix{mode}榜单/{today}/'
if not os.path.exists(path_2):
    os.mkdir(path_2)

# 随机请求头防止被封
def ua_random():
    headers = {
        'use_agent': ua.random
    }
    return headers

# 返回网页内容
def scrap_page(url):
    try:
        response = requests.get(url=url, headers=ua_random())
        if response.status_code == 200:
            response.encoding = 'utf-8'
            return response.text
    except requests.RequestException:
        print(f'{url}不可爬取！')


# 返回具体的url地址
def scrap_index(page):
    url = f'{base_url}/ranking?date={today_str}&mode={mode}&p={page}'
    return scrap_page(url)


# 对页面进行解析
def parse_index(html):
    doc = pq(html)
    # pQuery 和 web开发中jQuery 差不多 CSS选择器
    links = doc('#__layout .illust-content li .illust a')
    for link in links.items():
        # 获取link标签的href属性
        href = link.attr('href')
        name = href.split('/')[-1]  # 详情页名字，由图片id构成，以防重名
        # 详情页url 拼接
        detail_url = urljoin(base_url, href)
        page_count = link('.page-count span').text()
        # 惰性生成器
        yield detail_url, page_count, name

# 下载图片 保存至本地文件
def download(path, name, image):
    save_path = path + name + '.jpg'
    with open(save_path, 'wb') as f:
        f.write(image)


# 详情页内仅有一张图片时调用
def detail_index_1(html, name, path):
    doc = pq(html)
    link = doc('.illust-pages li a img').attr('src')
    image = requests.get(url=link, headers=ua_random()).content
    download(path, name, image)


# 详情页内有超过一张图片时调用
def detail_index_more(html, name, path):
    doc = pq(html)
    links = doc('.illust-pages li a img')
    i = 1
    for link in links.items():
        src = link.attr('src')
        image_name = name + f'_{i}'
        image = requests.get(url=src, headers=ua_random()).content
        download(path, image_name, image)
        i += 1

# 下载程序入口
def main(page):
    html = scrap_index(page)
    details = parse_index(html)
    for detail in details:
        detail_url = detail[0]  # 详情页的url
        num = detail[1]  # 详情页内图片的数量
        name = detail[2]  # 给详情页命的名
        detail_html = scrap_page(detail_url)
        if num == '1':  # 第①种情况
            detail_index_1(detail_html, name, path_2)
        else:  # 第②种情况
            path_3 = f'D:/vilipix{mode}榜单/{today}/{name}/'
            if not os.path.exists(path_3):
                os.mkdir(path_3)
            detail_index_more(detail_html, name, path_3)
        print('*'*10, f'{name}下载完毕！', '*'*10)
    # print("图片下载完成辣，谢谢使用！！")

## 主程序入口
if __name__ == '__main__':
    pages = list(range(1, 15))
    # 使用多线程进行加速
    with ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(main, pages)
    print("图片下载完成辣，谢谢使用！！")
```

### iw233(返回API接口)
- 由于比较简单就不废话了直接上代码  
```python
import requests
import os
import base64
from PIL import Image
from io import BytesIO
import random
import time
def sele():
  mark = int(input("请选择你要下载的类型:\n1 --- 随机壁纸(全部图)\n2 --- 随机壁纸(无色图)\n3 --- 壁纸推荐\n4 --- 银发\n5 --- 兽耳\n6 --- 星空\n7 --- 竖屏壁纸\n8 --- 横屏壁纸\n9 --- 随机色图(还在开发捏)\n"))
  if mark==1:
    mode = 'random'
  elif mark==2:
    mode = 'iw233'
  elif mark==3:
    mode = 'top'
  elif mark==4:
    mode = 'yin'
  elif mark==5:
    mode = 'cat'
  elif mark==6:
    mode = 'xing'
  elif mark==7:
    mode = 'mp'
  elif mark==8:
    mode = 'pc'
  elif mark==9:
    print("说了还在开发中，别那么心急嘛！！")
    os._exit(0)
  else:
    print("输入的选项不对，即将退出程序")
    os._exit(0)
  return mode

def get_url(urls,mode):
  '''
    具体形式 url?sort=mode
    url 为 urls 中的任意一种
    mode 为传入的模式捏
  '''
  return f'{urls[random.randint(0,3)]}?sort={mode}'

def spider(url,img_name,mode):
  i = 1
  # 保存图片
  path_name =  time.strftime('%Y_%m_%d_%H', time.localtime())
  path = f"D:\\iw233_image_{mode}_{path_name}"
  if not os.path.exists(path):
    os.mkdir(path)
  # 写成循环形式
  while 1:
    if i > 75:
      break
    response = requests.get(url = url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"})
    image = Image.open(BytesIO(response.content))
    image.save(f"{path}/{img_name}_{i}.jpg")
    print("SUCCESS!")
    i = i + 1

if __name__ == '__main__':
  # 主程序入口
  # 获取时间
  img_name =  time.strftime('%Y_%m_%d_%H_%M', time.localtime())
  mode = sele()
  urls = ['https://iw233.cn/api.php','http://api.iw233.cn/api.php','https://dev.iw233.cn/api.php','http://ap1.iw233.cn/api.php']
  url = get_url(urls,mode)
  spider(url,img_name,mode)

``` 

#### 代码到这里就结束辣，如果又遇到任何问题或者run不起来的欢迎加我QQ问我 3514392356


