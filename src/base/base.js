define(function(){
	"use strict";
	var aproto = Array.prototype,
		aslice = aproto.slice,
		otoString = Object.prototype.toString;

	var base = {};

	base.hasProp = function(o,n){
		return o.hasOwnProperty(n);
	};

	var typeset = {};
	/**
	 * 获得对象的类型
	 * @param {Object} o 要获得类型的对象
	 * @return {String} 类型字符串 
	 */
	base.type = function(o){
		if(o === undefined) return 'undefined';
		if(o === null) return 'null';
		var t = otoString.call(o);
		if(typeset[t]) return typeset[t];
		var tv = t.replace(/^\[object\s+|\]$/g,'').toLowerCase();
		return typeset[t] = tv;
	};
	/**
	 * 循环
	 * @param {Object|Array} l 要循环的数组
	 * @param {Function} fn 处理函数
	 * @param {Object} space 执行上下文
	 * @param {Boolean} reverse 如果是数组，是否是反向
	 */
	base.each = function(l,fn,space,reverse){
		var t = base.type(l),i,e;
		if(t === 'array' || t === 'arguments' || l.length){
			if(reverse){
				for(i=l.length-1;i>-1;i--){
					if(fn.call(space,l[i],i,l)) return;
				}
			}else{
				for(i=0,e=l.length;i<e;i++){
					if(fn.call(space,l[i],i,l)) return;
				}
			}
		}else{
			for(i in l){
				if(base.hasProp(l,i) && fn.call(space,l[i],i,l)) return;
			}
		}
	}
	/**
	 * 合并对象
	 * @param {Object} dest 被合并的对象 
	 * @param {Object...} src 合并的对象
	 * @param {Boolean} override 当存在相同的属性时，是否覆盖
	 */
	base.mix = function(dest,src,override){
		var args = aslice.call(arguments),
			rec = args.shift() || {},
			override = true;
		if(args.length && base.type(args[args.length-1]) === 'boolean'){
			override = args.pop();
		}
		base.each(args,function(o){
			base.each(o,function(oo,ii){
				if(override){
					rec[ii] = oo;
				}else if(!rec[ii]){
					rec[ii] = oo;
				}
			});
		});
		return rec;
	};
	/**
	 * 绑定function的执行上下文
	 * @param {Function} fn 要改变上下文的函数
	 * @param {Object} space fn新的执行上下文
	 * @return {Function}
	 */
	base.bind = function(fn,space){
		if(fn.bind) return fn.bind(space);
		return function(){
			return fn.apply(space,arguments);
		};
	}
	/**
	 * 将对象转数组
	 * @param {Object} o 要转换的对象
	 * @return {Array} 
	 */
	base.toArray = function(o){
		try{
			return aslice.call(o);
		}catch(e){
			var res = [];
			base.each(o,function(o){
				res.push(o);
			});
			return res;
		}
	}
	/**
	 * 获得元素的在数组中的位置
	 * @param {Array} arr 	被查找的数组
	 * @param {Object} val 	值	
	 */
	base.indexOf = function(arr,o){
		var index = -1;
		var eq = function(v){ return v === o};
		if(typeof o === 'function') eq = o;
		base.each(arr||[],function(v,i){
			if(eq(v)){
				index = i;
				return true;
			}
		});
		return index;
	}
	/**
	 * 判断是否为空
	 * @param {Object} o 判断变量的值是否为空
	 */
	base.isEmpty = function(o){
		if(!o) return true;
		var type = base.type(o);
		if(type === 'array' && o.length) return false;
		if(type === 'object'){
			for(var i in o) if(o.hasOwnProperty(i)) return false;
		}
		return true;
	}
	/**
	 * 判断是否null 或是 undefined
	 */
	base.isNUL = function(o){
		return o === null || o === undefined;
	}

	var pathReg = /\[[^\[\]]+\]/g;
	function parsePath(path){
		var paths = path.split('.'),
			res = [];
		base.each(paths,function(v,i){
			var paths;
			if(v.match(pathReg)){
				paths = v.split('[');
				base.each(paths,function(v,i){
					if(v)res.push(v.replace(/[\]"']+/g,''));
				});
			}else{
				res.push(v);
			}
		});
		return res;
	}
	/**
	 * 设置或获得路径获得对象的值
	 * @param obj {Object}
	 * @param path {String}
	 * @param val {Object} 
	 */
	base.path = function(obj,path,val){
		var sobj = obj;
		if(!obj || !path) return;
		var paths = parsePath(path),max=Math.max(paths.length-1,0),i=0,node,key;
		if(val === undefined){
			for(;i<=max;i++){
				key = paths[i];
				node = obj && obj[key];
				if(!node) break;
				obj = node;
			}
			return node;
		}else{
			for(;i<=max;i++){
				key = paths[i];
				if(i<max){
					obj = obj[key] = obj[key] || {};
				}else{
					obj[key] = val;
				}
			}
		}
		return sobj;
	}
	/**
	 * 删除路径获得对象的值
	 * @param obj {Object}
	 * @param path {String}
	 */
	base.delPath = function(obj,path){
		if(!obj || !path) return;
		var paths = parsePath(path),max=Math.max(paths.length-1,0),i=0,node,key;
		for(;i<=max;i++){
			key = paths[i];
			if(i<max){
				obj = obj && obj[key];
				if(!obj) break;
			}else{
				node = obj[key];
				delete obj[key];
			}
		}
		return node;
	}



	return base;
});