##### 对React的理解，有哪些特性
用于构建用户界面的Javascript的库，只提供UI层面的解决方案<br>
特性<br>
- JSX语法
- 单向数据绑定
- 虚拟DOM
- 声明式编程
- Component

优势<br>
- 高效灵活
- 声明式设计，简单使用
- 组件式开发，提高代码效率
- 单向响应的数据流会比双向绑定的更安全，速度更快

#### Real Dom 与 Vitual Dom
Virtual Dom 是用Javascript对象形式存在对真实DOM的描述<br>
区别
- 虚拟DOM不会进行排版和重绘操作，而真实DOM会频繁的进行排版和重绘
- 虚拟DOM的总损耗是虚拟DOM增删改+真实DOM差异增删改+排版和重绘，真实DOM的总损耗是真实DOM完全增删改+排版和重绘
  

