define("SINGLE/base/class.js",["base/base"],function(require,t,n){"use strict";function i(){}function r(t,n){return t=t||i,n=n||i,function(){var i=[s.bind(t,this)].concat(s.toArray(arguments));return n.apply(this,i)}}function e(t){var n=function(){};return n.prototype=t.prototype,new n}function o(t,n){function s(){if(!(this instanceof s)){var t=e(s);return s.apply(t,arguments),t}this.propertys.apply(this,arguments),this.initialize.apply(this,arguments)}function c(){}"object"==typeof t&&(n=t,t=function(){});var y,f=t.prototype;c.prototype=t.prototype,s.prototype=new c;for(y in n)n.hasOwnProperty(y)&&u[y]!==a&&(s.prototype[y]=n[y]&&n[y].toString().match(p)?"function"==typeof f[y]?r(f[y],n[y]):r(function(){},n[y]):n[y]);s.prototype.propertys=function(t,n){return function(){t&&t.apply(this,arguments),n&&n.apply(this,arguments)}}(s.prototype.propertys,n.propertys),s.prototype.initialize=n.initialize&&n.initialize.toString().match(p)?r(f.initialize,n.initialize):n.initialize||i,s.prototype.constructor=s;for(y in t)t.hasOwnProperty(y)&&"instance"!==y&&(s[y]=t[y]);return s.extend=function(t){return o(this,t)},s.addPropertys=function(t){var n=this.prototype;for(y in t)t.hasOwnProperty(y)&&u[y]!==a&&(n[y]="function"==typeof n[y]&&t[y].toString().match(p)?r(n[y],t[y]):t[y]);return this},s.getInstance=function(){return this.instance?this.instance:(this.instance={__proto__:this.prototype},this.apply(this.instance,arguments),this.instance)},s.createLazyFun=function(){var t,n=this;return function(){return t?t:t=n.getInstance()}},s}var s=require("base/base"),p=/^\s*function[^\(\)]*\(\s*\$super/,a={},u={constrcutor:a,propertys:a,initialize:a};return o});