define("SINGLE/ui/toast.js",["base/base","ui/layer"],function(require){function t(){this.$el&&this.$el.on("click",function(){this.click&&this.click.apply(this,arguments)}.bind(this))}function i(){}function n(t){0>=t||(this.updatePosition(),setTimeout(function(){n.call(this,t-1)}.bind(this),20))}var c=require("base/base"),s=require("ui/layer"),e={},o="ui-toast";return e.UI_TOAST_CONTENT="ui-toast-content",s.extend({propertys:function(){this.doms={},this.on("create",function(){this.$el.addClass(o),c.each(e,function(t){this.doms[t]=this.$el.find("."+t)},this),t.call(this)}),this.on("show",function(){this.update(),n.call(this,3)}),this.click=i,this.content=""},initialize:function($super,t){$super(t)},setOption:function($super,t){t=t||{},$super(t),c.isNUL(t.content)||(this.content=t.content),c.isNUL(t.click)||(this.click=t.click)},createHTML:function(){return'<div class="'+e.UI_TOAST_CONTENT+'"></div>'},update:function(){this.$el&&this.doms[e.UI_TOAST_CONTENT].html(this.content)},show:function($super,t){t&&(t.click&&(this.click=opitons.click),t.content&&(this.content=t.content),t.timeout&&setTimeout(function(){this.hide(),t.callback&&t.callback.call(this)}.bind(this),1e3*t.timeout)),$super(t)}})});