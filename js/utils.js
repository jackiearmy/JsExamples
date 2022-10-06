const utils = {
    debounce:function(fn,delay,triggerNow){
        if(!delay){
            delay = 1000;
        }
        var timer = null;
        return function(){
            var that = this;
            var firstTick = !timer;
            if(timer){
                clearTimeout(timer);
            }
            if(triggerNow){
                if(firstTick){
                    //console.log(arguments)
                    fn.apply(that,arguments);
                }
                timer = setTimeout(() => {
                    timer = null;
                }, delay)
            }else{
                timer = setTimeout(() => {
                    fn.apply(that,arguments);
                }, delay)
            }
        } 
    },
    throttle:function(fn,delay){
        let pre = 0;
        return function(){
            var now = Date.now();
            if(now>delay+pre){
                fn.apply(this,arguments);
            }
        }
    }
}
export default utils