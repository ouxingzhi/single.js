define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		BaseHash = require('base/hash'),
		Promise = require('base/promise'),
		CommonUrlHash = require('common/url.hash'),
		MvcHeader = require('mvc/header'),
		MvcTransitionDefault = require('mvc/transition.default');

	var CLS_FRAME_BOX = 'fly-frame-box',
		CLS_FRAME_HEAD = 'fly-frame-head',
		CLS_FRAME_VIEWPORT = 'fly-frame-viewport',
		CLS_FRAME_FOOT = 'fly-frame-foot',
		framehtml = [
			'<div class="'+CLS_FRAME_BOX+'">',
				'<div class="'+CLS_FRAME_HEAD+'"></div>',
				'<div class="'+CLS_FRAME_VIEWPORT+'">',

				'</div>',
				'<div class="'+CLS_FRAME_FOOT+'"></div>',
			'</div>'
		].join('');



	var Frame = BaseEventObject.extend({
		propertys:function(){
			this.app;

			this.root = $(framehtml);

			this.viewhead = this.root.find('.' + CLS_FRAME_HEAD);

			this.viewport = this.root.find('.' + CLS_FRAME_VIEWPORT);

			this.viewfoot = this.root.find('.' + CLS_FRAME_FOOT);

			this.header = new MvcHeader({
				box:this.viewhead
			});

			this.name;

			this.views = new BaseHash();

			this.hashdata = {};

			this.viewpath = './src/views';

			this.framebox;

			this.defaultView = 'index';

			this.transtion = MvcTransitionDefault;

			this.lastView;

			this.curView;
		},
		initialize:function($super,cfg){
			$super();

			this.setOption(cfg);
			this.initDom();
			//this.hashChange(CommonUrlHash.parse(this.defaultView));
		},
		setOption:function(cfg){
			if(!Base.isNUL(cfg.app)){
				this.app = cfg.app;
			}

			if(!Base.isNUL(cfg.name)){
				this.name = cfg.name;
			}

			if(!Base.isNUL(cfg.viewpath)){
				this.viewpath = cfg.viewpath;
			}

			if(!Base.isNUL(cfg.framebox)){
				this.framebox = cfg.framebox;
			}

			if(!Base.isNUL(cfg.defaultView)){
				this.defaultView = cfg.defaultView;
			}

			if(!Base.isNUL(cfg.transtion)){
				this.transtion = cfg.transtion;
			}
		},
		getRoot:function(){
			return this.root;
		},
		initDom:function(){
			this.framebox.append(this.root);
		},
		hashChange:function(hashdata){
			if(!hashdata.view){
				hashdata = CommonUrlHash.parse(this.defaultView);
			}
			this.hashdata = hashdata;
			this.header.setForward(this.hashdata.forward);
			this.toView(hashdata.view,hashdata);
		},
		toView:function(viewname,hashdata){
			var self = this;
			this.getView(viewname,hashdata).then(function(resolve,reject,view){
				self.lastView = self.curView || view;
				self.curView = view;
				view.onLoad();
			});
		},
		turning:function(){
			if(this.curView === this.lastView){
				this.curView.getRoot().show();
				this.curView.onShow();
			}else{
				this.transferView(this.lastView,this.curView,function(){
					this.lastView.onHide();
					this.curView.onShow();
				});
			}
		},
		getView:function(viewname,hashdata){
			var view = this.views.get(viewname);
			var promise = new Promise();
			if(view){
				view.setHashData(hashdata);
				promise.resolve(view);
			}else{
				this.loadView(viewname,function(View){
					var view = new View(viewname,hashdata,this,this.app);
					this.viewport.append(view.getRoot());
					view.emit('addframe');
					this.views.push(viewname,view);
					view.onCreate();
					promise.resolve(view);
				});
			}
			return promise;
		},
		loadView:function(viewname,callback){
			var fullpath = this.buildFullPath(viewname),
				self = this;
			seajs.use([fullpath],function(View){
				callback.call(self,View);
			});
		},
		buildFullPath:function(viewname){
			return (this.viewpath + '/' + viewname).replace(/\/+/g,'/') + '.js';
		},
		transferView:function(lastView,curView,callback){
			if(this.hashdata.forward){
				this.transtion.into(lastView.getRoot(),curView.getRoot(),function(){
					callback.call(this);
				},this);
			}else{
				this.transtion.out(lastView.getRoot(),curView.getRoot(),function(){
					callback.call(this);
				},this);
			}
		},
		forward:function(hash){
			var data = CommonUrlHash.parse(hash);
			if(!data.frame || data.frame === this.name){
				this.hashChange(data);
			}
		},
		back:function(){
			history.back();
		},
		toHead:function(pageid,options){
			this.header.to(pageid,options);
		}
	});
	return Frame;
});