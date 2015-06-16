define(function(){

	var slice = Array.prototype.slice,
		indexOf = Array.prototype.indexOf || function(val){
			for(var i=0,len=this.length;i<len;i++){
				if(val === this[i]) return i;
			}
			return -1;
		},
		bind = function(fn,space){
			return fn.bind ? fn.bind(space) : function(){
				return fn.apply(space,arguments);
			};
		}

	/**
	 * Promise 
	 */

	function Promise(factory){
		this.state = Promise.STATE_UNFULFILLED;

		this.resolveCallbacks = [];
		this.rejecteCallbacks = [];
		if(factory){
			setTimeout(function(){
				factory(bind(this.resolve,this),bind(this.reject,this));
			},0);
		}
	}

	//未完成
	Promise.STATE_UNFULFILLED = 0;
	//已完成
	Promise.STATE_RESOLVED = 1;
	//已拒绝
	Promise.STATE_REJECTED = 2;

	Promise.prototype = {
		constructor:Promise,
		when:function(){

			var newPromise = new Promise();
			var promises = slice.call(arguments);
			var datas = [];
			var self = this;
			var resolve = function(data){
					if(self.state !== Promise.STATE_UNFULFILLED) return;
					var index = indexOf.call(promises,this);
					if(index > -1){
						promises.splice(index,1);
						datas[index] = data;
					}
					if(!promises.length){
						newPromise.resolve(datas);
						self.state = Promise.STATE_RESOLVED;
					}
				},
				reject = function(){
					if(self.state !== Promise.STATE_UNFULFILLED) return;
					var index = indexOf.call(promises,this);
					if(index > -1){
						promises.splice(index,1);
					}
					if(!promises.length){
						newPromise.reject();
						self.state = Promise.STATE_REJECTED;
					}
				};
			if(promises.length){
				for(var i=0,len=promises.length;i<len;i++){
					if(!(promises[i] instanceof Promise)) throw "when() Parameter must be a type of Promise";
					promises[i].then(resolve,reject);
				}
			}else{
				setTimeout(function(){
					self.resolve();
				},0);
			}
			return newPromise;
		},
		then:function(resolvefn,rejectefn){
			var promise = new Promise();
			var self = this;
			if(resolvefn){
				this.resolveCallbacks.push(function(){
					var args = [bind(promise.resolve,promise),bind(promise.reject,promise)].concat(slice.call(arguments));
					resolvefn.apply(self,args);
				});
			}
			if(rejectefn){
				this.rejecteCallbacks.push(function(){
					var args = [bind(promise.reject,promise)].concat(slice.call(arguments));
					var result = rejectefn.apply(self,args);
				});
			}
			return promise;
		},
		resolve:function(){
			var args = arguments;
			setTimeout($.proxy(function(){
				if(this.state !== Promise.STATE_UNFULFILLED) return;
				for(var i=0,len=this.resolveCallbacks.length;i<len;i++){
					this.resolveCallbacks[i].apply(this,args);
				}
				this.state = Promise.STATE_RESOLVED;
			},this),0);
		},
		reject:function(){
			var args = arguments;
			setTimeout($.proxy(function(){
				if(this.state !== Promise.STATE_UNFULFILLED) return;
				for(var i=0,len=this.rejecteCallbacks.length;i<len;i++){
					this.rejecteCallbacks[i].apply(this,args);
				}
				this.state = Promise.STATE_REJECTED;
			},this),0);
		}
	};

	return Promise;
});