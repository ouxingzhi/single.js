define(function(require){
	var MvcView = require('mvc/view');

	return MvcView.extend({
		onCreate:function(){
		},
		onLoad:function(){
			this.showPage();
			this.turning('notanimte');
		},
		showPage:function(){
			var view = this.hashdata.view;
			this.el.html([
				'<h2 id="error-page-found" style="padding:20px">view `'+encodeURIComponent(view)+'` not found!</h2>'
			].join(''));
		},
		onShow:function(){

		},
		onHide:function(){
			
		}
	});
});