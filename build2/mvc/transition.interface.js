define("mvc/transition.interface.js",["base/object","common/funs"],function(require,n,e){var t=require("base/object"),o=require("common/funs"),i=t.extend({into:function(n,e,t){throw"Please implement 'into' method"},out:function(n,e,t){throw"Please implement 'out' method"},isAnimation:function(){throw"Please implement 'isAnimation' method"}}),m="webkitAnimation"in document.body.style?"webkitAnimationEnd":"animationend";return i.getTopIndexZ=o.createAddSelf(1e3),i.addTransitionEnd=function(n,e){n.on(m,e)},i.removeTransitionEnd=function(n,e){n.off(m,e)},i});