define(function(require, exports, module) {
	var ModelAbstractModel = require('model/model');

	return ModelAbstractModel.extend({
		ajaxRequest:function(type,url,param,success,error){
			var self = this;
			return $.ajax({
				url:url,
				data:JSON.stringify(param),
				type:type || 'post',
				contentType:'application/json',
				dataType:'json',
				success:function(data){
					success.apply(self,arguments)
				},
				error:function(e){
					error.apply(self,arguments);
				}
			});
		}
	});
});