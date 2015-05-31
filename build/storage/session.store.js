define("session.store",["store","session.storage"],function(require,t,i){var e=require("store"),s=require("session.storage");return e.extend({buildStorage:function(){return s}})}),define("session.storage",["storage"],function(require,t,i){var e=require("storage");return new e(sessionStorage)}),define("local.store",["store","local.storage"],function(require,t,i){var e=require("store"),s=require("local.storage");return e.extend({buildStorage:function(){return s}})}),define("local.storage",["storage"],function(require,t,i){var e=require("storage");return new e(localStorage)}),define("view",["base","event","scroll"],function(require,t,i){function e(){}function s(t){var i=(t||"").replace(/^\s+|\s+$/g,"").split(/\s+/);return{event:i.shift(),selector:i.join(" ")}}function n(){var t=this.events||{};r.each(t,function(t,i){var n=s(i),t=r.bind("function"==typeof t?t:this[t]||e,this);this.root.on(n.event,n.selector,t)},this)}var r=require("base"),o=require("event"),a=require("scroll"),h="viewroot-box",u="viewroot",c=o.extend({elastic:!0,propertys:function(t,i,e,s){this.root=$('<div class="'+h+'"><div class="'+u+'"></div></div>'),this.el=this.root.find("."+u),this.root.hide(),this.on("addframe",function(){this.scroll=new a({box:this.root[0],elastic:this.elastic,elasticX:!1})}),n.call(this),this.frame=e,this.app=s,this.name=t,this.hashdata=i,this.onCreate()},setHashData:function(t){this.hashdata=t},getRoot:function(){return this.root},turning:function(){this.frame.turning()},onCreate:function(){},onLoad:function(){},onShow:function(){},onHide:function(){},forward:function(){this.app.forward.apply(this.app,arguments)},replace:function(){this.app.replace.apply(this.app,arguments)},back:function(){this.app.back.apply(this.app,arguments)}});return c}),define("transition.interface",["object","funs"],function(require,t,i){var e=require("object"),s=require("funs"),n=e.extend({into:function(t,i,e){throw"Please implement 'into' method"},out:function(t,i,e){throw"Please implement 'out' method"},isAnimation:function(){throw"Please implement 'isAnimation' method"}}),r="webkitAnimation"in document.body.style?"webkitAnimationEnd":"animationend";return n.getTopIndexZ=s.createAddSelf(1e3),n.addTransitionEnd=function(t,i){t.on(r,i)},n.removeTransitionEnd=function(t,i){t.off(r,i)},n}),define("transition.default",["transition.interface"],function(require,t,i){var e=require("transition.interface"),s="default_forward_out",n="default_forward_in",r="default_back_out",o="default_back_in",a=e.extend({into:function(t,i,a,h){t.removeClass([s,n,r,o].join(" ")),i.removeClass([s,n,r,o].join(" ")),i.show(),t.show(),t.css("z-index",e.getTopIndexZ()),i.css("z-index",e.getTopIndexZ()),t.addClass(s),i.addClass(n),e.removeTransitionEnd(i),e.addTransitionEnd(i,function(){i.removeClass(n),a&&a.call(h),console.log("into_in")}),e.removeTransitionEnd(t),e.addTransitionEnd(t,function(){t.hide(),t.removeClass(s),console.log("into_out")})},out:function(t,i,a,h){t.removeClass([s,n,r,o].join(" ")),i.removeClass([s,n,r,o].join(" ")),i.show(),t.show(),t.addClass(r),i.addClass(o),i.css("z-index",e.getTopIndexZ()),t.css("z-index",e.getTopIndexZ()),e.removeTransitionEnd(i),e.addTransitionEnd(i,function(){i.removeClass(o),console.log("out_in")}),e.removeTransitionEnd(t),e.addTransitionEnd(t,function(){t.hide(),t.removeClass(r),a&&a.call(h),console.log("out_out")})},isAnimation:function(t){return t.hasClass([s,n,r,o].join(" "))}});return new a}),define("layout.updown",["layout"],function(require,t,i){var e=require("layout"),s="layout-head",n="layout-content",r=['<div class="layout-main">','<div class="'+s+'"></div>','<div class="'+n+'"></div>',"</div>"].join("");return e.extend({propertys:function(){this.root=$(r),this.header=this.root.find("."+s),this.content=this.root.find("."+n)},initialize:function($super,t){$super(t)},getRoot:function(){return this.root},getFrameBoxs:function(){return{header:this.header,content:this.content}}})}),define("layout",["event"],function(require,t,i){var e=require("event"),s=e.extend({propertys:function(){this.app},initialize:function($super,t){this.app=t,$super()},getRoot:function(){throw'no override method "getRoot"!'},getFrameBoxs:function(){throw'no override method "getContainers"!'}});return s}),define("layout.full",["layout"],function(require,t,i){var e=require("layout"),s='<div class="layout-main"></div>';return e.extend({propertys:function(){this.root=$(s)},initialize:function($super,t){$super(t)},getRoot:function(){return this.root},getFrameBoxs:function(){return{main:this.root}}})}),define("history",["object"],function(require,t,i){var e=require("object");return e.extend({propertys:function(){},initialize:function(){}})}),define("hash.observe",["event","url.hash"],function(require,t,i){var e=require("event"),s=require("url.hash"),n="hashchange";return e.extend({initialize:function($super){this.isObserve=!1,$super()},handleEvent:function(){var t=this.getCurHashData();this.emit(n,t)},add:function(t,i){return this.on(n,t,i),this},clear:function(){return this.off(n),this},trigger:function(){return this.handleEvent(),this},start:function(){return this.isObserve?this:(window.addEventListener("hashchange",this,!1),this.isObserve=!0,this)},end:function(){return window.removeEventListener("hashchange",this,!1),this.isObserve=!1,this},getCurHashData:function(){return new s(window.location.hash)}})}),define(function(require,t,i){var e=require("base/base"),s=require("base/event"),n=require("base/hash"),r=require("base/promise"),o=require("common/url.hash"),a=require("mvc/transition.default"),h="fly-frame-viewport",u='<div class="'+h+'"></div>',c=s.extend({propertys:function(){this.app,this.root=$(u),this.viewport=this.root,this.name,this.views=new n,this.hashdata={},this.viewpath="./src/views",this.framebox,this.defaultView="index",this.transtion=a,this.lastView,this.curView},initialize:function($super,t){$super(),this.setOption(t),this.initDom()},setOption:function(t){e.isNUL(t.app)||(this.app=t.app),e.isNUL(t.name)||(this.name=t.name),e.isNUL(t.viewpath)||(this.viewpath=t.viewpath),e.isNUL(t.framebox)||(this.framebox=t.framebox),e.isNUL(t.defaultView)||(this.defaultView=t.defaultView),e.isNUL(t.transtion)||(this.transtion=t.transtion)},getRoot:function(){return this.root},initDom:function(){this.framebox.append(this.root)},hashChange:function(t){t.view||(t=o.parse(this.defaultView)),this.hashdata=t,this.toView(t.view,t)},toView:function(t,i){var e=this;this.getView(t,i).then(function(t,i,s){e.lastView=e.curView||s,e.curView=s,s.onLoad()})},turning:function(){this.curView===this.lastView?(this.curView.getRoot().show(),this.curView.onShow()):this.transferView(this.lastView,this.curView,function(){this.lastView.onHide(),this.curView.onShow()})},getView:function(t,i){var e=this.views.get(t),s=new r;return e?(e.setHashData(i),s.resolve(e)):this.loadView(t,function(e){var n=new e(t,i,this,this.app);this.viewport.append(n.getRoot()),n.emit("addframe"),this.views.push(t,n),n.onCreate(),s.resolve(n)}),s},loadView:function(t,i){var e=this.buildFullPath(t),s=this;seajs.use([e],function(t){i.call(s,t)})},buildFullPath:function(t){return(this.viewpath+"/"+t).replace(/\/+/g,"/")+".js"},transferView:function(t,i,e){this.hashdata.forward?this.transtion.into(t.getRoot(),i.getRoot(),function(){e.call(this)},this):this.transtion.out(t.getRoot(),i.getRoot(),function(){e.call(this)},this)},forward:function(t){var i=o.parse(t);i.frame&&i.frame!==this.name||this.hashChange(i)},back:function(){}});return c}),define("application",["base","event","url.hash","hash.observe","frame","layout.full","log"],function(require,t,i){var e=require("base"),s=require("event"),n=require("url.hash"),r=require("hash.observe"),o=require("frame"),a=require("layout.full");Log=require("log");var h=s.extend({propertys:function(){this.state=h.STATE_STOP_HASH_OBSERVE,this.config,this.hashobserve=new r,this.layout,this.frames={},this.forwardId="~~~forward~~~",this.cfgframes={}},initialize:function(t){this.config=t,this.setOption(t),Log.log("application:initialize","application"),this.initLayout(),this.initFrame()},setOption:function(t){e.isNUL(t.layout)||(this.layout=t.layout),e.isNUL(t.frames)||(this.cfgframes=t.frames),e.isNUL(t.forwardId)||(this.forwardId=t.forwardId)},getConfig:function(){return this.config},initLayout:function(){this.layout||(this.layout=a()),$("body").prepend(this.layout.getRoot())},initFrame:function(){var t=this.hashobserve.getCurHashData(),i=t.frame||this.config.defaultFrame;e.each(this.cfgframes,function(e,s){var r=(this.layout.getFrameBoxs()||{})[e.framebox];r?(this.frames[s]=new o({app:this,name:s,viewpath:e.viewpath||this.config.viewpath,transtion:e.transtion,framebox:r,defaultView:e.defaultView||this.config.defaultView||"index"}),this.frames[s].hashChange(i===s?t:new n(""))):Log.err("framebox not found!","application")},this)},onHashChange:function(t,i){var e=t.frame||this.config.defaultFrame;t.forward=this.checkForward(t,i),this.frames[e]&&this.frames[e].hashChange(t)},checkForward:function(t,i){var e,s;return this.forwardId&&(e=t.ids.indexOf(this.forwardId))>-1?(i||(t.ids.splice(e,1),s="#"+t.buildUrl(),history.replaceState({},"",s)),!0):!1},startHashObserve:function(){this.state=h.STATE_LOADING_HASH_OBSERVE,this.hashobserve.add(this.onHashChange,this).start()},endHashObserve:function(){this.state=h.STATE_STOP_HASH_OBSERVE,this.hashobserve.clear()},start:function(){this.state===h.STATE_STOP_HASH_OBSERVE&&this.startHashObserve()},stop:function(){this.endHashObserve()},forward:function(t){location.hash=t+"|"+this.forwardId},replace:function(t){var i=t+"|"+this.forwardId,e=new n(i);this.onHashChange(e,!0)},back:function(t){t?location.replace(("#"+t).replace(/^#+/,"#")):history.back()}});return h.STATE_STOP_HASH_OBSERVE=0,h.STATE_LOADING_HASH_OBSERVE=1,h}),define("restful.model",["model"],function(require,t,i){var e=require("model");return e.extend({ajaxRequest:function(t,i,e,s){var n=this;return $.ajax({url:t,data:JSON.stringify(i),type:"post",contentType:"application/json",dataType:"json",success:function(t){e.call(n,t)},error:function(t){s.call(n,t)}})}})}),define("model",["base","event","store"],function(require,t,i){function e(){}var s=require("base"),n=require("event"),r=require("store"),o=0,a=1,h=2,u=n.extend({propertys:function(){this.baseurl=this.buildBaseUrl(),this.url=this.buildUrl(),this.param=this.buildParam(),this.result=this.buildResult(),this.state=o},initialize:function(){},buildBaseUrl:function(){throw"Please override the `buildBaseUrl` method"},buildUrl:function(){throw"Please override the `buildUrl` method"},buildParam:function(){throw"Please override the `buildParam` method"},buildResult:function(){throw"Please override the `buildResult` method"},ajaxRequest:function(){throw"Please override the `ajaxRequest` method"},verifyData:function(t){return!0},getParam:function(){return this.param instanceof r?this.param.get():this.param},setParam:function(t,i){return"object"===s.type(t)?void s.each(t,function(t,i){this.setParam(i,t)},this):void(this.param instanceof r?this.param.setAttr(t,i):(this.param||(this.param={}),this.param[t]=i))},delParam:function(t){return"array"===s.type(t)?void s.each(t,function(t){this.delParam(t)},this):void(this.param instanceof r?this.param.delAttr(t):(this.param||(this.param={}),delete this.param[k]))},getResult:function(){if(this.result instanceof r){var t=this.getParam(),i=t?JSON.stringify(t):null;return this.result.get(i)}return this.result},setResult:function(t){if(this.result instanceof r){var i=this.getParam(),e=i?JSON.stringify(i):null;this.result.set(t,e)}else this.result=t},clearEvents:function(){this.off("success"),this.off("error"),this.off("abort")},request:function(t,i){t=t||{};var s,n=t.success||e,r=t.error||e,u=t.abort||e;if(this.state===h){if(s=this.getResult())return void n.call(i||this,s);this.state=o}if(this.state==h||(this.on("success",n,i),this.on("error",r,i),this.on("abort",u,i),this.state!==a)){var c=this.baseurl.replace(/\/+$/g,"")+"/"+this.url.replace(/^\/+/g,""),l=this.getParam(),f=this;this.ajaxRequest(c,l,function(t){f.verifyData(t)?(f.setResult(t),f.emit("success",t),f.state=h):(f.emit("error",t),f.state=o),f.clearEvents()},function(t){f.emit("error",t),f.state=o,f.clearEvents()}),this.state=a}}});return u}),define("form.model",["model"],function(require,t,i){var e=require("model");return e.extend({propertys:function(){this.ajaxType="post"},ajaxRequest:function(t,i,e,s){var n=this;return $.ajax({url:t,data:i,type:this.ajaxType,dataType:"json",success:function(t){e.call(n,t)},error:function(t){s.call(n,t)}})}})}),define("url",["base","object"],function(require,t,i){var e=require("base"),s=require("object"),n=/^\s*(?:(^[a-z]+):)?(?:\/\/([^\/]+))?([^#?]*)(?:\?([^#]*))?(?:#(.*))?\s*$/im,r=/([^=&]*)=([^=&]*)/g,o=/^\s*\/|\/\s*$/i,a=s.extend({propertys:function(){this.protocol="",this.host="",this.path="",this.paths=[],this.search="",this.searchs={},this.hash=""},initialize:function(t){e.mix(this,a.parse(t))},buildUrl:function(){var t,i=[],s=this.data||{};return s.protocol&&(i.push(s.protocol),i.push(":")),s.home&&(i.push("//"),i.push(s.home)),s.paths&&(i.push("/"),i.push(s.paths.join("/"))),s.searchs&&(t=[],e.each(s.searchs,function(i,s){"array"===e.type(i)?e.each(i,function(i){t.push(s+"="+i)}):t.push(s+"="+i)}),t.length&&(i.push("?"),i.push(t.join("&")))),s.hash&&(i.push("#"),i.push(s.hash)),i.join("")},setProtocol:function(t){return this.protocol=t,this},setHost:function(t){return this.host=t,this},setPath:function(t){return this.path=t,this.paths=this.path.replace(o,"").split("/"),this},setPaths:function(t,i){return t=t||0,t>this.paths.length&&(t=this.paths.length),this.paths[t]=i,this},setSearch:function(t){this.search=t;var i=a.parse(t||"");return this.searchs=i.searchs,this},setHash:function(t){return this.hash=t,this}});return a.parse=function(t){var i=(t||"").match(n)||[],e={},s=[];return i[3]&&(s=i[3].replace(o,"").split("/")),i[4]&&i[4].replace(r,function(t,i,s){e[i]?("string"==typeof e[i]&&(e[i]=[e[i]]),e[i].push(s)):e[i]=s}),{protocol:i[1]||"",home:i[2]||"",path:i[3]||"",paths:s,search:i[4]||"",searchs:e,hash:i[5]||""}},a}),define("url.hash",["base","object"],function(require,t,i){function e(t){var i=[];return s.each(t,function(t,e){i.push(encodeURIComponent(t)+"="+encodeURIComponent(e))}),i.join("&")}var s=require("base"),n=require("object"),r=/^(?:([^:\/!?&=|]+):)?([^!?&|]+)?(?:!([^!?&|]+))?(?:\?((?:[^?=&|]+=[^?=&|]+(?:&[^?=&|]+=[^?=&|]+)*)?))?((?:\|[^|]+)*)?$/i,o=/([^=&]*)=([^=&]*)/g,a=n.extend({propertys:function(){this.frame="",this.view="",this.path=[],this.query={},this.ids=[],this.fullhash=""},initialize:function(t){var i=s.type(t);"object"===i?s.mix(this,t):"string"===i&&s.mix(this,a.parse(t))},setFrame:function(t){return t?(this.frame=t,this):this},getFrame:function(){return this.frame},setView:function(t){return t?(this.view=t,this):this},getView:function(){return this.view},setPath:function(t,i){return i?(0>t&&(t=0),t>this.path.length&&(t=this.path.length),this.path[t]=i,this):this},getPath:function(t){return this.path[t]},delPath:function(t){return 0>t||t>=this.path.length?this:(this.path.splice(t,1),this)},setQuery:function(t,i){return t&&i?(this.query[t]=i,this):this},getQuery:function(t){return t?this.query[t]:void 0},delQuery:function(t){return delete this.query[t],this},setId:function(t){return this.exsitId(t)||this.ids.push(t),this},delId:function(t){var i=this.ids.indexOf(t);return i>-1&&this.ids.splice(i,1),this},exsitId:function(t){return this.ids.indexOf(t)>-1},getFullHash:function(){return fullhash},buildUrl:function(){var t=[];return this.frame&&(t.push(this.frame),t.push(":")),this.view&&t.push(this.view),this.path&&this.path.length&&(t.push("!"),t.push(this.path.join("/"))),s.isEmpty(this.query)||(t.push("?"),t.push(e(this.query))),this.ids&&this.ids.length&&(t.push("|"),t.push(this.ids.join("|"))),t.join("")},clone:function(){var t=new a;return s.mix(t,this,!0)},toString:function(){return this.buildUrl()},valueOf:function(){return s.mix({},this)}});return a.parse=function(t){var i=(t||"").replace(/^#+/,"");return m=i.match(r)||[],frame=m[1],view=m[2],path=(m[3]||"").replace(/^\/+|\/+$/,""),paths=path?path.split("/"):[],query=m[4],querys=function(t){var i={};return t.replace(o,function(t,e,s){i[e]=s}),i}(query||""),id=(m[5]||"").replace(/^\|+|\|+$/,""),ids=id?id.split("|"):[],{frame:frame,view:view,path:paths,query:querys,ids:ids,fullhash:i}},a}),define("scroll",function(){function t(t){return null===t||void 0===t}function i(t,i,e){var s,n;if(y(t)){if(e){for(s=t.length-1,n=-1;s>n;s--)if(i(t[s],s))return}else for(s=0,n=t.length;n>s;s++)if(i(t[s],s))return}else for(s in t)if(t.hasOwnProperty(s)&&i(t[s],s))return}function e(t,i){var e=t.className.split(" ");e.indexOf(i)>-1||(e.push(i),t.className=e.join(" "))}function n(t,i){var e,s=t.className.split(" ");-1!==(e=s.indexOf(i))&&(s.splice(e,1),t.className=s.join(" "))}function r(t,i,e){return!e&&t.style[i]?t.style[i]:e?void(t.style[i]=e):(window.getComputedStyle(t)||{})[i]}function o(t,e){var s=document.createElement(t);return e=e||{},i(e,function(t,i){s.setAttribute(i,t)}),s}function a(t){return x+t}function h(t,i,e){r(t,a("transform"),"translate3d("+i+"px,"+e+"px,0px)")}function u(t){var i,e,s=r(t,a("transform"));return s&&"none"!=s?(i=s.match(_))?e={x:parseInt(i[1])||0,y:parseInt(i[2])||0,z:parseInt(i[3])||0}:(i=s.match(S))&&(e={x:parseInt(i[1])||0,y:(s.match(E)||{})[1]||0,z:0}):e={x:0,y:0,z:0},e}function c(t,i){var e=i,s=-i;return t>e?e:s>t?s:t}function l(t,i){return Math.max(Math.abs(t),Math.abs(i))}function f(t,i){for(var e=t.childNodes,s=e.length,n=0;s>n;n++)i.appendChild(e[0]);return t.appendChild(i),t}function d(t){this.box,this.scroll=!0,this.subbox,this.scrollbarX,this.scrollbarY,this.startDomX=0,this.startDomY=0,this.startMouseX=0,this.startMouseY=0,this.isMouseDown=!1,this.acceler=new T,this.elastic=!1,this.elasticX=!0,this.elasticY=!0,this.currentSid,this.events={},this.lastX=0,this.lastY=0,this.setOption(t),this.init()}var p=Array.prototype,v=(p.slice,Object.prototype.toString),m=function(t){var i,e=m.__cache=m.__cache||{},s=v.call(t);return e[s]?e[s]:(i=s.replace(/^\[\w+\s+(\w+)\]$/,"$1").toLowerCase(),e[s]=i)},y=function(t){return"array"===m(t)},b="ontouchend"in document,g=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},w=30,x=function(t){return"transform"in t?"":"-webkit-transform"in t?"-webkit-":"MozTransform"in t?"-moz-":"-o-transform"in t?"-o-":"-ms-transform"in t?"-ms-":null}(o("div").style),_=/translate3d\(\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*\)/i,S=/translateX\(\s*(-?[\d\.]+\w+)\s*\)/i,E=/translateY\(\s*(-?[\d\.]+\w+)\s*\)/i,T=function(){function t(){this.list=[],this.lastX=0,this.lastY=0,this.state=t.STATE_STOP}return t.STATE_STOP=0,t.STATE_START=1,t.prototype={clear:function(){this.list=[]},add:function(t,i){this.endLoop(),this.lastX=t,this.lastY=i,this._add(t,i),this.startLoop()},_add:function(t,i){this.list.unshift({date:(new Date).valueOf(),x:t,y:i}),this.list.length>2&&this.list.splice(3)},startLoop:function(){var t=this;this.resource=setTimeout(function(){t._add(t.lastX,t.lastY),t.startLoop()},40)},endLoop:function(){clearTimeout(this.resource)},end:function(t,i){this._add(t,i),this.endLoop();var e=this.list.length;if(2>e)return{x:0,y:0};for(var n,r,o=0,e=this.list.length,t=0,i=0;e>o&&(n=this.list[o],r=this.list[o+1],n&&r);o++)s=1/(r.date-n.date||1),t+=s*(r.x-n.x),i+=s*(r.y-n.y);return t/=o||1,i/=o||1,{x:t,y:i}}},t}(),P=b?function(t){return t.changedTouches[0]}:function(t){return t},k=b?"touchstart":"mousedown",j=b?"touchmove":"mousemove",O=b?"touchend":"mouseup";return d.prototype={constructor:d,setOption:function(i){t(i.box)||(this.box=i.box),t(i.scroll)||(this.scroll=i.scroll),t(i.onscroll)||this.on("onscroll",i.onscroll),t(i.onscrollend)||this.on("onscrollend",i.onscrollend),t(i.elastic)||(this.elastic=i.elastic),t(i.elasticX)||(this.elasticX=i.elasticX),t(i.elasticY)||(this.elasticY=i.elasticY)},on:function(t,i){var e=this.events[t]=this.events[t]||[];-1===e.indexOf(i)&&e.push(i)},off:function(t,i){var e=this.events[t]=this.events[t]||[];if(!i)return void(e[t]=null);var s=e.indexOf(i);s>-1&&e.splice(s,1)},emit:function(t,i){for(var e=this.events[t]=this.events[t]||[],s=0,n=e.length;n>s;s++)e[s].call(this,i)},init:function(){if(!this.box)throw"Parameters 'box' are not found!";this.initDom(),this.initEvent(),this._startAutoCalcScrollSize()},initDom:function(){e(this.box,"silky-box");var t=r(this.box,"position");t&&"static"!==t||r(this.box,"position","relative"),this.subbox=o("div",{"class":"silky-subbox"}),this.scrollbarX=o("div",{"class":"silky-scrollbarx"}),this.scrollbarY=o("div",{"class":"silky-scrollbary"}),this.scroll||(r(this.scrollbarX,"display","none"),r(this.scrollbarX,"display","inline-block")),f(this.box,this.subbox),this.box.appendChild(this.scrollbarX),this.box.appendChild(this.scrollbarY),this._calcScrollBarSize()},initEvent:function(){this.box.addEventListener(k,this,!1),this.box.addEventListener(j,this,!1),this.box.addEventListener(O,this,!1),b&&this.box.addEventListener("touchcancel",this,!1)},handleEvent:function(t){var i,s,r,o,a,h=P(t);switch(t.type){case k:this._stopAutoCalcScrollSize(),n(this.subbox,"silky-letgo"),this.startMouseX=h.clientX,this.startMouseY=h.clientY,a=u(this.subbox),this.startDomX=a.x,this.startDomY=a.y,this.isMouseDown=!0,this.currentSid&&(this.currentSid.stop=!0),this.acceler.clear(),this.acceler.add(h.clientX,h.clientY);break;case j:if(!this.isMouseDown)return;i=h.clientX-this.startMouseX,s=h.clientY-this.startMouseY,r=this.startDomX+i,o=this.startDomY+s,a=spos=this._calcPos(r,o),this.elastic&&(a=this._calcOverflow(r,o,a.x,a.y),this.elasticX||(a.x=spos.x),this.elasticY||(a.y=spos.y)),this._calcScrollBarPos(a.x,a.y,a.dx,a.dy),this._setSubBoxPos(a.x,a.y),t.preventDefault(),this._calcScrollBarSize(a.dx,a.dy),this.acceler.add(h.clientX,h.clientY),this.emit("scroll",this.getPosition());break;case O:case"touchcancel":this.isMouseDown=!1,i=h.clientX-this.startMouseX,s=h.clientY-this.startMouseY,r=this.startDomX+i,o=this.startDomY+s,a=this._calcPos(r,o),this._calcScrollBarSize(),e(this.subbox,"silky-letgo"),this.currentSid={stop:!1},this._slowStart(this.acceler.end(h.clientX,h.clientY),{x:r-a.x,y:o-a.y}),this.emit("scroll",this.getPosition())}},_setSubBoxPos:function(t,i){this.lastX=parseInt(t),this.lastY=parseInt(i),h(this.subbox,this.lastX,this.lastY)},_calcPos:function(t,i){var e=this.subbox.clientWidth,s=this.subbox.clientHeight,n=this.box.clientWidth,r=this.box.clientHeight;e=n>e?n:e,s=r>s?r:s;var o=i>=0,a=r>=s+i,h=t>=0,u=n>=e+t;return o?i=0:a&&(i=-(s-r)),h?t=0:u&&(t=-(e-n)),{x:t,y:i}},_calcOverflow:function(t,i,e,s){var n=(t-e)/4,r=(i-s)/4;return{x:e+n,y:s+r,dx:n,dy:r}},_calcScrollBarSize:function(t,i){t=Math.abs(t||0),i=Math.abs(i||0);var e=this.box.clientWidth,s=this.subbox.clientWidth,n=this.box.clientHeight,o=this.subbox.clientHeight,a=e/(s+t),h=n/(o+i);a=a>1?1:a,h=h>1?1:h;var u=a*this.box.clientWidth,c=h*this.box.clientHeight;r(this.scrollbarX,"width",u+"px"),r(this.scrollbarY,"height",c+"px"),e>=s?r(this.scrollbarX,"display","none"):r(this.scrollbarX,"display","inline-block"),n>=o?r(this.scrollbarY,"display","none"):r(this.scrollbarY,"display","inline-block")},_calcScrollBarPos:function(t,i,e,s){e=Math.abs(e||0),s=Math.abs(s||0);var n=this.subbox.clientWidth+e,r=this.subbox.clientHeight+s,o=this.box.clientWidth,a=this.box.clientHeight;n=o>n?o:n,r=a>r?a:r;var u=-(t/(n-o)||0),c=-(i/(r-a)||0),s=c*(a-this.scrollbarY.clientHeight),e=u*(o-this.scrollbarX.clientWidth);s=Math.max(s,0),e=Math.max(e,0),h(this.scrollbarY,0,s),h(this.scrollbarX,e,0)},_reCalcScrollBarPos:function(){this._calcScrollBarPos(this.lastX||0,this.lastY||0)},_slowStart:function(t,i){var e=c(t.x,3)*w,s=c(t.y,3)*w,n=l(i.x,i.y),r=l(e,s),o=1.1-Math.min((Math.pow(n,2)+r)/1e4,10)/10,a=15*o;this._slowLoop(this.currentSid,90,90,e,s,a)},_slowLoop:function(t,i,e,s,n,r){var o=Math.sin(e/i*Math.PI/2),a=r,h=a-(i-e);0>h&&(h=0);var c=Math.sin(h/a*Math.PI/2),l=u(this.subbox),f=l.x+s,d=l.y+n,p=this._calcPos(f,d),v=0,m=0,y={},b=p.x,w=p.y;if(this.elastic&&(v=(f-p.x)*c,m=(d-p.y)*c,y=this._calcOverflow(f,d,p.x,p.y),this.elasticX&&(b=p.x+v),this.elasticY&&(w=p.y+m)),0>=e||t.stop||Math.max(Math.abs(s),Math.abs(n))<1&&(Math.max(Math.abs(v),Math.abs(m))<1||b===this._lastRealScrollX&&w===this._lastRealScrollY))return this.emit("scrollend",this.getPosition()),this._setSubBoxPos(p.x,p.y),void this._startAutoCalcScrollSize();this._lastRealScrollY=w,this._lastRealScrollX=b,this._setSubBoxPos(b,w),this._calcScrollBarPos(b,w),this._calcScrollBarSize(y.dx,y.dy),this.emit("scroll",this.getPosition());var x=this;g(function(){x._slowLoop(t,i,e-1,s*o,n*o,r)})},_startAutoCalcScrollSize:function(){var t=this;this.autoscrollsize=setTimeout(function(){t._calcScrollBarSize(),t._reCalcScrollBarPos(),t._startAutoCalcScrollSize()},1e3)},_stopAutoCalcScrollSize:function(){clearTimeout(this.autoscrollsize)},to:function(t,i){t=-t,i=-i;var e=this._calcPos(t,i);this._setSubBoxPos(e.x,e.y),this._calcScrollBarSize(),this._calcScrollBarPos(e.x,e.y)},getPosition:function(){var t=u(this.subbox);return{x:t.x?-t.x:t.x,y:t.y?-t.y:t.y}}},d}),define("funs",["base"],function(require,t,i){var e=(require("base"),{});return e.createAddSelf=function(t){return t=t||0,function(){return t++}},e}),define("var",function(){function t(t){if(t!==i){var s={del:function(){t=null},__proto__:e};return Object.defineProperty(s,"v",{get:function(){return t},set:function(i){t=i}}),s}}var i={},e=new t(i);return t}),define("promise",function(){function t(i){this.state=t.STATE_UNFULFILLED,this.resolveCallbacks=[],this.rejecteCallbacks=[],i&&setTimeout(function(){i(s(this.resolve,this),s(this.reject,this))},0)}var i=Array.prototype.slice,e=Array.prototype.indexOf||function(t){for(var i=0,e=this.length;e>i;i++)if(t===this[i])return i;return-1},s=function(t,i){return t.bind?t.bind(i):function(){return t.apply(i,arguments)}};return t.STATE_UNFULFILLED=0,t.STATE_RESOLVED=1,t.STATE_REJECTED=2,t.prototype={constructor:t,when:function(){var s=new t,n=i.call(arguments),r=[],o=this,a=function(i){if(o.state===t.STATE_UNFULFILLED){var a=e.call(n,this);a>-1&&(n.splice(a,1),r[a]=i),n.length||(s.resolve(r),o.state=t.STATE_RESOLVED)}},h=function(){if(o.state===t.STATE_UNFULFILLED){var i=e.call(n,this);i>-1&&n.splice(i,1),n.length||(s.reject(),o.state=t.STATE_REJECTED)}};if(n.length)for(var u=0,c=n.length;c>u;u++){if(!(n[u]instanceof t))throw"when() Parameter must be a type of Promise";n[u].then(a,h)}else setTimeout(function(){o.resolve()},0);return s},then:function(e,n){var r=new t,o=this;return e&&this.resolveCallbacks.push(function(){var t=[s(r.resolve,r),s(r.reject,r)].concat(i.call(arguments));e.apply(o,t)}),n&&this.rejecteCallbacks.push(function(){{var t=[s(r.reject,r)].concat(i.call(arguments));n.apply(o,t)}}),r},resolve:function(){var i=arguments;setTimeout($.proxy(function(){if(this.state===t.STATE_UNFULFILLED){for(var e=0,s=this.resolveCallbacks.length;s>e;e++)this.resolveCallbacks[e].apply(this,i);this.state=t.STATE_RESOLVED}},this),0)},reject:function(){var i=arguments;setTimeout($.proxy(function(){if(this.state===t.STATE_UNFULFILLED){for(var e=0,s=this.rejecteCallbacks.length;s>e;e++)this.rejecteCallbacks[e].apply(this,i);this.state=t.STATE_REJECTED}},this),0)}},t}),define("object",["class","var"],function(require,t,i){var e=require("class"),s=require("var"),n=e({destruct:function(){var t;for(var i in this)this.hasOwnProperty(i)&&(t=this[i],t instanceof s&&t.del(),this[i]=null)}});return n}),define("log",function(){function t(){return"boolean"==typeof __SINGE_DEBUG__&&__SINGE_DEBUG__===!0}return{log:function(i,e){t()&&(e||(e="default"),console.log(e+": "+i))},err:function(i,e){t()&&(e||(e="default"),console.error(e+": "+i))}}}),define("hash",["object","object"],function(require,t,i){var e=require("object"),s=require("object");return e.extend({propertys:function(){this.keys=[],this.values={}},initialize:function($super,t){$super(),t=t||[];for(var i=0,e=t.length;e>i;i++)this.push(t[i].key,t[i].value)},push:function(t,i){null!==t&&void 0!==t&&(this.values[t]&&this.del(t),this.keys.push(t),this.values[t]=i)},pop:function(){var t=this.keys.pop(),i=this.values[t];return t||i?(delete this.values[t],{key:t,value:i}):null},shift:function(){var t=this.keys.shift(),i=this.values[t];return t||i?(delete this.values[t],{key:t,value:i}):null},unshift:function(t,i){null!==t&&void 0!==t&&(this.values[t]&&this.del(t),this.keys.unshift(t),this.values[t]=i)},del:function(t){var i=this.keys.indexOf(t);if(-1===i)return null;var t,e;return t=this.keys.splice(i,1),e=this.values[t],delete this.values[t],{key:t,value:e}},get:function(t){return this.values[t]},splice:function(t,i,e){"boolean"===s.type(i)&&(i=null,e=i),t||(t=0);var n=Math.max(this.keys.length-1,0);keys=this.keys.slice(),rkeys=[],e?(t=n-t,keys.reverse(),rkeys=s.isNUL(i)?keys.splice(t):keys.splice(t,i)):rkeys=s.isNUL(i)?keys.splice(t):keys.splice(t,i);var r=[],o=this;return s.each(rkeys,function(t){var i=o.del(t);i&&r.push(i)}),e&&r.reverse(),r},slice:function(t,i){t||(t=0);Math.max(this.keys.length-1,0);keys=this.keys,rkeys=s.isNUL(i)?keys.slice(t):keys.slice(t,i);var e=[],n=this;return s.each(rkeys,function(t){var i=n.get(t);i&&e.push({key:t,value:i})}),e},toString:function(){return JSON.stringify(this.slice())},valueOf:function(){return this.slice()}})}),define("event",["base","object","var"],function(require,t,i){var e=require("base"),s=require("object"),n=require("var"),r=s.extend({propertys:function(){this.__event=n({})},on:function(t,i,s,n){var r=this.__event;r.v[t]=r.v[t]||[],n&&-1!==e.indexOf(r.v[t],function(t){return i===t.fn})||r.v[t].push({fn:i,space:s})},off:function(t,i){if(!t&&!i)return this.__event.v.del(),void(this.__event=n({}));var e,s=this.__event;s.v[t]=s.v[t]||[],i?(e=ase.indexOf(s.v[t],function(t){return i===t.fn}),e>-1&&s.v[t].splice(e,1)):s.v[t]=[]},emit:function(t,i){var s=this.__event,n=this;s.v[t]=s.v[t]||[];var r=e.toArray(arguments);r.shift(),e.each(s.v[t],function(t){t.fn.apply(t.space||n,r)})}});return r}),define("class",["base"],function(require,t,i){"use strict";function e(){}function s(t,i){return t=t||e,i=i||e,function(){var e=[o.bind(t,this)].concat(o.toArray(arguments));return i.apply(this,e)}}function n(t){var i=function(){};return i.prototype=t.prototype,new i}function r(t,i){function o(){if(!(this instanceof o)){var t=n(o);return o.apply(t,arguments),t}this.propertys.apply(this,arguments),this.initialize.apply(this,arguments)}function c(){}"object"==typeof t&&(i=t,t=function(){});var l,f=t.prototype;c.prototype=t.prototype,o.prototype=new c;for(l in i)i.hasOwnProperty(l)&&u[l]!==h&&(o.prototype[l]="function"==typeof f[l]&&i[l].toString().match(a)?s(f[l],i[l]):i[l]);o.prototype.propertys=function(t,i){return function(){t&&t.apply(this,arguments),i&&i.apply(this,arguments)}}(o.prototype.propertys,i.propertys),o.prototype.initialize=i.initialize&&i.initialize.toString().match(a)?s(f.initialize,i.initialize):i.initialize||e,o.prototype.constructor=o;for(l in t)t.hasOwnProperty(l)&&"instance"!==l&&(o[l]=t[l]);return o.extend=function(t){return r(this,t)},o.addPropertys=function(t){var i=this.prototype;for(l in t)t.hasOwnProperty(l)&&u[l]!==h&&(i[l]="function"==typeof i[l]&&t[l].toString().match(a)?s(i[l],t[l]):t[l]);return this},o.getInstance=function(){return this.instance?this.instance:(this.instance={__proto__:this.prototype},this.apply(this.instance,arguments),this.instance)},o}var o=require("base"),a=/^\s*function[^\(\)]*\(\s*\$super/,h={},u={constrcutor:h,propertys:h,initialize:h};return r}),define("base",function(){"use strict";function t(t){var i=t.split("."),e=[];return n.each(i,function(t,i){var s;t.match(o)?(s=t.split("["),n.each(s,function(t,i){t&&e.push(t.replace(/[\]"']+/g,""))})):e.push(t)}),e}var i=Array.prototype,e=i.slice,s=Object.prototype.toString,n={};n.hasProp=function(t,i){
return t.hasOwnProperty(i)};var r={};n.type=function(t){if(void 0===t)return"undefined";if(null===t)return"null";var i=s.call(t);if(r[i])return r[i];var e=i.replace(/^\[object\s+|\]$/g,"").toLowerCase();return r[i]=e},n.each=function(t,i,e,s){var r,o,a=n.type(t);if("array"===a||"arguments"===a||t.length){if(s){for(r=t.length-1;r>-1;r--)if(i.call(e,t[r],r,t))return}else for(r=0,o=t.length;o>r;r++)if(i.call(e,t[r],r,t))return}else for(r in t)if(n.hasProp(t,r)&&i.call(e,t[r],r,t))return},n.mix=function(t,i,s){var r=e.call(arguments),o=r.shift()||{},s=!0;return r.length&&"boolean"===n.type(r[r.length-1])&&(s=r.pop()),n.each(r,function(t){n.each(t,function(t,i){s?o[i]=t:o[i]||(o[i]=t)})}),o},n.bind=function(t,i){return t.bind?t.bind(i):function(){return t.apply(i,arguments)}},n.toArray=function(t){try{return e.call(t)}catch(i){var s=[];return n.each(t,function(t){s.push(t)}),s}},n.indexOf=function(t,i){var e=-1,s=function(t){return t===i};return"function"==typeof i&&(s=i),n.each(t||[],function(t,i){return s(t)?(e=i,!0):void 0}),e},n.isEmpty=function(t){if(!t)return!0;var i=n.type(t);if("array"===i&&t.length)return!1;if("object"===i)for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},n.isNUL=function(t){return null===t||void 0===t};var o=/\[[^\[\]]+\]/g;return n.path=function(i,e,s){var n=i;if(i&&e){var r,o,a=t(e),h=Math.max(a.length-1,0),u=0;if(void 0===s){for(;h>=u&&(o=a[u],r=i&&i[o],r);u++)i=r;return r}for(;h>=u;u++)o=a[u],h>u?i=i[o]=i[o]||{}:i[o]=s;return n}},n.delPath=function(i,e){if(i&&e){for(var s,n,r=t(e),o=Math.max(r.length-1,0),a=0;o>=a;a++)if(n=r[a],o>a){if(i=i&&i[n],!i)break}else s=i[n],delete i[n];return s}},n}),seajs.use(function(){}),define("main",["base/base","base/class","base/event"],function(){});