define("common/lrc.js",["common/event"],function(require){function t(t){var e=t.split(/[:\.]/);return 60*parseInt(e[0].replace(a,"$1"))+parseInt(e[1].replace(a,"$1"))+parseInt((e[2]||"0").replace(a,"$1"))/1e3}function e(e){var n=[];return e.replace(o,function(e,r){n.push(t(r))}),n}function n(t){t=t||"";for(var n,r,o,a=t.split(i),u=[],f={},p=0,h=a.length;h>p;p++)if(a[p]=a[p].replace(s,""),o=a[p].match(c))f[o[1]]=o[2]||"";else if(o=a[p].match(l)){n=e(o[1]),r=a[p].replace(l,"");for(var m=0,d=n.length;d>m;m++)u.push({time:n[m],line:r,id:+new Date+String(Math.random()).replace(".","")})}return u.sort(function(t,e){return t.time-e.time}),{meta:f,lines:u}}var r=require("common/event"),i=/[\r\n]+/,c=/^\[(ti|ar|al|by|offset):([^\[\]]*)\]$/,s=/^\s+|\s+$/,l=/((?:\[\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?)\])(?:\s*\[\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?)\])*)/,o=/\[(\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?))\]/g,a=/^0+([0-9]+)$/,u=r.extend({propertys:function(){this.lrc="",this.lrcObj},initialize:function(t){this._setOption(t)},_setOption:function(t){t.lrc&&this.setLrc(t.lrc)},setLrc:function(t){this.lrcObj=n(t),this.emit("update",[this.lrcObj])},getLrc:function(){return this.lrcObj},pos:function(t){if(!this.lrcObj||!this.lrcObj.lines)return null;for(var e,n,r=this.lrcObj.lines,i={},c=0,s=r.length;s>c;c++)if(e=r[c],n=r[c+1]||i,e.time<=t&&(n===i||n.time>t)||0==c&&e.time>=t)return e;return null}});return u.parse=n,u});