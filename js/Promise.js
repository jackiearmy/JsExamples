/* 自定义Promis函数 */
(function (window) {
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';
    //Promise 构造函数
    //excutor 执行器回调函数
    function Promise(excutor) {
        const that = this;
        that.promiseStatus = 'pending';
        that.promiseResult = null;
        that.callbacks = [];

        function resolve(value) {
            if (that.promiseStatus !== PENDING)
                return;
            that.promiseStatus = RESOLVED;
            that.promiseResult = value;
            setTimeout(() => {
                if (that.callbacks.length > 0) {
                    that.callbacks.forEach(callbackObj => {
                        callbackObj.onResolve(value);
                    });
                }
            }, 100);
        }

        function reject(reason) {
            if (that.promiseStatus !== PENDING)
                return;
            that.promiseStatus = REJECTED;
            that.promiseResult = reason
            setTimeout(() => {
                if (that.callbacks.length > 0) {
                    that.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason);
                    });
                }
            }, 100);
        }

        //立即执行执行器函数
        try {
            excutor(resolve, reject);
        } catch (ex) {
            reject(ex);
        }
    }

    //原型链上的then方法
    //返回一个指定失败或者成功的回调函数
    //并返回一个新的Promise对象
    Promise.prototype.then = function (onResolve, onRejected) {
        return new Promise((resolve, reject) => {
            //统一处理返回Promise实例的方法
            function handleStatus(typeFn) {
                /*
                1.抛出异常，返回失败的Promise对象，reason为抛出异常
                2.回调函数返回的是非Promise对象，return成功的Promise，value是回调函数返回的值
                3.返回Promise对象，return的Promise的结果就是这个Promise对象的结果
                */
                try {
                    const result = typeFn(that.promiseResult);
                    if (result instanceof Promise) {
                        result.then(
                            (value) => resolve(value),
                            reason => reject(reason)
                        )
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            //假设当前是pending状态，将回调函数保存起来
            if (this.promiseStatus === PENDING) {
                this.callbacks.push({
                    onResolve(value) {
                        handleStatus(onResolve);
                    },
                    onRejected(reason) {
                        handleStatus(onRejected);
                    }
                });
            }
            if (this.promiseStatus === RESOLVED) {
                setTimeout(() => {
                    handleStatus(onResolve);
                });
            }
            if (this.promiseStatus === REJECTED) {
                setTimeout(() => {
                    handleStatus(onRejected);
                });
            }
        })
    }

    //原型链上的catch方法
    Promise.prototype.catch = function (onRejected) {
        this.then(undefined, onRejected);
    }

    //函数的resolve方法
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(value => { }, reason => { });
            } else {
                resolve(value);
            }
        });
    }

    //函数的reject方法
    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    //函数的all方法
    Promise.all = function (promises) {
        return new Promise((resolve, reject) => {
            let arr = [];
            let count = 0;
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    count++;
                    arr[i] = value;
                    if (count === promises.length) {
                        resolve(arr);
                    }
                }, reason => {
                    reject(reason);
                })
            }
        })
    }

    //函数的race方法
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    resolve(value);
                }, reason => {
                    reject(reason)
                })
            }

        })
    }

    window.Promise = Promise;
})(window)