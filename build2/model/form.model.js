define("model/form.model.js",["model/model"],function(require,e,t){var a=require("model/model");return a.extend({propertys:function(){this.dataType="json"},ajaxRequest:function(e,t,a,n,o){var r=this;return $.ajax({url:t,data:a,type:e,dataType:this.dataType,success:function(e){n.apply(r,arguments)},error:function(e){o.apply(r,arguments)}})}})});