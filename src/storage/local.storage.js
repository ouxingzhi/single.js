define(function(require, exports, module) {
	var StorageStorage = require('storage/storage');
	return new StorageStorage(localStorage);
});