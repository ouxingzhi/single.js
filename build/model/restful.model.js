define("SINGLE/model/restful.model.js",["SINGLE/model/model"],function(require,e,n){var t=require("SINGLE/model/model");return t.extend({ajaxRequest:function(e,n,t,a,o){var r=this;return $.ajax({url:n,data:JSON.stringify(t),type:e||"post",contentType:"application/json",dataType:"json",success:function(e){a.apply(r,arguments)},error:function(e){o.apply(r,arguments)}})}})});