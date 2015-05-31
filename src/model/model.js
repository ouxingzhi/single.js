define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		StorageAbstractStote = require('storage/store');
	
	function noop(){}

	var MODEL_STATE_INIT = 0,
		MODEL_STATE_LOADING = 1,
		MODEL_STATE_SUCCESS = 2;

	var AbstractModel = BaseEventObject.extend({
		propertys:function(){
			this.baseurl = this.buildBaseUrl();
			this.url = this.buildUrl();
			this.param = this.buildParam();
			this.result = this.buildResult();
			this.state = MODEL_STATE_INIT;
		},
		initialize:function(){

		},
		buildBaseUrl:function(){
			throw "Please override the `buildBaseUrl` method";
		},
		buildUrl:function(){
			throw "Please override the `buildUrl` method";
		},
		buildParam:function(){
			throw "Please override the `buildParam` method";
		},
		buildResult:function(){
			throw "Please override the `buildResult` method";
		},
		ajaxRequest:function(){
			throw "Please override the `ajaxRequest` method";
		},
		verifyData:function(data){
			return true;
		},
		getParam:function(){
			if(this.param instanceof StorageAbstractStote){
				return this.param.get();
			}else{
				return this.param;
			}
		},
		setParam:function(k,v){
			if(Base.type(k) === 'object'){
				Base.each(k,function(v,k){
					this.setParam(k,v);
				},this);
				return;
			}
			if(this.param instanceof StorageAbstractStote){
				this.param.setAttr(k,v);
			}else{
				if(!this.param) this.param = {};
				this.param[k] = v;
			}
		},
		delParam:function(n){
			if(Base.type(n) === 'array'){
				Base.each(n,function(n){
					this.delParam(n);
				},this);
				return;
			}
			if(this.param instanceof StorageAbstractStote){
				this.param.delAttr(n);
			}else{
				if(!this.param) this.param = {};
				delete this.param[k];
			}
		},
		getResult:function(){
			if(this.result instanceof StorageAbstractStote){
				var param = this.getParam(),
					tag = param ? JSON.stringify(param) : null;
				return this.result.get(tag);
			}else{
				return this.result;
			}
		},
		setResult:function(data){
			if(this.result instanceof StorageAbstractStote){
				var param = this.getParam(),
					tag = param ? JSON.stringify(param) : null;
				this.result.set(data,tag);
			}else{
				this.result = data;
			}
		},
		clearEvents:function(){
			this.off('success');
			this.off('error');
			this.off('abort');
		},
		request:function(events,space){
			events = events || {};
			var success = events.success || noop,
				error = events.error || noop,
				abort = events.abort || noop,
				result;

			
			if(this.state === MODEL_STATE_SUCCESS){
				result = this.getResult();
				if(result){
					success.call(space||this,result);
					return;
				}
				this.state = MODEL_STATE_INIT;
			}
			if(this.state != MODEL_STATE_SUCCESS){
				this.on('success',success,space);
				this.on('error',error,space);
				this.on('abort',abort,space);
				if(this.state === MODEL_STATE_LOADING) return;
			}

			var url = (this.baseurl.replace(/\/+$/g,'') + '/' + this.url.replace(/^\/+/g,'')),
				param = this.getParam();
			var self = this;
			this.ajaxRequest(url,param,function(data){
				if(self.verifyData(data)){
					self.setResult(data);
					self.emit('success',data);
					self.state = MODEL_STATE_SUCCESS;
				}else{
					self.emit('error',data);
					self.state = MODEL_STATE_INIT;
				}
				self.clearEvents();
			},function(e){
				self.emit('error',e);
				self.state = MODEL_STATE_INIT;
				self.clearEvents();
			});
			this.state = MODEL_STATE_LOADING;
		}
	});

	return AbstractModel;
});