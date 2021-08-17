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

