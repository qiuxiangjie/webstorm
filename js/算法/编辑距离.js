function minDistance(word1, word2) {
    // 初始化一个二维数组
    let dp = Array.from(Array(word1.length+1), () => Array(word2.length+1).fill(0));

    // 初始化首行、首列
    for (let i = 0; i < word1.length; i++){
        dp[i][0] = i
    }

    for (let j = 0; j < word2.length; j++){
        dp[0][j] = j
    }

    // dp[i][j] // 保存的是word1 0-i的字符， word2 0-j 的字符的最小编辑次数

    for (let i = 1; i <=word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // 相等则不需要改变
                dp[i][j] = dp[i-1][j-1]
            } else {
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1,
                    dp[i - 1][j] + 1,
                    dp[i-1][j-1] + 1 
                )
             }
        }
    }
     return dp[word1.length][word2.length];
}

let n = minDistance('1word1', 'word')
console.log(n)