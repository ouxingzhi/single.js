define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseObject = require('base/object'),
		BaseVal = require('base/var');
	var Event = BaseObject.extend({
		propertys:function(){
			this.__event = BaseVal({});
		},
		initialize:function($super,options){
			$super(options);
		},
		on:function(type,fn,space,override){
			var e = this.__event;
			e.v[type] = e.v[type] || [];
			if(!override || Base.indexOf(e.v[type],function(v){ return fn === v.fn;}) === -1){
				e.v[type].push({fn:fn,space:space});
			}
		},
		off:function(type,fn){
			if(!type && !fn){
				this.__event.v.del();
				this.__event = BaseVal({});
				return ;
			}
			var e = this.__event,index;
			e.v[type] = e.v[type] || [];
			if(fn){
				index = ase.indexOf(e.v[type],function(v){ return fn === v.fn;});
				if(index > -1){
					e.v[type].splice(index,1);
				}
			}else{
				e.v[type] = [];
			}
		},
		emit:function(type){
			var e = this.__event,index,self = this;
			e.v[type] = e.v[type] || [];
			var args = Base.toArray(arguments);
			args.shift();
			Base.each(e.v[type],function(o){
				o.fn.apply(o.space || self,args);
			});
		}
	});
	return Event;
});