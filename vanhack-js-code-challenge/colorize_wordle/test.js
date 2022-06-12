const colorize_wordle = require('./colorize_wordle')

const test_cases = [
    ["test", "test", "GGGG"],
    ["jest", "rest", "BGGG"],
    ["rest", "tear", "YGBY"],
    ["tart", "pets", "YBBB"],
    ["test", "seat", "BGYG"]
]

const run = () => {
    let total = test_cases.length;
    let fail = 0;

    test_cases.forEach(tc => {
        let [guessedWord, hiddenWord, expected] = tc;
        let actual = colorize_wordle(guessedWord, hiddenWord);
        if(actual != expected){
            fail++;
            console.log(`expected: ${expected}, but got ${actual} for inputs (${guessedWord}, ${hiddenWord})`);
        }
    })

    console.log(`Test complete:\ntotal: ${total}, passed: ${total - fail}, failed: ${fail}`)
}

run();

