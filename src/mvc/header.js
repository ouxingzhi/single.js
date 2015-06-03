define(function(require){
	var Block = require('mvc/block');
	var TransitionHeader = require('mvc/transition.header');

	return Block.extend({
		propertys:function(){
			this.transition = TransitionHeader;
		},
		initialize:function($super,options){
			$super(options);
		}
	});
});