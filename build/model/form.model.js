define("SINGLE/model/form.model.js",["model/model"],function(require,e,t){var n=require("model/model");return n.extend({propertys:function(){this.dataType="json",this.contentType="application/x-www-form-urlencoded",this.ajaxConfigs={},this.headers={}},ajaxRequest:function(e,t,n,a,o){var s=this;return $.ajax($.extend(this.ajaxConfigs,{url:t,data:n,type:e,headers:this.headers||{},contentType:this.contentType,dataType:this.dataType,success:function(e){a.apply(s,arguments)},error:function(e){o.apply(s,arguments)}}))}})});