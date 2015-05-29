define(['Base'],function(Base){
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


	return M;
});