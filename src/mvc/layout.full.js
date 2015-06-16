define(function(require, exports, module) {
	var MvcAbstractLayout = require('mvc/layout');
	
	var html = '<div class="layout-main"></div>';


	return MvcAbstractLayout.extend({
		propertys:function(){
			this.root = $(html);
		},
		initialize:function($super,app){
			$super(app);
		},
		getRoot:function(){
			return this.root;
		},
		getFrameBoxs:function(){
			return {
				'main':this.root
			};
		}
	});
});