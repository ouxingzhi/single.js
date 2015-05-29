define(['StorageAbstractStote','StorageSessionStorage'],function(StorageAbstractStote,StorageSessionStorage){
	return StorageAbstractStote.extend({
		buildStorage:function(){
			return StorageSessionStorage;
		}
	});
});