/*!
 * f-lazyload v0.0.1
 * 原生无依赖, 实现图片懒加载
 * Repo: https://github.com/ifir/f-lazyload
 */
;(function(global, factory){
	//AMD || CMD
	if(typeof define === 'function' && define.amd === 'object' && define.amd){
		define([], factory);
	}else if(typeof module === "object" && typeof module.exports === "object" && module.exports){
		module.exports = factory();
	}else{
		global.Flazyload = factory();
	}
})(typeof window !== 'undefined' ? window : this, function(){
	function Flazyload(opts){
		opts = arguments.length > 0 ? opts : {};
		var _this = this;
		//默认添加data-src属性开启懒加载
		_this.src = opts.sign || 'data-src';
		//srcset属性
		_this.srcset = 'data-srcset';
		//默认img标签
		_this.tag = opts.tag ||'img';
		//获取需要懒加载的dom
		_this.eles = document.querySelectorAll(_this.tag+'['+_this.src+']');
		_this.length = _this.eles.length;
		//是否在页面首次载入就判断是否有需要懒加载的图片在可视区域
		_this.preload = opts.proload || true;
		//屏幕可视宽和高
		_this.winW = window.innerWidth;
        _this.winH = window.innerHeight;

		_this.init(opts);

		//_this.lazyload();
		_this.addEvents(_this);
		//_this.eles.srcset = _this.eles.getAttribute(_this.srcset);
	}


	Flazyload.prototype = {
		//修正constructor
		constructor: Flazyload,
		//初始化
		init: function(opts){
			var _this = this;
			for(var i = 0; i < this.length; i++){
				var cls = this.eles[i].className;
				cls === '' ? 'loader' : cls+=' loader';
				this.eles[i].className = cls;
			}
			_this.preload && _this.onread(_this);
		},
		//是否在可视区域
		isVisible: function(ele){
			var rect = ele.getBoundingClientRect();
			var eTop = rect.top;
	        var eLeft = rect.left;
	        var eWidth = rect.width;
	        var eHeight = rect.height;
	        return eTop < this.winH && eTop + eHeight >= 0 && eLeft < this.winW && eLeft + eWidth >= 0;
		},
		//首次打开页面执行懒加载
		onread: function(_this){
			var isload = false, remove = false;
			for(var i = 0; i < _this.length; i++){
				if(_this.isVisible(_this.eles[i])){
					_this.lazyload(_this.eles[i]);
					isload = true;
				}
			}
			if(isload){
				console.log('isload')
				_this.eles = document.querySelectorAll(_this.tag+'['+_this.src+']');
				_this.length = _this.eles.length;
				isload = false;
			}
			//没有需要懒加载的图片则移除事件绑定
			if(_this.length <= 0 && !remove){
				_this.removeEvents(_this);
				remove = true;
			}
		},
		//懒加载
		lazyload: function(ele){
			var dataSrc = this.src;
			var src = ele.getAttribute(dataSrc);
			var img = new Image();
			//console.log('1====='+src)
			img.src = src;
			//图片加载完成
			img.addEventListener('load', function(){
				ele.src = src;
				ele.setAttribute(dataSrc, '');
				ele.className.replace(/loader/g, ' ');
				//el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 
				//delete ele.dataset.src
				//console.log('2====='+src)
				//ele.removeAttribute(dataSrc);
				//console.log('3====='+src)
			}, false);
			//图片加载失败
			img.addEventListener('error', function(){
				//console.log('error');
			}, false);
		},
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