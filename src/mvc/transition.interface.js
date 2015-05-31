define(function(require, exports, module) {
	var BaseObject = require('base/object'),
		CommonFuns = require('common/funs');

	var I = BaseObject.extend({
		into:function(outel,inel,callback){
			throw "Please implement 'into' method";
		},
		out:function(outel,inel,callback){
			throw "Please implement 'out' method";
		},
		isAnimation:function(){
			throw "Please implement 'isAnimation' method";
		}
	});

	var eventName = 'webkitAnimation' in document.body.style ? 'webkitAnimationEnd' : 'animationend';

	I.getTopIndexZ = CommonFuns.createAddSelf(1000);

	I.addTransitionEnd = function(el,fn){
		el.on(eventName,fn);
	};

	I.removeTransitionEnd = function(el,fn){
		el.off(eventName,fn);
	};

	return I;
})