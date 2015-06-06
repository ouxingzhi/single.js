define(function(require){
	var Block = require('mvc/block');
	var TransitionHeader = require('mvc/transition.header');

	return Block.extend({
		propertys:function(){
			this.transition = TransitionHeader;
		},
		initialize:function($super,options){
			$super(options);
		},
		setHeight:function(h){
			if(view){
				view.el.css('padding-top',h + 'px');
				this.box.height(h);
			}
		},
		getHeight:function(){
			return this.box.height();
		},
		hide:function(){
			var view = this.frame.getCurrentView();
			if(view){
				this.box.hide();
				view.el.attr('padding-top','0px');
			}
		},
		show:function(){
			var view = this.frame.getCurrentView();
			if(view){
				this.box.show();
				view.el.attr('padding-top',this.box.height()+'px');
			}
		}
	});
});