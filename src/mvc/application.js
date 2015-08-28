define(function(require, exports, module) {

	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		CommonUrlHash = require('common/url.hash'),
		MvcHashObserve = require('mvc/hash.observe'),
		MvcFrame = require('mvc/frame'),
		MvcFullLayout = require('mvc/layout.full');
		Log = require('base/log');
		
	var Application = BaseEventObject.extend({
		propertys:function(){
			this.state = Application.STATE_STOP_HASH_OBSERVE;
			this.config;
			this.hashobserve = new MvcHashObserve();
			this.layout;
			this.frames = {};

			this.forwardId = '~~~forward~~~';

			this.cfgframes = {};
		},
		initialize:function(config){
			this.config = config;
			this.setOption(config);
			Log.log('application:initialize','application');
			this.initLayout();
			this.initFrame();
		},
		setOption:function(config){
			if(!Base.isNUL(config.layout)){
				this.layout = config.layout;
			}
			if(!Base.isNUL(config.frames)){
				this.cfgframes = config.frames;
			}
			if(!Base.isNUL(config.forwardId)){
				this.forwardId = config.forwardId;
			}

		},
		getConfig:function(){
			return this.config;
		},
		initLayout:function(){
			if(!this.layout){
				this.layout = MvcFullLayout();
			}
			$('body').prepend(this.layout.getRoot());
		},
		initFrame:function(){
			var hashdata = this.hashobserve.getCurHashData();
			var frame = hashdata.frame || this.config.defaultFrame;
			Base.each(this.cfgframes,function(cfg,fname){
				var framebox = (this.layout.getFrameBoxs() || {})[cfg.framebox];
				if(framebox){
					this.frames[fname] = new MvcFrame({
						app:this,
						name:fname,
						viewpath:cfg.viewpath || this.config.viewpath,
						transtion:cfg.transtion,
						framebox:framebox,
						config:this.config,
						defaultView:cfg.defaultView || this.config.defaultView || 'index'
					});
					if(frame === fname){
						this.frames[fname].hashChange(hashdata);
					}else{
						this.frames[fname].hashChange(new CommonUrlHash(''));
					}
				}else{
					Log.err('framebox not found!','application');
				}
			},this);
		},
		onHashChange:function(data,replace){
			var frame = data.frame || this.config.defaultFrame;
			data.forward = this.checkForward(data);
			if(replace){
				var hash = '#' + data.buildUrl();
				history.replaceState({},'',hash);
			}
			if(this.frames[frame]){
				this.frames[frame].hashChange(data);
			}
		},
		checkForward:function(data){
			var index,hash;
			if(this.forwardId && (index = data.ids.indexOf(this.forwardId)) > -1){
				data.ids.splice(index,1);
				hash = '#' + data.buildUrl();
				history.replaceState({},'',hash);
				return true;
			}
			return false;
		},
		startHashObserve:function(){
			this.state = Application.STATE_LOADING_HASH_OBSERVE;
			this.hashobserve.add(this.onHashChange,this).start();
			//this.hashobserve.trigger();
		},
		endHashObserve:function(){
			this.state = Application.STATE_STOP_HASH_OBSERVE;
			this.hashobserve.clear();
		},
		start:function(){
			if(this.state === Application.STATE_STOP_HASH_OBSERVE){
				this.startHashObserve();
			}
		},
		stop:function(){
			this.endHashObserve();
		},
		forward:function(url){
			location.hash = url + '|' + this.forwardId;
		},
		replace:function(url){
			var hash = url + '|' + this.forwardId;
			//var hashdata = new CommonUrlHash(hash);
			//this.onHashChange(hashdata,true);
			location.replace('#'+hash);
		},
		back:function(url){
			if(url){
				location.replace(('#' + url).replace(/^#+/,'#'));
			}else{
				history.back();
			}
		}
	});

	//监听停止
	Application.STATE_STOP_HASH_OBSERVE = 0;
	//监听中
	Application.STATE_LOADING_HASH_OBSERVE = 1;


	
	return Application;
});