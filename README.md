# nodeadmin
基于Node.js实现的后台管理系统

### 简介

本文涉及到 fi3 和 vuejs，用于演示用法。

所有的源代码都放入到 `src` 目录下，编译之后则放入到 `dist` (使用 `fis3 release -d dist` 命令)

子组件名字必须包含一个中横线，否则无效，原因未知。例如 `<index-test1></index-test1>`，如果不包含中横线，则需要这样写才行： `<div v-component="indextest1"></div>`。 注意，这个是在0.11.10，更换到1.xx版本就没影响了

子组件中的data值必须定义为函数方式返回数据。超链接组件

> 注意版本啊！！我就被坑过，看着1.x的api，却用着0.x的库，结果很多例子跑不通。

支持 `___`使得自动能够生成唯一的样式

 
### DEMO使用

#### 命令

```bash
#安装fis3
npm install -g fis3

#安装模块化插件,fis3支持本地插件
npm install [-g] fis3-hook-module
npm install [-g] fis3-postpackager-loader

#编译预览
fis3 release
fis3 server start --type node

```

### FIS3结合

FIS基础的压缩、打包、md5、加cdn域名、csssprite、文件监听、自动刷新、本地调试等当然不在话下，以下主要描述与VueJS直接相关的一些结合。

#### 目录结构

开发目录结构如下所示：

```
project
  ├─ component_modules   (社区模块)  
  ├─ components    (工程模块)
  │  ├─ directive  (指令)
  │  │  └─ more
  │  ├─ filter     (过滤器)
  │  │  └─ more
  │  ├─ component  (组件)
  │  │  ├─ header
  │  │  └─ footer
  │  └─ page       (页面)
  │     ├─ article
  │     └─ home
  ├─ static    (非业务相关资源)
  │  ├─ css  
  │  ├─ fonts  
  │  ├─ images  
  │  ├─ js
  ├─ fis-conf.js    (fis编译配置)
  ...
```
通过FIS您可以轻松定制自己的开发目录，灵活适配各种框架的目录特点，提升可维护性。同时能按照不同的部署要求添加一个或多个部署配置。

#### 模板内嵌

VueJS组件开发过程中可以通过`__inline`轻松将模板内容编译到js中，提升可维护性。

```javascript
module.exports = Vue.component("c-list", {
    template: __inline('list.html')
})
```

#### 异构语言编译

less、sass、jade等等异构语言的编译都有相应的支持，如本项目中sass的编译配置：

```javascript
//sass的编译
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('sass', {
        //fis-parser-sass option
    })
});
```
您可以查看fis文档或在npm中搜索相应的插件。

#### 模块化开发
 
 - 组件拆分
   
   组件拆分是模块化基本要素，VueJS本身就是推荐由组件来组织页面，如component中的各个组件。

 - 依赖分析
   
   资源中存在依赖关系，本项目使用了fis的modjs模块化方案，您可以像开发nodejs一样直接写require便能自动完成依赖分析和资源加载。

 - 静态资源表
   
   如果您想了解资源加载细节，推荐您了解FIS静态资源表机制，您可以看到生成的页面中已经有资源配置。更多细节请查看FIS官网文章。



### 相关链接

 - [fis-vuejs-seed](https://github.com/zhangtao07/fis-vuejs-seed)



## thinkjs 的命令
### install dependencies

```
npm install
```

### start server

```
npm start
```

### deploy with pm2

use pm2 to deploy app on production envrioment.

```
pm2 startOrReload pm2.json
```