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
#####区别
- 虚拟DOM不会进行排版和重绘操作，而真实DOM会频繁的进行排版和重绘
- 虚拟DOM的总损耗是虚拟DOM增删改+真实DOM差异增删改+排版和重绘，真实DOM的总损耗是真实DOM完全增删改+排版和重绘<br>
#####Real Dom优点和缺点
优点：易用；缺点：效率低，性能差
#####virtual Dom优点和缺点
优点：简单方便，性能好，借助虚拟DOM跨平台；缺点：首次渲染时，多了一层虚拟DOM的计算，速度比正常稍慢
#### React生命周期
创建阶段：
- constructor
- getDerivedStateFromProps
- render
- componentDidMount

更新阶段
- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

卸载阶段
- componentWillUnmount

#### React中setState的执行机制
##### 异步更新
在执行完setState后不能立马拿到最新的state值
##### 同步更新
在宏任务中，setState是同步的
##### 总结
在组件生命周期中或合成事件中，setState是异步的<br>
在DOM原生事件或setTimeout中，setState是同步的<br>

#### React中的事件机制
React基于浏览器事件机制自身的一套事件机制，包括事件注册、事件合成、事件冒泡、事件派发等<br>
执行顺序
    
    import React from 'react'
    class App extends React.Component {
        constructor(props) {
            super(props)
            this.parentRef = React.createRef()
            this.childRef = React.createRef()
        }
        componentDidMount() {
            this.parentRef.current?.addEventListener('click', () => {
                console.log('原生事件： 父元素DOM监听')
            })
            this.childRef.current?.addEventListener('click', () => {
                console.log('原生事件： 父元素DOM监听')
            })
            document.addEventListener('click', () => {
                console.log('原生事件： 父元素DOM监听')
            })
        }
        parentClickFun = () => {
            console.log('React事件：父元素事件监听')
        }
        childClickFun = () => {
            console.log('React事件：子元素事件监听')
        }
        render() {
            return (
                <div ref={this.parentRef} onClick={this.parentClickFun}>
                    <div ref={this.childRef} onClick={this.childClickFun}>
                    </div>
                </div>
            )
        }
    }
    export default App

##### 结论
- React所有事件都挂载在document对象上
- 当真实DOM事件触发后，会冒泡到document对象上，再处理React事件对象
- 先执行原生事件，再处理React事件
- 最后执行挂载在document上的事件

#### React refs的使用
允许访问DOM结点或在render方法中创建React结点
##### 如何使用
传入字符串

    class myComponent extends React.Component {
        constructor(props) {
            super(props)
            this.myRef = React.createRef()
        }
        render() {
            return <div ref='myref'></div>
        }
    }

传入对象

    class myComponent extends React.Component {
        constructor(props) {
            super(props)
            this.myRef = React.createRef()
        }
        render() {
            return <div ref={this.myref}></div>
        }
    }

传入函数
    
    class myComponent extends React.Component {
        constructor(props) {
            super(props)
            this.myRef = React.createRef()
        }
        render() {
            return <div ref={element => this.myref = element}></div>
        }
    }

传入hook
    
    function App(props) {
        const myref = useRef()
        return (
            <div ref={myref}></div>
        )
    }

##### 应用场景
- 对DOM元素进行焦点控制，内容选择，控制
- 对DOM元素进行内容设置及媒体控制
- 对DOM元素的操作和对组件实例的操作
- 集成第三方DOM库

#### 受控的组件和非受控组件
#####受控组件
受控组件，就是受我们控制的组件，组件的状态全程响应外部数据
#####非受控组件
不受我们控制的组件，初始化时接受外部的数据，然后在内部存储自身状态
####高阶组件
高阶组件即接受一个或多个组件作为参数，并返回一个组件
#####高阶组件的约定
- props保持一致
- 不能在函数式组件上使用ref
- 不要以任何方法改变原始组件
- 不要在render方法中使用高阶组件
- 使用compose组合高阶组件
- 包装显示名字以方便调试
  

