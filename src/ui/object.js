define(function(require) {
	var Base = require('base/base'),
		UiBase = require('ui/base'),
		BaseEvent = require('base/event'),
		CommonFuns = require('common/funs');
	var CLASS_ROOT = 'ui-root';
	var $window = $(window);
	var UiObject = BaseEvent.extend({
		propertys:function(){
			this.uiId = UiBase.createUiId();
			this.status = UiObject.STATUS_NOT_CREATE;
			this.$el = null;
			//是否使用根节点
			this.useRoot = true;
			//容器
			this.container = null;
			//自动定位的回调
			this.__autoFnName = this.randFn(function(){
				this.emit('resize');
			});
		},
		initialize:function($super,options){
			$super(options);
			this.setOption(options);
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);
			if(!Base.isNUL(options.useRoot)){
				this.useRoot = options.useRoot;
			}
			if(!Base.isNUL(options.container)){
				this.container = options.container;
			}else{
				this.container = $('body');
			}
			if(!Base.isNUL(options.cls)){
				this.on('create',function(){
					this.$el.addClass(options.cls);
				});
			}
		},
		randFn:function(fn){
			var fnname = UiBase.createFnName();
			this[fnname] = fn.bind(this);
			return fnname;
		},
		/**
		 * 获得当前对象的uiId
		 */
		getUiId:function(){
			return this.uiId;
		},
		create:function(){
			if(this.status === UiObject.STATUS_NOT_CREATE || this.status === UiObject.STATUS_DESTROY){
				if(this.useRoot){
					this.$el = $('<div class="'+CLASS_ROOT+'" id="'+this.getUiId()+'"></div>');
					this.$el.append(this.createHTML());
				}else{
					this.$el = $(this.createHTML());
				}
				this.$el.hide();
				this.container.append(this.$el);
				this.status = UiObject.STATUS_CREATE;
				this.emit('create');
			}
		},
		/**
		 * 生成html的方法
		 * @return {Element|String|jQuery} 返回所有可能的
		 */
		createHTML:function(){
			throw "error: not override createHTML";
		},
		show:function(){
			this.create();
			if(this.status === UiObject.STATUS_CREATE || this.status === UiObject.STATUS_SHOW || this.status === UiObject.STATUS_HIDE){
				this.$el.show();
				this.status === UiObject.STATUS_SHOW;
				this.emit('show');
			}
		},
		hide:function(){
			if(this.status === UiObject.STATUS_CREATE || this.status === UiObject.STATUS_SHOW || this.status === UiObject.STATUS_HIDE){
				this.$el.hide();
				this.status === UiObject.STATUS_HIDE;
				this.emit('hide');
			}
		},
		topIndex:function(){
			if(this.$el){
				this.$el.css('zIndex',UiBase.createZIndex());
			}
		},
		createDomId:function(addfn){
			return function(){
				return 'comid-'+addfn();
			}
		}(CommonFuns.createAddSelf()),
		destroy:function(){
			if(this.$el){
				this.$el.remove();
				this.$el = null;
				this.status = UiObject.STATUS_DESTROY;
				this.emit('destroy');
			}
		},
		startAutoPosition:function(){
			if(this[this.__autoFnName]) $window.off('resize',this[this.__autoFnName]);
			$window.on('resize',this[this.__autoFnName]);
		},
		endAutoPosition:function(){
			$window.off('resize',this[this.__autoFnName]);
		},
	});
	//没有创建
	UiObject.STATUS_NOT_CREATE = 0;
	//已创建，未显示
	UiObject.STATUS_CREATE = 1;
	//已创建，已显示
	UiObject.STATUS_SHOW = 2;
	//已创建，未显示
	UiObject.STATUS_HIDE = 3;
	//已销毁
	UiObject.STATUS_DESTROY = 4;

	return UiObject;
});