/*!
 * f-lazyload v0.1.0
 * 原生无依赖, 实现图片懒加载
 * Repo: https://github.com/ifir/f-lazyload
 */
;(function(global, factory){
	if (typeof define === 'function' && define.amd) {
        define(function () {
            return (global.Flazyload = factory(global, global.document));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(global, global.document);
    } else {
        global.Flazyload = factory(global, global.document);
    }
})(typeof window !== 'undefined' ? window : this, function (window, document) {
	'use strict';

	function Flazyload(opts){
		opts = arguments.length > 0 ? opts : {};
		var _this = this;
		//指定父容器
		_this.container = 'body';
		//默认添加data-src属性开启懒加载
		_this.src = 'data-src';
		//srcset属性
		_this.srcset = 'data-srcset';
		//是否开启混杂模式（例如需要懒加载的元素有img,canvas,div等元素）
		_this.mix = false;
		//默认img标签
		_this.tag = 'img';
		//bgConfig
		_this.bgConfig = {
			bgSize : 'contain',
			bgPos : 'center center'
		};
		//canvas config
		_this.cvsConfig = {
			width : 'auto',
			height : 'auto',
			imgPos : [0, 0],
			imgScale : true
		};
		//动画速度
		_this.fadeIn = false;
		//是否在页面首次载入就判断是否有需要懒加载的图片在可视区域
		_this.preload = true;
		//屏幕可视宽和高
		_this.winW = window.innerWidth;
		_this.winH = window.innerHeight;

		//loading 图片
		_this.loadimg = false;
		//error 图片
		_this.errimg = false;
		//覆盖配置
		for (var key in opts) {
			if(typeof opts[key] === 'object' && Object.prototype.toString.call(opts[key]).toLowerCase() === '[object object]'){
				for(var val in opts[key]){
					_this[key][val] = opts[key][val];
				}
			}else{
				_this[key] = opts[key];
			}
		}
		//获取需要懒加载的dom
		if(_this.mix){
			_this.eles = document.querySelectorAll(_this.container+' *['+_this.src+']');
		}else{
			_this.eles = document.querySelectorAll(_this.container+' '+ _this.tag+'['+_this.src+']');
		}
		_this.length = _this.eles.length;

		_this.init(opts);

		_this.addEvents(_this);
	}


	Flazyload.prototype = {
		//修正constructor
		constructor: Flazyload,
		//初始化
		init: function(opts){
			var _this = this;
			//设置loading图片
			if(_this.loadimg){
				for(var i = 0; i < _this.length; i++){
					var curEle = _this.eles[i];
					var nodeName = _this.mix ? curEle.nodeName.toLowerCase() : _this.tag;
					if(nodeName === 'img'){
						//img标签
						curEle.setAttribute('src', _this.loadimg);
					}else{
						//除img标签以外的
						_this.background(curEle, _this.loadimg);
					}
				}
			}
			//首次载入页面是否判断懒加载元素是否在可视区域内
			_this.preload && _this.onread(_this);
		},
		//是否在可视区域
		isVisible: function(ele){
			var rect = ele.getBoundingClientRect(),
				eTop = rect.top,
				eLeft = rect.left,
				eWidth = rect.width,
				eHeight = rect.height;
			return eTop < this.winH && eTop + eHeight >= 0 && eLeft < this.winW && eLeft + eWidth >= 0;
		},
		//需要执行的懒加载
		onread: function(_this){
			var isload = false, remove = false;
			for(var i = 0; i < _this.length; i++){
				if(_this.isVisible(_this.eles[i])){
					_this.lazyload(_this.eles[i], _this);
					isload = true;
				}
			}
			if(isload){
				if(_this.mix){
					_this.eles = document.querySelectorAll(_this.container+' *['+_this.src+']');
				}else{
					_this.eles = document.querySelectorAll(_this.container+' '+ _this.tag+'['+_this.src+']');
				}
				_this.length = _this.eles.length;
				isload = false;
			}
			//没有需要懒加载的图片则移除事件绑定
			if(_this.length <= 0 && !remove){
				_this.removeEvents(_this);
				remove = true;
			}
		},
		attrSrc: function(ele, url){
			ele.setAttribute('src', url);
			ele.removeAttribute(this.src);
			if(ele.getAttribute(this.srcset)){
				ele.setAttribute('srcset', ele.getAttribute(this.srcset));
				ele.removeAttribute(this.srcset);
			}
		},
		background: function(ele, url){
			ele.style.backgroundImage = 'url('+url+')';
			ele.style.backgroundPosition = this.bgConfig.bgPos;
			ele.style.backgroundSize = this.bgConfig.bgSize;
			ele.style.backgroundRepeat = 'no-repeat';
		},
		opacity: function(ele, speed){
			ele.style.opacity = 0.2;
			var timer = null;
			var timeSpeed = speed / 30;
			var value = 0.7 / 30;
			var alpha = 0.3;
			clearInterval(timer);
			timer = setInterval(function(){
			      alpha += value;
			      ele.style.opacity = Math.min(1, alpha);
			      alpha >= 1 && clearInterval(timer);
			},timeSpeed);
		},
		//懒加载
		lazyload: function(ele, _this){
			var dataSrc = _this.src;
			var src = ele.getAttribute(dataSrc) || '';
			if(src === '') return;
			var img = new Image();
			//图片加载完成
			img.addEventListener('load', function(){
				var nodeName = _this.mix ? ele.nodeName.toLowerCase() : _this.tag;
				switch(nodeName){
					case 'img' :
						_this.attrSrc(ele, src);
						break;
					case 'canvas' :
						var cvs = ele.getContext('2d');
						var confW = _this.cvsConfig.width,
							confH = _this.cvsConfig.height,
							imgW, imgH;
						if( (confW === 'auto'&& confH === 'auto') || (confW === 'inherit'&& confH === 'inherit') || (confW === ''&& confH === '') ){
							ele.width = cvs.width ? cvs.width : ele.getBoundingClientRect().width;
							ele.height = cvs.height ? cvs.height : ele.getBoundingClientRect().height;
						}else{
							//计算width和height
							if(confW === 'auto'){
								ele.height = confH === 'inherit' ? ele.getBoundingClientRect().height : confH;
								ele.width =  Math.floor((ele.height * this.width) / this.height);
							}else if(confH === 'auto'){
								ele.width = confW === 'inherit' ? ele.getBoundingClientRect().width :confW;
								ele.height =  Math.floor((ele.width * this.height) / this.width);
							}else{
								ele.width = confW;
								ele.height = confH;
							}
						}
						//设置图片大小
						if(_this.cvsConfig.imgScale){
							imgW = ele.width;
							imgH = ele.height;
						}else{
							imgW = this.width;
							imgH = this.height;
						}
						//context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
						cvs.drawImage(this, _this.cvsConfig.imgPos[0], _this.cvsConfig.imgPos[1], imgW, imgH);
						ele.removeAttribute(_this.src);
						ele.style.backgroundImage = 'none';
						break;
					default:
						_this.background(ele, src);
						ele.removeAttribute(_this.src);
				}
				_this.fadeIn && _this.opacity(ele, _this.fadeIn);
			}, false);
			//图片加载失败
			img.addEventListener('error', function(){
				//设置图片加载失败图片
				if(_this.errimg){
					var timer = null;
					clearTimeout(timer);
					timer = setTimeout(function(){
						var nodeName = _this.mix ? ele.nodeName.toLowerCase() : _this.tag;
						if(nodeName === 'img'){
							//img标签
							_this.attrSrc(ele, _this.errimg);
							if(ele.getAttribute('srcset')){
								ele.removeAttribute(_this.srcset);
								ele.removeAttribute('srcset');
							}
						}else{
							//除img标签以外的
							_this.background(ele, _this.errimg);
							ele.removeAttribute(_this.src);
						}
						clearTimeout(timer);
					},2000);
				}else{
					ele.removeAttribute(dataSrc);
					if(ele.getAttribute(this.srcset)){
						ele.removeAttribute(_this.srcset);
						ele.removeAttribute('srcset');
					}
				}
			}, false);
			//发起请求
			img.src = src;
		},
		//绑定事件
		addEvents: function(_this){
			window.addEventListener('scroll', function(){
				_this.onread(_this);
			}, false);
		},
		//移除事件绑定
		removeEvents: function(_this){
			window.removeEventListener('scroll', function(){
				_this.onread(_this);
			}, false);
		}
	}

	return Flazyload;
})
