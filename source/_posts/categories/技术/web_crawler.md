---
title: 开新坑 --- Python 爬虫
description: 爬爬爬 (梦想爬p站)
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/20221013/pachong.6tifvaesxwc0.webp
categories: 技术
tags: 爬虫
abbrlink: 9b6e9253
---
# Python 爬虫入坑指南

### 实则就是用`python`模拟一些浏览器去获取网页上的相应资源

### **基础**

#### socket 方法访问页面

​	比较早期比较常见的是用socket套接字去访问对应的页面，建立双向的通道

```python
import socket
sock_client = socket.socket(family=socket.AF_INET,type=socket.SOCK_STREAM) # 选择套接字参数
## 建立信道连接 80为默认端口
sock_client.connect(("www.people.com.cn",80))
pathname = '/n1/2022/1013/c1001-32544874.html' # 具体的页面
hostname = 'www.people.com.cn' # 主站
req_line = "GET {0} HTTP/1.0\r\nHost: {1}\r\n\r\n".format(pathname, hostname)
print(req_line)
`Host: www.people.com.cn`
sock_client.send(req_line.encode(encoding="utf-8"))
raw_reply = b''
while True:
    more = sock_client.recv(8192)
    if not more:
        break
    raw_reply += more
sock_client.close()
print(raw_reply.decode())
######################################
GET /n1/2022/1013/c1001-32544874.html HTTP/1.0
Host: www.people.com.cn


HTTP/1.1 404 Not Found
Date: Sat, 15 Oct 2022 02:54:44 GMT
Content-Type: text/html
Content-Length: 155
Connection: close
Server: waf/4.31.19-2.el7
X-Via: 1.1 sxian117:3 (Cdn Cache Server V2.0), 1.1 PSzjnbsxsy229:12 (Cdn Cache Server V2.0), 1.1 PSjsczsxhr186:2 (Cdn Cache Server V2.0), 1.1 PS-WNZ-01ilX151:12 (Cdn Cache Server V2.0)
X-Ws-Request-Id: 634a20f4_PS-WNZ-01ilX151_30795-65162

<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>RMW-WEB/220801</center>
</body>
</html>
```

#### 	`Python` 中封装了比较常用的库 request 而不是在使用传统的套接字建立信道去连接

```python
## 首先引入安装 pip install requests
import html
import requests
# 首先演示一个最普通的爬取主页的html
url = 'https://www.pixiv.net'
## 根据网站看是否需要伪装
headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
}
## get方法提交数据
web_data = requests.get(url,headers=headers)
print(web_data)
`<Response [200]>` ## 表示成功
print(web_data.text)
` <!DOCTYPE html>
<html lang="ja" class=" page-cool-index" xmlns:wb="http://open.weibo.com/wb">
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=1160">
<meta name="format-detection" content="telephone=no">
<meta property="og:site_name" content="pixiv">
<meta property="fb:app_id" content="140810032656374">
<meta property="wb:webmaster" content="4fd391fccdb49500" />
                        <meta property="twitter:card" content="summary_large_image">
                                <meta property="twitter:site" content="@pixiv">
                                <meta property="twitter:title" content="イラストコミュニケーションサービス [pixiv]">
                                <meta property="twitter:description" content="pixiv(ピクシブ)は、作品の投稿・閲覧が楽しめる「イラストコミュニケーションサービス」です。幅広いジャンルの作品が投稿され、ユーザー発の企画やメーカー公認のコンテストが開催されています。">
                                <meta property="twitter:image" content="https://s.pximg.net/www/images/share/pictures.jpg">
                    
            <link rel="alternate" hreflang="ja" href="https://www.pixiv.net/">
            <link rel="alternate" hreflang="en" href="https://www.pixiv.net/en/">
<meta property="og:title" content="イラストコミュニケーションサービス [pixiv]">
                                <meta property="og:type" content="website">
                                <meta property="og:description" content="pixiv(ピクシブ)は、作品の投稿・閲覧が楽しめる「イラストコミュニケーションサービス」です。幅広いジャンルの作品が投稿され、ユーザー発の企画やメーカー公認のコンテストが開催されています。">
                                <meta property="og:image" content="https://s.pximg.net/www/images/share/pictures.jpg">
                    
