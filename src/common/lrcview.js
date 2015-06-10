define(function(require){

	/**
	 * 音乐播放组件
	 * @author xinzhi.oxz/安顿
	 */

	var Lrc = require('common/lrc');


	var LrvView = Lrc.extend({
		propertys:function(){
			this.wraper;
			this.box;
			this.offset = 0;
			this.subbox;
		},
		initialize:function($super,options){
			
			$super(options);
			this._initDom();
			var update = function(){
				this._stopAnima();
				this._updateLrcDom();
				this.pos(0);
				var me = this;
				setTimeout(function(){
					me._startAnima();
				},0);
			}.bind(this);
			this.on('update',update);
			update();
		},
		_setOption:function($super,options){
			$super(options);
			if(options.wraper){
				this.wraper = options.wraper;
			}
			if(options.offset){
				this.offset = options.offset;
			}
		},
		_initDom:function(){
			this.box = $('<div>');
			this.box.css({
				width:'100%',
				height:'100%',
				position:'relative'
			});
			this.subbox = $('<ul>');
			this.subbox.css({
				width:'100%',
				position:'absolute',
				left:'0px',
				top:'0px'
			});
			this.box.append(this.subbox);
			this.wraper.append(this.box);
		},
		_stopAnima:function(){
			this.subbox.removeClass('bottonbanner-fixed-anima');
		},
		_startAnima:function(){
			this.subbox.addClass('bottonbanner-fixed-anima');
		},
		_updateLrcDom:function(){
			this.subbox.empty();
			var lrc = this.getLrc();
			if(!lrc || !lrc.lines)return;
			var lines = lrc.lines,line,el;
			//if(lines.length) this._addMetaInfo(lines,lrc.meta);
			for(var i=0,l=lines.length;i<l;i++){
				line = lines[i];
				this.subbox.append($('<li>'+line.line+'</li>').attr('data-time',line.time).attr('data-id',line.id));
			}
		},
		_addMetaInfo:function(lines,meta){
			var st = lines[0].time,
				d = st / 4,
				head = [];
			if(!meta.ti) return;
			var kmap = ['ti','ar','al'];
			var nmap = ['歌名','歌手','专辑'];
			for(var i=2;i>-1;i--){
				lines.unshift({
					time:1+d*i,
					line:nmap[i] + ':' + (meta[kmap[i]] || ''),
					id:(+new Date()) + String(Math.random()).replace('.','')
				});
			}
		},
		pos:function($super,time){
			var bh = this.box.height()/2;
			var o = $super(time);
			if(o){
				var li = this.subbox.find('[data-id="'+o.id+'"]');
				li.siblings().removeClass('cur');
				li.addClass('cur');
				if(li.length){
					this.subbox.css({
						left:'0px',
						top:(-li[0].offsetTop+bh-li.height()/2 + this.offset) + 'px'
					});
				}
				
			}
			
		},
		setOffset:function(offset){
			this.offset = offset;
		},
		getOffset:function(){
			return this.offset;
		}
	});
	return LrvView;
});