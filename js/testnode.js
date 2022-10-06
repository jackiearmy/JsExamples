const fs = require("fs");
const http = require("http");
const testjs = require("./test");
const moment = require('moment');
const utills = require("./utils");

// fs.readFile("./files/1.txt","utf8",(err,dataStr)=>{
//     console.log(err);
//     console.log("--------");
//     console.log(dataStr);
// })

var arr = [81,72,111,444,'123','2465','dfd',46,null,undefined,44,267,99,undefined,null,Symbol('2'),6];
console.log(utills.uniqueArr(arr));


console.log(testjs);
// console.log(module);
['=o]\0/-[']
console.log(moment().format("YYYY-MM-DD HH:mm:ss"));

const server = http.createServer();

server.on("request",(req,res)=>{
    const url = req.url||"";
    const method =req.method||"";

    let content = "";

    if(url==="/"||url.indexOf("index.html")>-1){
        console.log(url);
        content = "<h3>index html</h3>";
    }else if(url.indexOf("about.html")>-1){
        content = "<h3>about html</h3>";
    }else{
        content = "<h1>404 not found</h1>";
    }

    const str = `You request url is ${url}, you request method is ${method}`;
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(`${content}`);
})

server.listen(8088,function(){
    console.log("8088端口监听到请求");
})