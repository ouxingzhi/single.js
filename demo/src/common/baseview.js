define(function(require){
	var BaseView = require('mvc/view');

	var CLS_LEFTBTN = 'head-left-btn',
		CLS_TITLE = 'head-title',
		CLS_RIGHTBTN = 'head-right-btn';
	var headertpl = [
		'<span class="'+CLS_LEFTBTN+'"></span>',
		'<h3 class="'+CLS_TITLE+'"><%=title%></h3>',
		'<span class="'+CLS_RIGHTBTN+'"><%=rightTitle%></span>'
	].join('');
	return BaseView.extend({
		propertys:function(){
		},
		initialize:function($super,options){
			$super(options);
		},
		/**
		 * @param options
		 * 		|- title 标题
		 *		|- leftHandle 左边按键的回调
		 *		|- rightHandle 右边按键的回调
		 *		|- rightTitle 标题
		 */
		setHeader:function(options){
			var events = {};
			if(options.leftHandle){
				events['click .'+CLS_LEFTBTN] = options.leftHandle
			}
			if(options.rightHandle){
				events['click .'+CLS_RIGHTBTN] = options.rightHandle
			}
			this.toHead(this.id,{
				template:headertpl,
				data:{
					title:options.title,
					rightTitle:options.rightTitle
				},
				events:events,
				space:this
			});
		}
	});
	return BaseView;
});