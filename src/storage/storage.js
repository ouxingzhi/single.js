define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseObject = require('base/object');
	return BaseObject.extend({
		propertys:function(){
			this.proxy;
		},
		initialize:function(storage){
			this.proxy = storage;
		},
		get:function(name){
			var value = this.proxy.getItem(name),data;
			try{
				data = JSON.parse(value);
			}catch(e){}
			return data;
		},
		set:function(name,data){
			var value = JSON.stringify(data);
			this.proxy.setItem(name,value);
		},
		setAttr:function(name,path,val){
			var data = this.get(name) || {};
			Base.path(data,path,val);
			this.set(name,data);
		},
		getAttr:function(name,path){
			var data = this.get(name) || {};
			return Base.path(data,path);
		}
	});
})