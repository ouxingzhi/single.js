define(function(require, exports, module) {
	"use strict";
	var Base = require('base/base');
	function noop(){};

	function injectfn(supfn,subfn){
		supfn = supfn || noop;
		subfn = subfn || noop;
		return function(){
			var args = [Base.bind(supfn,this)].concat(Base.toArray(arguments));
			return subfn.apply(this,args);
		};
	}

	var matchParam = /^\s*function[^\(\)]*\(\s*\$super/;
	
	/**
	 * class构造器
	 * @param supClass {Function} 父类构造器
	 * @param subPropertys {Object} 子类定义
	 * @return {Function} 返回子类 
	 */

	var ID = {};

	var notInheritPropertys = {
		constrcutor:ID,
		propertys:ID,
		initialize:ID
	};

	function newObj(fn){
		var f = function(){};
		f.prototype = fn.prototype;
		return new f();
	}


	function CClass(supClass,subPropertys){
		
		if(typeof supClass === 'object'){
			subPropertys = supClass;
			supClass = function(){};
		}

		var supProto = supClass.prototype,
			i;

		function Class(){
			if(!(this instanceof Class)){
				var obj = newObj(Class);
				Class.apply(obj,arguments);
				return obj;
			}
			this.propertys.apply(this,arguments);
			this.initialize.apply(this,arguments);
		};

		function empty(){}
		empty.prototype = supClass.prototype;
		Class.prototype = new empty();

		for(i in subPropertys){
			if(subPropertys.hasOwnProperty(i) && notInheritPropertys[i] !== ID){
				if(subPropertys[i] && subPropertys[i].toString().match(matchParam)){
					if(typeof supProto[i] === 'function'){
						Class.prototype[i] = injectfn(supProto[i],subPropertys[i]);
					}else{
						Class.prototype[i] = injectfn(function(){},subPropertys[i]);
					}
					
				}else{
					Class.prototype[i] = subPropertys[i];
				}
			}
		}

		Class.prototype.propertys = function(supPropertys,subPropertys){
			return function(){
				supPropertys && supPropertys.apply(this,arguments);
				subPropertys && subPropertys.apply(this,arguments);
			};
		}(Class.prototype.propertys,subPropertys.propertys);

		if(subPropertys.initialize && subPropertys.initialize.toString().match(matchParam)){
			Class.prototype.initialize = injectfn(supProto.initialize,subPropertys.initialize);
		}else{
			Class.prototype.initialize = subPropertys.initialize || noop;
		}
		Class.prototype.constructor = Class;

		
		for(i in supClass){
			if(supClass.hasOwnProperty(i) && i !== 'instance'){ //不复制单例实例
				Class[i] = supClass[i];
			}
		}
		/**
		 * 继承当前类
		 * @param subPropertys {Object} 子类的定义
		 * @return {Function} 
		 */
		Class.extend = function(subPropertys){
			return CClass(this,subPropertys);
		};
		/**
		 * 当前类增加新的方法或属性
		 * @param propertys 要添加方法或属性
		 *
		 */
		Class.addPropertys = function(propertys){
			var supProto = this.prototype;
			for(i in propertys){
				if(propertys.hasOwnProperty(i) && notInheritPropertys[i] !== ID){
					if(typeof supProto[i] === 'function' && propertys[i].toString().match(matchParam)){
						supProto[i] = injectfn(supProto[i],propertys[i]);
					}else{
						supProto[i] = propertys[i];
					}
				}
			}
			return this;
		};
		/**
		 * 单例方法
		 * @return {Object}
		 */
		Class.getInstance = function(){
			if(this.instance) return this.instance;
			this.instance = {__proto__:this.prototype};
			this.apply(this.instance,arguments);
			return this.instance;
		}

		/**
		 * 创建惰性new的方法
		 * @return {Function}
		 */
		Class.createLazyFun = function(){
			var instance,self = this;
			return function(){
				if(instance) return instance;
				return instance = self.getInstance();
			}	
		};

		return Class;

	}

	return CClass;
});