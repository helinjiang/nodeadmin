# NodeAdmin
基于Node.js实现的后台管理系统

## 简介

NodeAdmin后台管理系统的技术架构为：前端页面使用了 [Vue.js](http://vuejs.org/)，后台框架使用了 [Think.js](https://thinkjs.org/)，数据库采用了 [MySQL](https://www.mysql.com/)，构建使用了 [FIS3](http://fis.baidu.com/fis3/index.html)，

由于 Vue.js 不支持 IE8 及其以下版本，因此，建议使用 [Chrome](http://www.google.cn/chrome/browser/desktop/index.html) 浏览器进行体验。

本系统仅作为研究技术之用，您可以自由的在此基础上进行修改和传播。但若要用在生产环境，请自行评估相应风险。


## 体验
使用了 fis3 构建，因此需要安装 fis3 ，还要启动构建。

```bash
# 安装fis3
npm install -g fis3

# 安装模块化插件,fis3支持本地插件
npm install [-g] fis3-hook-module
npm install [-g] fis3-postpackager-loader

# 开发场景下编译
fis3 release -w dev

# 发布场景下编译
fis3 release dist
```

构建完成之后，再启动node服务。

```bash
# install dependencies
npm install

# start server
npm start

# deploy with pm2，生成环境时使用pm2启动服务
pm2 startOrReload pm2.json
```

由于涉及到了 MySQL，因此还需要自行新建数据库，导入 `/db/nodeadmin.sql` 文件。同时，在 `/src/common/config/db.js` 中修改数据库配置。


## 代码实现
### fis3
本项目使用了 [FIS3](http://fis.baidu.com/fis3/index.html) 构建，通过FIS您可以轻松定制自己的开发目录，灵活适配各种框架的目录特点，提升可维护性。同时能按照不同的部署要求添加一个或多个部署配置，并且它提供的基础的压缩、打包、md5、加cdn域名、csssprite、文件监听、自动刷新、本地调试等功能，都非常好用。

所有前端页面的源码位于 `clientsrc` 目录下，通过 fis3 构建，静态文件会构建到 `/www/static/` 目录下，而 page 的 html 文件则构建到了 `/view/admin/` 目录下了。

但限于研究不足，本项目中的构建并不是最优的，只能够算将就可用。另外，fis3 合并css文件时，无法定义合并的顺序（至少我没找到方法），因此可以看到项目中的一部分css还未合并。

### Vue.js
本项目中的 vue 组件写法，依赖于 fis3 的构建，例如可以通过`__inline`轻松将模板内容编译到js中，提升可维护性。

```javascript
module.exports = Vue.component("c-list", {
    template: __inline('list.html')
})
```

前端工程的目录结构为：
```
project
  ├─ common   (公共部分)  
  │  ├─ css  (样式)
  │  ├─ fonts  (字体)
  │  ├─ html  (公共的html片段)
  │  ├─ img  (图片资源)
  │  ├─ lib  (库资源)
  │  ├─ mock  (打桩的数据)
  │  ├─ plugins  (第三方插件，主要是jQuery插件)
  │  └─ scripts  (公共的js脚本文件)
  ├─ components    (公共组件)
  │  └─ ...
  ├─ mixins    (Vue.js的混入文件)
  │  └─ ...
  ├─ modules    (公共模块)
  │  └─ ...
  ├─ pages    (页面模块)
  │  └─ ...
  ...
```
components 和 modules 的区别在于，前者是公共组件，可以用在任何地方，比如 select2 组件，甚至可以采用 npm 来托管都可以；而后者是公共模块，是相对与本项目而言的公共模块，比如可能都公用的 header 等。

### thinkjs
thinkjs 的源码都在 src 文件夹下。

## 备注
### 注意库的版本
我曾遇到一个诡异的问题。在写 vue 组件时，我按照 api 文档写好了组件，然后调用： `<indextest1></indextest1>`，发现没效果，组件名必须要包含一个中横线，例如`<index-test1></index-test1>`，或者`<div v-component="indextest1"></div>`。这很不科学啊，文档中明明没这么要求的。折腾了个把小时，才突然发现，我当前使用的 vue 版本是 0.11.10 的，而看的 api 文档是 1.xx 的；等我将 vue.js 升级了，就没影响了。

由于我们引入了不少的库，一定要确定好我们当前的库，避免出现这样的低级错误。


## TODO
1. 通过构建的方式，为每个组件自动产生一个唯一的样式，这样避免样式冲突。例如支持 `___` 替换。
2. 在项目比较固化之后，如何能够自动生成代码，减少重复性工作
3. 将 `mixins` 文件夹再包装一层，放置在 `vuejs` 目录下，因为 Vue.js 还包括公共的 filters\directive等




## 参考

 - [fis-vuejs-seed](https://github.com/zhangtao07/fis-vuejs-seed)

