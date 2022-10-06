
var prizeFun = function () {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            var num = randomNum(1, 100);
            if (num < 30) {
                resolve(num)
            } else {
                reject(num)
            }
        }, 1000);
    });

    promise.then((value) => {
        alert(`您中奖了，中奖数字${value}`)
    }, (value) => {
        alert(`很遗憾，您未能中奖，您的号码为${value}`)
    })
}

///随机生成数    let p2 = Promise.resolve(222);
let p3 = Promise.resolve(333); function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


///AJAX
var ajaxPromise = function (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
    });

    // promise.then((val)=>{
    //     console.log(val);
    // },(reason)=>{
    //     console.warn(reason);
    // })
}

var sendAjax = function (url) {
    ajaxPromise(url)
}

var promiseExcutor = new Promise(
    () => {//构造器函数
        console.log("Promise构造器函数执行");
    })

console.log('promiseExcutor', promiseExcutor);

var promiseAllFun = function () {
    let p1 = new Promise((resolve, reject) => {
        resolve(111);
    })
    let p2 = Promise.reject(222);
    let p3 = Promise.resolve(333);
    var promiseAll = Promise.all([p1, p2, p3]);
    console.log(promiseAll);
}


var promiseRaceFun = function () {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111);
        }, 3000);
    })
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111);
        }, 2000);
    })
    let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111);
        }, 2000);
    })
    var promiseRace = Promise.race([p1, p2, p3]);
    console.log(promiseRace);
}


var promiseReturnTest = function () {
    console.log("-------------------promiseReturnTest Start-------------------");
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
            console.log("异步任务1");
        }, 1000);
    }).then(value => {
        console.log("同步任务2");
        console.log("任务1的结果", value);
        return 2;
    }).then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("同步任3");
                console.log("任务2的结果", value);
                resolve(3);
            }, 1000);
        });
    }).then(value => {
        console.log("同步任4");
        console.log("任务3的结果", value);
    })
}

var asyncTest = async function () {
    console.log('asyncTest');
    // return 333;
    // return new Promise((resolve, reject) => {
    //     resolve(333);
    // })
    return new Promise((resolve, reject) => {
        reject(333);
    })
}
