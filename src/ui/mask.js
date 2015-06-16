define(function(require){
	var Base = require('base/base');
	var UiObject = require('ui/object');

	var CLS_NOT_OPACITY = 'ui-mask-not-opacity';

	/**
	 * @private buildEvent
	 */
	function buildEvent(){
		if(this.click){
			this.$el.on('click',this.click.bind(this));
		}
		if(this.events){
			var events = {};
			Base.each(this.events,function(fn,name){
				this.$el.on(name,fn.bind(this));
			},this);
		}
		this.$el.on('touchmove',function(e){
			e.preventDefault();
		});	
	}

	return UiObject.extend({
		propertys:function(){
			this.on('create',function(){
				this.$el.addClass('ui-mask');
				
				buildEvent.call(this);

				this.on('show',function(){
					this.topIndex();
				});
			});
		},
		initialize:function($super,options){
			$super(options);
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);
			if(options.click){
				this.click = options.click;
			}
			if(options.events){
				this.events = options.events;
			}
		},
		createHTML:function(){
			return '';
		},
		show:function($super,notopacity){
			$super();
			if(notopacity){
				this.$el.addClass(CLS_NOT_OPACITY);
			}else{
				this.$el.removeClass(CLS_NOT_OPACITY);
			}
			
		}
	});
});