---
title: 前端打包工具
date: 2023-01-10 17:03:22
tags: Webpack.Vite
description: 学习前端打包工具webpack 和 vite 的学习记录
cover: https://cdn.staticaly.com/gh/apprehen/pciture@master/102840030_1.1w4upuv6qmsg.webp
---

# 构建工具

- 浏览器不能使用模块化规范(兼容性) 和 使用模块化规范也会面临模块过多时的加载问题
- 希望有工具可以对代码进行打包，将多个模块打包成一个文件
- 构建工具起这样的工作,通过构建工具可以将使用的ESM规范编写的代码转换成旧的JS语法,这样可以使得所有的浏览器都可以支持代码

# Webpack

使用步骤：
	1.初始化项目 `yarn init -y`
	2.安装依赖`webpack` `webpack-cli`

```powershell
yarn add -D webpack webpack-cli
```

​	3.在项目中创建`src` 目录，然后编写代码(index.js)
​	4.执行 `yarn webpack` 来对代码进行打包 (打包后观察 dist 目录)
配置文件（webpack.config.js）
​	

```javascript
const path = require('path')
module.exports = {
  mode: "production", // 设置打包模式 production 生产模式 development 开发模式
  //entry: "./src/index.js", // 用来指定打包的主文件, 默认为: ./src/index.js
  // entry: ["./src/a.js", "./src/b.js"]
  // entry: {
  //   hello: "./src/a.js",
  //   b: "./src/b.js"
  // }
  output: {
    path: path.resolve(__dirname, "dist"), // 指定打包的目录,必须要绝对路径
    filename: 'main.js', // 打包后的文件夹
    //clean: true, // 自动清理打包目录
  },
  /*
    webpack 默认情况下，只会处理js文件，如果我们希望它可以处理其他类型的文件,则需要引入loader

    以CSS 为例子:
      - 使用css-loader 可以处理js中的样式
      - 使用步骤：
          1.安装: yarn add css-loader -D
          2.配置: 
          module: {
            rules: [
              {test: /\.css$/i, use: "css-loader"}
            ]
          }
  */
  module: {
    rules: [
      {test: /\.css$/i, use: ["style-loader","css-loader"]},
      {test: /\.(jpg|png|gif|svg)$/i, type: "asset/resource"} // 图片资源类型的数据,可以通过指定type来处理
    ]
  }
}
```

在编写js代码时，经常需要使用一些js中的新特性(箭头函数，解构赋值),而新特性在旧的浏览器中兼容性并不好,此时旧导致我们无法使用一些新的特性
我们可以通过一些工具使用新特性编写代码，将新代码转换为旧代码
`babel` 就是这样的一个工具,可以将新的js语法转换为旧的js，以提高代码的兼容性
我们如果希望在webpack支持babel，则需要向webpack中引入babel的loader

**使用步骤**

1.`npm install -D babel-loader @babel/core @babel/preset-env`
2.配置项

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

3.在package.json中设置兼容性

```json
"browserslist": [
    "defaults"
]
```

插件(plugin)

- 插件用来为webpack来扩展功能

- html-webpack-plugin

  - 这个插件可以在打包代码后,自动打包目录生成html页面

  - 使用步骤

    1. 安装依赖 `yarn add -D html-webpack-plugin`

    2. 引入配置

       ```javascript
       const HTMLPlugin = require("html-webpack-plugin")
       plugins: [
           new HTMLPlugin({
             title: 'suki',
             template: "./src/index.html"
           })
         ]
       ```

       

开发服务器（webpack-dev-server）

安装
	`yarn add -D webpack-dev-server` （可以将本地的html当成localhost:8080访问）

启动
	`yarn webpack serve --open`

配置源码的映射
	`devtool: "inline-source-map"`

# Vite

Vite 也是前端的构建工具

相较于webpack，vite采用了不同的运行方式
	1.开发时，并不对代码打包，而是直接采用ESM的方式来运行项目
	2.在项目部署时，在对项目进行打包

除了速度外，vite使用起来也更加方便

基本使用:
	1.安装开发依赖 vite
	2.vite的源码目录就是项目根目录
	3.开发命令:
		vite 启动开发服务器
		vite build 打包代码
		vite preview 预览打包后的代码

使用命令构建

```bash
npm create vite@laster
yarn create vite
```

配置文件: `vite-config.js`

格式：

```javascript
import { defineConfig } from "vite";
import legacy from '@vitejs/plugin-legacy'
export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults","ie 11"]
    })
  ]
})
```

