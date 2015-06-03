define(function(require){
	var MvcView = require('mvc/view'),
		html = require('text!webapp/templates/list.html');
	return MvcView.extend({
		onCreate:function(){
			this.el.html(html);
		},
		events:{
			'click .tolist':'tolist',
			'click .switchheader':'switchheader',
			'click .switchheader2':'switchheader2'
		},
		tolist:function(){
			this.forward('list');
		},
		switchheader:function(){
		},
		switchheader2:function(){
		},
		onLoad:function(){
			this.toHead(this.id,{
				template:'<span class="back"><%=backtitle%></span><h3><%=title%></h3>',
				data:{
					title:'苏州',
					backtitle:'返回'
				},
				events:{
					'click .back':function(){
						this.back();
					}
				},
				space:this
			});
			this.turning();
		},
		onShow:function(){

		},
		onHide:function(){

		}
	});
});