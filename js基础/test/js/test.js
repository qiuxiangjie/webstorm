
//下面的递归代码在数组列表很大的时候会造成堆栈溢出，如何修复同时保持递归模式？

var list = readHugeList();

var nextLIstItem = function () {
    var item = list.pop();

    if(item){
        //precess the list item...
        nextLIstItem();
    }
};




newlistitem = function () {
    var item = list.pop();

    if (list.length % 1000 == 0) {
        console.log(item)
    }
    return function () {
        if (item) {
            newlistitem()()
        }
    }
};


newlistitem()();