define(['Base','BaseClass','UiBase','BaseObject'],function(Base,BaseClass,UiBase,BaseObject){
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