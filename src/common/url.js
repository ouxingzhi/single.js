define(function(require, exports, module) {
	var Base = require('base/base'),
		BaseObject = require('base/object');
	//匹配url
	var urlreg = /^\s*(?:(^[a-z]+):)?(?:\/\/([^\/]+))?([^#?]*)(?:\?([^#]*))?(?:#(.*))?\s*$/im,
		queryStringReg = /([^=&]*)=([^=&]*)/g,
		pathtrimReg = /^\s*\/|\/\s*$/i;

	/**
	 * url类，提供与url相关的操作
	 */
	var Url = BaseObject.extend({
		propertys:function(){
			this.protocol = '';
			this.host = '';
			this.path = '';
			this.paths = [];
			this.search = '';
			this.searchs = {};
			this.hash = '';
		},
		initialize:function(url){
			Base.mix(this,Url.parse(url));
		},
		/**
		 * 生成当前的url
		 * @return {String}
		 */
		buildUrl:function(){
			var url = [],d = this.data || {},tmp;
			if(d.protocol){
				url.push(d.protocol);
				url.push(':');
			}
			if(d.home){
				url.push('//');
				url.push(d.home);
			}
			if(d.paths){
				url.push('/');
				url.push(d.paths.join('/'));
			}
			if(d.searchs){
				tmp = [];
				Base.each(d.searchs,function(v,n){
					if(Base.type(v) === 'array'){
						Base.each(v,function(v){
							tmp.push(n + '=' + v);
						});
					}else{
						tmp.push(n + '=' + v);
					}
				});
				if(tmp.length){
					url.push('?');
					url.push(tmp.join('&'));
				}
			}
			if(d.hash){
				url.push('#');
				url.push(d.hash);
			}
			return url.join('');
		},
		setProtocol:function(protocol){
			this.protocol = protocol;
			return this;
		},
		setHost:function(host){
			this.host = host;
			return this;
		},
		setPath:function(path){
			this.path = path;
			this.paths = this.path.replace(pathtrimReg,'').split('/');
			return this;
		},
		setPaths:function(index,val){
			index = index || 0;
			if(index > this.paths.length) index = this.paths.length;
			this.paths[index] = val;
			return this;
		},
		setSearch:function(search){
			this.search = search;
			var data = Url.parse(search || '');
			this.searchs = data.searchs;
			return this;
		},
		setHash:function(hash){
			this.hash = hash;
			return this;
		}
	});
	/**
	 * 解析url
	 */
	Url.parse = function(url){
		var m = (url || '').match(urlreg) || [],
			searchs = {},
			paths = [];
		if(m[3]){
			paths = m[3].replace(pathtrimReg,'').split('/');
		}
		if(m[4]){
			m[4].replace(queryStringReg,function(m,n,v){
				if(searchs[n]){
					if(typeof searchs[n] === 'string') searchs[n] = [searchs[n]];
					searchs[n].push(v);
				}else{
					searchs[n] = v;
				}
			});
		}

		return {
			protocol:m[1] || '',
			home:m[2] || '',
			path:m[3] || '',
			paths:paths,
			search:m[4] || '',
			searchs:searchs,
			hash:m[5] || ''
		};
	};

	return Url;
});