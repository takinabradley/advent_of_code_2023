/*  INSTRUCTIONS

Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

```txt
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
```

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
*/
import calibrationDocument from "./CalibrationDocument";

// Finds numbers in a string in both word and number form (for numbers between 0 and 9)
// Is able to find 'overlapping' numbers in a string.
// Ex: twone3four -> [2,1,3,4]
function extractNumbers(string) {
  // array where all the numbers in the string will be collected
  let extractedNumbers = [];

  let numberWords = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }


  // loop through every character in a string
  for(let charIndex = 0; charIndex < string.length; charIndex++) {
    const char = string[charIndex]
    
    if(char >= '0' && char <= '9') {
      // if the character is a number, push it to the array
      extractedNumbers.push(parseInt(char))
    } else {
      // if the character is a letter, check if it's the start of a number word

      // First, use the current character to filter out number words the character couldn't possibly be the start of
      const possibleNumberWords = Object.keys(numberWords).filter(numberWord => numberWord.startsWith(char))

      // Then, loop through all the possibilities, looking ahead in the string to see if one of the possible number words get spelled out
      for(const numberWord of possibleNumberWords) {
        const numberWordLength = numberWord.length
        const possibleNumber = string.substring(charIndex, charIndex + numberWordLength)
        if(numberWord === possibleNumber) {
          // if a number word does get spelled out, add it to the array and break the loop.
          extractedNumbers.push(numberWords[possibleNumber])
          break;
        }
      }
      

    }
  }

  return extractedNumbers
}

function sumOfAllCalibrationValues2(calibrationDocument) {
  let calibrationSum = 0

  // find the calibration values on each line and add it to the sum
  calibrationDocument.split('\n').forEach(calibrationLine => {
    let numbers = extractNumbers(calibrationLine)
    
    // take the first and last number characters - that's our calibration value
    const calibration = parseInt(`${numbers[0]}` + `${numbers[numbers.length - 1]}`)
    calibrationSum += calibration
  })
  return calibrationSum
}

console.log(sumOfAllCalibrationValues2(calibrationDocument))