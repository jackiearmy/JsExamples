// import { Observer } from './Observer.js'

//(function (window) {
    var obj = {
        a: 1,
        b: {
            m: 22,
            n: 33
        }
    }

    //var os = new Observer();

    // defineReactive(obj, "a", 18);
    // defineReactive(obj, "b", 28);
    // console.log(obj);
    console.log(`obj.a: ${obj.a}`);
    // console.log(obj.a);
    obj.b = "1088";
    console.log(obj);
//})(window)