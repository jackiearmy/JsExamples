import { def } from './utils'

export default class Observer {
    constructor(value) {
        console.log('我是Observer的构造器', value);
        //给Observer实例（this注意，构造器中的this不是表示类本身，而是表示实例对象）
        //添加__ob__对象，值是这次new的实例
        def(value, "__ob__", this, false);
        this.value = value;
    }
}