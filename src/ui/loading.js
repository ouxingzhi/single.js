define(function(require){
	var UiLayer = require('ui/layer');

	return UiLayer.extend({
		propertys:function(){
			this.on('create',function(){
				this.$el.addClass('ui-loading');
			});
			this.useMask = true;
		},
		initialize:function($super,options){
			$super(options);
		},
		createHTML:function(){
			return '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
		}
	});
});