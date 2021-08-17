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
