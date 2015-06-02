define(function(require){
	var MvcView = require('mvc/view'),
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
			var loading = new UiLoading();
			loading.show();
			this.turning();
		},
		onShow:function(){

		},
		onHide:function(){

		}
	});
});