define("SINGLE/mvc/transition.header.js",["mvc/transition.interface"],function(require,n,e){var s=require("mvc/transition.interface"),o="header_forward_out",i="header_forward_in",a="header_back_out",d="header_back_in",r=s.extend({into:function(n,e,r,t){n.removeClass([o,i,a,d].join(" ")),e.removeClass([o,i,a,d].join(" ")),e.show(),n.show(),n.css("z-index",s.getTopIndexZ()),e.css("z-index",s.getTopIndexZ()),n.addClass(o),e.addClass(i),s.removeTransitionEnd(e),s.addTransitionEnd(e,function(){e.removeClass(i),r&&r.call(t)}),s.removeTransitionEnd(n),s.addTransitionEnd(n,function(){n.hide(),n.removeClass(o)})},out:function(n,e,r,t){n.removeClass([o,i,a,d].join(" ")),e.removeClass([o,i,a,d].join(" ")),e.show(),n.show(),n.addClass(a),e.addClass(d),e.css("z-index",s.getTopIndexZ()),n.css("z-index",s.getTopIndexZ()),s.removeTransitionEnd(e),s.addTransitionEnd(e,function(){e.removeClass(d)}),s.removeTransitionEnd(n),s.addTransitionEnd(n,function(){n.hide(),n.removeClass(a),r&&r.call(t)})},isAnimation:function(n){return n.hasClass([o,i,a,d].join(" "))}});return new r});