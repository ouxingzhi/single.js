define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseClass = require('base/base'),
		UiBase = require('ui/base'),
		BaseObject = require('base/object');
	return BaseClass(BaseObject,{
		propertys:function(){
			this.uiId = UiBase.createUiId();
		},
		/**
		 * 获得当前对象的uiId
		 */
		getUiId:function(){
			return this.uiId;
		}
	});
});