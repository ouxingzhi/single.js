define("scroll",function(){function t(t){return null===t||void 0===t}function i(t,i,s){var e,n;if(b(t)){if(s){for(e=t.length-1,n=-1;e>n;e--)if(i(t[e],e))return}else for(e=0,n=t.length;n>e;e++)if(i(t[e],e))return}else for(e in t)if(t.hasOwnProperty(e)&&i(t[e],e))return}function e(t,i){var s=t.className.split(" ");s.indexOf(i)>-1||(s.push(i),t.className=s.join(" "))}function n(t,i){var s,e=t.className.split(" ");-1!==(s=e.indexOf(i))&&(e.splice(s,1),t.className=e.join(" "))}function r(t,i,s){return!s&&t.style[i]?t.style[i]:s?void(t.style[i]=s):(window.getComputedStyle(t)||{})[i]}function o(t,s){var e=document.createElement(t);return s=s||{},i(s,function(t,i){e.setAttribute(i,t)}),e}function a(t){return S+t}function l(t,i,s){r(t,a("transform"),"translate3d("+i+"px,"+s+"px,0px)")}function c(t){var i,s,e=r(t,a("transform"));return e&&"none"!=e?(i=e.match(g))?s={x:parseInt(i[1])||0,y:parseInt(i[2])||0,z:parseInt(i[3])||0}:(i=e.match(w))&&(s={x:parseInt(i[1])||0,y:(e.match(k)||{})[1]||0,z:0}):s={x:0,y:0,z:0},s}function h(t,i){var s=i,e=-i;return t>s?s:e>t?e:t}function u(t,i){return Math.max(Math.abs(t),Math.abs(i))}function f(t,i){for(var s=t.childNodes,e=s.length,n=0;e>n;n++)i.appendChild(s[0]);return t.appendChild(i),t}function p(t){this.box,this.scroll=!0,this.subbox,this.scrollbarX,this.scrollbarY,this.startDomX=0,this.startDomY=0,this.startMouseX=0,this.startMouseY=0,this.isMouseDown=!1,this.acceler=new E,this.elastic=!1,this.elasticX=!0,this.elasticY=!0,this.currentSid,this.events={},this.lastX=0,this.lastY=0,this.setOption(t),this.init()}var v=Array.prototype,y=(v.slice,Object.prototype.toString),d=function(t){var i,s=d.__cache=d.__cache||{},e=y.call(t);return s[e]?s[e]:(i=e.replace(/^\[\w+\s+(\w+)\]$/,"$1").toLowerCase(),s[e]=i)},b=function(t){return"array"===d(t)},x="ontouchend"in document,m=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},_=30,S=function(t){return"transform"in t?"":"-webkit-transform"in t?"-webkit-":"MozTransform"in t?"-moz-":"-o-transform"in t?"-o-":"-ms-transform"in t?"-ms-":null}(o("div").style),g=/translate3d\(\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*\)/i,w=/translateX\(\s*(-?[\d\.]+\w+)\s*\)/i,k=/translateY\(\s*(-?[\d\.]+\w+)\s*\)/i,E=function(){function t(){this.list=[],this.lastX=0,this.lastY=0,this.state=t.STATE_STOP}return t.STATE_STOP=0,t.STATE_START=1,t.prototype={clear:function(){this.list=[]},add:function(t,i){this.endLoop(),this.lastX=t,this.lastY=i,this._add(t,i),this.startLoop()},_add:function(t,i){this.list.unshift({date:(new Date).valueOf(),x:t,y:i}),this.list.length>2&&this.list.splice(3)},startLoop:function(){var t=this;this.resource=setTimeout(function(){t._add(t.lastX,t.lastY),t.startLoop()},40)},endLoop:function(){clearTimeout(this.resource)},end:function(t,i){this._add(t,i),this.endLoop();var e=this.list.length;if(2>e)return{x:0,y:0};for(var n,r,o=0,e=this.list.length,t=0,i=0;e>o&&(n=this.list[o],r=this.list[o+1],n&&r);o++)s=1/(r.date-n.date||1),t+=s*(r.x-n.x),i+=s*(r.y-n.y);return t/=o||1,i/=o||1,{x:t,y:i}}},t}(),T=x?function(t){return t.changedTouches[0]}:function(t){return t},P=x?"touchstart":"mousedown",L=x?"touchmove":"mousemove",X=x?"touchend":"mouseup";return p.prototype={constructor:p,setOption:function(i){t(i.box)||(this.box=i.box),t(i.scroll)||(this.scroll=i.scroll),t(i.onscroll)||this.on("onscroll",i.onscroll),t(i.onscrollend)||this.on("onscrollend",i.onscrollend),t(i.elastic)||(this.elastic=i.elastic),t(i.elasticX)||(this.elasticX=i.elasticX),t(i.elasticY)||(this.elasticY=i.elasticY)},on:function(t,i){var s=this.events[t]=this.events[t]||[];-1===s.indexOf(i)&&s.push(i)},off:function(t,i){var s=this.events[t]=this.events[t]||[];if(!i)return void(s[t]=null);var e=s.indexOf(i);e>-1&&s.splice(e,1)},emit:function(t,i){for(var s=this.events[t]=this.events[t]||[],e=0,n=s.length;n>e;e++)s[e].call(this,i)},init:function(){if(!this.box)throw"Parameters 'box' are not found!";this.initDom(),this.initEvent(),this._startAutoCalcScrollSize()},initDom:function(){e(this.box,"silky-box");var t=r(this.box,"position");t&&"static"!==t||r(this.box,"position","relative"),this.subbox=o("div",{"class":"silky-subbox"}),this.scrollbarX=o("div",{"class":"silky-scrollbarx"}),this.scrollbarY=o("div",{"class":"silky-scrollbary"}),this.scroll||(r(this.scrollbarX,"display","none"),r(this.scrollbarX,"display","inline-block")),f(this.box,this.subbox),this.box.appendChild(this.scrollbarX),this.box.appendChild(this.scrollbarY),this._calcScrollBarSize()},initEvent:function(){this.box.addEventListener(P,this,!1),this.box.addEventListener(L,this,!1),this.box.addEventListener(X,this,!1),x&&this.box.addEventListener("touchcancel",this,!1)},handleEvent:function(t){var i,s,r,o,a,l=T(t);switch(t.type){case P:this._stopAutoCalcScrollSize(),n(this.subbox,"silky-letgo"),this.startMouseX=l.clientX,this.startMouseY=l.clientY,a=c(this.subbox),this.startDomX=a.x,this.startDomY=a.y,this.isMouseDown=!0,this.currentSid&&(this.currentSid.stop=!0),this.acceler.clear(),this.acceler.add(l.clientX,l.clientY);break;case L:if(!this.isMouseDown)return;i=l.clientX-this.startMouseX,s=l.clientY-this.startMouseY,r=this.startDomX+i,o=this.startDomY+s,a=spos=this._calcPos(r,o),this.elastic&&(a=this._calcOverflow(r,o,a.x,a.y),this.elasticX||(a.x=spos.x),this.elasticY||(a.y=spos.y)),this._calcScrollBarPos(a.x,a.y,a.dx,a.dy),this._setSubBoxPos(a.x,a.y),t.preventDefault(),this._calcScrollBarSize(a.dx,a.dy),this.acceler.add(l.clientX,l.clientY),this.emit("scroll",this.getPosition());break;case X:case"touchcancel":this.isMouseDown=!1,i=l.clientX-this.startMouseX,s=l.clientY-this.startMouseY,r=this.startDomX+i,o=this.startDomY+s,a=this._calcPos(r,o),this._calcScrollBarSize(),e(this.subbox,"silky-letgo"),this.currentSid={stop:!1},this._slowStart(this.acceler.end(l.clientX,l.clientY),{x:r-a.x,y:o-a.y}),this.emit("scroll",this.getPosition())}},_setSubBoxPos:function(t,i){this.lastX=parseInt(t),this.lastY=parseInt(i),l(this.subbox,this.lastX,this.lastY)},_calcPos:function(t,i){var s=this.subbox.clientWidth,e=this.subbox.clientHeight,n=this.box.clientWidth,r=this.box.clientHeight;s=n>s?n:s,e=r>e?r:e;var o=i>=0,a=r>=e+i,l=t>=0,c=n>=s+t;return o?i=0:a&&(i=-(e-r)),l?t=0:c&&(t=-(s-n)),{x:t,y:i}},_calcOverflow:function(t,i,s,e){var n=(t-s)/4,r=(i-e)/4;return{x:s+n,y:e+r,dx:n,dy:r}},_calcScrollBarSize:function(t,i){t=Math.abs(t||0),i=Math.abs(i||0);var s=this.box.clientWidth,e=this.subbox.clientWidth,n=this.box.clientHeight,o=this.subbox.clientHeight,a=s/(e+t),l=n/(o+i);a=a>1?1:a,l=l>1?1:l;var c=a*this.box.clientWidth,h=l*this.box.clientHeight;r(this.scrollbarX,"width",c+"px"),r(this.scrollbarY,"height",h+"px"),s>=e?r(this.scrollbarX,"display","none"):r(this.scrollbarX,"display","inline-block"),n>=o?r(this.scrollbarY,"display","none"):r(this.scrollbarY,"display","inline-block")},_calcScrollBarPos:function(t,i,s,e){s=Math.abs(s||0),e=Math.abs(e||0);var n=this.subbox.clientWidth+s,r=this.subbox.clientHeight+e,o=this.box.clientWidth,a=this.box.clientHeight;n=o>n?o:n,r=a>r?a:r;var c=-(t/(n-o)||0),h=-(i/(r-a)||0),e=h*(a-this.scrollbarY.clientHeight),s=c*(o-this.scrollbarX.clientWidth);e=Math.max(e,0),s=Math.max(s,0),l(this.scrollbarY,0,e),l(this.scrollbarX,s,0)},_reCalcScrollBarPos:function(){this._calcScrollBarPos(this.lastX||0,this.lastY||0)},_slowStart:function(t,i){var s=h(t.x,3)*_,e=h(t.y,3)*_,n=u(i.x,i.y),r=u(s,e),o=1.1-Math.min((Math.pow(n,2)+r)/1e4,10)/10,a=15*o;this._slowLoop(this.currentSid,90,90,s,e,a)},_slowLoop:function(t,i,s,e,n,r){var o=Math.sin(s/i*Math.PI/2),a=r,l=a-(i-s);0>l&&(l=0);var h=Math.sin(l/a*Math.PI/2),u=c(this.subbox),f=u.x+e,p=u.y+n,v=this._calcPos(f,p),y=0,d=0,b={},x=v.x,_=v.y;if(this.elastic&&(y=(f-v.x)*h,d=(p-v.y)*h,b=this._calcOverflow(f,p,v.x,v.y),this.elasticX&&(x=v.x+y),this.elasticY&&(_=v.y+d)),0>=s||t.stop||Math.max(Math.abs(e),Math.abs(n))<1&&(Math.max(Math.abs(y),Math.abs(d))<1||x===this._lastRealScrollX&&_===this._lastRealScrollY))return this.emit("scrollend",this.getPosition()),this._setSubBoxPos(v.x,v.y),void this._startAutoCalcScrollSize();this._lastRealScrollY=_,this._lastRealScrollX=x,this._setSubBoxPos(x,_),this._calcScrollBarPos(x,_),this._calcScrollBarSize(b.dx,b.dy),this.emit("scroll",this.getPosition());var S=this;m(function(){S._slowLoop(t,i,s-1,e*o,n*o,r)})},_startAutoCalcScrollSize:function(){var t=this;this.autoscrollsize=setTimeout(function(){t._calcScrollBarSize(),t._reCalcScrollBarPos(),t._startAutoCalcScrollSize()},1e3)},_stopAutoCalcScrollSize:function(){clearTimeout(this.autoscrollsize)},to:function(t,i){t=-t,i=-i;var s=this._calcPos(t,i);this._setSubBoxPos(s.x,s.y),this._calcScrollBarSize(),this._calcScrollBarPos(s.x,s.y)},getPosition:function(){var t=c(this.subbox);return{x:t.x?-t.x:t.x,y:t.y?-t.y:t.y}}},p}),define("funs",["base"],function(require,t,i){var s=(require("base"),{});return s.createAddSelf=function(t){return t=t||0,function(){return t++}},s}),define("var",function(){function t(t){if(t!==i){var e={del:function(){t=null},__proto__:s};return Object.defineProperty(e,"v",{get:function(){return t},set:function(i){t=i}}),e}}var i={},s=new t(i);return t}),define("promise",function(){function t(i){this.state=t.STATE_UNFULFILLED,this.resolveCallbacks=[],this.rejecteCallbacks=[],i&&setTimeout(function(){i(e(this.resolve,this),e(this.reject,this))},0)}var i=Array.prototype.slice,s=Array.prototype.indexOf||function(t){for(var i=0,s=this.length;s>i;i++)if(t===this[i])return i;return-1},e=function(t,i){return t.bind?t.bind(i):function(){return t.apply(i,arguments)}};return t.STATE_UNFULFILLED=0,t.STATE_RESOLVED=1,t.STATE_REJECTED=2,t.prototype={constructor:t,when:function(){var e=new t,n=i.call(arguments),r=[],o=this,a=function(i){if(o.state===t.STATE_UNFULFILLED){var a=s.call(n,this);a>-1&&(n.splice(a,1),r[a]=i),n.length||(e.resolve(r),o.state=t.STATE_RESOLVED)}},l=function(){if(o.state===t.STATE_UNFULFILLED){var i=s.call(n,this);i>-1&&n.splice(i,1),n.length||(e.reject(),o.state=t.STATE_REJECTED)}};if(n.length)for(var c=0,h=n.length;h>c;c++){if(!(n[c]instanceof t))throw"when() Parameter must be a type of Promise";n[c].then(a,l)}else setTimeout(function(){o.resolve()},0);return e},then:function(s,n){var r=new t,o=this;return s&&this.resolveCallbacks.push(function(){var t=[e(r.resolve,r),e(r.reject,r)].concat(i.call(arguments));s.apply(o,t)}),n&&this.rejecteCallbacks.push(function(){{var t=[e(r.reject,r)].concat(i.call(arguments));n.apply(o,t)}}),r},resolve:function(){var i=arguments;setTimeout($.proxy(function(){if(this.state===t.STATE_UNFULFILLED){for(var s=0,e=this.resolveCallbacks.length;e>s;s++)this.resolveCallbacks[s].apply(this,i);this.state=t.STATE_RESOLVED}},this),0)},reject:function(){var i=arguments;setTimeout($.proxy(function(){if(this.state===t.STATE_UNFULFILLED){for(var s=0,e=this.rejecteCallbacks.length;e>s;s++)this.rejecteCallbacks[s].apply(this,i);this.state=t.STATE_REJECTED}},this),0)}},t}),define("object",["class","var"],function(require,t,i){var s=require("class"),e=require("var"),n=s({destruct:function(){var t;for(var i in this)this.hasOwnProperty(i)&&(t=this[i],t instanceof e&&t.del(),this[i]=null)}});return n}),define("log",function(){function t(){return"boolean"==typeof __SINGE_DEBUG__&&__SINGE_DEBUG__===!0}return{log:function(i,s){t()&&(s||(s="default"),console.log(s+": "+i))},err:function(i,s){t()&&(s||(s="default"),console.error(s+": "+i))}}}),define("hash",["object","object"],function(require,t,i){var s=require("object"),e=require("object");return s.extend({propertys:function(){this.keys=[],this.values={}},initialize:function($super,t){$super(),t=t||[];for(var i=0,s=t.length;s>i;i++)this.push(t[i].key,t[i].value)},push:function(t,i){null!==t&&void 0!==t&&(this.values[t]&&this.del(t),this.keys.push(t),this.values[t]=i)},pop:function(){var t=this.keys.pop(),i=this.values[t];return t||i?(delete this.values[t],{key:t,value:i}):null},shift:function(){var t=this.keys.shift(),i=this.values[t];return t||i?(delete this.values[t],{key:t,value:i}):null},unshift:function(t,i){null!==t&&void 0!==t&&(this.values[t]&&this.del(t),this.keys.unshift(t),this.values[t]=i)},del:function(t){var i=this.keys.indexOf(t);if(-1===i)return null;var t,s;return t=this.keys.splice(i,1),s=this.values[t],delete this.values[t],{key:t,value:s}},get:function(t){return this.values[t]},splice:function(t,i,s){"boolean"===e.type(i)&&(i=null,s=i),t||(t=0);var n=Math.max(this.keys.length-1,0);keys=this.keys.slice(),rkeys=[],s?(t=n-t,keys.reverse(),rkeys=e.isNUL(i)?keys.splice(t):keys.splice(t,i)):rkeys=e.isNUL(i)?keys.splice(t):keys.splice(t,i);var r=[],o=this;return e.each(rkeys,function(t){var i=o.del(t);i&&r.push(i)}),s&&r.reverse(),r},slice:function(t,i){t||(t=0);Math.max(this.keys.length-1,0);keys=this.keys,rkeys=e.isNUL(i)?keys.slice(t):keys.slice(t,i);var s=[],n=this;return e.each(rkeys,function(t){var i=n.get(t);i&&s.push({key:t,value:i})}),s},toString:function(){return JSON.stringify(this.slice())},valueOf:function(){return this.slice()}})}),define("event",["base","object","var"],function(require,t,i){var s=require("base"),e=require("object"),n=require("var"),r=e.extend({propertys:function(){this.__event=n({})},on:function(t,i,e,n){var r=this.__event;r.v[t]=r.v[t]||[],n&&-1!==s.indexOf(r.v[t],function(t){return i===t.fn})||r.v[t].push({fn:i,space:e})},off:function(t,i){if(!t&&!i)return this.__event.v.del(),void(this.__event=n({}));var s,e=this.__event;e.v[t]=e.v[t]||[],i?(s=ase.indexOf(e.v[t],function(t){return i===t.fn}),s>-1&&e.v[t].splice(s,1)):e.v[t]=[]},emit:function(t,i){var e=this.__event,n=this;e.v[t]=e.v[t]||[];var r=s.toArray(arguments);r.shift(),s.each(e.v[t],function(t){t.fn.apply(t.space||n,r)})}});return r}),define("class",["base"],function(require,t,i){"use strict";function s(){}function e(t,i){return t=t||s,i=i||s,function(){var s=[o.bind(t,this)].concat(o.toArray(arguments));return i.apply(this,s)}}function n(t){var i=function(){};return i.prototype=t.prototype,new i}function r(t,i){function o(){if(!(this instanceof o)){var t=n(o);return o.apply(t,arguments),t}this.propertys.apply(this,arguments),this.initialize.apply(this,arguments)}function h(){}"object"==typeof t&&(i=t,t=function(){});var u,f=t.prototype;h.prototype=t.prototype,o.prototype=new h;for(u in i)i.hasOwnProperty(u)&&c[u]!==l&&(o.prototype[u]="function"==typeof f[u]&&i[u].toString().match(a)?e(f[u],i[u]):i[u]);o.prototype.propertys=function(t,i){return function(){t&&t.apply(this,arguments),i&&i.apply(this,arguments)}}(o.prototype.propertys,i.propertys),o.prototype.initialize=i.initialize&&i.initialize.toString().match(a)?e(f.initialize,i.initialize):i.initialize||s,o.prototype.constructor=o;for(u in t)t.hasOwnProperty(u)&&"instance"!==u&&(o[u]=t[u]);return o.extend=function(t){return r(this,t)},o.addPropertys=function(t){var i=this.prototype;for(u in t)t.hasOwnProperty(u)&&c[u]!==l&&(i[u]="function"==typeof i[u]&&t[u].toString().match(a)?e(i[u],t[u]):t[u]);return this},o.getInstance=function(){return this.instance?this.instance:(this.instance={__proto__:this.prototype},this.apply(this.instance,arguments),this.instance)},o}var o=require("base"),a=/^\s*function[^\(\)]*\(\s*\$super/,l={},c={constrcutor:l,propertys:l,initialize:l};return r}),define("base",function(){"use strict";function t(t){var i=t.split("."),s=[];return n.each(i,function(t,i){var e;t.match(o)?(e=t.split("["),n.each(e,function(t,i){t&&s.push(t.replace(/[\]"']+/g,""))})):s.push(t)}),s}var i=Array.prototype,s=i.slice,e=Object.prototype.toString,n={};n.hasProp=function(t,i){return t.hasOwnProperty(i)};var r={};n.type=function(t){if(void 0===t)return"undefined";if(null===t)return"null";var i=e.call(t);if(r[i])return r[i];var s=i.replace(/^\[object\s+|\]$/g,"").toLowerCase();return r[i]=s},n.each=function(t,i,s,e){var r,o,a=n.type(t);if("array"===a||"arguments"===a||t.length){if(e){for(r=t.length-1;r>-1;r--)if(i.call(s,t[r],r,t))return}else for(r=0,o=t.length;o>r;r++)if(i.call(s,t[r],r,t))return}else for(r in t)if(n.hasProp(t,r)&&i.call(s,t[r],r,t))return},n.mix=function(t,i,e){var r=s.call(arguments),o=r.shift()||{},e=!0;return r.length&&"boolean"===n.type(r[r.length-1])&&(e=r.pop()),n.each(r,function(t){n.each(t,function(t,i){e?o[i]=t:o[i]||(o[i]=t)})}),o},n.bind=function(t,i){return t.bind?t.bind(i):function(){return t.apply(i,arguments)}},n.toArray=function(t){try{return s.call(t)}catch(i){var e=[];return n.each(t,function(t){e.push(t)}),e}},n.indexOf=function(t,i){var s=-1,e=function(t){return t===i};return"function"==typeof i&&(e=i),n.each(t||[],function(t,i){return e(t)?(s=i,!0):void 0}),s},n.isEmpty=function(t){if(!t)return!0;var i=n.type(t);if("array"===i&&t.length)return!1;if("object"===i)for(var s in t)if(t.hasOwnProperty(s))return!1;return!0},n.isNUL=function(t){return null===t||void 0===t};var o=/\[[^\[\]]+\]/g;return n.path=function(i,s,e){var n=i;if(i&&s){var r,o,a=t(s),l=Math.max(a.length-1,0),c=0;if(void 0===e){for(;l>=c&&(o=a[c],r=i&&i[o],r);c++)i=r;return r}for(;l>=c;c++)o=a[c],l>c?i=i[o]=i[o]||{}:i[o]=e;return n}},n.delPath=function(i,s){if(i&&s){for(var e,n,r=t(s),o=Math.max(r.length-1,0),a=0;o>=a;a++)if(n=r[a],o>a){if(i=i&&i[n],!i)break}else e=i[n],delete i[n];return e}},n}),seajs.use(function(){}),define("main",["base/base","base/class","base/event"],function(){});