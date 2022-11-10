---
title: 爬虫第一次(取得相关图片)
description: 爬爬爬
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/20221018/3.6vzndd5etl00.webp
categories: 技术
tags: 爬虫第一次练习
abbrlink: e7dcd4c8
date: 2022-10-16
---
### 某个无聊的下午，收缩了相关的代码，决定爬爬某个网站的图片捏

```python
import requests
from pyquery import PyQuery as pq
from fake_useragent import UserAgent
import os
import datetime
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor

# 随机请求头
ua = UserAgent(verify_ssl=False, path='./fake_useragent0.1.11.json')
# 网站url
base_url = 'https://www.vilipix.com'
# 获取当前日期
today = datetime.date.today()
# 获取昨天的日期，并用于构建url
today_str = (datetime.date.today() + datetime.timedelta(days=-1)).strftime('%Y%m%d')
# 分布创建属于当日榜单的文件夹
path_1 = 'D:/vilipix每日榜单'
if not os.path.exists(path_1):
    os.mkdir(path_1)

path_2 = f'D:/vilipix每日榜单/{today}/'
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
    url = f'{base_url}/ranking?date={today_str}&mode=daily&p={page}'
    '''
    base_url:https://www.vilipix.com
    today_str:获取当天网站榜单日期
    page:榜单页码
    '''
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
            path_3 = f'D:/vilipix每日榜单/{today}/{name}/'
            if not os.path.exists(path_3):
                os.mkdir(path_3)
            detail_index_more(detail_html, name, path_3)
        print('*'*10, f'{name}下载完毕！', '*'*10)

## 主程序入口
if __name__ == '__main__':
    pages = list(range(1, 11))
    # 使用多线程进行加速
    with ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(main, pages)
```

------

