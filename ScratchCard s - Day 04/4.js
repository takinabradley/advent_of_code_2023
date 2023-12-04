import scratchCards from "./scratchCards"

const charIsNumber = (string) => !isNaN(Number.parseInt(string))



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

function ScratchCard(id, winningNumbers, scratchOffNumbers) {
  const numbersWon = []
  winningNumbers.forEach(winningNumber => {
    scratchOffNumbers.forEach(number => {
      if(number === winningNumber) numbersWon.push(number)
    })
  })

  const ticketsWon = numbersWon.map((_, index) => id + index + 1)

  let points = 0;
  for(let i = 0; i < numbersWon.length; i++) {
    if(points === 0) {
      points = 1;
      continue
    } else {
      points *= 2
    }
  }

  return {
    id,
    winningNumbers,
    scratchOffNumbers,
    numbersWon,
    ticketsWon,
    points,
    quantity: 1
  }
}

function parseScratchCardData(scratchCardData) {
  return scratchCardData.split('\n').map(cardData => {
    let [idString, winningNumbersString, scratchOffNumbersString] = cardData.split(/[:|\\|]/)
    const id = parseInt(idString.match(/[\d]+/g))
    const winningNumbers = findConsecutiveNumbers(winningNumbersString).map(numData => numData.value);
    const scratchOffNumbers = findConsecutiveNumbers(scratchOffNumbersString).map(numData => numData.value)
    return ScratchCard(id, winningNumbers, scratchOffNumbers)
  })
}

// First solution
parseScratchCardData(scratchCards).reduce((points, card) => points += card.points, 0)

// Second solution
const cards = parseScratchCardData(scratchCards)
cards.forEach((card, index, array) => {
  for(let i = 0; i < card.quantity; i++) {
    card.ticketsWon.forEach(ticketId => {
      array[ticketId - 1].quantity++
    })
  }
})

cards.reduce((sum, card) => sum += card.quantity, 0)