<meta name="application-name" content="pixiv">
<meta name="msapplication-tooltip" content="イラストコミュニケーションサービス">
<meta name="msapplication-starturl" content="https://www.pixiv.net/"><meta name="msapplication-navbutton-color" content="#0096db">
<meta name="msapplication-task" content="name=作品投稿;action-uri=https://www.pixiv.net/upload.php;icon-uri=https://s.pximg.net/www/images/ico/upload.ico">
<meta name="msapplication-task" content="name=作品管理;action-uri=https://www.pixiv.net/member_illust.php;icon-uri=https://s.pximg.net/www/images/ico/settings.ico">
<meta name="msapplication-task" content="name=ブックマーク;action-uri=https://www.pixiv.net/bookmark.php;icon-uri=https://s.pximg.net/www/images/ico/bookmarks.ico">
<meta name="msapplication-task" content="name=受信箱;action-uri=https://www.pixiv.net/msgbox.php;icon-uri=https://s.pximg.net/www/images/ico/messages.ico">
<meta name="msapplication-task" content="name=フィード;action-uri=https://www.pixiv.net/stacc/;icon-uri=https://s.pximg.net/www/images/ico/stacc.ico">

    <meta name="google" content="nositelinkssearchbox">

<title>イラスト コミュニケーションサービス[pixiv(ピクシブ)]</title>
<meta name="description" content="pixiv(ピクシブ)は、作品の投稿・閲覧が楽しめる「イラストコミュニケーションサービス」です。幅広いジャンルの作品が投稿され、ユーザー発の企画やメーカー公認のコンテストが開催されています。">

<script>
var pageLoadStartTime = +(new Date);
</script>

<script>
        console.log("%c"+"/* pixiv Bug Bounty Program */","color: #0096fa; font-weight: bold;");
    console.log("We have a bug bounty program on HackerOne. \nIf you find a vulnerability in our scope, please report it to us.");
    console.log("https://hackerone.com/pixiv");
</script>
    <link rel="canonical" href="https://www.pixiv.net/">

<link rel="apple-touch-icon" sizes="180x180" href="https://s.pximg.net/common/images/apple-touch-icon.png?20200601">
<link rel="shortcut icon" href="https://www.pixiv.net/favicon.ico">
<link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="https://s.pximg.net/www/js/build/pixiv.css~whitecube.bf67668d2a3d33ffd7fc.css" crossorigin="anonymous"><link rel="stylesheet" href="https://s.pximg.net/www/js/build/pixiv.css.93316addabaf0ec8cba7.css" crossorigin="anonymous"><script src="https://s.pximg.net/www/js/build/runtime.71e95cb8ecd37ca5b3f0.js" charset="utf8" crossorigin="anonymous"></script><script src="https://s.pximg.net/www/js/build/pixiv.css~whitecube.910d6884c821e94eae24.js" charset="utf8" crossorigin="anonymous"></script><script src="https://s.pximg.net/www/js/build/pixiv.css.9c6c7f336ccb0f44e912.js" charset="utf8" crossorigin="anonymous"></script>        <script>
    Object.defineProperty(window, 'bundle_public_path', {
        value: "https:\/\/s.pximg.net\/www\/js\/build\/"
    })
</script>
<link rel="stylesheet" href="https://s.pximg.net/www/js/build/pixiv.24d25361ec3a802a9b26.css" crossorigin="anonymous"><script src="https://s.pximg.net/www/js/build/4.27ce385881a37db52d29.js" charset="utf8" crossorigin="anonymous"></script><script src="https://s.pximg.net/www/js/build/6.bd81d46a0725334e1f61.js" charset="utf8" crossorigin="anonymous"></script><script src="https://s.pximg.net/www/js/build/pixiv.d4bb2ff11e55f4539930.js" charset="utf8" crossorigin="anonymous"></script>
<script>
    pixiv.development = false;
    pixiv.sourcePath = "https:\/\/s.pximg.net\/www\/";
    pixiv.commonSourcePath = "https:\/\/s.pximg.net\/common\/";
    pixiv.config.sketchUrlBase = "https:\/\/sketch.pixiv.net";
    pixiv.config.oneSignalAppId = "b2af994d-2a00-40ba-b1fa-684491f6760a";
    pixiv.context.token = "bea1fc0cb2a37e074692c09a0c29bc13";
    
    </script>
    <script>
        pixiv.user.loggedIn = false;
            </script>

<script type="text/javascript" src="https://a.pixiv.org/yufulight-cdn/apt.js"></script>

