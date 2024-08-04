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
    inputString = inputString.split('\n');

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
    const q = queries.length;

    // Initialize prefix sums and zero counts
    const prefixSum = new Array(n + 1).fill(0);
    const zeroCount = new Array(n + 1).fill(0);

    // Compute prefix sums and zero counts
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + numbers[i - 1];
        zeroCount[i] = zeroCount[i - 1] + (numbers[i - 1] === 0 ? 1 : 0);
    }

    // Process each query
    const result = [];
    for (let i = 0; i < q; i++) {
        const [start, end, x] = queries[i];
        // Compute sum in the range [start, end]
        const sum = prefixSum[end] - prefixSum[start - 1];
        // Count zeros in the range [start, end]
        const zeros = zeroCount[end] - zeroCount[start - 1];
        // Compute final result for this query
        result.push(sum + zeros * x);
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const numbersCount = parseInt(readLine().trim(), 10);

    let numbers = [];

    for (let i = 0; i < numbersCount; i++) {
        const numbersItem = parseInt(readLine().trim(), 10);
        numbers.push(numbersItem);
    }

    const queriesRows = parseInt(readLine().trim(), 10);

    const queriesColumns = parseInt(readLine().trim(), 10);

    let queries = Array(queriesRows);

    for (let i = 0; i < queriesRows; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = findSum(numbers, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
