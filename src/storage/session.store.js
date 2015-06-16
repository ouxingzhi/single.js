define(function(require, exports, module) {
	var StorageAbstractStote = require('storage/store'),
		StorageSessionStorage = require('storage/session.storage');
	return StorageAbstractStote.extend({
		buildStorage:function(){
			return StorageSessionStorage;
		}
	});
});