define(function(require){
		//以下主要是给js掉app的回调

	var API_URL_PROTOCOL = 'ttpodsmm',
		API_URL_JS_REQUEST = 'js_request',
		API_APP_SPACE = 'app.',
		API_P_SERVICE = 'service',
		API_P_PARAM = 'params',
		API_P_ACK = 'ack',
		API_P_CALLBACK = 'callback',
		API_P_ERROR = 'error',
		API_P_CANCEL = 'cancel',
		API_P_CONFIRM = 'confirm',
		//以下主要给app调js时的回调
		API_URL_JS_CALLBACK = 'js_callback',
		API_URL_JS_ERROR = 'js_error',
		API_URL_JS_CANCEL = 'js_cancel',
		API_URL_JS_CONFIRM = 'js_confirm';

	function getBody(){
		var b = document.getElementsByTagName('body');
		return b && b[0];
	}
	//发送消息
	function send(src){
		var ifr = document.createElement('iframe');
		ifr.src = src;
		ifr.style.display = 'none';
		var body = getBody();
		if(body){
			body.appendChild(ifr);
			setTimeout(function(){
				body.removeChild(ifr);
				ifr = null;
			},200);
		}
	}
	//创建回调

	//创建唯一的ack
	var createAck = function(t){
		var i = 0;
		return function(){
			return t + i++; 
		};
	}(new Date().valueOf() + ~~(Math.random()*1e8));

	//爆出
	var AppBase = function(){
		var callbacks = {},
			errors = {},
			cancels = {},
			confirms = {};

		var runcall = function(list,ack,args){
			var obj = list[ack];
			args = [].slice.call(args,1);
			if(obj){
				obj.fn.apply(obj.space||this,args);
				if(obj.onlyone){
					delete list[ack];
					obj.fn = obj.space = null;
				}
			}
		};

		var appInterface = {};
		appInterface[API_P_CALLBACK] = function(ack){
			runcall(callbacks,ack,arguments);
		};
		appInterface[API_P_ERROR] = function(ack){
			runcall(errors,ack,arguments);
		};
		appInterface[API_P_CANCEL] = function(ack){
			runcall(cancels,ack,arguments);
		};
		appInterface[API_P_CONFIRM] = function(ack){
			runcall(confirms,ack,arguments);
		};
		//暴露给window
		window.app = appInterface;

		function buildcb(fn,space,onlyone){
			return {
				fn:fn,
				space:space,
				onlyone:onlyone
			};
		}

		function add(ack,fn,type,space,onlyone){
			switch(type){
				case API_P_CALLBACK:
					callbacks[ack] = buildcb(fn,space,onlyone);
					break;
				case API_P_ERROR:
					errors[ack] = buildcb(fn,space,onlyone);
					break;
				case API_P_CANCEL:
					cancels[ack] = buildcb(fn,space,onlyone);
					break;
				case API_P_CONFIRM:
					confirms[ack] = buildcb(fn,space,onlyone);
					break;
				default:
					return null;
			}
		}
		function delRef(obj){
			delete obj.fn;
			delete obj.space;
			delete obj.onlyone
		}
		function remove(ack){
			callbacks[ack] && delRef(callbacks[ack]);
			delete callbacks[ack];
			errors[ack] && delRef(errors[ack]);
			delete errors[ack];
			cancels[ack] && delRef(cancels[ack]);
			delete cancels[ack];
			confirms[ack] && delRef(confirms[ack]);
			delete confirm[ack];
		}

		function createUrl(service,params,options){
			var l = [];
			l.push(API_P_SERVICE + '=' + service);
			if(params){
				l.push(API_P_PARAM + '=' + encodeURIComponent($.param(params)));
			}
			options = options || {};
			//事件
			var ack = createAck();
			if(typeof options.callback === 'function'){
				add(ack,options.callback,API_P_CALLBACK,options.space,options.onlyone);
				l.push(API_P_CALLBACK + '=' + API_APP_SPACE + API_P_CALLBACK);
			}
			if(typeof options.error === 'function'){
				add(ack,options.error,API_P_ERROR,options.space,options.onlyone);
				l.push(API_P_ERROR + '=' + API_APP_SPACE + API_P_ERROR);
			}
			if(typeof options.cancel === 'function'){
				add(ack,options.cancel,API_P_CANCEL,options.space,options.onlyone);
				l.push(API_P_CANCEL + '=' + API_APP_SPACE + API_P_CANCEL);
			}

			add(ack,function(){
				options.confirm && options.confirm.call(this);
				clearTimeout(timer);
			},API_P_CONFIRM,options.space,options.onlyone);
			l.push(API_P_CONFIRM + '=' + API_APP_SPACE + API_P_CONFIRM);

			var timer = setTimeout(function(){
				options.timeoutfn && options.timeoutfn.call(options.space);
				remove(ack);
			},(options.timeout||30)*1000);

			l.push(API_P_ACK + '=' + ack);
			
			return {
				url:API_URL_PROTOCOL + '://' + API_URL_JS_REQUEST + '?' + l.join('&'),
				ack:ack
			};
		}

		return {
			setProtocol:function(head){
				API_URL_PROTOCOL = head;
			},

			/**
			 * 用于创建一个回调函数，返回一个ack
			 * @param fn {Function} 要执行的回调
			 * @param space {Object} 执行上下文
			 * @param onlyone {Boolean} 是否只执行一次
			 */
			create:function(fn,space,onlyone){
				var ack = createAck();
				add(ack,fn,API_P_CALLBACK,space,onlyone);
				return ack;
			},
			/**
			 * 用于调用app提供的服务
			 * @param service {String} 必填 服务名称，为英文字符串
			 * @param options {Object} 参数
			 *			|- params {Object} 可选 传给app的参数
			 *			|- callback {Function} 可选 回调函数
			 *			|- error {Function} 可选 错误回调
			 *			|- cancel {Function} 可选 取消回调
			 *			|- confirm {Function} 可选 确认回调
			 *			|- space {Object} 可选 以上回调函数中上下文
			 */
			call:function(service,options){
				options = options || {};
				var obj = createUrl(service,options.params,options);
				send(obj.url);
				return obj.ack;
			},
			/**
			 * 删除某一次的回调
			 * @param ack {Number} 要删除的ack
			 */
			del:function(ack){
				remove(ack);
			}
		};
	}();

	return AppBase;
});