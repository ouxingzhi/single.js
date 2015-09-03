define(function(require){
	var Block = require('mvc/block');
	var TransitionHeader = require('mvc/transition.header');
	var CLS_HEADER_HIDE = 'single-header-hide';
	return Block.extend({
		propertys:function(){
			this.transition = TransitionHeader;
		},
		initialize:function($super,options){
			$super(options);
		},
		setHeight:function(h){
			if(view){
				view.root.css('padding-top',h + 'px');
				this.box.height(h);
			}
		},
		getHeight:function(){
			return this.box.height();
		},
		hide:function(){
			this.box.hide();
			this.frame.getRoot().addClass(CLS_HEADER_HIDE);
		},
		show:function(){
			this.box.show();
			this.frame.getRoot().removeClass(CLS_HEADER_HIDE);
		}
	});
});