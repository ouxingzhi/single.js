define(function(){
	/**
	 * 带自毁能力的变量,用于垃圾回收
	 * @param value {Object} 变量
	 * @return {Object} 
	 */
	var _ID = {},valPrototype = new Var(_ID);
	function Var(value){
		if(value === _ID) return;
		var obj = {
			del:function(){
				value = null;
			},
			__proto__:valPrototype
		};
		Object.defineProperty(obj,'v',{
			get:function(){
				return value;
			},
			set:function(v){
				value = v;
			}
		});
		return obj;
	}

	return Var;
});