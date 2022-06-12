const colorizeWordle = (guessedWord, hiddenWord) => {
    if(guessedWord == hiddenWord) return "G".repeat(hiddenWord.length)

    let gwMap = mapLetters(guessedWord);
    let hwMap = mapLetters(hiddenWord);
    return _colorize(hiddenWord.length, gwMap, hwMap);
}


const mapLetters  = (word) => {
    let map = {};
    for(let i = 0; i < word.length; i++){
        let pos = (map[word[i]] || [])
        pos.push(i)
        map[word[i]] = pos;
    }
    return map;
}

const _colorize = (length, gwMap, hwMap) => {
    let result = Array.from("B".repeat(length));

    let letters = Object.keys(gwMap);
    for(let i = 0; i < letters.length; i++){
        let letter = letters[i];
        let gwPos = gwMap[letter]; 

        if(hwMap.hasOwnProperty(letter)){ //letter found in hiddenword
            let hwPos = hwMap[letter]; 
            let matchedPos = gwPos.filter((p) => hwPos.includes(p));
            let hintPos = gwPos.filter((p) => !matchedPos.includes(p));
            let count = hwPos.length;

            for(let j = 0; j < matchedPos.length; j++){
                result[matchedPos[j]] = 'G';
                count--;
            }
            for(let j = 0; j < hintPos.length && count > 0; j++){
                result[hintPos[j]] = 'Y';
                count--;
            }
        }
    }

    return result.join('');
}


module.exports = colorizeWordle;