<script>
    var _gaq = _gaq || [];

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    _gaq.push(['_setAccount', 'UA-1830249-3']);_gaq.push(['_setDomainName', 'pixiv.net']);
    if (window.pixiv) {
        if (pixiv.user && pixiv.user.loggedIn) {
            _gaq.push(['_setCustomVar', 1, 'login', 'yes', 3]);
            _gaq.push(['_setCustomVar', 3, 'plan', pixiv.user.premium ? 'premium' : 'normal', 1]);
            _gaq.push(['_setCustomVar', 5, 'gender', pixiv.user.gender, 1]);
            _gaq.push(['_setCustomVar', 6, 'user_id', pixiv.user.id, 1]);
            _gaq.push(['_setCustomVar', 12, 'illustup_flg', pixiv.user.illustup_flg ? 'uploaded' : 'not_uploaded', 3]);
            _gaq.push(['_setCustomVar', 13, 'user_id_per_pv', pixiv.user.id, 3]);
        } else {
            _gaq.push(['_setCustomVar', 1, 'login', 'no', 3]);
        }

        _gaq.push(['_setCustomVar', 25, 'first_visit_datetime_pc', "2022-10-15 12:01:10", 3]);

        (function() {
            // クッキーあれば、一回でもログインした人とみなす
            if (pixiv.user && window.colon && colon.storage) {
                var cookie_name = 'login_ever';

                if (colon.storage.cookie(cookie_name)) {// 一度でもログインしたことある
                    _gaq.push(['_setCustomVar', 2, 'login ever', 'yes', 1]);

                } else if (pixiv.user.loggedIn) { // ログインしてる
                    colon.storage.cookie(cookie_name, 'yes', {
                        expires: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
                        domain: location.hostname
                    });
                    _gaq.push(['_setCustomVar', 2, 'login ever', 'yes', 1]);

                } else { // ログインしたこと無いし、ログインしてもない
                    _gaq.push(['_setCustomVar', 2, 'login ever', 'no', 1]);
                }

                
                var p_ab_id = colon.storage.cookie('p_ab_id');
                var p_ab_id_2 = colon.storage.cookie('p_ab_id_2');
                _gaq.push(['_setCustomVar', 9, 'p_ab_id', p_ab_id, 1]);
                _gaq.push(['_setCustomVar', 10, 'p_ab_id_2', p_ab_id_2, 1]);

                var p_ab_d_id = colon.storage.cookie('p_ab_d_id');
                _gaq.push(['_setCustomVar', 27, 'p_ab_d_id', p_ab_d_id, 3]);
            }
        } ())

        _gaq.push(['_setCustomVar', 11, 'lang', "ja", 1]);
    }
    _gaq.push(['_setCustomVar', 29, 'default_service_is_touch', 'no', 3]);
        _gaq.push(['_setSiteSpeedSampleRate', 20]);
    _gaq.push(['_trackPageview']);</script><script async src="https://www.googletagmanager.com/gtag/js?id=AW-996000095"></script><script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-996000095');
    </script><script>
    
if (window.pixiv && !pixiv.text) pixiv.text = {};


    pixiv.text.modalDefaultCaption = '他にも便利な機能がいっぱい！';

    pixiv.text.registerMypixiv = 'pixivに登録して<br>ユーザーとマイピクになろう!!!!';
    pixiv.text.loginMypixiv    = 'pixivにログインして<br>ユーザーにマイピク申請しよう!!!!';

    pixiv.text.registerFavorite = 'pixivに登録して<br>ユーザーをフォローしよう!!!!';
    pixiv.text.loginFavorite    = 'pixivにログインして<br>ユーザーをフォローしよう!!!!';

    pixiv.text.registerMessage = 'pixivに登録して<br>ユーザーにメッセージを送ろう!!!!';
    pixiv.text.loginMessage    = 'pixivにログインして<br>ユーザーにメッセージを送ろう!!!!';

    pixiv.text.registerImage = 'pixivに登録すると<br>さらに大きな画像で閲覧できる!!!!';

    pixiv.text.registerBookmark = 'pixivに登録して<br>気に入った作品をブックマークに追加しよう!!!!';
    pixiv.text.loginBookmark    = 'pixivにログインして<br>気に入った作品をブックマークに追加しよう!!!!';

    pixiv.text.registerRate = 'pixivに登録して<br>気に入った作品をいいね！しよう!!!!';
    pixiv.text.loginRate    = 'pixivにログインして<br>気に入った作品にいいね！を送ろう!!!!';

    pixiv.text.overaccess = 'もっと見るならpixivの会員になってさらに快適に!!!';
    pixiv.text.overaccessCaption = '大きな画像で閲覧できたり、お気に入り作品をブックマーク!!';

    pixiv.text.visit = 'まずは無料登録！<br>pixivに登録して、<br>お絵かきをもっと楽しもう!!!!';
</script>



        <link rel="stylesheet" href="https://s.pximg.net/www/js/build/whitecube.0087ffdacc8e11cc913e.css" crossorigin="anonymous"><script src="https://s.pximg.net/www/js/build/whitecube.fc9cedc8f6aa57c335d9.js" charset="utf8" crossorigin="anonymous"></script><link rel="stylesheet" href="https://s.pximg.net/www/css/novel.css?e33e02939027a17c33dcf867633e3485">    <link rel="stylesheet" type="text/css" href="https://s.pximg.net/www/css/accounts-index.css?1d40acc9331b396ab0dbf9ad6052cdc7">

        <script>pixiv.context.backgroundSlideshow = true</script>
    <script src="https://s.pximg.net/common/background-slideshow/bundle.js?00bc2795c568847413d3"></script>

    
