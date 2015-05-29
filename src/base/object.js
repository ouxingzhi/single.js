define(['BaseClass','BaseVal'],function(BaseClass,BaseVal){
	/**
	 * 基本的对象类，系统中所有类需要继承至它
	 */
	var BaseObject = BaseClass({
		/**
		 * 销毁当前对象
		 */
		destruct:function(){
			var o;
			for(var i in this){
				if(this.hasOwnProperty(i)){
					o = this[i];
					if(o instanceof BaseVal){
						o.del();
					}
					this[i] = null;
				}
			}
		}
	});
	

	return BaseObject;
});