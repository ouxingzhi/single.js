define("mvc/application.js",["base/base","base/event","common/url.hash","mvc/hash.observe","mvc/frame","mvc/layout.full","base/log"],function(require,t,a){var i=require("base/base"),e=require("base/event"),s=require("common/url.hash"),r=require("mvc/hash.observe"),o=require("mvc/frame"),h=require("mvc/layout.full");Log=require("base/log");var n=e.extend({propertys:function(){this.state=n.STATE_STOP_HASH_OBSERVE,this.config,this.hashobserve=new r,this.layout,this.frames={},this.forwardId="~~~forward~~~",this.cfgframes={}},initialize:function(t){this.config=t,this.setOption(t),Log.log("application:initialize","application"),this.initLayout(),this.initFrame()},setOption:function(t){i.isNUL(t.layout)||(this.layout=t.layout),i.isNUL(t.frames)||(this.cfgframes=t.frames),i.isNUL(t.forwardId)||(this.forwardId=t.forwardId)},getConfig:function(){return this.config},initLayout:function(){this.layout||(this.layout=h()),$("body").prepend(this.layout.getRoot())},initFrame:function(){var t=this.hashobserve.getCurHashData(),a=t.frame||this.config.defaultFrame;i.each(this.cfgframes,function(i,e){var r=(this.layout.getFrameBoxs()||{})[i.framebox];r?(this.frames[e]=new o({app:this,name:e,viewpath:i.viewpath||this.config.viewpath,transtion:i.transtion,framebox:r,defaultView:i.defaultView||this.config.defaultView||"index"}),this.frames[e].hashChange(a===e?t:new s(""))):Log.err("framebox not found!","application")},this)},onHashChange:function(t,a){var i=t.frame||this.config.defaultFrame;if(t.forward=this.checkForward(t),a){var e="#"+t.buildUrl();history.replaceState({},"",e)}this.frames[i]&&this.frames[i].hashChange(t)},checkForward:function(t){var a,i;return this.forwardId&&(a=t.ids.indexOf(this.forwardId))>-1?(t.ids.splice(a,1),i="#"+t.buildUrl(),history.replaceState({},"",i),!0):!1},startHashObserve:function(){this.state=n.STATE_LOADING_HASH_OBSERVE,this.hashobserve.add(this.onHashChange,this).start()},endHashObserve:function(){this.state=n.STATE_STOP_HASH_OBSERVE,this.hashobserve.clear()},start:function(){this.state===n.STATE_STOP_HASH_OBSERVE&&this.startHashObserve()},stop:function(){this.endHashObserve()},forward:function(t){location.hash=t+"|"+this.forwardId},replace:function(t){var a=t+"|"+this.forwardId;location.replace("#"+a)},back:function(t){t?location.replace(("#"+t).replace(/^#+/,"#")):history.back()}});return n.STATE_STOP_HASH_OBSERVE=0,n.STATE_LOADING_HASH_OBSERVE=1,n});