</head>
<body class="not-logged-in">

<div class="_gdpr-notify-header"><p class="content">pixivは2022年7月28日付けで<a href="https://policies.pixiv.net/index.html#privacy" class="detail" target="_blank" rel="noopener">プライバシーポリシー</a>を改定しました&nbsp;&nbsp;<a href="/info.php?id=8295" class="detail" target="_blank" rel="noopener">詳しいお知らせを見る</a></p><button type="button" class="notify-button agree js-gdpr-notify-agree-button">OK</button></div>



<div id="ui-tooltip-container" class="_hidden">
    <div class="wrapper">
        <div class="content"></div>
        <div class="nipple"></div>
    </div>
</div>

<script>
pixiv.text.today = '本日';
pixiv.text.yesterday = '昨日';
pixiv.text.notifications = 'メッセージ・ポップボード';

pixiv.text.dailyRanking = 'デイリーランキング';
pixiv.text.weeklyRanking = 'ウィークリーランキング';
pixiv.text.monthlyRanking = 'マンスリーランキング';
pixiv.text.rookieRanking = 'ルーキーランキング';
pixiv.text.daily_r18Ranking = 'R-18 デイリーランキング';
pixiv.text.r18gRanking = 'R-18G ランキング';
pixiv.text.maleRanking = '男子に人気ランキング';
pixiv.text.femaleRanking = '女子に人気ランキング';
</script>

        
<div id="wrapper">
    <noscript>
        <div style="background-color:#F2F4F6;text-align:center;margin-bottom:10px;padding:5px;">
            <p style="color:#ff0000;">ウェブブラウザのJavaScript(ジャバスクリプト)の設定が無効になっています。<br>Javascriptが無効になっていると、サイト内の一部機能がご利用いただけません。</p>
        </div>
    </noscript>

    <div id="background-slideshow"></div><div id='search-bar'></div><div class="signup-form"><div class="signup-form__logo-box"><div class="signup-form__logo"></div><div class="signup-form__catchphrase">創作活動をもっとたのしく</div></div><div><a href="/signup.php?ref=wwwtop_accounts_index" class="signup-form__submit js-click-trackable" data-click-category="signup_pc_page" data-click-action="step1" data-click-label="mail">アカウントを作成</a><a href="/login.php?ref=wwwtop_accounts_index" class="signup-form__submit--login">ログイン</a></div><div class="signup-form__sns-btn-area"><div class="signup-form__sns-btn-area index"><div>持っているアカウントではじめる</div><div class="sns-button-list"><form method="POST" action="https://accounts.pixiv.net/pigya/start" class="sns-login-form"><input type="hidden" name="tt" value="bea1fc0cb2a37e074692c09a0c29bc13"><input type="hidden" name="mode" value="signin"><input type="hidden" name="provider" value="apple"><input type="hidden" name="lang" value="ja"><input type="hidden" name="source" value="pc"><input type="hidden" name="view_type" value="page"><button type="submit"class="btn-item js-click-trackable compact index btn-apple"data-category="signup_page_pc"data-action="step1"data-label="apple">Appleで続ける</button></form><form method="POST" action="https://accounts.pixiv.net/pigya/start" class="sns-login-form"><input type="hidden" name="tt" value="bea1fc0cb2a37e074692c09a0c29bc13"><input type="hidden" name="mode" value="signin"><input type="hidden" name="provider" value="twitter"><input type="hidden" name="lang" value="ja"><input type="hidden" name="source" value="pc"><input type="hidden" name="view_type" value="page"><button type="submit"class="btn-item js-click-trackable compact index btn-twitter"data-category="signup_page_pc"data-action="step1"data-label="twitter">Twitterで続ける</button></form><form method="POST" action="https://accounts.pixiv.net/pigya/start" class="sns-login-form"><input type="hidden" name="tt" value="bea1fc0cb2a37e074692c09a0c29bc13"><input type="hidden" name="mode" value="signin"><input type="hidden" name="provider" value="googleplus"><input type="hidden" name="lang" value="ja"><input type="hidden" name="source" value="pc"><input type="hidden" name="view_type" value="page"><button type="submit"class="btn-item js-click-trackable compact index btn-gplus"data-category="signup_page_pc"data-action="step1"data-label="googleplus">Googleで続ける</button></form><form method="POST" action="https://accounts.pixiv.net/pigya/start" class="sns-login-form"><input type="hidden" name="tt" value="bea1fc0cb2a37e074692c09a0c29bc13"><input type="hidden" name="mode" value="signin"><input type="hidden" name="provider" value="facebook"><input type="hidden" name="lang" value="ja"><input type="hidden" name="source" value="pc"><input type="hidden" name="view_type" value="page"><button type="submit"class="btn-item js-click-trackable compact index btn-facebook"data-category="signup_page_pc"data-action="step1"data-label="facebook">Facebookで続ける</button></form></div></div></div><div class="recaptcha-terms">
    This site is protected by reCAPTCHA Enterprise and the Google
    <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
    <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
