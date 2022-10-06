// 1.创建一个新对象，并继承其构造函数的prototype，
//这一步是为了继承构造函数原型上的属性和方法
// 2.执行构造函数，方法内的this被指定为该新实例，
//这一步是为了执行构造函数内的赋值操作
// 3.返回新实例（规范规定，如果构造方法返回了一个对象，
//那么返回该对象，否则返回第一步创建的新对象）

function myNew(foo, ...args) {
    // 创建新对象,并继承构造方法的prototype属性, 
    //这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
    let obj = Object.create(foo);
}
