function longestPalindromeSubseq(str) {
    const strLen = str.length;
    
    // 初始化一个二维数组
    let dp = Array.from(Array(strLen), () => Array(strLen).fill(0));

    // 初始化数据
    for (let i = 0; i < strLen; i++) {
        dp[i][i] = 1;
    }
    
    console.log(dp);
    for (let i = strLen-1; i >= 0; i--){
        for (let j = i + 1; j < strLen; j++) {
            if (str[i] === str[j]) {
                dp[i][j] = dp[i+1][j-1] + 2
            } else {
                dp[i][j] = Math.max(
                    dp[i][j - 1],
                    dp[i+1][j]
                )
            }
        }
    }
    console.log(dp)
    return dp[0][strLen-1]
}

const n = longestPalindromeSubseq('bbbab');
console.log(n)