export default function defineReactive(data, key, val) {
    // console.log(arguments.length)
    if (!val) {
        val = data[key];
    }
    Object.defineProperty(data, key, {
        //可枚举
        enumerable: true,
        //可以配置，例如被删除
        configurable: true,
        get: function reactiveGetter() {
            console.log(`正在获取key(${key})值${val}`);
            return val;
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val)
                return;
            console.log(`正在设置key(${key})值${newVal}`);
            val = newVal;
        }

    })
}