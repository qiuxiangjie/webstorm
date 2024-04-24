function permuteUnique(num) {
    // write code here
    num.sort((a, b) => a - b);
    let res = [];
    let path = []; // 路劲数组

    const back = (used) => {
        //首先检查当前路径是否是一个完整排列（即路径长度等于数组长度），如果是，则将其加入结果数组。
        if (path.length == num.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < num.length; i++) {
            console.log(used)
            console.log(path)
            if (i > 0 && num[i - 1] == num[i] && !used[i - 1]) continue;//
            if (!used[i]) {
                //遍历数组元素，对于每个未使用的元素，将其加入路径，并标记为已使用。
                used[i] = true;
                path.push(num[i]);
                back(used); // 递归调用back函数，继续生成下一个元素

                // 回溯，将当前元素从路径中移除，并将标记为未使用。
                path.pop(); 
                used[i] = false;
            }
        }
    };

    back([]);
    return res;
}
