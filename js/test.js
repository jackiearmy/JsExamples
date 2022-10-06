
var obj = {};

console.log("@@@","test.js")


const userName = "tc";

module.exports.sayHello = function(){
    console.log("hello, my name is"+userName);
}

// exports default userName;

Object.defineProperty(obj,'a',{
    get(){
        console.log(obj.a);
    },
    set(){
        console.log(obj.a);
    }
});

