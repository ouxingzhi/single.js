define(function(require){
	var Base = require('base/base');
	var UiLayer = require('ui/layer');

	var C = {};
		C.UI_DIALOG = 'ui-dialog',
		C.UI_DIALOG_BOX = 'ui-dialog-box',
		C.UI_DIALOG_CLOSE = 'ui-dialog-close',
		C.UI_DIALOG_PADDING = 'ui-dialog-padding',
		C.UI_DIALOG_HEAD = 'ui-dialog-head',
		C.UI_DIALOG_HEAD_TITLE = 'ui-dialog-head-title',
		C.UI_DIALOG_CONTENT = 'ui-dialog-content',
		C.UI_DIALOG_BUTTONS = 'ui-dialog-buttons';

	/*
	 *  @private createButtons
	 *  创建案件dom
	 *	@return [Button...];
	 */
	function createButtons(buttons){
		var bs = $();
		Base.each(buttons,function(o){
			var btn = $('<button></button>');
			btn.html(o.title||'');
			if(o.click){
				btn.on('click',o.click.bind(this));
			}
			if(o.cls){
				btn.addClass(o.cls);
			}
			if(o.events){
				var events = {};
				Base.each(o.events,function(fn,name){
					events[name] = fn.bind(this);
				},this);
				btn.on(events);
			}
			bs.push(btn[0]);
		},this);
		return bs;
	}

	var defaultButtons = [
			{
				title:'确认',
				click:function(){
					this.hide();
				}
			}
		];


	return UiLayer.extend({
		propertys:function(){
			//标题
			this.title = '';
			//内容
			this.content = '';
			/**
			 * 按键集合
			 * [{
			 *	  title:'标题'
			 *	  click:function(){},
			 *	  cls:'cls',
			 *	  events:{}
			 *  }]
			 */
			this.buttons = [];
			//是否隐藏标题，默认为false
			this.hideTitle = false;
			//是否隐藏关闭按钮，默认为false
			this.hideClose = false;
			

			this.doms = {};
			this.on('create',function(){
				this.$el.addClass(C.UI_DIALOG);
				Base.each(C,function(cls){
					this.doms[cls] = this.$el.find('.'+cls);
				},this);
				this.update();
			});
			this.on('show',function(){
				this.updatePosition();
			});
		},
		initialize:function($super,options){
			$super(options);
		},
		setOption:function($super,options){
			options = options || {};
			$super(options);
			if(!Base.isNUL(options.title)){
				this.title = options.title;
			}

			if(!Base.isNUL(options.content)){
				this.content = options.content;
			}
			if(options.buttons && options.buttons.length){
				this.buttons = options.buttons;
			}else{
				this.buttons = defaultButtons;
			}

			if(!Base.isNUL(options.hideTitle)){
				this.hideTitle = options.hideTitle;
			}

			if(!Base.isNUL(options.hideClose)){
				this.hideClose = options.hideClose;
			}


		},
		update:function(){
			if(this.$el){
				if(this.hideClose){
					this.doms[C.UI_DIALOG_CLOSE].hide();
				}else{
					this.doms[C.UI_DIALOG_CLOSE].show();
				}
				if(this.hideTitle){
					this.doms[C.UI_DIALOG_HEAD].hide();
				}else{
					this.doms[C.UI_DIALOG_HEAD].show();
				}
				this.doms[C.UI_DIALOG_HEAD_TITLE].html(this.title);
				this.doms[C.UI_DIALOG_CONTENT].html(this.content);
				var bus = createButtons.call(this,this.buttons);
				this.doms[C.UI_DIALOG_BUTTONS].empty();
				this.doms[C.UI_DIALOG_BUTTONS].append(bus);
			}
		},
		createHTML:function(){
			return [
				'<div class="'+C.UI_DIALOG_BOX+'">',
					'<span class="'+C.UI_DIALOG_CLOSE+'"></span>',
					'<div class="'+C.UI_DIALOG_PADDING+'">',
						'<div class="'+C.UI_DIALOG_HEAD+'">',
							'<span class="'+C.UI_DIALOG_HEAD_TITLE+'"></span>',
						'</div>',
						'<div class="'+C.UI_DIALOG_CONTENT+'"></div>',
						'<div class="'+C.UI_DIALOG_BUTTONS+'"></div>',
					'</div>',
				'</div>'
			].join('');
		},
		show:function($super,options){
			$super(options);
			if(options){
				this.setOption(options);
				this.update();
			}
			
		}
	});
});