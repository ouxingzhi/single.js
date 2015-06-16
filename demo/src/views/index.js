define(function(require){
	var MvcView = require('webapp/common/baseview'),
		UiDialog = require('ui/dialog'),
		UiMask = require('ui/mask'),
		UiToast = require('ui/toast'),
		UiLoading = require('ui/loading'),
		html = require('text!webapp/templates/index.html');

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
				title:'首页',
				leftHandle:function(){
					this.back();
				},
				rightTitle:'试一试',
				rightHandle:function(){
					alert('index.right');
				}
			});
			this.showAlert('didi','adfadf')
			this.turning();
		},
		onShow:function(){

		},
		onHide:function(){

		}
	});
});