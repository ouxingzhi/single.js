#single.js － 移动端单页应用mvc框架

###是什么？
一个纯面向对象的javascript单页应用mvc框架，特点：
	
	1. js纯面向对象
	2. mvc模式
	3. 通过hash路由
	4. 支持转场动画
	5. 自带ui控件，可扩展

这个框架需要做到的是，通过hash来定位view文件并加载，同时支持传入参数，如路径的参数和通过?后面的querystring的参数，例子:
	
	#list?param=value&param2=value2

如例子所示，list指定view文件名，在指定路径加载list.js,并把?号后面的参数传入。
例子:http://ouxingzhi.github.io/single.js_todolist/
