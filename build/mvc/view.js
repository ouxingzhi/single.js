define("mvc/view.js",["base/base","base/event","common/funs","common/scroll"],function(require,t,e){function n(){}function i(t){var e=(t||"").replace(/^\s+|\s+$/g,"").split(/\s+/);return{event:e.shift(),selector:e.join(" ")}}function a(){var t=this.events||{};s.each(t,function(t,e){var a=i(e),t=s.bind("function"==typeof t?t:this[t]||n,this);this.root.on(a.event,a.selector,t)},this)}var s=require("base/base"),o=require("base/event"),r=require("common/funs"),h=(require("common/scroll"),function(t){var e=+new Date;return function(){return"page"+e+t()}}(r.createAddSelf())),f="viewroot-box",u="viewroot",c=o.extend({elastic:!0,propertys:function(t,e,n,i){this.id=h(),this.root=$('<div class="'+f+'"><div class="'+u+'"></div></div>'),this.el=this.root.find("."+u),this.root.attr("id",this.id),this.root.hide(),this.on("addframe",function(){}),a.call(this),this.frame=n,this.app=i,this.name=t,this.hashdata=e,this.onCreate()},setHashData:function(t){this.hashdata=t},getRoot:function(){return this.root},turning:function(){this.frame.turning()},onCreate:function(){},onLoad:function(){},onShow:function(){},onHide:function(){},forward:function(){this.app.forward.apply(this.app,arguments)},isForward:function(){return this.hashdata.forward},replace:function(){this.app.replace.apply(this.app,arguments)},back:function(){this.app.back.apply(this.app,arguments)},header:function(t){t=t||{}},toHead:function(t,e){this.frame.toHead(t,e)},showToast:function(){this.frame.showToast.apply(this.frame,arguments)},hideToast:function(){this.frame.hideToast.apply(this.frame,arguments)},showAlert:function(t){this.frame.showAlert.apply(this.frame,arguments)},hideAlert:function(){this.frame.hideAlert.apply(this.frame,arguments)},showLoading:function(t){this.frame.showLoading.apply(this.frame,arguments)},hideLoading:function(){this.frame.hideLoading.apply(this.frame,arguments)},showHeader:function(){this.frame.showHeader.apply(this.frame,arguments)},hideHeader:function(){this.frame.hideHeader.apply(this.frame,arguments)}});return c});