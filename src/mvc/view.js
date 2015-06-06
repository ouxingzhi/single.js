define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		CommonFuns = require('common/funs');

	var createPageId = function(addSelf){
		var t = +new Date();
		return function(){
			return 'page'+ t + addSelf();
		};
	}(CommonFuns.createAddSelf());

	function noop(){}

	function eventinfo(name){
		var arr = (name || '').replace(/^\s+|\s+$/g,'').split(/\s+/);
		return {event:arr.shift(),selector:arr.join(' ')};
	}

	function buildEvents(){
		var events = this.events || {};
		Base.each(events,function(fn,name){
			var o = eventinfo(name),
				fn = Base.bind(typeof fn === 'function' ? fn : (this[fn] || noop),this);
			this.root.on(o.event,o.selector,fn);
		},this);
	}

	var CLS_VIEWROOT_BOX = 'viewroot-box',
		CLS_VIEWROOT = 'viewroot';

	var View = BaseEventObject.extend({
		elastic:true,
		propertys:function(name,hashdata,frame,app){
			this['$'] = function(s){
				return this.el.find(s);
			}.bind(this);
			this.id = createPageId();
			this.root = $('<div class="'+CLS_VIEWROOT_BOX+'"><div class="'+CLS_VIEWROOT+'"></div></div>');
			this.el = this.root.find('.'+CLS_VIEWROOT);
			this.root.attr('id',this.id);
			this.root.hide();

			this.on('addframe',function(){
			});

			buildEvents.call(this);

			this.frame = frame;

			this.app = app;

			this.name = name;

			this.hashdata = hashdata;

			this.onCreate();


		},
		setHashData:function(hashdata){
			this.hashdata = hashdata;
		},

		getRoot:function(){
			return this.root;
		},
		turning:function(){
			this.frame.turning.apply(this.frame,arguments);
		},
		onCreate:function(){

		},
		onLoad:function(){

		},
		onShow:function(){

		},
		onHide:function(){

		},
		forward:function(){
			this.app.forward.apply(this.app,arguments);
		},
		isForward:function(){
			return this.hashdata.forward;
		},
		replace:function(){
			this.app.replace.apply(this.app,arguments);
		},
		back:function(){
			this.app.back.apply(this.app,arguments);
		},
		toHead:function(pageid,options){
			this.frame.toHead(pageid,options);
		},
		showToast:function(){
			this.frame.showToast.apply(this.frame,arguments)
		},
		hideToast:function(){
			this.frame.hideToast.apply(this.frame,arguments)
		},
		showAlert:function(ops){
			this.frame.showAlert.apply(this.frame,arguments)
		},
		hideAlert:function(){
			this.frame.hideAlert.apply(this.frame,arguments)
		},
		showLoading:function(maskOpacity){
			this.frame.showLoading.apply(this.frame,arguments)
		},
		hideLoading:function(){
			this.frame.hideLoading.apply(this.frame,arguments)
		},
		showHeader:function(){
			this.frame.showHeader.apply(this.frame,arguments)
		},
		hideHeader:function(){
			this.frame.hideHeader.apply(this.frame,arguments)
		}
	});

	return View;
});