define(function(require){
	var UiBase = require('ui/base');
	var UiObject = require('ui/object');
	var Base = require('base/base');
	var CommonFuns = require('common/funs');


	var CLS_SLIDE_BOX = 'ui-slide-box',
		CLS_SLIDE_SUBBOX = 'ui-slide-sub-box',
		CLS_SLIDE_ITEM = 'ui-slide-item',
		CLS_SLIDE_TRANS = 'ui-slide-trans',
		CLS_SLIDE_NAV = 'ui-slide-nav',
		CLS_SLIDE_CUR_NAV = 'ui-slide-cur-nav';


	var item_tpl = '<div class="'+CLS_SLIDE_ITEM+'"></div>';

	/**
	 * @private createItem
	 */
	function createItem(dom){
		var d = $(item_tpl);
		d.append(dom);
		return d;
	}
	/**
	 * @private initDom
	 */
	function initDom(){
		if(this.items){
			Base.each(this.items,function(o){
				this.add(o);
			},this);
		}
		this.subbox = this.$el.find('.'+CLS_SLIDE_SUBBOX);
	}

	/**
	 * @private calcSize
	 */
	function calcSize(){
		var w = this.$el.width(),
			d = this.$el.find('.'+CLS_SLIDE_ITEM),
			tw = d.length * w;
		this.$el.find('.'+CLS_SLIDE_SUBBOX).css('width',tw+'px');
		d.width(w);
	}

	/**
	 * @private buildEvent
	 */
	function buildEvent(){
		this.$el[0].addEventListener('touchstart',this,false);
		this.$el[0].addEventListener('touchmove',this,false);
		this.$el[0].addEventListener('touchend',this,false);
	}

	return UiObject.extend({
		propertys:function(){
			this.on('create',function(){
				this.$el.addClass(CLS_SLIDE_BOX);
				initDom.call(this);
				buildEvent.call(this);
				this.to(this.index);
			});
			this.itemWidth = 0;
			this.length = 0;
			this.on('sizechange',function(){
				var items = this.$el.find('.'+CLS_SLIDE_ITEM);
				this.length = items.length;
			});
			this.on('show',calcSize);
			this.on('show',function(){
				calcSize.call(this);
				var items = this.$el.find('.'+CLS_SLIDE_ITEM);
				this.itemWidth = items.width();
			});
			this.items = [];

			this.index = 0;

		},
		createHTML:function(){
			return [
				'<div class="'+CLS_SLIDE_SUBBOX+'"></div>',
				'<div class="'+CLS_SLIDE_NAV+'"></div>'
			].join('');
		},
		initialize:function($super,options){
			$super(options);
			
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);
			if(options.items){
				this.items = options.items;
			}

			if(options.index){
				this.index = options.index;
			}
		},
		tx:0,
		dx:0,
		handleEvent:function(e){
			var t = e.changedTouches[0],fx;
			switch(e.type){
				case 'touchstart':
					this.subbox.removeClass(CLS_SLIDE_TRANS);
					this.tx = t.pageX;
					this.dx = parseInt(UiBase.getTranslate(this.subbox).x || 0);

					break;
				case 'touchmove':
					fx = t.pageX - this.tx;
					var x = this.dx+fx;
					if(x > 0){
						x = 0;
					}else if(x < -(this.itemWidth * Math.max(this.length-1,0))){
						x = -(this.itemWidth * Math.max(this.length-1,0));
					}
					UiBase.setTranslate(this.subbox,{x:x + 'px',y:'0px',z:'0px'});

					break;
				case 'touchend':
				case 'touchcancel':
					fx = t.pageX - this.tx;
					this.subbox.addClass(CLS_SLIDE_TRANS);
					setTimeout(function(){
						if(Math.abs(fx)<20){
							UiBase.setTranslate(this.subbox,{x:this.dx + 'px',y:'0px',z:'0px'});
							return;
						}
						if(fx>0){
							this.pre();
						}else{
							this.next();
						}
					}.bind(this),0);
					
					
					break;
			}
		},
		//加入一个页面
		add:function(dom,index){
			if(this.$el){
				var dom = createItem.call(this,dom);
				if(typeof index === 'number' && index != NaN){
					if(index < 0){
						this.$el.find('.'+CLS_SLIDE_ITEM).eq(0).before(dom);
					}else{
						this.$el.find('.'+CLS_SLIDE_ITEM).eq(index).after(dom);
					}
				}else{
					this.$el.find('.'+CLS_SLIDE_SUBBOX).append(dom);
				}
				var id = this.createDomId();
				dom.attr('id',id);
				var navbox = this.$el.find('.'+CLS_SLIDE_NAV),
					nav = $('<span></span>');
				nav.attr('id','from-'+id);
				navbox.append(nav);
				this.emit('sizechange');
			}

		},
		//删除一个页面
		remove:function(index){
			if(this.$el){
				var el = this.$el.find('.'+CLS_SLIDE_ITEM).eq(index);
				if(el.length){
					el.remove();
					this.emit('sizechange');
				}
				
			}
		},
		//转移到某一页
		to:function(index){
			var left = 0;
			if(index >= this.length){
				index = Math.max(this.length-1,0);
			}
			if(index < 0){
				index = 0;
			}
			left = -(this.$el.width() * index);
			//this.$el.find('.'+CLS_SLIDE_SUBBOX).css('left',left + 'px');
			UiBase.setTranslate(this.$el.find('.'+CLS_SLIDE_SUBBOX),{x:left + 'px',y:'0px',z:'0px'});
			var n = this.$el.find('.'+CLS_SLIDE_NAV).find('span').eq(index);
			n.addClass(CLS_SLIDE_CUR_NAV);
			n.siblings().removeClass(CLS_SLIDE_CUR_NAV);
			this.index = index;

		},
		//上一页
		pre:function(){
			this.to(this.index-1);
		},
		//下一页
		next:function(){
			this.to(this.index+1);
		}
	});
});