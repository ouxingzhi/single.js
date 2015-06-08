define(function(require, exports, module) {
	var Base = require('base/base');
	var M = {};

	/**
	 * 自增生成器
	 * @param base {Number} 可选 基本数字
	 * @return {Function} 返回自增函数
	 */
	M.createAddSelf = function(base){
		base = base || 0;
		return function(){
			return base++;
		};
	};

	/**
	 * 单例生成器
	 */
	M.createSingle = function(Class){
		var instance;
		return function(param){
			if(instance) return instance;
			return instance = new Class(param);
		}
	}

	/**
	 * 创建一个dom
	 */
	M.createDOM = function(dom){
		return function(html){
			dom.append(html);
			return dom.children();
		};
	}($('<div></div>'));

	/**
	 * 替换字符串中的的值
	 */
	M.formatString = function(str,data,fn,lt,rt){
		if(!lt) lt = '{';
		if(!rt) rt = '}';
		data = data || {};
		lt = '\\'+lt.split('').join('\\');
		rt = '\\'+rt.split('').join('\\');
		var reg = new RegExp(lt+'([^'+lt+rt+']*)'+rt,'img');
		return str.replace(reg,function(a,b){
			if(data[b]){
				fn && fn(b);
				return data[b];
			}
			return '';
		});
	};


	return M;
});