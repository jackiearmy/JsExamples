(function (window) {
    function observe(data) {
        if (typeof data != 'object') return;
        new Observer(data);
    }

    class Observer {
        constructor(value) {
            this.value = value;
            this.walk();
        }
        walk() {
            // 遍历该对象，并进行数据劫持
            Object.keys(this.value).forEach((key) => defineReactive(this.value, key))
        }
    }

    class Watcher {
        constructor(data, expression, cb) {
            // data: 数据对象，如obj
            // expression：表达式，如b.c，根据data和expression就可以获取watcher依赖的数据
            // cb：依赖变化时触发的回调
            this.data = data;
            this.expression = expression;
            this.cb = cb();
            this.get();
        }
        get() {
            window.target = this;
            dep.push(window.target);// 新增
            const value = parsePath(this.data, this.expression);
            window.target = null // 新增，求值完毕后重置window.target
            return value;
        }

        // 当收到数据变化的消息时执行该方法，从而调用cb
        //大家回顾一下vm.$watch方法，我们可以在定义的回调中访问this，
        //并且该回调可以接收到监听数据的新值和旧值，因此做如下修改
        update() {
            const oldValue = this.value;
            this.value = parsePath(this.data, this.expression);
            this.cb.call(this.data, this.value, oldValue);
        }
    }

    class Dep {
        constructor() {
            this.subs = []
        }
        depend() {
            if (Dep.target) { // 新增
                this.addSub(Dep.target)
            }
        }
        notify() {
            const subs = [...this.subs]
            subs.forEach((s) => s.update())
        }
        addSub(sub) {
            this.subs.push(sub)
        }
    }

    function parsePath(obj, expression) {
        const segments = expression.split('.')
        for (let key of segments) {
            if (!obj) return
            obj = obj[key]
        }
        return obj
    }

    function defineReactive(data, key, value = data[key]) {
        // const dep = [] // 增加
        const dep = new Dep() // 修改
        // 如果value是对象，递归调用observe来监测该对象
        // 如果value不是对象，observe函数会直接返回
        this.observe(value);
        Object.defineProperty(data, key, {
            get: function reactiveGetter() {
                console.log("Object.defineProperty getter");
                dep.depend() // 修改
                return value;
            },
            set: function reactiveSetter(newVal) {
                if (newVal != value) {
                    console.log("Object.defineProperty setter");
                    value = newVal;
                    observe(newVal);// 设置的新值也要被监听
                    dep.notify();
                }
            }
        });
        // console.log(data);
    }

    // window.defineReactive = defineReactive;
    window.observe = observe;
})(window)

