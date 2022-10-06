class EventEmit {
    constructor() {
        this._events = {};
        this.consturctName = "fdfd"
    }

    on(evnentName, callBack) {
        //查找对象中是否已经注册事件，否则创建空对象
        const callBacks = this._events[evnentName] || [];
        callBacks.push(callBack);
        this._events[evnentName] = callBacks;
    }

    off(evnentName, callBack) {
        const callBacks = this._events[evnentName] || [];
        if (callBacks.length > 0) {
            this._events[evnentName] = callBacks.filter((cb) => {
                return cb != callBack;
            })
        }
    }

    emit(evnentName, ...args) {
        const callBack = this._events[evnentName] || [];
        // console.log(this._events);
        // console.log(`EventEmit emit callBack： ${this._events}`);
        callBack.forEach(cb => {
            cb && cb(...args);
        });
    }

    //once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
    once(evnentName, callBack) {
        const one = (...args) => {
            callBack(...args);
            this.off(callBack)
        }
    }
}