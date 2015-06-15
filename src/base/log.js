define(function(){
	function isdebug(){
		return typeof __SINGE_DEBUG__ === 'boolean' && __SINGE_DEBUG__ === true;
	}
	var I = function(){
		var d;
		function init(){
			if(!d){
				d = document.createElement('div');
				document.body.appendChild(d);
				d.style.cssText = 'z-index:8000;color:#fff;position:absolute;left:0px;bottom:0px;width:100%;height:6em;line-height:1.5em;font-size:12px;background:rgba(0,0,0,0.8);overflow:auto;-webkit-overflow-scrolling:touch;';
			}
			return d;
		}
		return {
			hide:function(){
				if(d){
					document.body.removeChild(d);
					d = null;
				}
			},
			write:function(l,iserr){
				init();
				if(iserr){
					l = '<span style="color:#f22">' + l + '</span>';
				}
				d.innerHTML = l + '<br />' + d.innerHTML;
			}
		};
	}();
	return {
		log:function(msg,tag){
			if(!isdebug()) return;
			if(!tag) tag = 'default';
			I.write(tag + ': ' + msg);
		},
		err:function(msg,tag){
			if(!isdebug()) return;
			if(!tag) tag = 'default';
			I.write(tag + ': ' + msg,true);
		}
	};
});