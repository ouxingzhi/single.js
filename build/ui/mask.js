define("SINGLE/ui/mask.js",["SINGLE/base/base","SINGLE/ui/object"],function(require){function t(){if(this.click&&this.$el.on("click",this.click.bind(this)),this.events){i.each(this.events,function(t,i){this.$el.on(i,t.bind(this))},this)}this.$el.on("touchmove",function(t){t.preventDefault()})}var i=require("SINGLE/base/base"),e=require("SINGLE/ui/object"),n="ui-mask-not-opacity";return e.extend({propertys:function(){this.on("create",function(){this.$el.addClass("ui-mask"),t.call(this),this.on("show",function(){this.topIndex()})})},initialize:function($super,t){$super(t)},setOption:function($super,t){t=t||{},$super(t),t.click&&(this.click=t.click),t.events&&(this.events=t.events)},createHTML:function(){return""},show:function($super,t){$super(),t?this.$el.addClass(n):this.$el.removeClass(n)}})});