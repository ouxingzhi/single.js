define("SINGLE/mvc/layout.updown.js",["mvc/layout"],function(require,t,n){var o=require("mvc/layout"),i="layout-head",e="layout-content",a=['<div class="layout-main">','<div class="'+i+'"></div>','<div class="'+e+'"></div>',"</div>"].join("");return o.extend({propertys:function(){this.root=$(a),this.header=this.root.find("."+i),this.content=this.root.find("."+e)},initialize:function($super,t){$super(t)},getRoot:function(){return this.root},getFrameBoxs:function(){return{header:this.header,content:this.content}}})});