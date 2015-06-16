define(function(require, exports, module) {
	var StorageAbstractStote = require('storage/store'),
		StorageLocalStorage = require('storage/local.storage');
	return StorageAbstractStote.extend({
		buildStorage:function(){
			return StorageLocalStorage;
		}
	});
});