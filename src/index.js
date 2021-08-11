const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(input) {
    let whiteSpaces = []
    let step1arr = []
    let step2arr = []
    let step3arr = []
    let result

    //step 1 - divide into chunks of 10
    input = input.split('')
    for (let i = 0; i < input.length; i += 10) {
        temp = input.slice(i, i + 10)
        step1arr.push(temp.join(''))
    }

    //finding indexes of white-spaces
    for (let i = 0; i < step1arr.length; i++) {
        if (step1arr[i] == '**********') whiteSpaces.push(i)
    }

    //step 2 - divide each element (chunk of 10) into chunks of 2
    step1arr = step1arr.map(x => [...x.split('')])
    for (let i = 0; i < step1arr.length; i++) {
        step2arr[i] = []
        for (let j = 0; j < step1arr[i].length; j+=2) {
            temp = step1arr[i].slice(j, j + 2)
            step2arr[i].push(temp.join(''))
        }
    }

    //step 3 - decoding numbers for chars
    for (let i = 0; i < step2arr.length; i++) {
        step3arr[i] = []
        for (let j = 0; j < step2arr[i].length; j++) {
            if (+step2arr[i][j] == 10) {
                step3arr[i].push('.')
            } else if (+step2arr[i][j] == 11) {
                step3arr[i].push('-')
            }
        }
        step3arr[i] = step3arr[i].join('')
        // step3arr[i] = step3arr[i].join('').trim()
    }

    //step 4 - decoding with MORSE_TABLE
    result = step3arr.map(x => MORSE_TABLE[x]).join(' ')

    //step 5 - inserting white-spaces
    result = result.replace(/\s+/g, function(m) {
        return m.length === 1 ? '' : m
    })
    result = result.replace(/\s\s+/g, ' ')
    
    return result
}


module.exports = {
    decode
}