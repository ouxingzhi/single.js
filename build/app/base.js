define("app/base.js",[],function(require){function e(){var e=document.getElementsByTagName("body");return e&&e[0]}function n(n){var t=document.createElement("iframe");t.src=n,t.style.display="none";var a=e();a&&(a.appendChild(t),setTimeout(function(){a.removeChild(t),t=null},500))}var t="ttpodsmm",a="js_request",c="app.",o="service",r="params",u="ack",l="callback",i="error",f="cancel",s="confirm",p=function(e){var n=0;return function(){return e+n++}}((new Date).valueOf()+~~(1e8*Math.random())),m=function(){function e(e,n,t){return{fn:e,space:n,onlyone:t}}function m(n,t,a,c,o){switch(a){case l:h[n]=e(t,c,o);break;case i:k[n]=e(t,c,o);break;case f:b[n]=e(t,c,o);break;case s:g[n]=e(t,c,o);break;default:return null}}function d(e){delete e.fn,delete e.space,delete e.onlyone}function v(e){h[e]&&d(h[e]),delete h[e],k[e]&&d(k[e]),delete k[e],b[e]&&d(b[e]),delete b[e],g[e]&&d(g[e]),delete confirm[e]}function y(e,n,d){var y=[];y.push(o+"="+e),n&&y.push(r+"="+encodeURIComponent($.param(n))),d=d||{};var h=p();"function"==typeof d.callback&&(m(h,d.callback,l,d.space,d.onlyone),y.push(l+"="+c+l)),"function"==typeof d.error&&(m(h,d.error,i,d.space,d.onlyone),y.push(i+"="+c+i)),"function"==typeof d.cancel&&(m(h,d.cancel,f,d.space,d.onlyone),y.push(f+"="+c+f)),m(h,function(){d.confirm&&d.confirm.call(this),clearTimeout(k)},s,d.space,d.onlyone),y.push(s+"="+c+s);var k=setTimeout(function(){d.timeoutfn&&d.timeoutfn.call(d.space),v(h)},1e3*(d.timeout||30));return y.push(u+"="+h),{url:t+"://"+a+"?"+y.join("&"),ack:h}}var h={},k={},b={},g={},w=function(e,n,t){var a=e[n];t=[].slice.call(t,1),a&&(a.fn.apply(a.space||this,t),a.onlyone&&(delete e[n],a.fn=a.space=null))},T={};return T[l]=function(e){w(h,e,arguments)},T[i]=function(e){w(k,e,arguments)},T[f]=function(e){w(b,e,arguments)},T[s]=function(e){w(g,e,arguments)},window.app=T,{setProtocol:function(e){t=e},create:function(e,n,t){var a=p();return m(a,e,l,n,t),a},call:function(e,t){t=t||{};var a=y(e,t.params,t);return n(a.url),a.ack},del:function(e){v(e)}}}();return m});