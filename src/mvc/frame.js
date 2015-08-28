define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		BaseHash = require('base/hash'),
		Promise = require('base/promise'),
		CommonFuns = require('common/funs'),
		CommonUrlHash = require('common/url.hash'),
		MvcHeader = require('mvc/header'),
		MvcTransitionDefault = require('mvc/transition.default'),
		MvcTransitionUpDown = require('mvc/transition.updown'),
		MvcTransitionNotAnime = require('mvc/transition.notanime');

		//常用ui组件
	var UiDialog = require('ui/dialog'),
		UiToast = require('ui/toast'),
		UiLoading = require('ui/loading');



	var CLS_FRAME_BOX = 'single-frame-box',
		CLS_FRAME_HEAD = 'single-frame-head',
		CLS_FRAME_VIEWPORT = 'single-frame-viewport',
		CLS_FRAME_FOOT = 'single-frame-foot',
		framehtml = [
			'<div class="'+CLS_FRAME_BOX+'">',
				'<div class="'+CLS_FRAME_HEAD+'"></div>',
				'<div class="'+CLS_FRAME_VIEWPORT+'">',

				'</div>',
				'<div class="'+CLS_FRAME_FOOT+'"></div>',
			'</div>'
		].join('');

		/**
		 * @private getToast()
		 */
	var getToast = CommonFuns.createSingle(UiToast),
		/**
		 * @private getDialog()
		 */
		getDialog = CommonFuns.createSingle(UiDialog),
		/**
		 * @private getLoading()
		 */
		getLoading = CommonFuns.createSingle(UiLoading);

	var Frame = BaseEventObject.extend({
		propertys:function(){
			this.app;

			this.root = $(framehtml);

			this.viewhead = this.root.find('.' + CLS_FRAME_HEAD);

			this.viewport = this.root.find('.' + CLS_FRAME_VIEWPORT);

			this.viewfoot = this.root.find('.' + CLS_FRAME_FOOT);

			this.header = new MvcHeader({
				box:this.viewhead,
				frame:this
			});


			this.name;

			this.views = new BaseHash();

			this.hashdata = {};

			this.viewpath = './src/views';

			this.framebox;

			this.defaultView = 'index';

			this.transtions = {
				'default':MvcTransitionDefault,
				'updown':MvcTransitionUpDown,
				'notanimte':MvcTransitionNotAnime
			};

			this.defaultTranstion = 'default';

			this.lastView;

			this.curView;
		},
		initialize:function($super,cfg){
			$super();

			this.setOption(cfg);
			this.initDom();
			//this.hashChange(CommonUrlHash.parse(this.defaultView));

			if(this.app.config.hideHeader){
				this.header.hide();
			}
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

			if(!Base.isNUL(cfg.transtions)){
				Base.mix(this.transtions,cfg.transtions);
			}

			if(!Base.isNUL(cfg.config.defaultTranstion)){
				this.defaultTranstion = cfg.config.defaultTranstion;
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
				hashdata = new CommonUrlHash(this.defaultView)
				//hashdata = CommonUrlHash.parse(this.defaultView);
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
				view.emit('onLoadBefore',self.lastView.hashdata.view);
				view.onLoad(self.lastView.hashdata.view);
				view.emit('onLoadAfter',self.lastView.hashdata.view);
			});
		},
		turning:function(transtype){
			var lastView = this.lastView || this.curView;
			if(this.curView === this.lastView){
				this.curView.getRoot().show();
				this.curView.emit('onShowBefore',lastView.hashdata.view);
				this.curView.onShow(lastView.hashdata.view);
				this.curView.emit('onShowAfter',lastView.hashdata.view);

			}else{
				this.transferView(transtype,this.lastView,this.curView,function(){
					this.lastView.emit('onHideBefore');
					this.lastView.onHide();
					this.lastView.emit('onHideAfter');

					this.curView.emit('onShowBefore',lastView.hashdata.view);
					this.curView.onShow(lastView.hashdata.view);
					this.curView.emit('onShowAfter',lastView.hashdata.view);
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
					if(View){
						var view = new View(viewname,hashdata,this,this.app);
						this.viewport.append(view.getRoot());
						view.emit('addframe');
						this.views.push(viewname,view);
						promise.resolve(view);
					}else{
						throw new Error('not found `'+viewname+'.js`');
					}
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
		getCurrentView:function(){
			return this.curView || this.lastView;
		},
		buildFullPath:function(viewname){
			return (this.viewpath + '/' + viewname).replace(/\/+/g,'/') + '.js';
		},
		transferView:function(transtype,lastView,curView,callback){
			var fn = this.getTransferFn(transtype);
			fn(lastView.getRoot(),curView.getRoot(),function(){
				callback.call(this);
			},this);
		},
		getTransferFn:function(transtype){
			var fn;
			transtype = transtype || this.defaultTranstion;
			
			switch(transtype){
				case 'left':
					fn = MvcTransitionDefault.into;
					break;
				case 'right':
					fn = MvcTransitionDefault.out;
					break;
				case 'top':
					fn = MvcTransitionUpDown.into;
					break;
				case 'bottom':
					fn = MvcTransitionUpDown.out;
					break;
				default:
					var transtion = this.transtions[transtype] || MvcTransitionDefault;
					if(this.hashdata.forward){
						fn = transtion.into;
					}else{
						fn = transtion.out;
					}
			}
			return fn;
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
		},
		showToast:function(content,timeout,callback){
			getToast().show({
				content:content,
				timeout:timeout,
				callback:callback
			});
		},
		hideToast:function(){
			getToast().hide()
		},
		showAlert:function(content,buttons,title,showTitle){

			getDialog().show({
				title:title || '标题',
				content:content || '',
				buttons:buttons,
				hideTitle:!showTitle
			});
		},
		hideAlert:function(){
			getDialog().hide();
		},
		showLoading:function(maskOpacity){
			getLoading().show({maskOpacity:maskOpacity});
		},
		hideLoading:function(){
			getLoading().hide();
		},
		showHeader:function(){
			this.header.show();
		},
		hideHeader:function(){
			this.header.hide();
		}
	});
	return Frame;
});