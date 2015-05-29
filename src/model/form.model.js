define(['ModelAbstractModel'],function(ModelAbstractModel){

	return ModelAbstractModel.extend({
		propertys:function(){
			this.ajaxType = 'post';
		},
		ajaxRequest:function(url,param,success,error){
			var self = this;
			return $.ajax({
				url:url,
				data:param,
				type:this.ajaxType,
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