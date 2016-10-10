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
		var _this = this;
		//
		_this.src = 'data-src';
		_this.srcset = 'data-srcset';
	}

	Flazyload.prototype = {
		constructor: Flazyload,
		init:function(){
			//

		}
	}





	return Flazyload;
})