// import engineSchematic from "./engineSchematic";

const engineSchematic = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

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

function createGraph(twoDimensionalArraySchematic) {
  let graph = {};
  twoDimensionalArraySchematic.forEach((row, rowIndex) => 
    row.forEach((char, columnIndex) => {
      const graphNode = {
        value: charIsNumber(char) ? parseInt(char) : char, 
        coords: [rowIndex, columnIndex]
      }
      graph[`${rowIndex},${columnIndex}`] = graphNode
    })
  )
  return graph
}

// this function mutates the graph passed into it
function addAdjacentNodesToGraph(graph, maxHeightIndex, maxWidthIndex) {
  for(const coords in graph) {
    const graphNode = graph[coords]
    graphNode.adjacentCoords = findAdjacentCoordinates(graphNode.coords, maxHeightIndex, maxWidthIndex).map(adjacentCoords => graph[adjacentCoords.toString()])
  }
  return graph
}

function createSchematicGraph(schematicText) {
  const twoDimensionalSchematic = textTo2DArray(schematicText)
  const [height, width] = getHeightAndWidth(twoDimensionalSchematic)
  const schematicGraph = createGraph(twoDimensionalSchematic)
  addAdjacentNodesToGraph(schematicGraph, height - 1, width - 1)
  return schematicGraph
}

function filterGraph(graph, predicate) {
  const foundNodes = []
  for(const coords in graph) {
    if(predicate(graph[coords])) foundNodes.push(graph[coords])
  }
  return foundNodes
}

function numberIsRightOfCoords(graph, coords) {
  const coordsToRight = [coords[0], coords[1] + 1]
  if(!graph[coordsToRight.toString()]) return false;
  return charIsNumber(graph[coordsToRight.toString()].value)
}

function numberIsLeftOfCoords(graph, coords) {
  const coordsToLeft = [coords[0], coords[1] - 1]
  if(!graph[coordsToLeft.toString()]) return false;
  return charIsNumber(graph[coordsToLeft.toString()].value)
}

function findNumbersDirectlyRightOfCoords(graph, coords) {
  const numbers = [];
  const currentCoords = [coords[0], coords[1]]
  while(numberIsRightOfCoords(graph, currentCoords)) {
    currentCoords[1] += 1;
    numbers.push(graph[currentCoords.toString()].value)
  }

  return numbers
}

function findNumbersDirectlyLeftOfCoords(graph, coords) {
  const numbers = [];
  const currentCoords = [coords[0], coords[1]]
  while(numberIsLeftOfCoords(graph, currentCoords)) {
    currentCoords[1] -= 1;
    numbers.push(graph[currentCoords.toString()].value)
  }

  return numbers
}


/*
NOTE: EVERYTHING BELOW UNTESTED
*/
function findConsecutiveNumberInfoFromCoords(graph, coords) {
  if(!charIsNumber(graph[coords.toString()].value)) throw `Expected coords to point to a number, but it points to ${graph[coords.toString()].value}`

  const numbersLeftOfCoords = findNumbersDirectlyLeftOfCoords(graph, coords).reverse()
  const numbersRightOfCoords = findNumbersDirectlyRightOfCoords(graph, coords)
  const fullNumber = numberIsLeftOfCoords.concat(graph[coords.toString()].value, numberIsRightOfCoords)
  const startIndex = coords[1] - numbersLeftOfCoords.length
  const endIndex = coords[1] + numbersRightOfCoords.length
  return {value: fullNumber, startIndex, endIndex, row: coords[0]}
}

function numberInfoIsIdentical(numberInfo1, numberInfo2) {
  return (
    numberInfo1.value === numberInfo2.value && 
    numberInfo1.startIndex === numberInfo2.startIndex &&
    numberInfo1.endIndex === numberInfo2.endIndex &&
    numberInfo1.row === numberInfo2.row
  )
}

function removeIdenticalNumberInfo(numberInfoArray) {
  const indexesToRemove = []
  numberInfoArray.forEach((numberInfo1, numberInfo1Index) => {
    numberInfoArray.forEach((numberInfo2, numberInfo2Index) => {
      if(numberInfo1Index === numberInfo2Index || indexesToRemove.includes(numberInfo2Index)) return;
      if(numberInfoIsIdentical(numberInfo1, numberInfo2)) indexesToRemove.push(numberInfo2)
    })
  })

  const newArray = []
  numberInfoArray.forEach((numberInfo, index) => {
    if(!indexesToRemove.includes(index)) newArray.push(numberInfo)
  })
  return newArray
}

const graph = createSchematicGraph(engineSchematic)
const symbolNodes = filterGraph(graph, (node) => !charIsLetterOrNumber(node.value) && node.value !== '.')

