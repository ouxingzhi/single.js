define("ui/base.js",["base/base","common/funs"],function(require,e,t){var n=(require("base/base"),require("common/funs")),r={};return r.getOffsetByPage=function(e){var t=0,n=0;if(!e)return{left:t,top:n};do t+=e.offsetLeft,n+=e.offsetTop;while(e=e.offsetParent);return{top:n,left:t}},r.getPageSize=function(){return document.body?{height:document.body.scrollHeight,width:document.body.scrollWidth}:{width:0,height:0}},r.createZIndex=function(e,t){return function(){return t+e()}}(n.createAddSelf(),2e3),r.createUiId=function(e){return function(){return"uiId_"+e()}}(n.createAddSelf()),r.createFnName=function(e){return function(){return"fn_"+e()}}(n.createAddSelf()),r});