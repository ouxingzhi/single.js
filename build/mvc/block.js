define("SINGLE/mvc/block.js",["SINGLE/base/base","SINGLE/common/funs","SINGLE/base/event","SINGLE/mvc/transition.header.notanimte"],function(require){function t(t){var e=(t||"").replace(/^\s+|\s+$/g,"").split(/\s+/);return{event:e.shift(),selector:e.join(" ")}}function e(e,n,s){e=e||{},i.each(e,function(e,o){var a=t(o),e=i.bind("function"==typeof e?e:noop,s||this);n.on(a.event,a.selector,e)},this)}var i=require("SINGLE/base/base"),n=require("SINGLE/common/funs"),s=require("SINGLE/base/event"),o=require("SINGLE/mvc/transition.header.notanimte"),a=(n.createAddSelf(1500),"cur-block-view"),r="block-view";return s.extend({propertys:function(){this.frame,this.box,this.forward=!1,this.views={},this.transition=null},getPreFix:function(){return"block"},initialize:function($super,t){$super(t),this.setOption(t)},setOption:function(t){t=t||{},i.isNUL(t.box)||(this.box=t.box),i.isNUL(t.frame)||(this.frame=t.frame)},to:function(t,i){i=i||{};var n=this.getPreFix()+t,s=this.box.find("#"+n);s.length||(s=$('<div class="'+r+'" id="'+n+'"></div>'),this.box.append(s)),i.cls&&s.addClass(i.cls);var c=i.notAnimte||!1;if(i.template){var f=i.data||{},l=_.template(i.template)(f);s.html(l),i.events&&(s.off(),e(i.events,s,i.space));var h=c||!this.transition?o:this.transition,d=s.siblings("."+a);if(d.length){var v=this.forward?h.into:h.out;d.width()&&d.height()?v(d,s,function(){d.removeClass(a),s.addClass(a)}):(v(d,s,function(){}),d.removeClass(a),s.addClass(a))}else s.addClass(a)}},getRoot:function(){return this.box},setForward:function(t){this.forward=t}})});