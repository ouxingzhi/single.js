define(function(){
	var ap = Array.prototype,
		slice = ap.slice,
		otoString = Object.prototype.toString,
		type = function(o){
			var cache = type.__cache = type.__cache || {},
				tstr = otoString.call(o),
				ty;
			if(cache[tstr]) return cache[tstr];
			ty = tstr.replace(/^\[\w+\s+(\w+)\]$/,'$1').toLowerCase();
			return cache[tstr] = ty;
		},
		isArray = function(o){
			return type(o) === 'array';
		},
		exsitTouch = 'ontouchend' in document; 

	function empty(e){
		return e === null || e === undefined;
	}

	//常用工具
	function each(obj,fn,reverse){
		var i,l;
		if(isArray(obj)){
			if(reverse){
				for(i=obj.length-1,l=-1;i>l;i--) 
					if(fn(obj[i],i)) return;
			}else{
				for(i=0,l=obj.length;i<l;i++) 
					if(fn(obj[i],i)) return;
			}
		}else{
			for(i in obj){
				if(obj.hasOwnProperty(i)){
					if(fn(obj[i],i)) return;
				}
			}
		}
	}

	function addClass(el,cls){
		var clss = el.className.split(' ');
		if(clss.indexOf(cls) > -1) return;
		clss.push(cls);
		el.className = clss.join(' ');
	}

	function removeClass(el,cls){
		var clss = el.className.split(' '),index;
		if((index = clss.indexOf(cls)) === -1) return;
		clss.splice(index,1);
		el.className = clss.join(' ');
	}

	function css(el,name,val){
		if(!val && el.style[name]) return el.style[name];
		if(!val) return (window.getComputedStyle(el) || {})[name];
		el.style[name] = val;
	}
	function dom(tagName,attrs){
		var d = document.createElement(tagName);
		attrs = attrs || {};
		each(attrs,function(v,n){
			d.setAttribute(n,v);
		});
		return d;
	}

	var requestAnimationFrame = window.requestAnimationFrame
							|| window.mozRequestAnimationFrame
							|| window.webkitRequestAnimationFrame
							|| window.msRequestAnimationFrame
							|| window.oRequestAnimationFrame
							|| function(callback) {
							setTimeout(callback, 1000 / 60);
							};

	var space = 30;

	var prefix = function(s){
		if("transform" in s) return '';
		if('-webkit-transform' in s) return '-webkit-';
		if('MozTransform' in s) return '-moz-';
		if("-o-transform" in s) return '-o-';
		if("-ms-transform" in s) return '-ms-';
		return null;
	}(dom('div').style);

	function p(v){
		return prefix + v;
	}

	function setPos(el,left,top){
		css(el,p('transform'),'translate3d('+left+'px,'+top+'px,0px)');
	}

	var translate3dReg = /translate3d\(\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*,\s*(-?[\d\.]+\w+)\s*\)/i,
		translateX = /translateX\(\s*(-?[\d\.]+\w+)\s*\)/i,
		translateY = /translateY\(\s*(-?[\d\.]+\w+)\s*\)/i;
	function getPos(el){
		var v = css(el,p('transform')),tmp,res;
		if(v && v != 'none'){
			if(tmp = v.match(translate3dReg)){
				res = {
					x: parseInt(tmp[1]) || 0,
					y: parseInt(tmp[2]) || 0,
					z: parseInt(tmp[3]) || 0
				};
			}else if(tmp = v.match(translateX)){
				res = {
					x:parseInt(tmp[1]) || 0,
					y:((v.match(translateY) || {})[1] || 0),
					z:0
				};
			}
		}else{
			res = {x:0,y:0,z:0};
		}
		return res;
	}



	var Acceler = function(){
		Acceler.STATE_STOP = 0;
		Acceler.STATE_START = 1;

		function Acceler(){
			this.list = [];

			this.lastX = 0;
			this.lastY = 0;

			this.state = Acceler.STATE_STOP;
		}

		Acceler.prototype = {
			clear:function(){
				this.list = [];
			},
			add:function(x,y){
				this.endLoop();
				this.lastX = x;
				this.lastY = y;
				this._add(x,y);
				this.startLoop();
			},
			_add:function(x,y){
				this.list.unshift({
					date:new Date().valueOf(),
					x:x,
					y:y
				});
				if(this.list.length > 2){
					this.list.splice(3);
				}
			},
			startLoop:function(){
				var self = this;
				this.resource = setTimeout(function(){
					self._add(self.lastX,self.lastY);
					self.startLoop();
				},40);
			},
			endLoop:function(){
				clearTimeout(this.resource);
			},
			//得到每毫秒的速度
			end:function(x,y){
				this._add(x,y);
				this.endLoop();
				var len = this.list.length;
				if(len < 2) return {x:0,y:0};

				for(var i=0,len=this.list.length,a,b,x = 0,y = 0;i<len;i++){
					a = this.list[i];
					b = this.list[i+1];
					if(!a || !b) break;
					s = 1/((b.date - a.date) || 1),
					x += s * (b.x - a.x),
					y += s * (b.y - a.y);
				}
				//console.log(this.list,x,y,i);
				x = x / (i || 1);
				y = y / (i || 1);
				//console.log(x,y);
				return {
					x:x,
					y:y
				};
			}
		};
		return Acceler;
	}();

	function calcLog(v){
		var pm = v < 0;
		v = pm ? -v : v;
		v = Math.log(1+v);
		v = pm ? -v : v;
		return v;
	}

	function spaceVal(v,sp){
		var max = sp,
			min = - sp;
		if(v > max) return max;
		if(v < min) return min;
		return v;
	}

	function maxV(a,b){
		return Math.max(Math.abs(a),Math.abs(b));
	}

	function wrap(box,sub){
		var childs = box.childNodes,
			len = childs.length;
		for(var i=0;i<len;i++){
			sub.appendChild(childs[0]);
		}
		box.appendChild(sub);
		return box;
	}

	var T = exsitTouch ? function(e){
		return e.changedTouches[0];
	} : function(e){
		return e;
	}

	var touchstart = exsitTouch ? 'touchstart' : 'mousedown',
		touchmove = exsitTouch ? 'touchmove' : 'mousemove',
		touchend = exsitTouch ? 'touchend' : 'mouseup';


	function Scroll(ops){

		this.box;

		this.scroll = true;



		this.subbox;

		this.scrollbarX;

		this.scrollbarY;

		//鼠标按下时，dom的位置
		this.startDomX = 0;

		this.startDomY = 0;
		//鼠标按下时，鼠标的位置
		this.startMouseX = 0;

		this.startMouseY = 0;

		this.isMouseDown = false;

		this.acceler = new Acceler();
		//是否存在弹性
		this.elastic = false;

		this.elasticX = true;

		this.elasticY = true;

		this.currentSid;

		this.events = {};

		this.lastX = 0;
		this.lastY = 0;

		this.setOption(ops);
		this.init();
	}

	Scroll.prototype = {
		constructor:Scroll,
		setOption:function(ops){
			if(!empty(ops.box)){
				this.box = ops.box;
			}
			if(!empty(ops.scroll)){
				this.scroll = ops.scroll;
			}
			if(!empty(ops.onscroll)){
				this.on('onscroll',ops.onscroll);
			}
			if(!empty(ops.onscrollend)){
				this.on('onscrollend',ops.onscrollend);
			}
			if(!empty(ops.elastic)){
				this.elastic = ops.elastic;
			}
			if(!empty(ops.elasticX)){
				this.elasticX = ops.elasticX;
			}
			if(!empty(ops.elasticY)){
				this.elasticY = ops.elasticY;
			}
		},
		on:function(type,fn){
			var eve = this.events[type] = this.events[type] || [];
			if(eve.indexOf(fn) === -1) eve.push(fn);
		},
		off:function(type,fn){
			var eve = this.events[type] = this.events[type] || [];
			if(!fn){
				eve[type] = null;
				return;
			}
			var index = eve.indexOf(fn);
			if(index > -1) eve.splice(index,1);
		},
		emit:function(type,args){
			var eve = this.events[type] = this.events[type] || [];
			for(var i=0,len=eve.length;i<len;i++){
				eve[i].call(this,args);
			}
		},
		init:function(){
			if(!this.box) throw "Parameters 'box' are not found!";
			this.initDom();
			this.initEvent();
			this._startAutoCalcScrollSize();
		},
		initDom:function(){

			addClass(this.box,'silky-box');
			var position = css(this.box,'position');
			if(!position || position === 'static'){
				css(this.box,'position','relative');
			}
			this.subbox = dom('div',{'class':'silky-subbox'});
			this.scrollbarX = dom('div',{'class':'silky-scrollbarx'});
			this.scrollbarY = dom('div',{'class':'silky-scrollbary'});
			if(!this.scroll){
				css(this.scrollbarX,'display','none');
				css(this.scrollbarX,'display','inline-block');
			}
			wrap(this.box,this.subbox);
			this.box.appendChild(this.scrollbarX);
			this.box.appendChild(this.scrollbarY);
			this._calcScrollBarSize();
		},
		initEvent:function(){
			this.box.addEventListener(touchstart,this,false);
			this.box.addEventListener(touchmove,this,false);
			this.box.addEventListener(touchend,this,false);
			//判断是否支持
			if(exsitTouch){
				this.box.addEventListener('touchcancel',this,false);
			}
		},
		handleEvent:function(e){
			var t = T(e),dx,dy,x,y,pos;

			switch(e.type){
				case touchstart:
					this._stopAutoCalcScrollSize();
					removeClass(this.subbox,'silky-letgo');
					this.startMouseX = t.clientX;
					this.startMouseY = t.clientY;
					pos = getPos(this.subbox);
					this.startDomX = pos.x;
					this.startDomY = pos.y;
					//console.log(pos);
					this.isMouseDown = true;
					this.currentSid && (this.currentSid.stop = true);
					this.acceler.clear();
					this.acceler.add(t.clientX,t.clientY);

					break;
				case touchmove:
					if(!this.isMouseDown) return;
					dx = t.clientX - this.startMouseX;
					dy = t.clientY - this.startMouseY;
					x = this.startDomX + dx;
					y = this.startDomY + dy;
					pos = spos = this._calcPos(x,y);
					if(this.elastic){
						pos = this._calcOverflow(x,y,pos.x,pos.y);
						if(!this.elasticX){
							pos.x = spos.x;
						}
						if(!this.elasticY){
							pos.y = spos.y;
						}
					}
					this._calcScrollBarPos(pos.x,pos.y,pos.dx,pos.dy);
					this._setSubBoxPos(pos.x,pos.y);
					e.preventDefault();
					this._calcScrollBarSize(pos.dx,pos.dy);
					this.acceler.add(t.clientX,t.clientY);
					this.emit('scroll',this.getPosition());
					break;
				case touchend:
				case 'touchcancel':
					this.isMouseDown = false;
					dx = t.clientX - this.startMouseX;
					dy = t.clientY - this.startMouseY;
					x = this.startDomX + dx;
					y = this.startDomY + dy;
					pos = this._calcPos(x,y);
					//this._setSubBoxPos(pos.x,pos.y);
					this._calcScrollBarSize();
					addClass(this.subbox,'silky-letgo');
					this.currentSid = {
						stop:false
					};
					this._slowStart(this.acceler.end(t.clientX,t.clientY),{x:x-pos.x,y:y-pos.y});
					this.emit('scroll',this.getPosition());
					
					//e.preventDefault();
					break;
			}
		},
		_setSubBoxPos:function(x,y){
			this.lastX = parseInt(x);
			this.lastY = parseInt(y);
			setPos(this.subbox,this.lastX,this.lastY);
		},
		_calcPos:function(x,y){

			var sbcw = this.subbox.clientWidth,
				sbch = this.subbox.clientHeight,
				bcw = this.box.clientWidth,
				bch = this.box.clientHeight;
			sbcw = sbcw < bcw ? bcw : sbcw;
			sbch = sbch < bch ? bch : sbch;

			var isTouchTop = y >= 0,
				isTouchBottom = sbch + y <= bch,
				isTouchLeft = x >= 0,
				isTouchRight = sbcw + x <= bcw;
			if(isTouchTop){
				y = 0;
			}else if(isTouchBottom){
				y = -(sbch - bch);
			}

			if(isTouchLeft){
				x = 0;
			}else if(isTouchRight){
				x = -(sbcw - bcw);
			}
			return {
				x:x,
				y:y
			};
		},
		_calcOverflow:function(sx,sy,x,y){
			var dx = (sx - x)/4,
				dy = (sy - y)/4;
			return {
				x:x+dx,
				y:y+dy,
				dx:dx,
				dy:dy
			};
		},
		_calcScrollBarSize:function(dx,dy){
			dx = Math.abs(dx || 0);
			dy = Math.abs(dy || 0);



			var bcw = this.box.clientWidth,
				sbcw = this.subbox.clientWidth,
				bch = this.box.clientHeight,
				sbch = this.subbox.clientHeight,
				rx = bcw / (sbcw + dx),
				ry = bch / (sbch + dy);
			 	rx = rx > 1 ? 1 : rx;
				ry = ry > 1 ? 1 : ry;
			var xw = rx * this.box.clientWidth,
				yh = ry * this.box.clientHeight;
			
			css(this.scrollbarX,'width',xw+'px');

			css(this.scrollbarY,'height',yh+'px');
			if(sbcw <= bcw){
				css(this.scrollbarX,'display','none');
			}else{
				css(this.scrollbarX,'display','inline-block');
			}
			if(sbch <= bch){
				css(this.scrollbarY,'display','none');
			}else{
				css(this.scrollbarY,'display','inline-block');
			}
		},
		_calcScrollBarPos:function(x,y,dx,dy){
			dx = Math.abs(dx || 0);
			dy = Math.abs(dy || 0);

			var sbcw = this.subbox.clientWidth + dx,
				sbch = this.subbox.clientHeight + dy,
				bcw = this.box.clientWidth,
				bch = this.box.clientHeight;
			sbcw = sbcw < bcw ? bcw : sbcw;
			sbch = sbch < bch ? bch : sbch;
			var rx = -((x / (sbcw - bcw)) || 0),
				ry = -((y / (sbch - bch)) || 0);
			
			var dy = ry * (bch - this.scrollbarY.clientHeight),
				dx = rx * (bcw - this.scrollbarX.clientWidth);
			dy = Math.max(dy,0);
			dx = Math.max(dx,0);
	

			setPos(this.scrollbarY,0,dy);
			setPos(this.scrollbarX,dx,0);
		},
		_reCalcScrollBarPos:function(){
			this._calcScrollBarPos(this.lastX||0,this.lastY||0);
		},
		_slowStart:function(s,df){
			var x = spaceVal(s.x,3)*space;
			var y = spaceVal(s.y,3)*space;
			var mp = maxV(df.x,df.y),
				ms = maxV(x,y),
				bi = 1.1-Math.min((Math.pow(mp,2) + ms) / 10000,10)/10,
				u = bi * 15;
			this._slowLoop(this.currentSid,90,90,x,y,u);
		},
		_slowLoop:function(id,count,num,sx,sy,u){
			//console.log(u);
			var ratio = Math.sin(((num/count)*Math.PI)/2),
				count2 = u,
				num2 = count2 - (count - num);
				num2 < 0 && (num2 = 0);
			var ratio2 = Math.sin((((num2)/count2)*Math.PI)/2);


			//console.log(ratio);
			var spos = getPos(this.subbox),
				x = (spos.x + sx),
				y = (spos.y + sy);
			//console.log(sx,sy);
			var pos = this._calcPos(x,y);
			var dfx = 0,
				dfy = 0,
				pos2 = {},
				nx = pos.x,
				ny = pos.y;
			if(this.elastic){
				dfx = (x - pos.x) * ratio2;
				dfy = (y - pos.y) * ratio2;
				pos2 = this._calcOverflow(x,y,pos.x,pos.y);
				if(this.elasticX){
					nx = pos.x + dfx;
				}
				if(this.elasticY){
					ny = pos.y + dfy;
				}
			}
			if(num <= 0 || id.stop || (Math.max(Math.abs(sx),Math.abs(sy)) < 1 && (Math.max(Math.abs(dfx),Math.abs(dfy)) < 1 || (nx === this._lastRealScrollX && ny === this._lastRealScrollY)))){
				this.emit('scrollend',this.getPosition());
				this._setSubBoxPos(pos.x,pos.y);
				this._startAutoCalcScrollSize();
				return;
			}
			this._lastRealScrollY = ny;
			this._lastRealScrollX = nx;

			this._setSubBoxPos(nx,ny);
			this._calcScrollBarPos(nx,ny);

			this._calcScrollBarSize(pos2.dx,pos2.dy);
			//console.log(spos,sx,sy);
			this.emit('scroll',this.getPosition());
			var self = this;
			requestAnimationFrame(function(){
				self._slowLoop(id,count,num-1,sx*ratio,sy*ratio,u);
			}); 
		},
		_startAutoCalcScrollSize:function(){
			var self = this;
			this.autoscrollsize = setTimeout(function(){
				self._calcScrollBarSize();
				self._reCalcScrollBarPos()
				self._startAutoCalcScrollSize();
			},1000);
		},
		_stopAutoCalcScrollSize:function(){
			clearTimeout(this.autoscrollsize);
		},
		to:function(x,y){
			x = -x;
			y = -y;
			var pos = this._calcPos(x,y);
			this._setSubBoxPos(pos.x,pos.y);
			this._calcScrollBarSize();
			this._calcScrollBarPos(pos.x,pos.y);
		},
		getPosition:function(){
			var pos = getPos(this.subbox);
			return {
				x:pos.x ? -pos.x : pos.x,
				y:pos.y ? -pos.y : pos.y
			};
		}
	};

	return Scroll;
});