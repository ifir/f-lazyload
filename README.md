# f-lazyload
原生无依赖，懒加载插件(完善ing...)
兼容IE8(不包括IE8)以上

```
实现的主要功能:
1、支持img,canvas,div(能设置background-image属性)标签元素
2、支持img设置dataset属性
3、自定义加载完成动画(下个版本增加)
4、自定义loading图片和error图片
5、支持预加载
6、支持canvas 图像设置
7、自定义background 设置
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
<script>
	var Flazyload = new Flazyload({
		container: String, //指定父容器 默认body,例如:'.class' or '#id' or 'tag'
		src:String, // 自定义需要懒加载图片的标识,默认'data-src',格式为data-*
		srcset:String, // 自定义srcset图片的标识,默认'data-srcset',格式为data-*
		proload: Boolean, //首次进入页面后是否加载当前页面的图片,默认为true
		loadimg: String, //加载中图片 默认无图片
		errimg: String, //加载失败图片 默认无图片
		tag: String, //指定需要加载元素标签名称,默认img,如果全部懒加载的元素都是一种类型,最好指定一下类型
		mix: Boolean, //混杂模式,如果需要加载的元素包含img,canvas,div等则开启mix,默认false,开启混杂模式则不需要指定tag类型
		bgConfig:{ //background config
			bgSize: String, //设置background-size  默认'contain'
			bgPos: String //设置background-position 默认'center center'
		},
		cvsConfig:{ //canvas config
			//如果所有的canvas的宽度和高度都是固定则配置此选项，默认'inherit',会寻找canvas属性上是否有width||height属性,如果没有则继承style样式的width和height属性
			//你可以填写以下几个特殊参数,'inherit' or 'auto', 'auto'将会通过你设置的另一个属性进行等比缩放起到自适应
			//不支持设置'100%',但是你可以在style设置width:100%,然后width在配置参试设置'inherit'
			width:String || Number,
			height:String || Number,
			imgPos:Array,//img绘制的坐标位置，默认[0,0]
			imgScale:Boolean //img是否进行缩放充满整个canvas，默认true
		}
	});
</script>
```
###or:

2、npm安装

> npm install --save f-lazyload

```
var Flazyload = require('f-lazyload');
var lazyload = new Flazyload({
	container: String, //指定父容器 默认body,例如:'.class' or '#id' or 'tag'
	src:String, // 自定义需要懒加载图片的标识,默认'data-src',格式为data-*
	srcset:String, // 自定义srcset图片的标识,默认'data-srcset',格式为data-*
	proload: Boolean, //首次进入页面后是否加载当前页面的图片,默认为true
	loadimg: String, //加载中图片 默认无图片
	errimg: String, //加载失败图片 默认无图片
	tag: String, //指定需要加载元素标签名称,默认img,如果全部懒加载的元素都是一种类型,最好指定一下类型
	mix: Boolean, //混杂模式,如果需要加载的元素包含img,canvas,div等则开启mix,默认false,开启混杂模式则不需要指定tag类型
	bgConfig:{ //background config
		bgSize: String, //设置background-size  默认'contain'
		bgPos: String //设置background-position 默认'center center'
	},
	cvsConfig:{ //canvas config
		//如果所有的canvas的宽度和高度都是固定则配置此选项，默认'inherit',会寻找canvas属性上是否有width||height属性,如果没有则继承style样式的width和height属性
		//你可以填写以下几个特殊参数,'inherit' or 'auto', 'auto'将会通过你设置的另一个属性进行等比缩放起到自适应
		//不支持设置'100%',但是你可以在style设置width:100%,然后width在配置参试设置'inherit'
		width:String || Number,
		height:String || Number,
		imgPos:Array,//img绘制的坐标位置，默认[0,0]
		imgScale:Boolean //img是否进行缩放充满整个canvas，默认true
	}
});
```



