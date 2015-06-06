define(function(require, exports, module) {
	var ModelAbstractModel = require('model/model');

	return ModelAbstractModel.extend({
		propertys:function(){

		},
		ajaxRequest:function(type,url,param,success,error){
			var self = this;
			return $.ajax({
				url:url,
				data:param,
				type:type,
				dataType:'json',
				success:function(data){
					success.apply(self,arguments);
				},
				error:function(e){
					error.apply(self,arguments);
				}
			});
		}
	});
});