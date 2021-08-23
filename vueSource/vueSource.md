#### 1、Object变化监测
通过Object.defineProperty()方法给对象定义属性，并分别给属性的读和写分别使用get和set进行拦截。<br>

    /**
    * Observer类会通过递归的方式把一个对象的所有属性转化为可观察对象
    */
    export class Observer {
        constructor(value) {
            this.value = value
            // 给value新增一个_obj_的属性，值为该value的Observer实例
            def(value, '_obj_', this)
            if (Array.isArray(value)) {
                // 当value为数组的逻辑
            } else {
                this.walk(value)
            }
        }
        walk(obj: Object) {
            const keys = Object.keys(obj)
            for(let i = 0; i < keys.length; i++) {
                defineReactive(obj, keys[i])
            }
        }
    }
    /** 
    * 使一个对象转化成可观测对象
    * @param { Object } obj对象
    * @param { String } key对象中的key
    * @param { any } val对象中的某个key的值 
    */
    function defineReactive(obj, key, val) {
        // 如果只传入obj和key，那么val = obj[key]
        if (arguments.length === 2) {
            val = obj[key]        
        }
        if (typeof val === 'object'){
            new Observer(val)
        }
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log(`${key}属性被读取`)
                return val
            },
            set(newVal) {
                if (val === newVal) {
                    return
                }
                console.log(`${key}属性被修改了`)
                val = newVal
            }
        })
    }
#### 依赖收集
建立一个依赖收集数组，谁依赖了这个数据，就把谁放入依赖数组中，当数据发生变更时，通知依赖数组进行更新<br>
在getter中收集依赖，在setter中通知依赖更新<br>
#### 依赖收集对象

    export default class Dep() {
        constructor() {
            this.subs = []
        }
        addSub(sub) {
            this.subs.push(sub)
        }
        // 删除一个依赖
        removeSub(sub) {
            remove(sub)
        }
        // 添加一个依赖
        depend() {
            if (window.target) {
                this.addSub(window.target)
        }
        // 通知所有依赖更新
        notify() {
            const subs = this.subs.slice()
            for(let i = 0; i < subs.length; i++) {
                subs[i].update()
            }
         }
    }
#### 依赖到底是谁
    export default class Watcher {
        constructor(vm, expOrFn, cb) {
            this.vm = vm
            this.cb = cb
            this.getter = parsePath(expOrFn)
            this.value = this.get()
        }
        get() {
            // 将watcher设置为window.target全局变量
            window.target = this
            const vm = this.vm
            // 调用getter方法，将watcher添加到Dep中
            let value = this.getter.call(vm, vm)
            window.target = null
            return value
        }
        // 更新数据更新变化的回调方法
        update() {
            const oldValue = this.value
            this.value = this.get()
            this.cb.call(this.vm, this.value, this.oldValue)
        }
    }
#### 2、虚拟DOM
##### 什么是虚拟DOM
虚拟DOM是用一个js对象描述DOM结点
##### 虚拟DOM类
    
    export default class Vnode {
        constructor(
            tag?: string,
            data?: vNodeData,
            children: ?Array<Vnode>,
            text?: string,
            elm?: Node,
            context?: Component,
            componentOptions?: VnodeComponentOptions,
            asyncFactory?: Function
        ) {
            }
    }
##### 虚拟DOM的类型
<ul>
    <li>注释结点</li>
    <li>文本结点</li>
    <li>元素结点</li>
    <li>组件结点</li>
    <li>函数式组件结点</li>
    <li>克隆结点</li>
</ul>
注释结点<br>

    export const createEmptyVnode = (text: string= '') => {
        const node = new VNode()
        node.text = text
        node.isComment = true
        return node
    }
文本结点<br>

    export const creatTextVnode(val: string | number) {
        return new VNode(undefined, undefined, undefined, String(val))    
    }
#### VNode的作用
当数据发生变化需要更新时，将数据变化后的VNode与数据变化前的VNode对比，找出差异，将有差异的VNode转化为真实DOM,并更新到视图中<br>
#### patch
DOM-Diff过程叫做patch过程<br>
patch干的3件事:<br>
- 创建结点，新的VNode中有，而旧的VNode中没有，则在旧的VNode中创建
- 删除结点，新的VNode中没有，而旧的VNode中有，则在旧的VNode中删除
- 更新结点，新的VNode中有，旧的VNode中有，则以新的VNode为准，更新旧的VNode
创建结点<br>
  

    function createEle(vnode, parentElm, refElm) {
        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag
        if (isDef(tag)) {
            // 创建元素结点
            vnode.elm = nodeOps.createElement(tag, vnode)
            // 创建元素子结点
            createChildren(vnode, children, insertedVnodeQueue)
            // 插入DOM
            insert(parentElm, vnode.elm, refElm)
        } else if (isTure(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        } else {
            vnode.elm = nodeOps.createTextNode(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        }
    }

删除结点

    function removeNode(el) {
        const parent = nodeOps.parentNode(el)
        if (isDef(parent)) {
            // 调用父结点的removeChild方法
            nodeOps.removeChild(parent, el)
        }
    }

更新结点

如果VNode与oldVNode均为静态结点，直接跳过<br>
如果VNode为文本结点，看oldVNode是是否只包含文本，如果是，比较文本是否相同，不同则更换文本，oldVNode不是文本结点，使用setTextNode改成文本结点<br>
如果VNode为元素结点，分两种情况
- 该结点包含子结点，则看旧结点是否包含子结点，如果包含，则递归替换，如果不包含，则旧结点可能为空结点或文本结点，原有结点删除，插入新的结点
- 该结点不包含子结点，将结点清空，插入新结点

#### 模版编译
把<template></template>中的内容，通过一系列逻辑处理生成渲染函数，也就是render函数，这一过程称为模版编译过程<br>
包含三个过程：解析器-》优化器-》代码生成器

#### 解析器
把模版通过正则等方式解析成抽象语法树，解析器的主函数为parseHTML,辅助函数为parseText,parseFilters

    // convert HTML to AST
    export function parse(template, options) {
        parseHTML(template, {
            warn,
            expectHTML: options,expectHTML,
            isUnaryTag: options.inUnaryTag,
            start(tag, attrs, unary) {}
            end() {}
            chars(text: string) {}
            comment(text: string) {}
        })
        return root
    }

#### 优化阶段
在AST中找出所有的静态结点并打上标记<br>
在AST中找出所有的静态根结点并打上标记<br>
在patch过程中不要比较这类结点，可以进行性能提升

