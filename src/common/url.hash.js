define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseObject = require('base/object');

	var hashreg = /^(?:([^:\/!?&=|]+):)?([^!?&|]+)?(?:!([^!?&|]+))?(?:\?((?:[^?=&|]+=[^?=&|]+(?:&[^?=&|]+=[^?=&|]+)*)?))?((?:\|[^|]+)*)?$/i,
		queryStringReg = /([^=&]*)=([^=&]*)/g;
	var ID = {};
	var allowPropertys = {path:ID,paths:ID,search:ID,searchs:ID};

	function buildQuery(o){
		var u = [];
		Base.each(o,function(n,v){
			u.push(encodeURIComponent(n) + '=' + encodeURIComponent(v));
		});
		return u.join('&');
	}

	/**
	 * 处理hash
	 */
	var UrlHash = BaseObject.extend({
		propertys:function(){
			this.frame = '';
			this.view = '';
			this.path = [];
			this.query = {};
			this.ids = [];
			this.fullhash = '';
		},
		initialize:function(hash){
			var type =Base.type(hash);
			if(type === 'object'){
				Base.mix(this,hash);
			}else if(type === 'string'){
				Base.mix(this,UrlHash.parse(hash));
			}
		},
		setFrame:function(v){
			if(!v) return this;
			this.frame = v;
			return this;
		},
		getFrame:function(){
			return this.frame;
		},
		setView:function(v){
			if(!v) return this;
			this.view = v;
			return this;
		},
		getView:function(){
			return this.view;
		},
		setPath:function(index,v){
			if(!v) return this;
			if(index < 0) index =0;
			if(index > this.path.length) index = this.path.length;
			this.path[index] = v;
			return this;
		},
		getPath:function(index){
			return this.path[index];
		},
		delPath:function(index){
			if(index < 0 || index >= this.path.length) return this;
			this.path.splice(index,1);
			return this;
		},
		setQuery:function(n,v){
			if(!n || !v) return this;
			this.query[n] = v;
			return this;
		},
		getQuery:function(n){
			if(!n) return ;
			return this.query[n];
		},
		delQuery:function(n){
			delete this.query[n];
			return this;
		},
		setId:function(id){
			if(!this.exsitId(id)){
				this.ids.push(id);
			}
			return this;
		},
		delId:function(id){
			var i = this.ids.indexOf(id);
			if(i > -1) this.ids.splice(i,1);
			return this;
		},
		exsitId:function(id){
			return this.ids.indexOf(id) > -1;
		},
		getFullHash:function(){
			return fullhash;
		},
		buildUrl:function(){
			var url = [];
			if(this.frame){
				url.push(this.frame);
				url.push(':');
			}
			if(this.view){
				url.push(this.view);
			}
			if(this.path && this.path.length){
				url.push('!');
				url.push(this.path.join('/'));
			}
			if(!Base.isEmpty(this.query)){
				url.push('?');
				url.push(buildQuery(this.query));
			}
			if(this.ids && this.ids.length){
				url.push('|');
				url.push(this.ids.join('|'));
			}
			return url.join('');
		},
		clone:function(){
			var n = new UrlHash();
			return Base.mix(n,this,true);
		},
		toString:function(){
			return this.buildUrl();
		},
		valueOf:function(){
			return Base.mix({},this);
		}
	});

	UrlHash.parse = function(hash){
		var shash = (hash || '').replace(/^#+/,'')
			m = shash.match(hashreg) || [],
			frame = m[1],
			view = m[2],
			path = (m[3] || '').replace(/^\/+|\/+$/,''),
			paths = (path ? path.split('/') : []),
			query = m[4],
			querys = function(query){
				var q = {};
				query.replace(queryStringReg,function(m,a,b){
					q[a] = b;
				})
				return q;
			}(query || ''),
			id = (m[5] || '').replace(/^\|+|\|+$/,''),
			ids = (id ? id.split('|') : []);
		return {
			frame:frame,
			view:view,
			path:paths,
			query:querys,
			ids:ids,
			fullhash:shash
		};
	}
	return UrlHash;
});