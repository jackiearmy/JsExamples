
//#region lesson 1
function hd(letName) {
    let n = 1;
    let m = 10;
    return function sum() {
        console.log(`letName:${letName}`, n++);
        return function mmmm() {
            console.log('m: ', m++);
        }
    }
    console.log("123213");
    sum();
}

// let a = hd('a');
// a()();
// a();
// a();
// let b = hd('b');
// b();
// b();
// b();
//#endregion


//#region lesson 2
// function Hd() {
//     let n = 1;
//     this.sum = function () {
//         console.log(++n);
//     }
// }

function Hd() {
    let n = 1;
    function sum() {
        console.log(++n);
    }
    return {
        sum
    }
}

// let a = new Hd();
// console.log("a: ", a);
// a.sum();
// a.sum();
//#endregion


//#region lesson 3
// for (let i = 0; i < 4; i++) {
//     console.log(i);
// }
// console.log(`i: ${i}`);
//#endregion


//#region lesson 4
let arr = [12, 19, 78, 22, 444, 22, 9, 809, 10, 0, 64, 73, 52, 89, 28, 63];
// arr.filter(function (v) {
//     return v > 10 && v < 100
// });

function between(a, b) {
    return function (v) {
        let intA = parseInt(a);
        let intB = parseInt(b);
        if (intA > intB) {
            return v > intA && v < intB;
        } else {
            return v < intB && v > intA;
        }
    }
}
arr = arr.filter(between(10, 100)).sort(function (a, b) {
    return parseInt(a) - parseInt(b);
});
// console.log('arr: ', arr)
//#endregion


//#region lesson 5
// console.log("lesson 5 step start");
// var asyncF = async function testAsync() {
//     let p = new Promise((resolve) => {
//         console.log('setTimeout');
//         let pStr = "异步方法执行"
//         setTimeout(() => {
//             resolve(222)
//             console.log(`p: ${pStr}`);
//         }, 10000);
//     });
//     console.log("111111")
//     console.log('p', p)
//     let ppp = await p;
//     console.log('ppp', ppp)
//     console.log("22222")
// }
// asyncF();


// const p1 = new Promise((resolve, reject) => {
//     console.log("1111111111111111111")
//     setTimeout(() => {
//         console.log("2222222222222222222")
//         resolve('result')
//         console.log("333333333333333")
//     }, 1000);
//     console.log("44444444444444444444")
// })
// p1.then(res => console.log('res', res), err => console.log('err', err))

async function fun1() {
    return 1;
}
async function fun2() {
    return Promise.resolve(2);
}
let f1 = fun1();
let f2 = fun2();
console.log('f1', f1);
console.log('f2', f2);

//promise.then成功的情况对应await


// console.log("lesson 5 step end");
//#endregion


//#region lesson 6
// console.log("lesson 6 step start");
function funtion1() {
    return 1;
}
function funtion2(time, str) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(str);
        }, time);
    })
}
function funtion3() {
    return 3;
}
function function4() {
    let pe = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(4);
        }, 2000);
    })
    let presult = pe.then(value => {
        console.log('function4 value', value);
    }).catch(reason => {
        console.log('function4 presult', presult);
    })
    return presult;
}

async function ran() {
    console.log(funtion1());
    console.log(await funtion2());
    console.log(funtion3());
    console.log(function4());
}
// ran();
let pe1 = funtion2(3000, "测试promiseall 1");
let pe2 = funtion2(3000, "测试promiseall 2");
let pe3 = funtion2(3000, "测试promiseall 3");
let pe4 = funtion2(3000, "测试promiseall 4");
// console.log(Date())
// let pAll = Promise.all([pe1,pe2,pe3,pe4]);
// pAll.then(value=>{
//     console.log('pAll value',value)
//     console.log(Date())
// },reason=>{
//     console.log('pAll reason',reason)
//     console.log(Date())
// })
async function ranPAll() {
    await pe1;
    await pe2;
    await pe3;
    await pe4;
    console.log(Date())
}
// ranPAll();


// console.log("lesson 6 step end");
//#endregion

//#region 7 宏任务和微任务
function promiseTesting() {
    console.log("lesson 7 step start");
    console.log("1111111111");
    let div4 = document.getElementById("div4");
    const img = document.createElement("img");
    img.src = "https://robohash.org/1";
    div4.appendChild(img);
    function microAndMacroTask() {
        console.log("2222222222222");
        let p = new Promise((resolve) => {
            resolve(1);
            console.log("promise excutor");
        })
        setTimeout(() => {
            console.log("3333333333333");
            alert("3333333333333");
        }, 1000);
        p.then(value => {
            console.log("444444444444444");
            alert("444444444444444");
        })
    }
    microAndMacroTask();
    console.log("555555555555555555");
    console.log("lesson 7 step end");
}
//#endregion