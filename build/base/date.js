define("base/date.js",["base/class"],function(require){var e=require("base/class"),n=/[a-z]/gi,t=e({propertys:function(){this.date},initialize:function(e){t.parse(e||new Date)}}),r={d:function(e){var n=e.getDate();return 10>n?"0"+n:n},j:function(e){return e.getDate()},N:function(e){var n=e.getDay();return 0===n?7:n},w:function(e){return e.getDay()},m:function(e){var n=e.getMonth()+1;return 10>n?"0"+n:n},n:function(e){return e.getMonth()+1},Y:function(e){return e.getFullYear()},y:function(e){return String(e.getFullYear()).replace(/^\d{2}/,"")},g:function(e){var n=e.getHours();return n>12?n-12:n},G:function(e){return e.getHours()},h:function(e){var n=e.getHours();return n=n>12?n-12:n,10>n?"0"+n:n},H:function(e){var n=e.getHours();return 10>n?"0"+n:n},i:function(e){var n=e.getMinutes();return 10>n?"0"+n:n},s:function(e){var n=e.getSeconds();return 10>n?"0"+n:n},O:function(e){var n=new Date,r=t.diffDay(n,e),u={1:"昨天",0:"今天"};return u[r]||""}};t.format=function(e,t){return t.replace(n,function(n){return r[n]?r[n](e):n})},t.diffDay=function(e,n){e=new Date(e.valueOf()),n=new Date(n.valueOf()),e.setHours(0,0,0,1),n.setHours(0,0,0,1);var t=(e-n)/864e5;return t},t.parse=function(e){return new Date("number"==typeof e?e:Date.parse(e.replace(/-/g,"/")))};var u=864e5,a=36e5,i=6e4;return t.diffFormat=function(e,n){n=n||new Date;var t=n-e,r=parseInt(t/u),o=parseInt(t%u/a),f=parseInt(t%a/i);return{d:r,h:o,i:f}},t});