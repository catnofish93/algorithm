#### 1、行内元素与块状元素
格式上，行内元素不会以新行开始，块状元素会重起一行<br>
内容上，行内元素只能包含文本和行内元素，块状元素可以包含行内元素和其他块状元素<br>
盒模型上，行内元素设置的宽度和高度无效，margin和padding对其他元素不产生影响<br>
#### 2、页面导入样式时，使用link和@import的区别
从属关系，@import只能导入样式，link除了导入样式，还可以导入rss,ref连接属性，网站图标<br>
加载顺序，加载页面时，同时加载lint;@import在页面加载完毕后加载<br>
兼容性问题，@import在css2.1才支持,link作为html标签，不存在兼容性问题<br>
DOM可控区域，可以使用js操作DOM,插入link标签来改变样式，@import则不能<br>
#### 3、浏览器内核
主要包含两个部分：渲染引擎和js引擎<br>
渲染引擎的职责是渲染，在浏览器中展示所请求的内容<br>
js引擎，解析和执行javascript来实现网页的动态效果
#### 4、浏览器的渲染原理
1、解析文档，构建一棵DOM树<br>
2、解析css，生成CSSOM规则树<br>
3、根据DOM树和CSSOM规则树，构建渲染树，渲染树的结点称为渲染对象，是一个包含样式属性的矩形<br>
4、浏览器生成渲染树后，根据渲染树来进行布局（回流）<br>
5、布局完成后是绘制阶段，调用渲染树的paint方法，将内容显示到屏幕上
#### 5、渲染过程遇到js文件怎么处理
在构建DOM时，HTML解析器若遇到js,会暂挺文档的解析，将控制权交给javascript引擎
#### 6、async 与 defer的作用是什么？有什么区别
1、脚本没有defer或async，浏览器会立即加载并执行指定的脚本<br>
2、defer属性表示延迟执行引入的javascript，html解析完毕后再执行<br>
3、async表示异步执行引入的js,与defer的区别在于，如果已经加载好，就会执行，执行仍会阻止文档的解析，多个脚本的执行顺序无法保证<br>
#### 7、什么是重绘和回流
重绘：当渲染树中的一些元素需要更新属性，这些属性只影响外观、风格，不影响布局<br>
回流：当渲染树中的元素因为尺寸、布局、显隐需要重新构建，会影响到布局<br>
#### 8、DOMContentLoaded事件与Load事件区别
当HTMl文档被完全加载和解析时，DOMContentLoad事件被触发，而无需等待样式表，图像和子框架加载完成<br>
Load事件是当所有的资源加载完成后触发<br>
#### 9、cookies,localStorage,sessionStorage
存储大小：cookie存储大小不超过4K,sessionStorage和localStorage要大的多，可以达到5M<br>
有效时间：localStorage除非主动删除，sessionStorage会话结束后被清除，cookies设置有效时间<br>
作用域：sessionStorage通源窗口，当前会话，localStorage通源窗口，cookies通源窗口