</div></div><div id="footer"><div class="_footer-container"><div class="_footer-content"><div class="_footer-content-item"><span class="_icon-text">pixivについて</span><i class="_pico-12 _icon-menu"></i><div class="content-popup about"><img src="https://s.pximg.net/www/images/beta/pixiv_logo.png" class="footer-pixiv-logo"><span class="footer-pixiv-motto-desc">pixiv(ピクシブ)は、イラストの投稿・閲覧が楽しめる「イラストコミュニケーションサービス」です。幅広いジャンルの作品が投稿され、ユーザー発の企画やメーカー公認のコンテストが開催されています。</span><div></div><dl class="links"><dt>サービス</dt><dd><ul><li><a href="https://comic.pixiv.net/" target="_blank">pixivコミック</a></li><li><a href="https://novel.pixiv.net/" target="_blank">pixivノベル</a></li><li><a href="https://factory.pixiv.net/" target="_blank">pixivFACTORY</a><a href="https://factory.pixiv.net/books" target="_blank">BOOKS</a></li><li><a href="https://www.fanbox.cc/" target="_blank" rel='noopener'>pixivFANBOX</a></li><li><a href="https://booth.pm" target="_blank">BOOTH</a></li><li><a href="https://booth.pm/apollo/" target="_blank">APOLLO</a></li><li><a href="https://www.pixivision.net/ja/" target="_blank">pixivision</a></li><li><a href="https://sketch.pixiv.net/" target="_blank">pixiv Sketch</a></li><li><a href="https://sensei.pixiv.net/" target="_blank">sensei</a></li><li><a href="https://dic.pixiv.net/?utm_source=pixiv&amp;utm_medium=referral&amp;utm_campaign=prelogin_footer" target="_blank" rel="noopener">ピクシブ百科事典</a></li><li><a href="https://studio.vroid.com/" target="_blank">VRoid Studio</a></li><li><a href="https://hub.vroid.com/" target="_blank">VRoid Hub</a></li></ul></dd></dl><dl class="links"><dt>ご利用について</dt><dd><ul><li><a href="https://www.pixiv.net/terms.php">利用規約</a></li><li><a href="https://www.pixiv.net/guideline.php">ガイドライン</a></li><li><a href="https://www.pixiv.net/privacy.php">プライバシーポリシー</a></li><li><a href="https://www.pixiv.net/support">お問い合わせ</a></li><li><a href="https://www.pixiv.help/hc/?utm_campaign=accounts_index&amp;utm_medium=help_link&amp;utm_source=www_pixiv" target="_blank" rel='noopener'>ヘルプ</a></li></ul></dd></dl><dl class="links"><dt>お知らせ</dt><dd><ul><li><a href="/info.php">お知らせ</a></li><li><a href="https://inside.pixiv.blog/" target="_blank">pixiv inside</a></li><li><a href="https://twitter.com/pixiv" target="_blank">Twitter</a></li><li><a href="https://www.facebook.com/pixiv" target="_blank">Facebook</a></li><li><a href="https://plus.google.com/+pixiv" target="_blank" rel="publisher">Google+</a></li><li><a href="https://www.instagram.com/pixiv/" target="_blank">Instagram</a></li><li><a href="https://www.plurk.com/pixiv_tw" target="_blank">Plurk</a></li><li><a href="https://www.weibo.com/pixivcn" target="_blank">weibo</a></li></ul></dd></dl><dl class="links"><dt>広告</dt><dd><ul><li><a href="https://www.pixiv.net/ads">広告掲載</a></li><li><a href="https://www.pixiv.net/ads">公式イラストコンテスト</a></li><li><a href="https://www.pixiv.net/ads">広告資料ダウンロード</a></li></ul></dd></dl><dl class="links"><dt>会社情報</dt><dd><ul><li><a href="https://www.pixiv.co.jp/" target="_blank">運営会社</a></li><li><a href="https://recruit.jobcan.jp/pixiv" target="_blank" class="js-click-trackable" data-click-category="recruit" data-click-action="From_Footer" data-click-label="">採用情報</a></li></ul></dd></dl><div class="footer-pixiv-c">© pixiv</div></div></div><div class="_footer-content-item"><span class="_icon-text">日本語</span><i class="_pico-12 _icon-menu"></i><ul class="content-popup language"><li class="item ja current"><i class="_pico-12 _icon-check"></i><span class="_icon-text">日本語</span></li><li class="item en "><form name="seten" method="GET" action="/"><input type="hidden" name="lang" value="en"><input type="hidden" name="return_to" value=""><input class="button" type="submit" value="English"></form></li><li class="item ko "><form name="setko" method="GET" action="/"><input type="hidden" name="lang" value="ko"><input type="hidden" name="return_to" value=""><input class="button" type="submit" value="한국어"></form></li><li class="item zh "><form name="setzh" method="GET" action="/"><input type="hidden" name="lang" value="zh"><input type="hidden" name="return_to" value=""><input class="button" type="submit" value="简体中文"></form></li><li class="item zh_tw "><form name="setzh_tw" method="GET" action="/"><input type="hidden" name="lang" value="zh_tw"><input type="hidden" name="return_to" value=""><input class="button" type="submit" value="繁體中文"></form></li></ul></div></div></div></div><input type="hidden" id="init-config" 
 </div>
