var functional = (function(){
    /*===============Private helper functions====================*/
    function isArray(a){
        return a instanceof Array || (typeof a.length !== "undefined" && typeof a.length === "number" &&( a.length > 0 && a[0] || a.length === 0));
    }

    /*===============End of private helper functions==============*/

    /*===============Common public high order functions===========*/

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

    function filter(list, func, arg){
        var ret = [];
        if(!isArray(list)){
            throw "Filter function can only be applied to array or string";
        }
        for(var i=0, ii=list.length; i < ii; i++){
            if(func(list[i], i, arg)){
               ret.push(list[i]);
            }
        }
        return ret;
    }

    /*================End of common high order functions=============*/

    /*================data.List======================================*/

    var data = (function(){
        function List(list){
            return new List.fn.init(list);
        }

        List.fn = List.prototype = {
            init: function(list){
                this.list = list;
                this.length = list.length;
            },

            value: function(){
                return this.list;
            },

            map: function(func, arg){
                return new List(map(this.list, func, arg));
            },

            filter: function(func, arg){
                return new List(filter(this.list, func, arg));
            }
        }

        List.fn.init.prototype = List.prototype;

        var data = {};
        install(data, function(scope){
            map("List".split("|"), function(name){
                scope[name] = eval(name);
            });
        });

        return  data;
    })();

    /*================End of data.List===============================*/

    /*================Helper functions to setup======================*/

    function install(scope, installer){
        installer(scope);
    }

    /*================End of setup helper============================*/


    var functional = {};
    install(functional, function(scope){
        map("map|filter|data".split("|"), function(name){
            scope[name] = eval(name);
        });
    });

    return functional;
})();
            
