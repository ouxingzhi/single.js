define("mvc/block.js",["base/base","common/funs","base/event"],function(require){function t(t){var e=(t||"").replace(/^\s+|\s+$/g,"").split(/\s+/);return{event:e.shift(),selector:e.join(" ")}}function e(e,i,n){e=e||{},s.each(e,function(e,o){var a=t(o),e=s.bind("function"==typeof e?e:noop,n||this);i.on(a.event,a.selector,e)},this)}var s=require("base/base"),i=require("common/funs"),n=require("base/event"),o=(i.createAddSelf(1500),"cur-block-view"),a="block-view";return n.extend({propertys:function(){this.frame,this.box,this.forward=!1,this.views={},this.transition=null},getPreFix:function(){return"block"},initialize:function($super,t){$super(t),this.setOption(t)},setOption:function(t){t=t||{},s.isNUL(t.box)||(this.box=t.box),s.isNUL(t.frame)||(this.frame=t.frame)},to:function(t,s){var i=this.getPreFix()+t,n=this.box.find("#"+i);if(n.length||(n=$('<div class="'+a+'" id="'+i+'"></div>'),this.box.append(n)),s.template){var r=s.data||{},f=_.template(s.template)(r);if(n.html(f),s.events&&(n.off(),e(s.events,n,s.space)),this.transition){var l=n.siblings("."+o);l.length?this.forward?this.transition.into(l,n,function(){l.removeClass(o),n.addClass(o)}):this.transition.out(l,n,function(){l.removeClass(o),n.addClass(o)}):n.addClass(o)}else n.siblings().removeClass(o),n.addClass(o)}},setForward:function(t){this.forward=t}})});