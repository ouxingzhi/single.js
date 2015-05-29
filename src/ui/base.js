define(['Base','CommonFuns'],function(base,CommonFuns){
	var M = {};

	/**
	 * 获得元素的相对于页面顶部的位置
	 * @param el {Element} 
	 * @return {left:left,top:top} 返回元素相对于页面顶部的位置
	 */
	M.getOffsetByPage = function(el){
		var left = 0,
			top = 0;
		if(!el){
			return {left:left,top:top};
		}
		do{
			left += el.offsetLeft;
			top += el.offsetTop;
		}while(el = el.offsetParent);

		return {
			top:top,
			left:left
		};
	};

	

	/**
	 * ui组件id生成器
	 */
	M.createUiId = function(addSelf){
		return function(){
			return 'uiId_' + addSelf();
		};
	}(CommonFuns.createAddSelf());
	
	return M;
});