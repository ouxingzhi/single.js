define(function(require){

	/**
	 * 音乐播放组件
	 * @author xinzhi.oxz/安顿
	 */

	var Event = require('base/event');

	var regline = /[\r\n]+/,
		regmeta = /^\[(ti|ar|al|by|offset):([^\[\]]*)\]$/,
		regtrim = /^\s+|\s+$/,
		regtime = /((?:\[\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?)\])(?:\s*\[\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?)\])*)/,
		regitemtime = /\[(\d{1,2}:\d{1,2}(?:[:\.]\d{1,3}?))\]/g,
		regnum = /^0+([0-9]+)$/;

	function parseTime(time){
		var ts = time.split(/[:\.]/);
		return parseInt(ts[0].replace(regnum,'$1')) * 60 + parseInt(ts[1].replace(regnum,'$1')) + parseInt((ts[2] || '0').replace(regnum,'$1'))/1000;
	}

	function parseTimeItem(str){
		var ts = [];
		str.replace(regitemtime,function(a,b){
			ts.push(parseTime(b));
		});
		return ts;
	}

	function parseLrc(lrc){
		lrc = lrc || '';
		var lines = lrc.split(regline);
		var p = [],time,line,meta={},matchs;
		for(var i=0,l=lines.length;i<l;i++){
			lines[i] = lines[i].replace(regtrim,'');
			if(matchs = lines[i].match(regmeta)){
				meta[matchs[1]] = matchs[2] || '';
			}else if(matchs = lines[i].match(regtime)){
				time = parseTimeItem(matchs[1]);
				line = lines[i].replace(regtime,'');
				for(var ii=0,ll=time.length;ii<ll;ii++){
					p.push({
						time:time[ii],
						line:line,
						id:(+new Date()) + String(Math.random()).replace('.','')
					});
				}
				
			}
			
		}
		p.sort(function(a,b){
			return a.time - b.time;
		})
		return {
			meta:meta,
			lines:p
		};
	} 


	var Lrc = Event.extend({
		propertys:function(){
			this.lrc = '';
			this.lrcObj;
		},
		initialize:function(options){
			this._setOption(options);
		},
		_setOption:function(options){
			if(options.lrc){
				this.setLrc(options.lrc);
			}
		},
		setLrc:function(lrc){
			this.lrcObj = parseLrc(lrc);
			this.emit('update',[this.lrcObj]);
		},
		getLrc:function(){
			return this.lrcObj;
		},
		pos:function(time){
			if(!this.lrcObj || !this.lrcObj.lines) return null;
			var lines = this.lrcObj.lines;
			var a,b;
			var O = {};
			for(var i=0,l=lines.length;i<l;i++){
				a = lines[i];
				b = lines[i+1] || O;
				if(a.time <= time && (b === O || b.time > time) || (i==0 && a.time >= time)){
					return a;
				}
			}
			return null;
		}
	});
	Lrc.parse = parseLrc;

	return Lrc;
});