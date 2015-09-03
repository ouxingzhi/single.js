define(function(require){
	/**
	 * 音乐播放组件
	 * @author xinzhi.oxz/安顿
	 */
	var Event = require('base/event');

	function on(el,type,fn,l){
		el.addEventListener(type,fn,l);
	}

	var AudioPlay = Event.extend({
		propertys:function(){
			this.status = AudioPlay.STATUS_STOP;
			this.audio = document.createElement('audio');
		},
		
		initialize:function($super,options){
			$super(options);
			this._setOption(options);
			this._initEvents();
		},
		_setOption:function(options){
			options = options || {};
			if(options.src){
				this.src = options.src;
			}

		},
		_initEvents:function(){
			var a = this.audio;
			on(a,"loadstart",this);   //客户端开始请求数据 
			
            on(a,"progress",this);    //客户端正在请求数据 

            on(a,"suspend",this);     //延迟下载 

            on(a,"abort",this);       //客户端主动终止下载（不是因为错误引起）， 

            on(a,"error",this);       //请求数据时遇到错误 

            on(a,"stalled",this);     //网速失速 

            on(a,"play",this);        //play()和autoplay开始播放时触发 

            on(a,"pause",this);       //pause()触发 

            on(a,"loadedmetadata",this);  //成功获取资源长度 

            on(a,"loadeddata",this);  // 

            on(a,"waiting",this);     //等待数据，并非错误 

            on(a,"playing",this);     //开始回放 

            on(a,"canplay",this);     //可以播放，但中途可能因为加载而暂停 

            on(a,"canplaythrough",this); //可以播放，歌曲全部加载完毕 

            on(a,"seeking",this);     //寻找中 

            on(a,"seeked",this);      //寻找完毕 

            on(a,"timeupdate",this);  //播放时间改变 

            on(a,"ended",this);       //播放结束 

            on(a,"ratechange",this);  //播放速率改变 
            
            on(a,"durationchange",this);  //资源长度改变 

            on(a,"volumechange",this);    //音量改变 
		},
		handleEvent:function(e){
			switch(e.type){
				case 'play':
					this.status = AudioPlay.STATUS_PLAY;
					break;
				case 'pause':
					this.status = AudioPlay.STATUS_PAUSE;
					break;
				case 'stalled':
				case 'waiting':
					this.status = AudioPlay.STATUS_LOADING;
					break;
				case 'ended':
				case 'abort':
					this.status = AudioPlay.STATUS_STOP;
					break;
				case 'error':
					this.status = AudioPlay.STATUS_ERROR;
					break;
			}
			this.emit(e.type,arguments);
			this.emit('all',arguments);
		},
		play:function(){
			this.audio.play();
		},
		pause:function(){
			this.audio.pause();
		},
		getStatus:function(){
			return this.status;
		},
		setSrc:function(src){
			this.audio.src = src;
		},
		getSrc:function(){
			return this.audio.src;
		},
		getRealSrc:function(){
			return this.audio.getAttribute('src');
		},
		getLength:function(){
			return this.audio.duration;
		},
		getCurPos:function(){
			return this.audio.currentTime;
		},
		setTitle:function(title){
			return this.audio.title = title;
		},
		getTitle:function(){
			return this.audio.title;
		}
	});

	//stop
	AudioPlay.STATUS_STOP = 'stop';
	//plaing
	AudioPlay.STATUS_PLAY = 'play';
	//loading
	AudioPlay.STATUS_LOADING = 'loading';
	//pause
	AudioPlay.STATUS_PAUSE = 'pause';
	//error
	AudioPlay.STATUS_ERROR = 'error';

	return AudioPlay;
});