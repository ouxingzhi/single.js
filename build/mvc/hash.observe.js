define("mvc/hash.observe.js",["base/event","common/url.hash"],function(require,t,e){var n=require("base/event"),i=require("common/url.hash"),s="hashchange";return n.extend({initialize:function($super){this.isObserve=!1,$super()},handleEvent:function(){var t=this.getCurHashData();this.emit(s,t)},add:function(t,e){return this.on(s,t,e),this},clear:function(){return this.off(s),this},trigger:function(){return this.handleEvent(),this},start:function(){return this.isObserve?this:(window.addEventListener("hashchange",this,!1),this.isObserve=!0,this)},end:function(){return window.removeEventListener("hashchange",this,!1),this.isObserve=!1,this},getCurHashData:function(){return new i(window.location.hash)}})});