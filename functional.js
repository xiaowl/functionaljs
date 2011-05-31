var functional = (function(){
    function isArray(a){
        return a instanceof Array || (a.length && typeof a.length === "number" &&( a.length > 0 && a[0] || a.length === 0));
    }

    function map(list, func, arg){
        var ret = [];
        if(!isArray(list)){
            throw "Map function can only be applied to array or string";
        }
        for(var i=0, ii=list.length; i < ii; i++){
            v = func(list[i], i, arg);
            ret[i] = v;
        }
        return ret;
    }



    var functional = {};
    map("map".split("|"), function(name){
        functional[name] = eval(name);
    });

    return functional;
})();
            
