# f-lazyload
一个懒加载库，无依赖
兼容IE8(不包括IE8)以上

```
实现的主要功能:
1、支持img,canvas,div(能设置background-image属性)标签元素
2、支持img设置dataset属性
3、自定义加载完成动画
4、自定义loading图片和error图片
5、支持预加载
```

### 安装依赖

> npm install

### 开发

> gulp dev 浏览器自动打开localhost:3000

### 打包

> gulp build 查看dist目录


### 如何使用

1、页面引入
```
<script src="youpath/f-lazload.js"></script>

var Flazyload = new Flazyload();
```
###or:###

2、npm安装

> npm install --save f-lazyload

```
var Flazyload = require('f-lazyload');
new Flazyload();
```



