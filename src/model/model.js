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
				return this.param;
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
			}else{
				this.result = data;
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
			this.baseurl = this.buildBaseUrl();
			this.url = this.buildUrl();

			var url = (this.baseurl.replace(/\/+$/g,'') + '/' + this.url.replace(/^\/+/g,'')),
				param = this.getParam();
			var self = this;
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
			var delkeys = [];
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
			this._xhr = this.ajaxRequest(this.type,url,param,function(data){
				if(self.verifyData(data)){
					self.setResult(data);
					self.emit('success',data);
					self.state = MODEL_STATE_SUCCESS;
				}else{
					self.emit('error',data);
					self.state = MODEL_STATE_INIT;
				}
				clearEvents.call(self);
				this.isAbort = false;
			},function(e){
				if(this.isAbort){
					self.emit('abort',e);
				}else{
					self.emit('error',e);
				}
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
			
		}
	});

	return AbstractModel;
});