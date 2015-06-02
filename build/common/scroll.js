define("common/scroll",[],function(){function t(t){return null===t||void 0===t}function i(t,s,i){var o,e;if(m(t)){if(i){for(o=t.length-1,e=-1;o>e;o--)if(s(t[o],o))return}else for(o=0,e=t.length;e>o;o++)if(s(t[o],o))return}else for(o in t)if(t.hasOwnProperty(o)&&s(t[o],o))return}function o(t,s){var i=t.className.split(" ");i.indexOf(s)>-1||(i.push(s),t.className=i.join(" "))}function e(t,s){var i,o=t.className.split(" ");-1!==(i=o.indexOf(s))&&(o.splice(i,1),t.className=o.join(" "))}function l(t,s,i){return!i&&t.style[s]?t.style[s]:i?void(t.style[s]=i):(window.getComputedStyle(t)||{})[s]}function n(t,s){var o=document.createElement(t);return s=s||{},i(s,function(t,s){o.setAttribute(s,t)}),o}function a(t){return _+t}function r(t,s,i){l(t,a("transform"),"translate3d("+s+"px,"+i+"px,0px)")}function c(t){var s,i,o=l(t,a("transform"));return o&&"none"!=o?(s=o.match(w))?i={x:parseInt(s[1])||0,y:parseInt(s[2])||0,z:parseInt(s[3])||0}:(s=o.match(X))&&(i={x:parseInt(s[1])||0,y:(o.match(Y)||{})[1]||0,z:0}):i={x:0,y:0,z:0},i}function h(t,s){var i=s,o=-s;return t>i?i:o>t?o:t}function u(t,s){return Math.max(Math.abs(t),Math.abs(s))}function d(t,s){for(var i=t.childNodes,o=i.length,e=0;o>e;e++)s.appendChild(i[0]);return t.appendChild(s),t}function b(t){this.box,this.scroll=!0,this.subbox,this.scrollbarX,this.scrollbarY,this.startDomX=0,this.startDomY=0,this.startMouseX=0,this.startMouseY=0,this.isMouseDown=!1,this.acceler=new M,this.elastic=!1,this.elasticX=!0,this.elasticY=!0,this.currentSid,this.events={},this.lastX=0,this.lastY=0,this.setOption(t),this.init()}var x=Array.prototype,f=(x.slice,Object.prototype.toString),p=function(t){var s,i=p.__cache=p.__cache||{},o=f.call(t);return i[o]?i[o]:(s=o.replace(/^\[\w+\s+(\w+)\]$/,"$1").toLowerCase(),i[o]=s)},m=function(t){return"array"===p(t)},v="ontouchend"in document,y=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},S=30,_=function(t){return"transform"in t?"":"-webkit-transform"in t?"-webkit-":"MozTransform"in t?"-moz-":"-o-transform"in t?"-o-":"-ms-transform"in t?"-ms-":null}(n("div").style),w=/translate3d\(\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*\)/i,X=/translateX\(\s*(-?[\d\.]+\w+)\s*\)/i,Y=/translateY\(\s*(-?[\d\.]+\w+)\s*\)/i,M=function(){function t(){this.list=[],this.lastX=0,this.lastY=0,this.state=t.STATE_STOP}return t.STATE_STOP=0,t.STATE_START=1,t.prototype={clear:function(){this.list=[]},add:function(t,s){this.endLoop(),this.lastX=t,this.lastY=s,this._add(t,s),this.startLoop()},_add:function(t,s){this.list.unshift({date:(new Date).valueOf(),x:t,y:s}),this.list.length>2&&this.list.splice(3)},startLoop:function(){var t=this;this.resource=setTimeout(function(){t._add(t.lastX,t.lastY),t.startLoop()},40)},endLoop:function(){clearTimeout(this.resource)},end:function(t,i){this._add(t,i),this.endLoop();var o=this.list.length;if(2>o)return{x:0,y:0};for(var e,l,n=0,o=this.list.length,t=0,i=0;o>n&&(e=this.list[n],l=this.list[n+1],e&&l);n++)s=1/(l.date-e.date||1),t+=s*(l.x-e.x),i+=s*(l.y-e.y);return t/=n||1,i/=n||1,{x:t,y:i}}},t}(),P=v?function(t){return t.changedTouches[0]}:function(t){return t},g=v?"touchstart":"mousedown",z=v?"touchmove":"mousemove",B=v?"touchend":"mouseup";return b.prototype={constructor:b,setOption:function(s){t(s.box)||(this.box=s.box),t(s.scroll)||(this.scroll=s.scroll),t(s.onscroll)||this.on("onscroll",s.onscroll),t(s.onscrollend)||this.on("onscrollend",s.onscrollend),t(s.elastic)||(this.elastic=s.elastic),t(s.elasticX)||(this.elasticX=s.elasticX),t(s.elasticY)||(this.elasticY=s.elasticY)},on:function(t,s){var i=this.events[t]=this.events[t]||[];-1===i.indexOf(s)&&i.push(s)},off:function(t,s){var i=this.events[t]=this.events[t]||[];if(!s)return void(i[t]=null);var o=i.indexOf(s);o>-1&&i.splice(o,1)},emit:function(t,s){for(var i=this.events[t]=this.events[t]||[],o=0,e=i.length;e>o;o++)i[o].call(this,s)},init:function(){if(!this.box)throw"Parameters 'box' are not found!";this.initDom(),this.initEvent(),this._startAutoCalcScrollSize()},initDom:function(){o(this.box,"silky-box");var t=l(this.box,"position");t&&"static"!==t||l(this.box,"position","relative"),this.subbox=n("div",{"class":"silky-subbox"}),this.scrollbarX=n("div",{"class":"silky-scrollbarx"}),this.scrollbarY=n("div",{"class":"silky-scrollbary"}),this.scroll||(l(this.scrollbarX,"display","none"),l(this.scrollbarX,"display","inline-block")),d(this.box,this.subbox),this.box.appendChild(this.scrollbarX),this.box.appendChild(this.scrollbarY),this._calcScrollBarSize()},initEvent:function(){this.box.addEventListener(g,this,!1),this.box.addEventListener(z,this,!1),this.box.addEventListener(B,this,!1),v&&this.box.addEventListener("touchcancel",this,!1)},handleEvent:function(t){var s,i,l,n,a,r=P(t);switch(t.type){case g:this._stopAutoCalcScrollSize(),e(this.subbox,"silky-letgo"),this.startMouseX=r.clientX,this.startMouseY=r.clientY,a=c(this.subbox),this.startDomX=a.x,this.startDomY=a.y,this.isMouseDown=!0,this.currentSid&&(this.currentSid.stop=!0),this.acceler.clear(),this.acceler.add(r.clientX,r.clientY);break;case z:if(!this.isMouseDown)return;s=r.clientX-this.startMouseX,i=r.clientY-this.startMouseY,l=this.startDomX+s,n=this.startDomY+i,a=spos=this._calcPos(l,n),this.elastic&&(a=this._calcOverflow(l,n,a.x,a.y),this.elasticX||(a.x=spos.x),this.elasticY||(a.y=spos.y)),this._calcScrollBarPos(a.x,a.y,a.dx,a.dy),this._setSubBoxPos(a.x,a.y),t.preventDefault(),this._calcScrollBarSize(a.dx,a.dy),this.acceler.add(r.clientX,r.clientY),this.emit("scroll",this.getPosition());break;case B:case"touchcancel":this.isMouseDown=!1,s=r.clientX-this.startMouseX,i=r.clientY-this.startMouseY,l=this.startDomX+s,n=this.startDomY+i,a=this._calcPos(l,n),this._calcScrollBarSize(),o(this.subbox,"silky-letgo"),this.currentSid={stop:!1},this._slowStart(this.acceler.end(r.clientX,r.clientY),{x:l-a.x,y:n-a.y}),this.emit("scroll",this.getPosition())}},_setSubBoxPos:function(t,s){this.lastX=parseInt(t),this.lastY=parseInt(s),r(this.subbox,this.lastX,this.lastY)},_calcPos:function(t,s){var i=this.subbox.clientWidth,o=this.subbox.clientHeight,e=this.box.clientWidth,l=this.box.clientHeight;i=e>i?e:i,o=l>o?l:o;var n=s>=0,a=l>=o+s,r=t>=0,c=e>=i+t;return n?s=0:a&&(s=-(o-l)),r?t=0:c&&(t=-(i-e)),{x:t,y:s}},_calcOverflow:function(t,s,i,o){var e=(t-i)/4,l=(s-o)/4;return{x:i+e,y:o+l,dx:e,dy:l}},_calcScrollBarSize:function(t,s){t=Math.abs(t||0),s=Math.abs(s||0);var i=this.box.clientWidth,o=this.subbox.clientWidth,e=this.box.clientHeight,n=this.subbox.clientHeight,a=i/(o+t),r=e/(n+s);a=a>1?1:a,r=r>1?1:r;var c=a*this.box.clientWidth,h=r*this.box.clientHeight;l(this.scrollbarX,"width",c+"px"),l(this.scrollbarY,"height",h+"px"),i>=o?l(this.scrollbarX,"display","none"):l(this.scrollbarX,"display","inline-block"),e>=n?l(this.scrollbarY,"display","none"):l(this.scrollbarY,"display","inline-block")},_calcScrollBarPos:function(t,s,i,o){i=Math.abs(i||0),o=Math.abs(o||0);var e=this.subbox.clientWidth+i,l=this.subbox.clientHeight+o,n=this.box.clientWidth,a=this.box.clientHeight;e=n>e?n:e,l=a>l?a:l;var c=-(t/(e-n)||0),h=-(s/(l-a)||0),o=h*(a-this.scrollbarY.clientHeight),i=c*(n-this.scrollbarX.clientWidth);o=Math.max(o,0),i=Math.max(i,0),r(this.scrollbarY,0,o),r(this.scrollbarX,i,0)},_reCalcScrollBarPos:function(){this._calcScrollBarPos(this.lastX||0,this.lastY||0)},_slowStart:function(t,s){var i=h(t.x,3)*S,o=h(t.y,3)*S,e=u(s.x,s.y),l=u(i,o),n=1.1-Math.min((Math.pow(e,2)+l)/1e4,10)/10,a=15*n;this._slowLoop(this.currentSid,90,90,i,o,a)},_slowLoop:function(t,s,i,o,e,l){var n=Math.sin(i/s*Math.PI/2),a=l,r=a-(s-i);0>r&&(r=0);var h=Math.sin(r/a*Math.PI/2),u=c(this.subbox),d=u.x+o,b=u.y+e,x=this._calcPos(d,b),f=0,p=0,m={},v=x.x,S=x.y;if(this.elastic&&(f=(d-x.x)*h,p=(b-x.y)*h,m=this._calcOverflow(d,b,x.x,x.y),this.elasticX&&(v=x.x+f),this.elasticY&&(S=x.y+p)),0>=i||t.stop||Math.max(Math.abs(o),Math.abs(e))<1&&(Math.max(Math.abs(f),Math.abs(p))<1||v===this._lastRealScrollX&&S===this._lastRealScrollY))return this.emit("scrollend",this.getPosition()),this._setSubBoxPos(x.x,x.y),void this._startAutoCalcScrollSize();this._lastRealScrollY=S,this._lastRealScrollX=v,this._setSubBoxPos(v,S),this._calcScrollBarPos(v,S),this._calcScrollBarSize(m.dx,m.dy),this.emit("scroll",this.getPosition());var _=this;y(function(){_._slowLoop(t,s,i-1,o*n,e*n,l)})},_startAutoCalcScrollSize:function(){var t=this;this.autoscrollsize=setTimeout(function(){t._calcScrollBarSize(),t._reCalcScrollBarPos(),t._startAutoCalcScrollSize()},1e3)},_stopAutoCalcScrollSize:function(){clearTimeout(this.autoscrollsize)},to:function(t,s){t=-t,s=-s;var i=this._calcPos(t,s);this._setSubBoxPos(i.x,i.y),this._calcScrollBarSize(),this._calcScrollBarPos(i.x,i.y)},getPosition:function(){var t=c(this.subbox);return{x:t.x?-t.x:t.x,y:t.y?-t.y:t.y}}},b});