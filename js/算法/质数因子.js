function get(num) {
    let num_sqrt = Math.sqrt(num);
    const array = [];
    console.log(num_sqrt)

    for (let i = 2; i <= num_sqrt; i++) {
        while (num % i === 0) {
            array.push(i);
            num /= i;
        }
    }
    if (num != 1) {
        array.push(num);
    }

    return array
}

let val = get(180);
console.log(val)