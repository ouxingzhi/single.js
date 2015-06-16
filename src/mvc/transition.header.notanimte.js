define(function(require, exports, module) {
	var MvcTransitionInterface = require('mvc/transition.interface');

	var F = MvcTransitionInterface.extend({
		into:function(outel,inel,callback,space){
			outel.hide();
			inel.show();
			outel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			inel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			callback && callback.call(space);
		},
		out:function(outel,inel,callback,space){
			outel.hide();
			inel.show();
			outel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			inel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			callback && callback.call(space);
		},
		isAnimation:function(el){
			return false;
		}
	});
	return new F();
});