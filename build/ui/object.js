define("SINGLE/ui/object.js",["base/base","ui/base","base/event","common/funs"],function(require){var t=require("base/base"),s=require("ui/base"),i=require("base/event"),e=require("common/funs"),n="ui-root",o=$(window),h=i.extend({propertys:function(){this.uiId=s.createUiId(),this.status=h.STATUS_NOT_CREATE,this.$el=null,this.useRoot=!0,this.container=null,this.__autoFnName=this.randFn(function(){this.emit("resize")})},initialize:function($super,t){$super(t),this.setOption(t)},setOption:function($super,s){s=s||{},$super(s),t.isNUL(s.useRoot)||(this.useRoot=s.useRoot),this.container=t.isNUL(s.container)?$("body"):s.container,t.isNUL(s.cls)||this.on("create",function(){this.$el.addClass(s.cls)})},randFn:function(t){var i=s.createFnName();return this[i]=t.bind(this),i},getUiId:function(){return this.uiId},create:function(){(this.status===h.STATUS_NOT_CREATE||this.status===h.STATUS_DESTROY)&&(this.useRoot?(this.$el=$('<div class="'+n+'" id="'+this.getUiId()+'"></div>'),this.$el.append(this.createHTML())):this.$el=$(this.createHTML()),this.$el.hide(),this.container.append(this.$el),this.status=h.STATUS_CREATE,this.emit("create"))},createHTML:function(){throw"error: not override createHTML"},show:function(){this.create(),(this.status===h.STATUS_CREATE||this.status===h.STATUS_SHOW||this.status===h.STATUS_HIDE)&&(this.$el.show(),this.status===h.STATUS_SHOW,this.emit("show"))},hide:function(){(this.status===h.STATUS_CREATE||this.status===h.STATUS_SHOW||this.status===h.STATUS_HIDE)&&(this.$el.hide(),this.status===h.STATUS_HIDE,this.emit("hide"))},topIndex:function(){this.$el&&this.$el.css("zIndex",s.createZIndex())},createDomId:function(t){return function(){return"comid-"+t()}}(e.createAddSelf()),destroy:function(){this.$el&&(this.$el.remove(),this.$el=null,this.status=h.STATUS_DESTROY,this.emit("destroy"))},startAutoPosition:function(){this[this.__autoFnName]&&o.off("resize",this[this.__autoFnName]),o.on("resize",this[this.__autoFnName])},endAutoPosition:function(){o.off("resize",this[this.__autoFnName])}});return h.STATUS_NOT_CREATE=0,h.STATUS_CREATE=1,h.STATUS_SHOW=2,h.STATUS_HIDE=3,h.STATUS_DESTROY=4,h});