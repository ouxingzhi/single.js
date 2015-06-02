define(function(require, exports, module) {
	var base = require('base/base'),
		CommonFuns = require('common/funs');
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
	 * 获得页面的实际高度
	 * @return {Object} 返回页面高宽
	 * 		|- width 宽
	 *		|- height 高
	 */
	M.getPageSize = function(){
		if(!document.body){
			return {width:0,height:0};
		}
		return {
			height:document.body.scrollHeight,
			width:document.body.scrollWidth
		};
	};

	/**
	 * ui组件zindex生成器
	 */
	M.createZIndex = function(addSelf,index){
		return function(){
			return index + addSelf();
		};
	}(CommonFuns.createAddSelf(),2000);

	/**
	 * ui组件id生成器
	 */
	M.createUiId = function(addSelf){
		return function(){
			return 'uiId_' + addSelf();
		};
	}(CommonFuns.createAddSelf());
	
	/**
	 * ui组件Name生成器
	 */
	M.createFnName = function(addSelf){
		return function(){
			return 'fn_' + addSelf();
		};
	}(CommonFuns.createAddSelf());
	return M;
});