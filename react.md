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

#### React服务端渲染
指服务端完成html的拼接处理技术，发送给浏览器端，然后为其绑定状态和事件，主要解决了两个问题
- 加速首屏加载，解决首屏白屏问题
- SEO，渲染的页面可直接由爬虫抓取

#### React中捕获错误
错误边界

    class ErrorBoundary extends React.Component {
        constructor(props){
            super(props)
            this.state = { hasError: false };
        }
        static getDerivedStateFromError(error) {
            return { hasError: true }
        }
        componentDidCatch(error, errorInfo) {
            logErrorToMyService(error, errorInfo)
        }
        render() {
            if (this.state.hasError) {
                return (<h1>Something has wrong</h1>)
            }
            return this.props.children
        }
    }

错误边界无法捕捉到的错误，可以通过try catch和onerror事件监听捕获

#### React常用的优化手段
- 避免使用内联函数
- 使用React Fragments避免额外标记
- 使用immutable
- 懒加载组件
- 事件绑定方式
- 服务端渲染

#### 如何避免不必要的render
- shouldComponentUpdate,在生命周期中进行数据对比，如果不希望组件重新渲染，返回false即可
- PureComponent,与shouldComponentUpdate原理一致，是对数据进行浅比较
- React.memo用来缓存组件的渲染，避免不必要的更新，是一个高阶组件

#### render函数的触发时机
- 类组件调用setState修改状态
- 函数组件通过useState hook修改状态
- 类组件重新渲染
- 函数组件重新渲染

#### immutable
immutable的实现原理是持久化数据结构
- 用一种数据结构来保存数据
- 当数据被修改时，返回一个对象，新对象会尽可能的利用之前的数据结构，而不会对内存造成浪费

使用immutable的库主要是immutable.js

#### React Router的几种模式
hasRouter: 通过监听window.addEventListener('hashChange', callback)监听hash值的变化，并传递给
其嵌套的组件<br>
browerRouter:利用history.location值的变化，通过props传进来的path与context传进来的pathName进行匹配，然后决定是否渲染组件

使用immutable可以给react带来性能上的优化，主要体现在减少渲染次数上

React Router主要包含的几个包
- react-router 实现了路由的核心功能
- react-router-dom 基于react-router，实现了浏览器运行环境的一些功能
- react-router-native 基于react-router,加入了react-native的一些功能
- react-router-config 用于配置静态路由的工具库

提供的组件
- BrowerRouter, HashRouter
- Route
- Link, NavLink
- switch
- redirect

路由传递参数的方式
- 动态路由的方式
- search传递参数
- to传入对象

#### react-redux
react-redux将组件分成两部分
- 容器组件，存在逻辑处理
- UI组件，只负责显示和交互，内部没有逻辑处理，状态由外部控制

react-redux包含两个核心
- Provider
- connection


    <Provider store={store}>
        <App />
    </Provider>
    connect(mapStateToProps, mapDispatchToProps)(MyComponent)

#### react-redux中间件
其本质是一个函数，对store.dispatch方法进行了改造，在发出Action和执行Reducer这两步中间，添加了新的功能

使用

    const store = createstore(
        reducer,
        applyMiddleware(thunk, logger)
    )

redux-thunk会判断传入的数据类型，如果是一个函数，将给函数传入参数值(dispatch, getState)

    const getHomeMultidataAction = () => {
        return (dispatch) => {
            axios.get("http://xxx.xx.xx").then(res => {
                const data = res.data.data;
                dispatch(changeBannersAction(data.banner.list))
            }
        }
    }

    import { applyMiddleware, createStore } from 'redux'
    import createLogger from 'redux-logger'
    const logger = createLogger()
    
    const store = createStore(
        reducer,
        applyMiddleware(logger)
    )

三大原则
- 单一数据源
- state是只读的
- 使用纯函数来执行修改

#### react中常用引用css的方式
- 在组件中直接使用
- 组件中引用css文件, 全局生效，互相影响
- 组件中引用.module.css文件吗， 类名需要用{style.className}的形式编写，不方便动态修改样式
- CSS IN JS，由第三方库提供，styled-components

#### react hooks
hook让函数组件拥有了类组件的特性，例如组件内的状态，生命周期

    import React, { useState, userEffect } from 'react'
    function Example() {
        const [ count, setCount ] = useState(0)
        useEffect(() => {
            document.title = `you click ${count} times`;
        })
        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>click me</button>
            </div>
        )

常用hook
- useState
- useEffect
- 其他

hook能解决状态相关的重用问题
- 每调用一次useHook一次都会生成一份独立的状态
- 通过自定一hook，能更好的封装我们的功能

react中的高阶组件
作用
- 属性代理：操作props,抽离state,通过ref访问组件实例，用其他元素包裹传入的组件
- 反向代理：操作state,渲染劫持

存在问题
- 静态方法丢失
- refs属性不能透传
- 方向继承不能保证完整的子组件树被解析
