define(function(require, exports, module) {
	var BaseEventObject = require('base/event'),
		CommonUrlHash = require('common/url.hash');
		
	var EVENT_NAME = 'hashchange';
	return BaseEventObject.extend({
		initialize:function($super){
			this.isObserve = false;
			$super();
		},
		handleEvent:function(){
			var data = this.getCurHashData();
			this.emit(EVENT_NAME,data);
		},
		add:function(fn,space){
			this.on(EVENT_NAME,fn,space);
			return this;
		},
		clear:function(){
			this.off(EVENT_NAME);
			return this;
		},
		trigger:function(){
			this.handleEvent();
			return this;
		},
		start:function(){
			if(this.isObserve) return this;
			window.addEventListener('hashchange',this,false);
			this.isObserve = true;
			return this;
		},
		end:function(){
			window.removeEventListener('hashchange',this,false);
			this.isObserve = false;
			return this;
		},
		getCurHashData:function(){
			return new CommonUrlHash(window.location.hash);
		}
	});
});