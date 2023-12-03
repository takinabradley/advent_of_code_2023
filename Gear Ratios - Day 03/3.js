/*                    --- Day 3: Gear Ratios ---

You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

```
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```

In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

*/
import engineSchematic from "./engineSchematic";

const textTo2DArray = text => text.split('\n').map(row => [...row])
const charIsLetterOrNumber = (char) => (/^[a-z|\d]/i).test(char);
const charIsNumber = (string) => !isNaN(Number.parseInt(string))
const getHeightAndWidth = (twoDimensionalArray) => [twoDimensionalArray.length, twoDimensionalArray[0].length]
const coordsAreEqual = (coords1, coords2) => (coords1[0] === coords2[0] && coords1[1] === coords2[1])

// checks if some coordinates are within the bounds of some grid
function isInBounds(coords, maxHeightIndex, maxWidthIndex) {
  if(coords[0] > maxHeightIndex || coords[1] > maxWidthIndex) return false
  if(coords[0] < 0 || coords[1] < 0) return false
  return true
}

// Takes two indexes. Returns an array of all indexes between them (including the original indexes)
function getIndexesBetween(index1, index2) {
  let indexes = []
  for(let i = index1; i <= index2; i++) {
    indexes.push(i)
  }
  return indexes
}

// checks if coordinates in a 2D array are adjacent to a symbol character
function isAdjacentToASymbol(twoDimensionalArray, coords, excludeList = []) {
  let isAdjacent = false;
  const [height, width] = getHeightAndWidth(twoDimensionalArray)
  for(let i = -1; i <= 1; i++) {
    const xCoord = coords[0] + i
    for(let j = -1; j <= 1; j++) {
      const yCoord = coords[1] + j
      if(coordsAreEqual(coords, [xCoord, yCoord]) || !isInBounds([xCoord, yCoord], height - 1, width - 1)) continue

      if(!charIsLetterOrNumber(twoDimensionalArray[xCoord][yCoord]) && !excludeList.includes(twoDimensionalArray[xCoord][yCoord])) {
        return true
      }
    }
  }
  return isAdjacent
}

// Takes a array such as [1, 2, 3, '.', '.', '.', 5]. Returns an array of objects 
// containing information about each number in the array
// Ex: '123...5' -> [{value: 123, startIndex: 0, endIndex: 2}, {value: 5, startIndex: 6, endIndex: 6}]
function findConsecutiveNumbers(array) {
  let numbers = []
  for(let i = 0; i < array.length; i++) {
    // if we aren't at the start of a number, continue
    if(!charIsNumber(array[i])) continue

    // track the start and end indexes of the number we're on
    const startIndex = i;
    let endIndex = startIndex;
    // create a variable to build the number from consecutive digits in a array
    let number = ''

    // look foward in a array to find all consecutive digits
    // keeping track of the number we're building and the endIndex as we go
    let currentChar = array[i]
    while(charIsNumber(currentChar)) {
      number += currentChar

      // keep track of end index, it'll be important.
      endIndex += 1
      currentChar = array[endIndex]
    }
    
    // add info about the number to the `numbers` array
    numbers.push({value: parseInt(number), startIndex: startIndex, endIndex: endIndex - 1})

    // set `i` to be the index directly after the number we found, and continue
    i = endIndex
  }
  return numbers
}

// takes a 2D array, and outputs a 2D array of objects containing number 
// information about each row of the array (see findConsecutiveNumbers)
function findConsecutiveNumberPositions(twoDimensionalArray) {
  const numbers = []
  for(let rowIndex = 0; rowIndex < twoDimensionalArray.length; rowIndex++) {
    const numberData = findConsecutiveNumbers(twoDimensionalArray[rowIndex])
    numberData.map(number => number.row = rowIndex)
    numbers.push(numberData)
  }
  return numbers
}

// Takes a 2D array, and returns an array of numbers that appear next to symbols
function findNumbersAdjacentToSymbols(twoDimensionalArray) {
  const allNumberData = findConsecutiveNumberPositions(twoDimensionalArray)
  const numbersNextToSymbols = [];

  allNumberData.forEach((row, rowIndex) => {
    row.forEach((numberDataObj) => {
      let columnIndexesToCheck = getIndexesBetween(numberDataObj.startIndex, numberDataObj.endIndex)
      for(const columnIndex of columnIndexesToCheck) {
        if(isAdjacentToASymbol(twoDimensionalArray, [rowIndex, columnIndex], ['.'])) {
          numbersNextToSymbols.push(numberDataObj.value)
          break;
        }
      }
    })
  })

  return numbersNextToSymbols
}

engineSchematic = textTo2DArray(engineSchematic);

// first solution:
console.log(findNumbersAdjacentToSymbols(engineSchematic).reduce((sum, num) => sum += num))



/*                          --- Part Two ---

The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic? */



