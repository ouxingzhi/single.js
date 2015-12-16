define("SINGLE/ui/base.js",["SINGLE/base/base","SINGLE/common/funs"],function(require,e,t){var n=(require("SINGLE/base/base"),require("SINGLE/common/funs")),r={};r.getOffsetByPage=function(e){var t=0,n=0;if(!e)return{left:t,top:n};do t+=e.offsetLeft,n+=e.offsetTop;while(e=e.offsetParent);return{top:n,left:t}},r.getPageSize=function(){return document.body?{height:document.body.scrollHeight,width:document.body.scrollWidth}:{width:0,height:0}},r.createZIndex=function(e,t){return function(){return t+e()}}(n.createAddSelf(),2e3),r.createUiId=function(e){return function(){return"uiId_"+e()}}(n.createAddSelf()),r.createFnName=function(e){return function(){return"fn_"+e()}}(n.createAddSelf()),r.cssPrefix=function(){return"-webkit-"}();var s=/translate(x|y|z)\((-?[\w\.]+)\)/gim,f=/translate(?:3d|2d)?\(\s*(-?[\w\.]+)\s*,\s*(-?[\w\.-]+)\s*(?:,\s*(-?[\w\.-]+)\s*)?\)/i;return r.getTranslate=function(e){var t,n=$(e).css(r.cssPrefix+"transform"),a={};return n.match(s)?n.replace(s,function(e,t,n){a[t]=n}):(t=f.exec(n))&&(a.x=t[1],a.y=t[2],a.z=t[3]),a},r.setTranslate=function(e,t){var n=$(e);t=t||{};var s=[t.x||"0px",t.y||"0px",t.z||"0px"];n.css(r.cssPrefix+"transform","translate3D("+s.join(",")+")")},r});