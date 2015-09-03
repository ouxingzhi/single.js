define(function(require){
	var Class = require('base/class');

	var regTime = /[a-z]/ig;

	var DDate = Class({
		propertys:function(){
			this.date;
		},
		initialize:function(date){
			DDate.parse(date||new Date());
		}
	});

	var FORMAT_HANDLE = {
		//日期:dd
		d:function(date){
			var d = date.getDate();
			return d < 10 ? '0'+d : d;
		},
		//日期:d
		j:function(date){
			return date.getDate();
		},
		//周几 d
		N:function(date){
			var d = date.getDay();
			return d === 0 ? 7 : d;
		},
		//周几
		w:function(date){
			return date.getDay();
		},
		//月份，有前导零
		m:function(date){
			var m = date.getMonth()+1;
			return m < 10 ? '0'+ m : m; 
		},
		//月份,无前导零
		n:function(date){
			return date.getMonth()+1;
		},
		//年份 0000
		Y:function(date){
			return date.getFullYear();
		},
		//年份 00
		y:function(date){
			return String(date.getFullYear()).replace(/^\d{2}/,'');
		},
		//小时，12 小时格式，没有前导零
		g:function(date){
			var h = date.getHours();
			return h > 12 ? h - 12 : h;
		},
		//小时，24 小时格式，没有前导零
		G:function(date){
			return date.getHours();
		},
		//小时，12 小时格式，有前导零
		h:function(date){
			var h = date.getHours();
			h = h > 12 ? h - 12 : h;
			return h < 10 ? '0'+h : h;
		},
		//小时，24 小时格式，有前导零
		H:function(date){
			var h = date.getHours();
			return h < 10 ? '0'+h : h;
		},
		//有前导零的分钟数
		i:function(date){
			var m = date.getMinutes();
			return m < 10 ? '0'+m : m;
		},
		//无前导零的分钟数
		I:function(date){
			var m = date.getMinutes();
			return m;
		},
		//秒数，有前导零
		s:function(date){
			var s = date.getSeconds();
			return s < 10 ? '0'+s : s;
		},
		//秒数，无前导零
		S:function(date){
			var s = date.getSeconds();
			return s;
		},
		//今天，昨天
		O:function(date){
			var a = new Date();
			var diff = DDate.diffDay(a,date);
			var map = {
				'1':'昨天',
				'0':'今天'
			};
			return map[diff] || '';
		}
	};

	DDate.format = function(date,formatStr){
		return formatStr.replace(regTime,function(key){
			if(FORMAT_HANDLE[key]){
				return FORMAT_HANDLE[key](date);
			}
			return key;
		});
	}

	DDate.diffDay = function(a,b){
		a = new Date(a.valueOf());
		b = new Date(b.valueOf());
		a.setHours(0,0,0,1);
		b.setHours(0,0,0,1);
		var diff = (a - b) / 864e5;
		return diff;
	};

	DDate.parse = function(str){
		if(typeof str === 'number') return new Date(str);
		return new Date(Date.parse(str.replace(/-/g,'/')));
	}
	/**
	 * 计算两个时间之间差值，返回入
	 */
	var D = 864e5,H = 36e5,I = 6e4;
	DDate.diffFormat = function(a,base){
		base = base || new Date();
		var diff = base - a;
		var d = parseInt(diff/D),
			h = parseInt(diff%D/H),
			i = parseInt(diff%H/I);
		return {
			d:d,
			h:h,
			i:i
		};
	}


	return DDate;
});