function findSymbols(schematicArray, excludeList = []) {
  const symbols = {};

  schematicArray.forEach((row, rowIndex) => {
    row.forEach((char, columnIndex) => {
      if(charIsLetterOrNumber(char) || excludeList.includes(char)) return

      if(!symbols[char]) {
        symbols[char] = [{value: char, rowIndex, columnIndex}]
      } else {
        symbols[char].push({value: char, rowIndex, columnIndex})
      }
    })
  })
  return symbols 
}

const findStarSymbols = (schematicArray) => findSymbols(schematicArray)['*']

/* {
  "value": 467,
  "startIndex": 0,
  "endIndex": 2,
  "row": 0
} */
function numberDataIncludesCoordinates(coords, numberObj) {
  if(coords[0] !== numberObj.row) return false;

  const possibleYValues = getIndexesBetween(numberObj.startIndex, numberObj.endIndex)
  return possibleYValues.includes(coords[1]) 
}

function findAdjacentCoordinates(coords, maxHeightIndex, maxWidthIndex) {
  if(coords[0] > maxHeightIndex || coords[1] > maxWidthIndex || coords[0] < 0 || coords[1] < 0) return [];
  const adjacent = []
  for(let i = -1; i <= 1; i++) {
    const xCoord = coords[0] + i
    for(let j = -1; j <= 1; j++) {
      const yCoord = coords[1] + j
      if(coordsAreEqual(coords, [xCoord, yCoord]) || !isInBounds([xCoord, yCoord], maxHeightIndex, maxWidthIndex)) continue
      adjacent.push([xCoord, yCoord])
    }
  }
  return adjacent
}
function findNumberPairsAdjacentToStarSymbols(twoDimensionalArray) {
  const [height, width] = getHeightAndWidth(twoDimensionalArray)
  const starSymbolData = findStarSymbols(twoDimensionalArray)
  const numberData = findConsecutiveNumberPositions(twoDimensionalArray).flat()

  // map all star symbols to be a list of their adjacent coords
  const coordsAdjacentToStarSymbols = starSymbolData.map(starData => findAdjacentCoordinates([starData.rowIndex, starData.columnIndex], height - 1, width - 1))

  // map those coords into either empty arrays (if more or less than two number are found), or arrays containting number pairs
  const twoNumbersAdjacentToStarSymbolsWithEmptyArrays = coordsAdjacentToStarSymbols.map(coordsList => {
    const numbersHit = [];
    coordsList.forEach(coord => {
      numberData.forEach(number => {
        if(numberDataIncludesCoordinates(coord, number) && !numbersHit.includes(number)) numbersHit.push(number)
      })
    })

    if(numbersHit.length > 2 || numbersHit.length < 2) {
      return []
    } else {
      return numbersHit.map(numberData => numberData.value)
    }
  })

  // filter empty arrays out and return
  return twoNumbersAdjacentToStarSymbolsWithEmptyArrays.filter(arr => arr.length === 2)
}

// part two solution
findNumberPairsAdjacentToStarSymbols(engineSchematic).reduce((sum, pair) => sum += pair[0] * pair[1], 0)
// I need a function that takes a number object and coordinates, and returns the value of any number object that those coordinates fall in. Then I can use the coordinates from 'checkAdjacentCoordsForNumbers` to grab numbers.

/* function checkAdjacentCoordsForSymbols(twoDimensionalArray, coords, excludeList = []) {
  const numberCoordinates = []
  const [height, width] = getHeightAndWidth(twoDimensionalArray)
  for(let i = -1; i <= 1; i++) {
    const xCoord = coords[0] + i
    for(let j = -1; j <= 1; j++) {
      const yCoord = coords[1] + j
      if(coordsAreEqual(coords, [xCoord, yCoord]) || !isInBounds([xCoord, yCoord], height - 1, width - 1)) continue

      if(!charIsLetterOrNumber(twoDimensionalArray[xCoord][yCoord]) && !excludeList.includes(twoDimensionalArray[xCoord][yCoord])) {
        numberCoordinates.push([xCoord, yCoord])
        console.log(twoDimensionalArray[xCoord][yCoord])
      }
    }
  }
  return numberCoordinates
} */

/* function checkAdjacentCoordsForNumbers(twoDimensionalArray, coords) {
  const numberCoordinates = []
  const [height, width] = getHeightAndWidth(twoDimensionalArray)
  for(let i = -1; i <= 1; i++) {
    const xCoord = coords[0] + i
    for(let j = -1; j <= 1; j++) {
      const yCoord = coords[1] + j
      if(coordsAreEqual(coords, [xCoord, yCoord]) || !isInBounds([xCoord, yCoord], height - 1, width - 1)) continue

      if(!isNaN(Number.parseInt(twoDimensionalArray[xCoord][yCoord]))) {
        numberCoordinates.push([xCoord, yCoord])
      }
    }
  }
  return numberCoordinates
} */