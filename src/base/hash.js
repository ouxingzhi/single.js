define(function(require, exports, module) {
	var BaseObject = require('base/object'),
		Base = require('base/object');
	return BaseObject.extend({
		propertys:function(){
			this.keys = [];
			this.values = {};
		},
		initialize:function($super,array){
			$super();
			array = array || [];
			for(var i=0,len=array.length;i<len;i++){
				this.push(array[i].key,array[i].value);
			}
		},
		push:function(key,value){
			if(key === null || key === undefined) return; 
			if(this.values[key]) this.del(key);
			this.keys.push(key);
			this.values[key] = value;
		},
		pop:function(){
			var key = this.keys.pop();
			var value = this.values[key];
			if(!key && !value) return null;
			delete this.values[key];
			return {
				key:key,
				value:value
			};
		},
		shift:function(){
			var key = this.keys.shift();
			var value = this.values[key];
			if(!key && !value) return null;
			delete this.values[key];
			return {
				key:key,
				value:value
			};
		},
		unshift:function(key,value){
			if(key === null || key === undefined) return; 
			if(this.values[key]) this.del(key);
			this.keys.unshift(key);
			this.values[key] = value;
		},
		del:function(key){
			var index = this.keys.indexOf(key);
			if(index === -1) return null;
			var key,value;
			key = this.keys.splice(index,1);
			value = this.values[key];
			delete this.values[key];
			return {
				key:key,
				value:value
			};
		},
		
		get:function(name){
			return this.values[name];
		},
		splice:function(index,size,reverse){
			if(Base.type(size) === 'boolean'){
				size = null;
				reverse = size;
			}
			if(!index) index = 0;
			var max = Math.max(this.keys.length-1,0);
				keys = this.keys.slice(),
				rkeys = [];
			if(reverse){
				index = max - index;
				keys.reverse();
				rkeys = Base.isNUL(size) ? keys.splice(index) : keys.splice(index,size);
			}else{
				rkeys = Base.isNUL(size) ? keys.splice(index) : keys.splice(index,size);
			}
			var res = [],self = this;
			Base.each(rkeys,function(v){
				var o = self.del(v);
				if(o){
					res.push(o);
				}
			});
			if(reverse) res.reverse();
			return res;
		},
		slice:function(index,size){
			if(!index) index = 0;
			var max = Math.max(this.keys.length-1,0);
				keys = this.keys,
				rkeys = Base.isNUL(size) ? keys.slice(index) : keys.slice(index,size);
			var res = [],self = this;
			Base.each(rkeys,function(v){
				var o = self.get(v);
				if(o){
					res.push({key:v,value:o});
				}
			});
			return res;
		},
		toString:function(){
			return JSON.stringify(this.slice());
		},
		valueOf:function(){
			return this.slice();
		}
	});
});