define(function(require, exports, module) {
	var Base = require('base/base');
	var BaseObject = require('base/object');

	//提供历史栈的操作
	var HistoryStack = BaseObject.extend({
		propertys:function(){
			this.store;
		},
		initialize:function($super,store){
			$super();
			this.store = store;
		},
		//加入历史项
		forward:function(id,url,replace){
			this.store.setAttr('cached',{
				id:id,
				url:url,
				replace:!!replace
			});
		},
		//确认历史栈
		affirm:function(id){
			var cached = this.store.getAttr('cached');
			this.store.setAttr('cached',{});
			if(!cached || cached.id != id) return false;

			var top = this.getTop();
			if(top && top.id === id) return false;

			var stack = this.store.getAttr('stack') || [];
			if(stack.replace){
				stack.pop();
			}
			stack.push(cached);
			this.store.setAttr('stack',stack);
		},
		//取上一次历史
		back:function(id){
			var top = this.getTop() || {};
			if(top.id != id) return ;
			this.popTop();
			return this.getTop();
		},
		//返回缓存内容
		getCached:function(){
			return this.store.getAttr('cached');
		},
		//返回栈顶内容,不删除原来的 
		getTop:function(){
			var stack = this.store.getAttr('stack')||[];
			return stack.length ? stack[Math.max(stack.length-1,0)] : null;
		},
		//返回栈顶内容,删除原来的
		popTop:function(){
			var stack = this.store.getAttr('stack')||[];
			var node = stack.pop();
			this.store.setAttr('stack',stack);
			return node;
		},
		//查找id最近的一次
		fallback:function(id){
			var stack = this.store.getAttr('stack')||[];
			var index = -1;
			var result;
			Base.each(stack,function(o,i){
				if(o.id === id){
					index = i;
					return true;
				}
			},null,true);
			if(index > -1){
				result = stack.splice(index);
			}
			return result;
		},
		clear:function(){
			this.store.remove();
		}
	});
	//历史树的操作
	var HistoryTree = BaseObject.extend({
		propertys:function(){

			// this.tree ＝ {
			// 	'list':{
			// 		//
			// 		id:'list',
			// 		prev:'index',
			// 		prevRange:[
			// 			'list'
			// 		],
			// 		url:'list',
			// 		params:{
			// 			id:2323
			// 		},
			// 		querys:{
			// 			name:'asd'
			// 		}
			// 	}
			// };
		},
		initialize:function($super,treeConfig){
			var _treeConfig = {};
			Base.each(treeConfig,function(o,i){
				_treeConfig[o.id] = o;
			});
			this.tree = _treeConfig;
		},
		//取id指定node
		getNode:function(id){
			return this.tree[id];
		},
		//取id制定node的上一个
		getPrevNode:function(id){
			var cur = this.getNode(id);
			if(!cur) return ;
			return this.getNode(cur.prev);
		},
		getPrevUrl:function(id,params,querys){
			var prev = this.getPrevNode(id);
			if(prev){
				return buildPrevUrl(prev,params,querys);
			}
			return null;
		},
		//判断prevId是不是id的上一页
		checkPrevRange:function(id,prevId){
			var node = this.getNode(id);

			if(!node) return true;
			//如果未定义,则认为都可以
			if(!node.prevRange) return true;
			if(node.prevRange.indexOf(prevId) > -1){
				return true;
			}
			return false;
		}
	});

	var regKey = /\{([^\{\}]*)\}/img;
	function buildPrevUrl(node,params,querys){
		var url = node.url || '';
		var params = _.extend(_.clone(node.params||{}),params||{});
		url = url.replace(regKey,function(a,b){
			return params[b] ? params[b] : '';
		});
		if(node.querys){
			var q = $.param(_.extend(_.clone(node.querys||{}),querys||{}));
			if(q){
				url += (url.indexOf('?') > -1 ? ('&' + q) : ('?' + q));
			}
		}
		return url;
	}



	return BaseObject.extend({
		initialize:function($super){
			this.stack = new HistoryStack(this.buildStackStore());
			this.tree = new HistoryTree(this.buildTreeConfig());
		},
		buildTreeConfig:function(){
			throw "not override `buildTreeConfig` method";
		},
		buildStackStore:function(){
			throw "not override `buildStackStore` method";
		},
		forward:function(id,url){
			this.stack.forward(id,url);
		},
		affirm:function(id){
			this.stack.affirm(id);
		},
		replace:function(id,url){
			this.stack.forward(id,url,true);
		},
		back:function(id,params,querys){
			var prev = this.stack.back(id);
			var curNode = this.tree.getNode(id);

			if(prev && this.tree.checkPrevRange(id,prev.id)){
				return prev.url;
			}
			return this.tree.getPrevUrl(id,params,querys);
		},
		clear:function(){
			this.stack.clear();
		},
	});
});