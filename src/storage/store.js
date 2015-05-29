define(['Base','BaseEventObject'],function(Base,BaseEventObject){


	var toReg = /([\d\.]+)([a-z])/ig;

	function parseTimeout(timeout){
		if(typeof timeout === 'number'){
			if(isNaN(timeout)) timeout = 0;
			return timeout;
		}
		var i = 0;
		(timeout || '').replace(toReg,function(full,num,key){
			key = key.toUpperCase();
			num = parseInt(num);
			switch(key){
				case 'Y':
					i += num * 31536e6;
					break;
				case 'M':
					i += num * 2592e6;
					break;
				case 'W':
					i += num * 6048e5;
					break;
				case 'D':
					i += num * 864e5;
					break;
				case 'H':
					i += num * 36e5;
					break;
				case 'I':
					i += num * 6e4;
					break;
				case 'S':
					i += num * 1e3;
					break;
			}
		});
		return i;
	}

	function buildStoreObject(value,timeout,tag){
		return {
			value:value,
			timeout:timeout,
			tag:tag
		};
	}

	var AbstractStore = BaseEventObject.extend({

		propertys:function(){
			this.storage = this.buildStorage();
			this.name = this.buildName();
			this.timeout = parseTimeout(this.buildTimeout());
		},
		initialize:function(){

		},
		set:function(data,tag){
			var value = JSON.stringify(data),
				timeout = new Date().valueOf() + this.timeout;
			var meta = buildStoreObject(value,timeout,tag);
			this.storage.set(this.name,meta);
		},
		get:function(tag){
			var meta = this.storage.get(this.name);
			if(!meta || new Date() > meta.timeout || (tag && tag !== meta.tag)) return;

			try{
				return JSON.parse(meta.value);
			}catch(e){}
		},
		getTag:function(){
			var meta = this.storage.get(this.name);
			return meta.tag;
		},
		setAttr:function(path,data,tag){
			var mdata = this.get() || {};
			Base.path(mdata,path,data);
			tag = tag || this.getTag();
			this.set(mdata,tag);
		},
		delAttr:function(path,data,tag){
			var mdata = this.get() || {};
			Base.delPath(mdata,path,data);
			tag = tag || this.getTag();
			this.set(mdata,tag);
		},
		getAttr:function(path,tag){
			return Base.path(this.get(tag),path);
		},
		buildName:function(){
			throw "Please override the `buildName` method";
		},
		buildTimeout:function(){
			throw "Please override the `buildTimeout` method";
		},
		buildStorage:function(){
			throw "Please override the `buildStorage` method";
		}
	});



	return AbstractStore;
});