<script>'use strict';var dataLayer = [{login: 'no',gender: "",user_id: "",lang: "ja",illustup_flg: 'not_uploaded',premium: 'no',default_service_is_touch: 'no',}];</script>
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-55FG"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-55FG');</script>
<!-- End Google Tag Manager -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-75BBYNYN9J"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
    let event_params = {};
    let user_properties = {};
    if (window.pixiv) {
        if (pixiv.user && pixiv.user.loggedIn) {
            event_params['login'] = 'yes';
            user_properties['plan'] =  pixiv.user.premium ? 'premium' : 'normal';
            user_properties['gender'] = pixiv.user.gender;
            user_properties['user_id'] = pixiv.user.id;
            user_properties['illustup_flg'] = pixiv.user.illustup_flg ? 'uploaded' : 'not_uploaded';
        } else {
            event_params['login'] = 'no';
        }

    event_params['first_visit_datetime_pc'] = "2022-10-15 12:01:10";
        (function() {
            // クッキーあれば、一回でもログインした人とみなす
            if (pixiv.user && window.colon && colon.storage) {
                var cookie_name = 'login_ever';

                if (colon.storage.cookie(cookie_name)) {// 一度でもログインしたことある
                    event_params['login ever'] = 'yes'

                } else if (pixiv.user.loggedIn) { // ログインしてる
                    colon.storage.cookie(cookie_name, 'yes', {
                        expires: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
                        domain: location.hostname
                    });
                    event_params['login ever'] = 'yes';
                } else { // ログインしたこと無いし、ログインしてもない
                    event_params['login ever'] = 'no';
                }

                
                var p_ab_id = colon.storage.cookie('p_ab_id');
                var p_ab_id_2 = colon.storage.cookie('p_ab_id_2');
                event_params['p_ab_id'] = p_ab_id;
                event_params['p_ab_id_2'] = p_ab_id_2;

                var p_ab_d_id = colon.storage.cookie('p_ab_d_id');
                event_params['p_ab_d_id'] = p_ab_d_id;
            }
        } ())

        event_params['lang'] = "ja";
    }
    event_params['default_service_is_touch'] = 'no';gtag('set', 'user_properties', {...user_properties});gtag('config', 'G-75BBYNYN9J', {...event_params});</script>
<script id="capybara-status-check" data-t-code="0ec06063442619c76e42d6ebed9fa6dd" data-m-code="5276059c3a4531f3da239d1ea8771242"></script>

