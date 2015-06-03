define("mvc/application.js",["base/base","base/event","common/url.hash","mvc/hash.observe","mvc/frame","mvc/layout.full","base/log"],function(require,t,a){var i=require("base/base"),s=require("base/event"),e=require("common/url.hash"),o=require("mvc/hash.observe"),r=require("mvc/frame"),h=require("mvc/layout.full");Log=require("base/log");var n=s.extend({propertys:function(){this.state=n.STATE_STOP_HASH_OBSERVE,this.config,this.hashobserve=new o,this.layout,this.frames={},this.forwardId="~~~forward~~~",this.cfgframes={}},initialize:function(t){this.config=t,this.setOption(t),Log.log("application:initialize","application"),this.initLayout(),this.initFrame()},setOption:function(t){i.isNUL(t.layout)||(this.layout=t.layout),i.isNUL(t.frames)||(this.cfgframes=t.frames),i.isNUL(t.forwardId)||(this.forwardId=t.forwardId)},getConfig:function(){return this.config},initLayout:function(){this.layout||(this.layout=h()),$("body").prepend(this.layout.getRoot())},initFrame:function(){var t=this.hashobserve.getCurHashData(),a=t.frame||this.config.defaultFrame;i.each(this.cfgframes,function(i,s){var o=(this.layout.getFrameBoxs()||{})[i.framebox];o?(this.frames[s]=new r({app:this,name:s,viewpath:i.viewpath||this.config.viewpath,transtion:i.transtion,framebox:o,defaultView:i.defaultView||this.config.defaultView||"index"}),this.frames[s].hashChange(a===s?t:new e(""))):Log.err("framebox not found!","application")},this)},onHashChange:function(t,a){var i=t.frame||this.config.defaultFrame;t.forward=this.checkForward(t,a),this.frames[i]&&this.frames[i].hashChange(t)},checkForward:function(t,a){var i,s;return this.forwardId&&(i=t.ids.indexOf(this.forwardId))>-1?(a||(t.ids.splice(i,1),s="#"+t.buildUrl(),history.replaceState({},"",s)),!0):!1},startHashObserve:function(){this.state=n.STATE_LOADING_HASH_OBSERVE,this.hashobserve.add(this.onHashChange,this).start()},endHashObserve:function(){this.state=n.STATE_STOP_HASH_OBSERVE,this.hashobserve.clear()},start:function(){this.state===n.STATE_STOP_HASH_OBSERVE&&this.startHashObserve()},stop:function(){this.endHashObserve()},forward:function(t){location.hash=t+"|"+this.forwardId},replace:function(t){var a=t+"|"+this.forwardId,i=new e(a);this.onHashChange(i,!0)},back:function(t){t?location.replace(("#"+t).replace(/^#+/,"#")):history.back()}});return n.STATE_STOP_HASH_OBSERVE=0,n.STATE_LOADING_HASH_OBSERVE=1,n});