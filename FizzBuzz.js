'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n').filter(line => line.trim() !== '');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'findSum' function below.
 *
 * The function is expected to return a LONG_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY numbers
 *  2. 2D_INTEGER_ARRAY queries
 */
function findSum(numbers, queries) {
    const n = numbers.length;
    const prefixSum = new Array(n + 1).fill(0);
    
    // Compute prefix sums
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + numbers[i - 1];
    }

    const results = [];
    
    for (const [start, end, x] of queries) {
        // Convert 1-based index to 0-based index for our prefix array
        const sum = prefixSum[end] - prefixSum[start - 1];
        let zeroCount = 0;
        
        for (let i = start - 1; i < end; i++) {
            if (numbers[i] === 0) {
                zeroCount++;
            }
        }
        
        results.push(sum + zeroCount * x);
    }
    
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const numbersCount = parseInt(readLine().trim(), 10);
    let numbers = [];

    for (let i = 0; i < numbersCount; i++) {
        const numbersItem = parseInt(readLine().trim(), 10);
        numbers.push(numbersItem);
    }

    const queriesCount = parseInt(readLine().trim(), 10);
    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        queries.push(readLine().trim().split(' ').map(x => parseInt(x, 10)));
    }

    const result = findSum(numbers, queries);

    ws.write(result.join('\n') + '\n');
    ws.end();
}
