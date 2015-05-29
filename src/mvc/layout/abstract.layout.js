define(['BaseEventObject'],function(BaseEventObject){
	var AbstractLayout = BaseEventObject.extend({
		propertys:function(){
			this.app;
		},
		initialize:function($super,app){
			this.app = app;
			$super();
		},
		getRoot:function(){
			throw 'no override method "getRoot"!';
		},
		getFrameBoxs:function(){
			throw 'no override method "getContainers"!';
		}
	});


	return AbstractLayout;
});