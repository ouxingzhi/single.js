define(function(require){
	var Base = require('base/base');
	var UiLayer = require('ui/layer');

	var C = {};

	var UI_TOAST = 'ui-toast';
	C.UI_TOAST_CONTENT = 'ui-toast-content';

	/**
	 * @private buildEvent()
	 */
	function buildEvent(){
		if(this.$el){
			this.$el.on('click',function(){
				this.click && this.click.apply(this,arguments);
			}.bind(this));
		}
	}

	function noop(){}

	return UiLayer.extend({
		propertys:function(){
			this.doms = {};
			this.on('create',function(){
				this.$el.addClass(UI_TOAST);
				Base.each(C,function(cls){
					this.doms[cls] = this.$el.find('.'+cls);
				},this);
				buildEvent.call(this);
			});
			this.on('show',function(){
				this.update();
			});
			this.click = noop;
			this.content = '';


		},
		initialize:function($super,options){
			$super(options);
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);
			if(!Base.isNUL(options.content)){
				this.content = options.content;
			}
			if(!Base.isNUL(options.click)){
				this.click = options.click;
			}
		},
		createHTML:function(){
			return '<div class="'+C.UI_TOAST_CONTENT+'"></div>';
		},
		update:function(){
			if(this.$el){
				this.doms[C.UI_TOAST_CONTENT].html(this.content);
			}
		},
		show:function($super,options){
			
			if(options){
				if(options.click){
					this.click = opitons.click;
				}
				if(options.content){
					this.content = options.content;
				}
				if(options.timeout){
					setTimeout(function(){
						this.hide();
						options.callback && options.callback.call(this);
					}.bind(this),options.timeout*1000);
				}
			}
			$super(options);
		}
	});
});