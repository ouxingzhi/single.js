define(function(require){
	var MvcView = require('webapp/common/baseview'),
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
			this.setHeader({
				title:'列表',
				leftHandle:function(){
					this.back();
				},
				rightTitle:'试一试',
				rightHandle:function(){
					alert('list.right');
				}
			});
			this.turning();
		},
		onShow:function(){

		},
		onHide:function(){

		}
	});
});