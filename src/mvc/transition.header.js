define(function(require, exports, module) {
	var MvcTransitionInterface = require('mvc/transition.interface');

	var TRANS_FORWARD_OUT = 'header_forward_out',
		TRANS_FORWARD_IN = 'header_forward_in',
		TRANS_BACK_OUT = 'header_back_out',
		TRANS_BACK_IN = 'header_back_in';


	var F = MvcTransitionInterface.extend({
		into:function(outel,inel,callback,space){
			outel.removeClass([TRANS_FORWARD_OUT,TRANS_FORWARD_IN,TRANS_BACK_OUT,TRANS_BACK_IN].join(' '));
			inel.removeClass([TRANS_FORWARD_OUT,TRANS_FORWARD_IN,TRANS_BACK_OUT,TRANS_BACK_IN].join(' '));
			inel.show();
			outel.show();
			outel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			inel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			outel.addClass(TRANS_FORWARD_OUT);
			inel.addClass(TRANS_FORWARD_IN);
			MvcTransitionInterface.removeTransitionEnd(inel);
			MvcTransitionInterface.addTransitionEnd(inel,function(){
				inel.removeClass(TRANS_FORWARD_IN);
				callback && callback.call(space);
			});
			
			MvcTransitionInterface.removeTransitionEnd(outel);
			MvcTransitionInterface.addTransitionEnd(outel,function(){
				outel.hide();
				outel.removeClass(TRANS_FORWARD_OUT);
			});
		},
		out:function(outel,inel,callback,space){
			outel.removeClass([TRANS_FORWARD_OUT,TRANS_FORWARD_IN,TRANS_BACK_OUT,TRANS_BACK_IN].join(' '));
			inel.removeClass([TRANS_FORWARD_OUT,TRANS_FORWARD_IN,TRANS_BACK_OUT,TRANS_BACK_IN].join(' '));
			inel.show();
			outel.show();
			outel.addClass(TRANS_BACK_OUT);
			inel.addClass(TRANS_BACK_IN);
			inel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			outel.css('z-index',MvcTransitionInterface.getTopIndexZ());
			
			MvcTransitionInterface.removeTransitionEnd(inel);
			MvcTransitionInterface.addTransitionEnd(inel,function(){
				inel.removeClass(TRANS_BACK_IN);
			});
			
			MvcTransitionInterface.removeTransitionEnd(outel);
			MvcTransitionInterface.addTransitionEnd(outel,function(){
				outel.hide();
				outel.removeClass(TRANS_BACK_OUT);
				callback && callback.call(space);
			});
		},
		isAnimation:function(el){
			return el.hasClass([TRANS_FORWARD_OUT,TRANS_FORWARD_IN,TRANS_BACK_OUT,TRANS_BACK_IN].join(' '));
		}
	});
	return new F();
});