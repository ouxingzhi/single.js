define(function(require, exports, module) {
	var ModelAbstractModel = require('model/model');

	return ModelAbstractModel.extend({
		propertys:function(){
			this.dataType = 'json';
			this.contentType = 'application/x-www-form-urlencoded';
			this.ajaxConfigs = {};
			this.headers = {};
		},
		ajaxRequest:function(type,url,param,success,error){
			var self = this;
			return $.ajax($.extend(this.ajaxConfigs,{
				url:url,
				data:param,
				type:type,
				headers:this.headers||{},
				contentType:this.contentType,
				dataType:this.dataType,
				success:function(data){
					success.apply(self,arguments);
				},
				error:function(e){
					error.apply(self,arguments);
				}
			}));
		}
	});
});