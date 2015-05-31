define(function(require, exports, module) {
	var ModelAbstractModel = require('model/model');

	return ModelAbstractModel.extend({
		ajaxRequest:function(url,param,success,error){
			var self = this;
			return $.ajax({
				url:url,
				data:JSON.stringify(param),
				type:'post',
				contentType:'application/json',
				dataType:'json',
				success:function(data){
					success.call(self,data);
				},
				error:function(e){
					error.call(self,e);
				}
			});
		}
	});
});