<script>(function(){var js = "window['__CF$cv$params']={r:'75a54f021d0c2388',m:'nyHEtYKFGCfVRzxNNFe_GBHdIo_uQHzxpKkdr4ULzOI-1665802870-0-AQ3Of3SEorU3ByBcHgzvZL+fMDFbTPajFdm8B+VsvyyxmnH+APyzMmmm7lo2e/W2M6AOehyGXXMkFAN1S+T25xmXyiwIoiY8q9j9ugU6um4PZH2U94eONfDwXC9sf7SCNw==',s:[0x74d486421f,0xc9099191c4],u:'/cdn-cgi/challenge-platform/h/g'};var now=Date.now()/1000,offset=14400,ts=''+(Math.floor(now)-Math.floor(now%offset)),_cpo=document.createElement('script');_cpo.nonce='',_cpo.src='/cdn-cgi/challenge-platform/h/g/scripts/alpha/invisible.js?ts='+ts,document.getElementsByTagName('head')[0].appendChild(_cpo);";var _0xh = document.createElement('iframe');_0xh.height = 1;_0xh.width = 1;_0xh.style.position = 'absolute';_0xh.style.top = 0;_0xh.style.left = 0;_0xh.style.border = 'none';_0xh.style.visibility = 'hidden';document.body.appendChild(_0xh);function handler() {var _0xi = _0xh.contentDocument || _0xh.contentWindow.document;if (_0xi) {var _0xj = _0xi.createElement('script');_0xj.nonce = '';_0xj.innerHTML = js;_0xi.getElementsByTagName('head')[0].appendChild(_0xj);}}if (document.readyState !== 'loading') {handler();} else if (window.addEventListener) {document.addEventListener('DOMContentLoaded', handler);} else {var prev = document.onreadystatechange || function () {};document.onreadystatechange = function (e) {prev(e);if (document.readyState !== 'loading') {document.onreadystatechange = prev;handler();}};}})();</script></body>
</html>
`
## 请求数据的头部信息
print(web_data.request.headers)
{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
## 服务器响应头的信息
print(web_data.headers)
{'Date': 'Sat, 15 Oct 2022 03:15:46 GMT', 'Content-Type': 'text/html; charset=UTF-8', 'Transfer-Encoding': 'chunked', 'Connection': 'keep-alive', 'vary': 'User-Agent,Accept-Encoding', 'x-host-time': '33', 'x-xss-protection': '1; mode=block', 'set-cookie': 'first_visit_datetime_pc=2022-10-15+12%3A15%3A46; expires=Mon, 14-Oct-2024 03:15:46 GMT; Max-Age=63072000; path=/; secure, PHPSESSID=nsd4h1u5061caracdgfin1bsuaaor54l; expires=Sat, 15-Oct-2022 04:15:46 GMT; Max-Age=3600; path=/; domain=.pixiv.net; secure; HttpOnly, p_ab_id=6; expires=Thu, 14-Oct-2027 03:15:46 GMT; Max-Age=157680000; path=/; domain=.pixiv.net; secure, p_ab_id_2=9; expires=Thu, 14-Oct-2027 03:15:46 GMT; Max-Age=157680000; path=/; domain=.pixiv.net; secure, p_ab_d_id=2065644529; expires=Thu, 14-Oct-2027 03:15:46 GMT; Max-Age=157680000; path=/; domain=.pixiv.net; secure, yuid_b=QWcoQ2U; expires=Mon, 14-Oct-2024 03:15:46 GMT; Max-Age=63072000; path=/; secure, __cf_bm=PzxbGZZUpkkzdK6K2Bab8kQUo.7mSshHFRp6suh9Mvg-1665803746-0-AWQS8UVBpux/wQzRf2AY1WxeJkWSBKFM4uf7azWGMOSv5XpbKrEYviP4hXNyPnGIx+PbAt6UmepXQUIoPCh0eX6c3YxZI5fCv8IguXAp/Qlz; path=/; expires=Sat, 15-Oct-22 03:45:46 GMT; domain=.pixiv.net; HttpOnly; Secure; SameSite=None', 'expires': 'Thu, 19 Nov 1981 08:52:00 GMT', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'pragma': 'no-cache', 'strict-transport-security': 'max-age=31536000', 'x-frame-options': 'SAMEORIGIN', 'CF-Cache-Status': 'DYNAMIC', 'Server': 'cloudflare', 'CF-RAY': '75a56465bb76b470-HKG', 'Content-Encoding': 'gzip', 'alt-svc': 'h3=":443"; ma=86400, h3-29=":443"; ma=86400'}
print(web_data.text == web_data.content.decode('utf-8'))
`True`
print(type(web_data))
`<class 'requests.models.Response'>`
```

#### 	封桢

```python
r = requests.get("https://www.hdu.edu.cn/news/important_26525")
## 转化为json格式
print(r.json())
```

#### 	HTTP 方法

```python
r = requests.get("http://httpbin.org/get",params={
    'name': '张三',
    'password': '123'
})
print(r.headers)
{'Connection': 'close', 'Content-Length': '391', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Date': 'Sat, 15 Oct 2022 03:46:31 GMT', 'Server': 'gunicorn/19.9.0'}
print(r.text)
{
  "args": {
    "name": "\u5f20\u4e09", 
    "password": "123"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.28.1", 
    "X-Amzn-Trace-Id": "Root=1-634a2d2b-62ea996816394b693d5d8d6c"
  }, 
  "origin": "43.243.192.46", 
  "url": "http://httpbin.org/get?name=\u5f20\u4e09&password=123"
}
### post 方法一般用于表单的提交不会显示在url上
r = requests.post("http://httpbin.org/post",
                  data={
                      'name':'test',
                      'password':'123'
                  })
print(r.text)
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "test", 
    "password": "123"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Content-Length": "22", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "python-requests/2.28.1", 
    "X-Amzn-Trace-Id": "Root=1-634a2dd0-304dcad52679030a4e6bef82"
  }, 
  "json": null, 
  "origin": "43.243.192.46", 
  "url": "http://httpbin.org/post"
}
print(r.request.body)
name=test&password=123
```

