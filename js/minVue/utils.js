export default def = function (data, key, value, enumerable) {
    if (!data)
        return;
    Object.defineProperty(data, key, {
        value,
        //可枚举
        enumerable,
        //可以配置，例如被删除
        configurable: true,
        writable: true,
    })
}