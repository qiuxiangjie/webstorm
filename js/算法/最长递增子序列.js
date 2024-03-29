function getSequence(arr) {
    if(!arr.length) return []
    let result = [[arr[0]]];
    function updateRes(data) {
        for (let j = result.length-1; j >= 0; j--) {
            let arrItem = result[j];
            let last = arrItem[arrItem.length - 1]

            if ( last < data) {
                result[j + 1] = [...arrItem, data]
                break
            } else if (j === 0 && data < last) {
                result[0] = [data]
            }
            
        }  
    }
    for (let i = 1; i < arr.length; i++) {
        updateRes(arr[i]);
    }
    return result[result.length - 1]
}

console.log(getSequence([1,2,3,4,3,2,4,1,7,8,9,5,6,7,8]))