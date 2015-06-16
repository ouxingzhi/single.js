define(function(require, exports, module) {


	var MvcAbstractLayout = require('mvc/layout');
	
	var CLS_HEADER = 'layout-head',
		CLS_CONTENT = 'layout-content',
		html = [
			'<div class="layout-main">',
				'<div class="'+CLS_HEADER+'"></div>',
				'<div class="'+CLS_CONTENT+'"></div>',
			'</div>'
		].join('');


	return MvcAbstractLayout.extend({
		propertys:function(){
			this.root = $(html);
			this.header = this.root.find('.' + CLS_HEADER);
			this.content = this.root.find('.' + CLS_CONTENT);
		},
		initialize:function($super,app){
			$super(app);
		},
		getRoot:function(){
			return this.root;
		},
		getFrameBoxs:function(){
			return {
				'header':this.header,
				'content':this.content
			};
		}
	});
});