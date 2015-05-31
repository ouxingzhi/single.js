define(function(){
	function isdebug(){
		return typeof __SINGE_DEBUG__ === 'boolean' && __SINGE_DEBUG__ === true;
	}
	return {
		log:function(msg,tag){
			if(!isdebug()) return;
			if(!tag) tag = 'default';
			console.log(tag + ': ' + msg);
		},
		err:function(msg,tag){
			if(!isdebug()) return;
			if(!tag) tag = 'default';
			console.error(tag + ': ' + msg);
		}
	};
});