define("SINGLE/mvc/transition.header.notanimte.js",["mvc/transition.interface"],function(require,n,e){var i=require("mvc/transition.interface"),t=i.extend({into:function(n,e,t,o){n.hide(),e.show(),n.css("z-index",i.getTopIndexZ()),e.css("z-index",i.getTopIndexZ()),t&&t.call(o)},out:function(n,e,t,o){n.hide(),e.show(),n.css("z-index",i.getTopIndexZ()),e.css("z-index",i.getTopIndexZ()),t&&t.call(o)},isAnimation:function(n){return!1}});return new t});