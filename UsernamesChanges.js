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
 * Complete the 'possibleChanges' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY usernames as parameter.
 */

function possibleChanges(usernames) {
    const results = [];

    usernames.forEach(username => {
        const chars = username.split('');
        const n = chars.length;
        let foundSmaller = false;

        // Step 1: Find the first position where chars[i] > chars[i+1]
        let i = n - 2;
        while (i >= 0 && chars[i] <= chars[i + 1]) {
            i--;
        }

        if (i >= 0) {
            // Step 2: Find the smallest character to the right of i which is smaller than chars[i]
            let j = n - 1;
            while (chars[j] >= chars[i]) {
                j--;
            }

            // Step 3: Swap and check if the result is smaller
            [chars[i], chars[j]] = [chars[j], chars[i]];
            const newUsername = chars.join('');
            if (newUsername < username) {
                foundSmaller = true;
            }
        }

        results.push(foundSmaller ? 'YES' : 'NO');
    });

    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const usernamesCount = parseInt(readLine().trim(), 10);

    let usernames = [];

    for (let i = 0; i < usernamesCount; i++) {
        const usernamesItem = readLine();
        usernames.push(usernamesItem);
    }

    const result = possibleChanges(usernames);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
