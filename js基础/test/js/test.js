
//����ĵݹ�����������б�ܴ��ʱ�����ɶ�ջ���������޸�ͬʱ���ֵݹ�ģʽ��

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