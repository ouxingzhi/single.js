define(['StorageAbstractStote','StorageLocalStorage'],function(StorageAbstractStote,StorageLocalStorage){
	return StorageAbstractStote.extend({
		buildStorage:function(){
			return StorageLocalStorage;
		}
	});
});