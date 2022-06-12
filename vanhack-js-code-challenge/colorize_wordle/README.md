# Colorize-Wordle

```
function colorizeWordle(guessedWord, hiddenWord);
```

## cases
1. If `guessedWord` equal to `hiddenWord`, return `G` for each letter
    
    example:
    
    `function colorizeWordle("test", "test")` returns `GGGG`

2. In case of mismatched letter, return `B`

    example: 

    `function colorizeWordle("jest", "rest")` returns `BGGG`

3. In case letter is found in `hiddenWord` but not in correct position, return `Y` to indicate `hint`

    example: 

    `function colorizeWordle("rest", "tear")` returns `YGBY`

4. For duplicate `hint` letters, consider the first letter only. Remaining letters will have `B`

    example:

    `function colorizeWordle("tart", "pets")` returns `YBBB`

    `function colorizeWordle("test", "seat")` returns `BGYG`



    