#### 	Session

```python
## 创建一个Session对象
s = requests.Session()
r = s.get('http://httpbin.org/cookies/set/test/123456') #类似与request请求，多了可以提交的信息
## 没什么用的请求头部，没有附加信息
print(s.headers)
{'User-Agent': 'python-requests/2.28.1', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
print(r.headers)
{'Connection': 'close', 'Content-Length': '44', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Date': 'Sat, 15 Oct 2022 04:02:20 GMT', 'Server': 'gunicorn/19.9.0'}
print(r.history)
[<Response [302]>]
print(r.request.headers)
{'User-Agent': 'python-requests/2.28.1', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': 'test=123456'}
print(r.history[0].headers)
print(r.history[0].text)
{'Connection': 'close', 'Content-Length': '223', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html; charset=utf-8', 'Date': 'Sat, 15 Oct 2022 04:07:48 GMT', 'Location': '/cookies', 'Server': 'gunicorn/19.9.0', 'Set-Cookie': 'test=123456; Path=/'}
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>Redirecting...</title>
<h1>Redirecting...</h1>
<p>You should be redirected automatically to target URL: <a href="/cookies">/cookies</a>.  If not click the link.
## 用session对象发出另外一个get请求，获取cookies
r = s.get("http://httpbin.org/cookies")
print(r.request.headers)
{'User-Agent': 'python-requests/2.28.1', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive'}
print(r.cookies.items())
[]
## 更新客户端请求头中的选项配置
s.headers.update({
    'Accept-language': 'en-Us,en;q=0.8',
    'test': '123',
})
r = s.get("http://httpbin.org/headers")
print(r.text)
{
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate", 
    "Accept-Language": "en-Us,en;q=0.8", 
    "Host": "httpbin.org", 
    "Test": "123", 
    "User-Agent": "python-requests/2.28.1", 
    "X-Amzn-Trace-Id": "Root=1-634a3aff-62d12b7855f4943539cfd99f"
  }
}
```

#### HTTP 认证	

```python
r = requests.get('http://httpbin.org/basic-auth/test/123456')
print(r.status_code,r.headers)
401 {'Connection': 'close', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Date': 'Sat, 15 Oct 2022 05:03:57 GMT', 'Server': 'gunicorn/19.9.0', 'Www-Authenticate': 'Basic realm="Fake Realm"', 'Content-Length': '0'}
import base64
print(base64.b64decode('dGVzdDoxMjM0NTY=').decode())
test:123456
sess = requests.Session()
auth = base64.b64encode(b'test:123456').decode('ascii')
print(auth)
dGVzdDoxMjM0NTY=
sess.headers.update({'Authorization':'Basic' + auth})
print(sess.headers)
{'User-Agent': 'python-requests/2.28.1', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Authorization': 'BasicdGVzdDoxMjM0NTY='}
```

#### xpath 语法

```python
from lxml import etree
r = requests.get("http://www.hdu.edu.cn/news/important_26525")
# print(r.text)
hpage = etree.HTML(r.text)
# print(type(hpage))
ele_list = hpage.xpath('//li')
# print(ele_list)
# print(etree.tostring(ele_list[10],encoding='utf-8'))
# print(html.unescape(etree.tostring(ele_list[10]).decode('utf-8')))
ele_list = hpage.xpath('//li[@data-id]')
# print(ele_list)
# print(html.unescape(etree.tostring(ele_list[0]).decode('utf8')))
# print(ele_list[0].xpath("div[2]/text()"))
# print(ele_list[0].xpath("div[@class='con']/text()"))
# print(ele_list[0][1].text)
myarr = [child.tag for child in ele_list[0]]
# print(myarr)
myarrtext = [child.text for child in ele_list[0]]
# print(myarrtext)
# for ele in ele_list:
#     print(ele[2].text,'---->',ele[1].text)
content  = hpage.xpath("/html/body/div[1]/div[2]/div[3]/div[2]/div[1]")
# print(content[0].text)
content = hpage.xpath("//div[@class='article']")
# print(content)
content = content[0].xpath("div[@class='con']")
# print(etree.tostring(content[0]))
# print(html.unescape(etree.tostring(content[0]).decode('utf-8')))
from IPython.display import HTML
htmltext = html.unescape(etree.tostring(content[0]).decode('utf8'))
htmltext = htmltext.replace('/uploads', 'http://www.hdu.edu.cn/uploads')
print(HTML(htmltext).data)
```

