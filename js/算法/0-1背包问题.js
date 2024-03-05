function package(weight, value, packageWight) {
    let result = [];
    let next = [];

    // 搞定第一行
    for (let j = 0; j <= packageWight; j++) {
        result[j] = weight[0] <= j ? value[0] : 0
    }
    console.log(result)

    // 搞定剩余的行
     for (let i = 1; i < value.length; i++) {
         let next = [];
         for (let j = 0; j <= packageWight; j++) {
             // 如果当前物品能放下，就放进去试试
             if (weight[i] <= j) {
                 // 放进去后的最大值： 取放进去的物品的价值 + 剩余空间的能装价值
                 const val = value[i] + result[j - weight[i]];

                 // 能放进去，但是我不放，它的值是多少，
                 const val0 = result[j]

                 // 哪个值大用哪个
                 next[j] = Math.max(val, val0)
             } else {
                 // 放不下，那肯定就是没放进去的最大值了 
                 next[j] = result[j]
             }
         }
         result = next;
     }
    // 最后一项就是需要的值
    return next[next.length -1]
}

// weight: [2,3,1,5,4,6,9]
/// value: [4,6,8,2,8,9,5]
//packageWight: 


   
    
const max = package([2, 3, 1, 5], [4, 6, 8, 2], 9);
console.log(max)