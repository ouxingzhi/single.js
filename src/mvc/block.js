define(function(require){
	var Base = require('base/base'),
		CommonFuns = require('common/funs'),
		BaseEventObject = require('base/event');
	function eventinfo(name){
		var arr = (name || '').replace(/^\s+|\s+$/g,'').split(/\s+/);
		return {event:arr.shift(),selector:arr.join(' ')};
	}

	function buildEvents(events,root,space){
		events = events || {};
		Base.each(events,function(fn,name){
			var o = eventinfo(name),
				fn = Base.bind(typeof fn === 'function' ? fn : noop,space || this);
			root.on(o.event,o.selector,fn);
		},this);
	}

	var addZIndex = CommonFuns.createAddSelf(1500);

	var CLS_CURRENT_BLOCK_VIEW = 'cur-block-view';
	var CLS_BLOCK_VIEW ='block-view';

	return BaseEventObject.extend({
		propertys:function(){
			this.frame;
			this.box;
			this.forward = false;
			this.views = {};
			this.transition = null;
		},
		getPreFix:function(){
			return 'block';
		},
		initialize:function($super,options){
			$super(options);
			this.setOption(options);
		},
		setOption:function(options){
			options = options || {};
			if(!Base.isNUL(options.box)){
				this.box = options.box;
			}
			if(!Base.isNUL(options.frame)){
				this.frame = options.frame;
			}
		},
		/**
		 * 切换界面
		 * @param pageid {Number} pageid对应的block
		 */
		to:function(pageid,options){
			var id = this.getPreFix()+pageid;
			var view = this.box.find('#'+id);
			if(!view.length){
				view = $('<div class="'+CLS_BLOCK_VIEW+'" id="'+id+'"></div>');
				this.box.append(view);
			}
			if(options.template){
				var data = options.data || {};
				var html = _.template(options.template)(data);
				view.html(html);
				if(options.events){
					view.off();
					buildEvents(options.events,view,options.space);
				}

				if(this.transition){
					var lastView = view.siblings('.'+CLS_CURRENT_BLOCK_VIEW);
					if(lastView.length){
						if(this.forward){
							this.transition.into(lastView,view,function(){
								lastView.removeClass(CLS_CURRENT_BLOCK_VIEW);
								view.addClass(CLS_CURRENT_BLOCK_VIEW);
							});
						}else{
							this.transition.out(lastView,view,function(){
								lastView.removeClass(CLS_CURRENT_BLOCK_VIEW);
								view.addClass(CLS_CURRENT_BLOCK_VIEW);
							});
						}
					}else{
						view.addClass(CLS_CURRENT_BLOCK_VIEW);
					}
				}else{
					view.siblings().removeClass(CLS_CURRENT_BLOCK_VIEW);
					view.addClass(CLS_CURRENT_BLOCK_VIEW);
				}
			}
		},
		/*
		 * 用于设置状态 
		 */
		setForward:function(forward){
			this.forward = forward;
		}
	});
});