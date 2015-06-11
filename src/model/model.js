define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseEventObject = require('base/event'),
		CommonFuns = require('common/funs'),
		StorageAbstractStote = require('storage/store');
	
	function noop(){}

	var MODEL_STATE_INIT = 0,
		MODEL_STATE_LOADING = 1,
		MODEL_STATE_SUCCESS = 2;

	//@private 
	var clearEvents = function(){
		this.off('success');
		this.off('error');
		this.off('abort');
	};

	var preg = /\{[^\{\}]*\}/;

	var AbstractModel = BaseEventObject.extend({
		propertys:function(){
			this._xhr;
			this.type = 'post';
			//需要从param获得的get参数
			this.getfields = [];

			this.pathfields = [];
			
			this.param = this.buildParam();
			this.result = this.buildResult();
			this.state = MODEL_STATE_INIT;
		},
		initialize:function(){

		},
		setType:function(type){
			this.type = type;
		},
		/**
		 * 用于设置当前model需要从param中提取哪些参数作为get参数,在非get模式下起效。
		 */
		fieldsGet:function(){
			return [];
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
			throw "Please override the `ajaxRequest(type,url)` method";
		},
		verifyData:function(data){
			return true;
		},
		/**
		 * 获得Param的参数值
		 * @param k {String} 可选，不传则返回整个param，传则根据路径进行返回。
		 * @return {Object}
		 */
		getParam:function(k){
			if(this.param instanceof StorageAbstractStote){
				if(k){
					return this.param.getAttr(k);
				}else{
					return this.param.get();
				}
			}else{
				return JSON.parse(JSON.stringify(this.param));
			}
		},
		/**
		 * 设置参数
		 * @param k {Object|String|Number} 参数的key
		 * @param v {Object} 要设置的值
		 */
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
		/**
		 * 删除某个参数
		 * @param n {String} 要删除的键值
		 */
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
			}
		},
		
		/**
		 * 发送请求
		 * @param events {Object} 定义的事件
		 * 		|--success 	完成时的事件
		 *		|--error 	错误时的事件 
		 *		|--abort 	取消请求时的事件
		 * @param space {Object} 执行上下文
		 * @return {XMLHTTPRequest} 返回ajax对象
		 */
		request:function(events,space){
			events = events || {};
			var success = events.success || noop,
				error = events.error || noop,
				abort = events.abort || noop,
				complete = events.complete || noop,
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
				this.on('complete',complete,space);
				if(this.state === MODEL_STATE_LOADING) return;
			}
			this.baseurl = this.buildBaseUrl();
			this.url = this.buildUrl();

			var url = (this.baseurl.replace(/\/+$/g,'') + '/' + this.url.replace(/^\/+/g,'')),
				param = this.getParam() || {};
			var self = this;
			var delkeys = [];
			//当非get模式时，将允许参数加入到querystring中
			if(this.type && !this.type.match(/get/i)){
				var sf = url.indexOf('?') > -1 ? '&' : '?',
					qs = function(fileds,param){
						var vk = [];
						if(fileds === '*'){
							Base.each(param,function(v,k){
								vk.push(k + '=' + v);
							});
						}else{
							Base.each(fileds,function(k){
								if(param[k]){
									vk.push(k + '=' + param[k]);
								}
							});
						}
						
						return vk.join('&');
					}(this.fieldsGet(),param);
				if(qs){
					url = (url + sf + qs).replace(/\?{2,}/i,'?').replace(/\?&+/i,'?');
				}
				
			}
			//将参数添加到url中
			
			if(url.match(preg)){
				url = CommonFuns.formatString(url,param||{},function(key){
					delkeys.push(key);
				});
				Base.each(delkeys,function(key){
					delete param[key];
				});
			}
			this.isAbort = false;
			this.state = MODEL_STATE_LOADING;
			var me = this;
			this._xhr = this.ajaxRequest(this.type,url,param,function(data){
				if(self.verifyData(data)){
					self.setResult(data);
					self.emit('success',data,me._xhr);
					self.state = MODEL_STATE_SUCCESS;
				}else{
					self.emit('error',data,me._xhr);
					self.state = MODEL_STATE_INIT;
				}
				self.emit('complete',me._xhr);
				clearEvents.call(self);
				this.isAbort = false;
			},function(e){
				if(this.isAbort){
					self.emit('abort',e,me._xhr);
				}else{
					self.emit('error',e,me._xhr);
				}
				self.emit('complete',me._xhr);
				self.state = MODEL_STATE_INIT;
				clearEvents.call(self);
				this.isAbort = false;
			});
			return this._xhr;
		},
		/**
		 * 取消最近一次请求.
		 */
		abort:function(){
			if(this._xhr){
				this.isAbort = true;
				this._xhr.abort();	
			}
			
		},
		isLoopStop:{
			v:false
		},
		/**
		 * 循环请求接口
		 */
		loopRequest:function(s,events,space){
			if(typeof s === 'object'){
				space = events;
				events = s;
				s = 5;
			}
			this.isLoopStop.v = true;
			this.isLoopStop = {v:false};
			loop.call(this,this.isLoopStop,s,events,space);
		},
		/**
		 * 停止请求
		 */
		endLoopRequest:function(){
			this.isLoopStop.v = true;
			this._xhr && this._xhr.abort();
		}
	});
	function loop(isLoopStop,s,events,space){
		if(isLoopStop.v) return;
		events || events || {};
		var self = this;
		var callback = function(){
			setTimeout(function(){
				if(isLoopStop.v) return;
				loop.call(self,isLoopStop,s,events,space);
			},s*1000);
		}
		this.request({
			success:function(){
				events.success && events.success.apply(this,arguments);
			},
			error:function(){
				events.error && events.error.apply(this,arguments);
			},
			abort:function(){
				events.abort && events.abort.apply(this,arguments);
			},
			complete:function(){
				events.complete && events.complete.apply(this,arguments);
				callback()
			}
		},space);
	}
	return AbstractModel;
});