define(function(require){
	var Base = require('base/base');
	var UiBase = require('ui/base');
	var UiObject =  require('ui/object');
	var UiMask = require('ui/mask');

	/**
	 * 所有弹出层的父类
	 * 
	 */
	
	var $window = $(window);
	return UiObject.extend({
		propertys:function(){

			//偏移X
			this.offsetX = 0;
			//偏移Y
			this.offsetY = 0;

			this.useMask = true;
			this.mask = null;

			this.maskOpacity = true;

			this.on('create',function(){
				this.$el.addClass('ui-layer');
				if(this.useMask){
					this.mask = new UiMask();
				}
			});
			this.on('show',function(){
				this.startAutoPosition();
				if(this.useMask){
					this.mask.show(!this.maskOpacity);
					this.mask.topIndex();
				}
				this.updatePosition();
				setTimeout(function(){
					this.updatePosition();
				}.bind(this),0);
				
				this.topIndex();
			});
			this.on('hide',function(){
				if(this.useMask){
					this.mask.hide();
				}
				this.endAutoPosition();
			});
			//自动定位的回调
			this.__autoFnName = this.randFn(function(){
				this.emit('resize');
			});
			this.on('resize',function(){
				this.updatePosition();
			});

			
		},
		initialize:function($super,options){
			$super(options);
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);

			if(!Base.isNUL(options.offsetX)){
				this.offsetX = options.offsetX;
			}

			if(!Base.isNUL(options.offsetY)){
				this.offsetY = options.offsetY;
			}

			if(!Base.isNUL(options.useMask)){
				this.useMask = options.useMask;
			}

			if(!Base.isNUL(options.maskOpacity)){
				this.maskOpacity = options.maskOpacity;
			}
		},
		getPosInfo:function(){
			if(this.$el && this.$el.length){
				var pos = UiBase.getOffsetByPage(this.$el[0]);
				var page = UiBase.getPageSize();
				return {
					top:pos.top,//控件的top
					left:pos.left,//控件的left
					width:this.$el.width(),//控件的宽
					height:this.$el.height(),//控件的高
					pageWidth:page.width,//页面的宽
					pageHeight:page.height//页面的高
				};
			}
			return null;
		},
		updatePosition:function(){
			var info = this.getPosInfo();
			if(info){
				this.$el.css({
					'margin-left':(-info.width/2 + this.offsetX) + 'px',
					'margin-top':(-info.height/2 + this.offsetY) + 'px'
				});
			}
		},
		createHTML:function(){
			return '';
		},
		startAutoPosition:function(){
			$window.on('resize',this[this.__autoFnName]);
		},
		endAutoPosition:function(){
			$window.off('resize',this[this.__autoFnName]);
		},
		show:function($super,options){
			if(options && !Base.isNUL(options.maskOpacity)){
				this.maskOpacity = options.maskOpacity;
			}
			$super(options);
		}
	});
});