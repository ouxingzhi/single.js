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


	return M;
});