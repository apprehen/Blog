---
title: Live2D
description: 介绍一下我的博客的live2d是怎么加载放置的
categories: 技术
tags:
  - 渲染
  - live2d
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/1686118323025.4ykfp44femo0.webp
abbrlink: c1f359fb
date: 2023-06-08 10:37:53
---

**在博客上面自定义你的live2d ！！**

纯属个人的方案 如果有更好的方案欢迎大佬教教我！！

1. 首先准备好你直接的json文件 (既是live2d的一些配置文件) 如果没有准备也没关系 下面这个库有很多live2d模型
   [live2d模型](https://github.com/Eikanya/Live2d-model)

2. 导入 live2d 模型在网页上 这里使用了pixi-live2d-display
   [官方地址](https://github.com/guansss/pixi-live2d-display/blob/master/README.zh.md)

3. 在/根目录/source/js 中编写一个自己的js文件 这边我的地址是 根目录/source/js/live2dpochi/poqi.js

   ```js
   // 改成你自己的live2d源文件的路径 (可以和js文件放在一起)
   let cubism4Model = window.location.href + "js/live2dpochi/character/model.json";
   // if (window.screen.width > 1000) {
   (async function main() {
     const body = document.querySelector('body')
     body.insertAdjacentHTML('beforeend', '<div id="live2d-wripe" style="background-color: transparent"><canvas id="canvas" style="background-color: transparent"><canvas></div>')
     const app = new PIXI.Application({
       view: document.getElementById("canvas"),
       autoStart: true,
       resolution: window.devicePixelRatio || 1,
       antialias: true,
       transparent: true
     });
     const wriper = document.getElementById("live2d-wripe");
     app.renderer.autoResize = true;
     app.renderer.resize(wriper.clientWidth, wriper.clientWidth);
     const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);
     app.stage.addChild(model4);
     app.stage.width = wriper.clientWidth;
     app.stage.height = wriper.clientWidth;
     model4.scale.set(1.0);
     // 一些情感触发条件 没有可以不用写
     model4.on('hit', async (hitAreas) => {
       console.log(hitAreas)
       if (hitAreas.length == 1) {
         if (hitAreas[0] == '脑袋') {
           model4.motion('Tap摸头')
         } else if (hitAreas[0] == '身体') {
           model4.motion('Tap身体')
         } else if (hitAreas[0] == '辫子') {
           model4.motion('Tap摇头')
         } else {
           model4.motion('Idle')
         }
       } else {
         let random = Math.floor(Math.random() * hitAreas.length)
         let hitArea = hitAreas[random]
         console.log(hitArea)
         if (hitArea === '脑袋') {
           model4.motion('Tap摸头')
         } else if (hitArea === '身体') {
           model4.motion('Tap身体')
         }
       }
     })
   })();
   ```

   具体的一些参数可以阅读官方文档这里我就不再说明

4. 导入相关的js文件和为live2d-wrapper 写相关样式

   ```yaml
   inject:
     head:
       - <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
       # 自定义CSS
       - <link rel="stylesheet" href="/css/Right.css">
       - <link rel="stylesheet" href="/css/custom.css">
     bottom:
     # 自定义js文件
       # 波奇酱 下面为新添加的js文件
       - <script async src="//cdn.bootcss.com/pace/1.0.2/pace.min.js"></script>
       - <script src="/js/yueyun.js"></script>
       - <script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
       - <script src="https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js"></script>
       - <script src="https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js"></script>
       # - <script src="/js/live2dpochi/live2dJS/new.min.js"></script>
       - <script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"></script>  
       - <script src="/js/live2dpochi/poqi.js" defer></script>
   ```

   再custom.css中编写想要的样式大小

   ```css
   /* live2d样式 */
   #live2d-wripe {
     position: fixed;
     left: 0;
     bottom: 0;
     z-index: 9999;
     width: 10%;
     /* height: 100px; */
     background-color: transparent !important;
   }
   
   #canvas {
     background-color: transparent !important;
   }
   ```

   这样就大工告成辣！！

   下面是我的博客的路径演示、

   ![](https://cdn.staticaly.com/gh/apprehen/pciture@master/image.2cunyd5b8la8.webp)