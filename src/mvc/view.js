define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		CommonFuns = require('common/funs'),
		Scroll = require('common/scroll');

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
			this.id = createPageId();
			this.root = $('<div class="'+CLS_VIEWROOT_BOX+'"><div class="'+CLS_VIEWROOT+'"></div></div>');
			this.el = this.root.find('.'+CLS_VIEWROOT);
			this.root.attr('id',this.id);
			this.root.hide();

			this.on('addframe',function(){
				/*this.scroll = new Scroll({
					box:this.root[0],
		            elastic:this.elastic,
		            elasticX:false
				});*/
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
			this.frame.turning();
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
		header:function(options){
			options = options || {};
		},
		toHead:function(pageid,options){
			this.frame.toHead(pageid,options);
		}
	});

	return View;
});