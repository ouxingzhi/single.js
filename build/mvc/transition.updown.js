define("SINGLE/mvc/transition.updown.js",["mvc/transition.interface"],function(require,n,o){var s=require("mvc/transition.interface"),i="updown_forward_out",e="updown_forward_in",a="updown_back_out",d="updown_back_in",t=s.extend({into:function(n,o,t,r){n.removeClass([i,e,a,d].join(" ")),o.removeClass([i,e,a,d].join(" ")),o.show(),n.show(),n.css("z-index",s.getTopIndexZ()),o.css("z-index",s.getTopIndexZ()),n.addClass(i),o.addClass(e),s.removeTransitionEnd(o),s.addTransitionEnd(o,function(){o.removeClass(e),t&&t.call(r)}),s.removeTransitionEnd(n),s.addTransitionEnd(n,function(){n.hide(),n.removeClass(i)})},out:function(n,o,t,r){n.removeClass([i,e,a,d].join(" ")),o.removeClass([i,e,a,d].join(" ")),o.show(),n.show(),n.addClass(a),o.addClass(d),o.css("z-index",s.getTopIndexZ()),n.css("z-index",s.getTopIndexZ()),s.removeTransitionEnd(o),s.addTransitionEnd(o,function(){o.removeClass(d)}),s.removeTransitionEnd(n),s.addTransitionEnd(n,function(){n.hide(),n.removeClass(a),t&&t.call(r)})},isAnimation:function(n){return n.hasClass([i,e,a,d].join(" "))}});return new t});