/*                  --- Day 2: Cube Conundrum ---

You're launched high into the atmosphere! The apex of your trajectory just 
barely reaches the surface of a large island floating in the sky. You gently 
land in a fluffy pile of leaves. It's quite cold, but you don't see much snow. 
An Elf runs over to greet you.

The Elf explains that you've arrived at Snow Island and apologizes for the lack 
of snow. He'll be happy to explain the situation, but it's a bit of a walk, so 
you have some time. They don't get many visitors up here; would you like to play 
a game in the meantime?

As you walk, the Elf shows you a small bag and some cubes which are either red, 
green, or blue. Each time you play this game, he will hide a secret number of 
cubes of each color in the bag, and your goal is to figure out information about 
the number of cubes.

To get information, once a bag has been loaded with cubes, the Elf will reach 
into the bag, grab a handful of random cubes, show them to you, and then put 
them back in the bag. He'll do this a few times per game.

You play several games and record the information from each game (your puzzle 
input). Each game is listed with its ID number (like the 11 in Game 11: ...) 
followed by a semicolon-separated list of subsets of cubes that were revealed 
from the bag (like 3 red, 5 green, 4 blue).

For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag 
(and then put back again). The first set is 3 blue cubes and 4 red cubes; 
the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is 
only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag 
contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had 
been loaded with that configuration. However, game 3 would have been impossible 
because at one point the Elf showed you 20 red cubes at once; similarly, game 4 
would also have been impossible because the Elf showed you 15 blue cubes at 
once. If you add up the IDs of the games that would have been possible, you get 
8.

Determine which games would have been possible if the bag had been loaded with 
only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs 
of those games?
*/

const gameLog = `Game 1: 4 red, 3 blue; 6 blue, 16 green; 9 blue, 13 green, 1 red; 10 green, 4 red, 6 blue
Game 2: 2 green, 3 blue; 11 red; 2 green, 5 red, 1 blue
Game 3: 19 green, 4 blue, 13 red; 1 green, 1 blue, 1 red; 17 red, 18 green
Game 4: 4 green, 8 blue, 20 red; 19 red, 3 green, 14 blue; 15 red, 4 green, 1 blue; 18 blue, 14 red; 19 red, 10 blue; 3 green, 11 blue, 15 red
Game 5: 1 red, 3 blue, 15 green; 13 green, 2 blue; 6 green; 6 green, 8 blue; 4 green, 9 blue, 1 red
Game 6: 2 green, 10 red; 4 blue, 1 red, 2 green; 2 red, 2 blue, 1 green; 5 red, 3 green, 1 blue
Game 7: 4 green, 2 blue, 10 red; 1 green, 12 red; 5 green, 12 red, 2 blue; 10 red, 1 blue, 5 green; 1 green, 1 blue, 11 red
Game 8: 8 blue, 3 red, 1 green; 9 blue, 14 green, 6 red; 3 red, 15 blue, 16 green; 9 red, 4 green, 6 blue
Game 9: 9 blue, 9 red, 5 green; 6 red, 1 green, 12 blue; 7 blue, 3 green; 4 red, 12 blue, 1 green; 5 red, 4 green, 1 blue
Game 10: 1 blue, 2 red, 19 green; 7 green, 5 blue, 7 red; 2 blue, 1 red, 3 green; 2 blue, 9 red, 10 green
Game 11: 2 red, 17 blue, 12 green; 5 green, 3 blue; 14 green, 2 red, 15 blue
Game 12: 4 blue, 13 green, 1 red; 5 blue, 3 green, 4 red; 8 blue, 15 green; 12 blue, 5 red, 6 green; 2 green, 5 blue, 4 red; 11 blue, 18 green, 4 red
Game 13: 8 blue, 11 red, 2 green; 18 red, 7 blue, 7 green; 6 green, 9 red; 7 green, 3 blue, 12 red; 1 green, 4 red, 4 blue
Game 14: 3 green, 11 blue, 1 red; 3 green, 1 red, 13 blue; 5 green, 6 blue, 1 red; 1 red, 5 blue, 5 green; 10 blue, 2 green
Game 15: 3 red, 8 green, 1 blue; 8 green, 10 red, 3 blue; 1 blue, 4 green, 2 red; 10 red, 10 green; 3 blue, 4 green, 3 red; 12 green, 7 red
Game 16: 13 red, 9 blue; 2 green, 7 red, 7 blue; 9 blue, 7 red, 7 green; 13 blue, 10 red
Game 17: 12 red, 19 green, 4 blue; 2 blue, 5 red, 11 green; 4 red, 7 green, 8 blue; 6 red, 10 green; 3 green, 7 red, 10 blue
Game 18: 2 blue, 6 red; 5 red, 3 green; 12 red, 1 blue, 3 green; 1 green, 19 red, 5 blue; 3 green, 2 blue, 16 red
Game 19: 10 red, 5 green; 10 red; 9 red, 7 blue; 1 blue, 8 red
Game 20: 11 green, 5 red, 7 blue; 7 green, 12 red, 11 blue; 13 green, 3 blue, 5 red; 3 red, 3 blue, 1 green
Game 21: 10 blue, 10 green, 2 red; 16 blue, 9 green, 1 red; 3 green, 1 blue, 2 red; 17 green, 5 blue, 2 red; 6 blue, 15 green, 2 red
Game 22: 2 red, 1 blue, 5 green; 4 blue, 3 red, 6 green; 3 red, 4 blue; 4 blue, 1 green, 1 red; 3 blue, 3 red, 5 green
Game 23: 3 red, 7 green; 17 green, 7 red, 5 blue; 4 blue, 4 red; 19 green, 3 red, 9 blue; 3 green, 3 blue, 6 red; 9 red, 7 green, 6 blue
Game 24: 2 red, 14 green, 8 blue; 6 red, 12 blue, 15 green; 1 green, 10 red; 3 red, 7 blue, 15 green; 11 red, 13 blue; 1 green, 9 blue, 10 red
Game 25: 12 blue, 7 red, 7 green; 2 red, 10 green, 9 blue; 11 blue, 6 green, 6 red; 6 blue, 6 green; 4 red, 8 blue, 2 green; 6 green, 4 blue, 3 red
Game 26: 2 blue, 5 red; 9 red, 1 green; 16 red, 2 blue; 4 blue, 1 green, 5 red
Game 27: 12 green, 12 red; 15 green, 11 red; 7 red, 19 green; 1 blue, 2 green, 3 red
Game 28: 4 blue, 4 green, 7 red; 6 green, 9 red, 10 blue; 5 red, 4 blue, 9 green; 9 red, 6 blue, 2 green
Game 29: 1 blue, 3 green, 9 red; 5 green; 3 green, 2 red
Game 30: 1 blue, 5 green, 3 red; 2 green, 1 blue, 3 red; 12 green, 4 red; 5 green, 2 red; 8 green, 4 red, 1 blue; 6 green
Game 31: 9 blue, 5 green; 3 red, 11 blue, 2 green; 1 green, 4 blue, 2 red; 1 green, 3 blue, 1 red; 11 blue, 5 green
Game 32: 3 red, 1 blue, 16 green; 11 green, 4 blue; 2 blue, 4 green, 2 red
Game 33: 4 blue, 15 green; 6 green, 11 blue; 5 blue, 1 red, 13 green; 14 green, 1 red, 5 blue; 1 red, 4 blue, 14 green
Game 34: 2 green, 10 red, 2 blue; 8 red, 10 green; 3 green, 1 blue, 1 red
Game 35: 3 blue, 7 green, 10 red; 4 red, 9 blue; 8 blue, 7 green, 4 red; 2 green, 7 red, 3 blue
Game 36: 2 green, 4 red, 4 blue; 1 blue, 6 red; 7 green, 10 red; 10 red, 3 blue
Game 37: 1 green, 1 red; 1 blue, 1 red, 9 green; 6 blue, 11 green, 10 red; 17 blue, 3 green; 2 green, 8 red, 6 blue
Game 38: 6 blue, 7 green, 2 red; 12 green, 15 blue, 3 red; 7 blue, 3 red, 7 green; 6 blue, 10 green
Game 39: 8 green, 4 red, 14 blue; 19 blue, 11 red, 5 green; 15 green, 12 blue, 13 red; 18 green, 5 red, 11 blue; 10 green, 8 blue, 10 red; 8 green, 2 red
Game 40: 2 green, 5 red, 4 blue; 1 red, 2 green; 10 blue, 1 green; 8 blue, 8 red, 2 green; 2 red, 6 blue
Game 41: 18 red, 2 blue; 17 red, 4 green, 3 blue; 5 blue, 7 red; 3 blue, 3 green, 8 red; 8 red, 2 blue
Game 42: 2 blue, 6 green, 7 red; 2 red, 4 blue; 4 green, 4 blue, 10 red; 6 green, 5 red, 8 blue; 3 red, 3 blue
Game 43: 1 green, 17 red, 1 blue; 16 red, 8 green; 7 blue, 15 red, 10 green; 1 green, 1 blue, 6 red; 13 green, 13 red; 11 green, 8 blue, 1 red
Game 44: 9 blue, 9 green, 19 red; 7 red, 1 blue; 6 blue, 8 green, 9 red; 8 green, 2 blue, 13 red; 1 blue, 5 green, 19 red
Game 45: 5 red, 3 green, 10 blue; 4 green, 17 red, 3 blue; 13 blue, 2 red, 10 green; 11 blue, 15 red, 13 green
Game 46: 14 green, 1 blue, 6 red; 12 green, 18 red; 10 red, 1 blue, 3 green; 5 red, 8 green
Game 47: 8 red, 5 blue, 2 green; 4 red, 4 blue; 3 blue, 9 red, 2 green; 2 red, 2 green, 4 blue; 14 red, 1 green, 2 blue
Game 48: 11 red, 2 blue, 1 green; 2 green, 11 blue, 7 red; 2 red, 1 green, 12 blue; 1 green, 7 red, 2 blue
Game 49: 7 blue, 8 red, 2 green; 10 red, 5 blue, 2 green; 10 red, 2 blue, 3 green
Game 50: 18 red, 3 green; 8 red, 10 blue, 3 green; 11 red, 1 green; 8 red, 9 blue, 1 green; 7 blue, 3 red, 3 green
Game 51: 6 green, 2 blue, 3 red; 1 green, 4 red; 1 red, 1 blue; 1 red, 5 green; 6 green, 2 red
Game 52: 8 green, 6 blue; 2 blue, 1 red, 17 green; 8 red, 8 green; 2 green, 4 red, 2 blue
Game 53: 6 red, 4 blue; 15 red, 4 green; 16 red, 3 green, 7 blue; 1 green, 18 red, 2 blue; 14 red, 8 blue, 1 green
Game 54: 9 red, 11 green, 4 blue; 9 blue, 9 green, 14 red; 3 blue, 1 red, 9 green; 7 green, 16 red, 10 blue; 11 green, 3 blue, 11 red; 3 blue
Game 55: 9 red; 1 blue, 10 red, 1 green; 15 red, 5 green; 2 blue, 1 green, 14 red; 1 blue, 2 green, 8 red; 6 red, 3 green, 2 blue
Game 56: 16 blue, 13 green, 1 red; 7 green, 4 blue; 1 red, 11 blue, 16 green; 10 green, 2 red, 9 blue; 20 green, 1 blue, 1 red; 14 green, 2 blue
Game 57: 13 red, 7 blue, 4 green; 19 red, 3 blue, 8 green; 9 red, 2 blue, 13 green
Game 58: 5 green, 10 blue; 11 green, 9 blue; 6 green, 11 blue; 8 green, 2 blue; 1 red, 5 blue, 2 green; 6 green, 5 blue
Game 59: 7 blue, 4 red; 1 green, 15 red, 7 blue; 6 blue, 15 red; 2 green, 13 red, 7 blue; 6 blue, 15 red
Game 60: 6 green, 2 blue, 1 red; 6 green, 8 blue; 11 green, 2 red, 15 blue; 1 red, 4 blue, 9 green
Game 61: 2 green, 4 blue; 8 red, 4 blue, 3 green; 4 green, 8 blue, 5 red
Game 62: 1 blue, 11 green; 7 green, 3 blue; 7 green, 1 blue, 1 red
Game 63: 14 red, 7 green, 1 blue; 2 red, 15 green; 3 green, 6 red; 20 red, 1 blue, 9 green; 11 red, 1 blue, 15 green
Game 64: 9 red, 2 green; 9 green, 8 red, 2 blue; 2 red, 2 blue; 1 green; 7 red, 1 blue, 9 green; 12 green, 4 red
Game 65: 4 blue, 1 red, 3 green; 7 green, 8 blue; 11 red, 3 green, 1 blue
Game 66: 5 red, 2 blue; 2 green, 1 red; 2 green, 13 red, 4 blue; 15 red, 2 blue
Game 67: 2 green, 1 blue, 15 red; 8 blue, 10 red, 1 green; 2 green, 6 blue, 18 red
Game 68: 6 red, 2 green, 3 blue; 1 blue, 13 red, 5 green; 5 green, 2 blue, 7 red; 2 blue, 8 green, 2 red; 2 red, 1 blue; 8 green, 8 red
Game 69: 2 blue, 3 red; 3 green, 1 red, 2 blue; 2 red, 1 green, 5 blue; 3 red, 3 green, 4 blue; 1 blue, 4 green, 7 red; 2 green, 4 blue
Game 70: 2 red, 17 green; 8 red, 14 green; 1 blue, 18 green; 5 red, 4 green, 1 blue
Game 71: 6 red; 3 green, 9 blue, 18 red; 19 blue, 14 red; 11 blue, 18 red, 5 green
Game 72: 13 blue, 10 red, 4 green; 5 green, 13 blue, 13 red; 7 green, 7 red, 5 blue; 9 blue, 6 red; 4 blue, 6 green; 7 red, 2 blue, 4 green
Game 73: 3 red, 6 blue; 8 red, 2 blue; 6 blue, 1 green, 4 red; 1 green, 5 red
Game 74: 3 red, 3 green, 10 blue; 1 green, 1 red; 7 red, 3 green, 7 blue; 3 blue, 4 red
Game 75: 1 green, 10 red, 8 blue; 13 red, 7 green, 9 blue; 18 red, 9 blue; 2 green, 1 blue, 5 red
Game 76: 4 green, 4 red; 8 green, 3 red, 3 blue; 1 red, 2 green; 6 blue, 3 red, 3 green; 1 red, 1 green, 1 blue
Game 77: 7 red, 8 blue, 7 green; 13 green, 7 blue, 8 red; 2 red, 10 green, 5 blue; 2 red, 5 blue, 3 green
Game 78: 2 red, 7 blue; 5 blue, 6 green, 3 red; 16 green, 3 blue, 10 red; 13 green, 2 blue, 2 red
Game 79: 1 blue, 8 red; 4 blue, 12 red, 5 green; 14 red, 10 blue; 2 green, 7 red, 2 blue; 14 red, 2 green
Game 80: 7 blue, 5 green, 7 red; 2 green, 2 blue, 7 red; 4 red, 1 blue, 18 green; 2 green, 11 red, 3 blue; 4 blue, 9 red, 15 green
Game 81: 3 green, 4 red, 14 blue; 11 blue, 4 green, 14 red; 6 blue, 8 red, 5 green
Game 82: 2 green, 7 blue, 2 red; 15 blue, 2 green, 1 red; 3 blue, 2 green; 1 red; 2 red, 15 blue, 2 green
Game 83: 5 blue, 1 green, 5 red; 12 red, 10 blue; 1 blue, 11 red
Game 84: 4 red, 8 green, 14 blue; 1 green, 8 blue, 2 red; 1 red, 6 blue, 9 green; 8 green, 15 blue, 4 red; 4 blue, 4 red, 6 green
Game 85: 8 green, 16 red, 5 blue; 10 red, 10 green; 18 green, 10 blue, 1 red; 3 red, 9 blue, 13 green
Game 86: 2 blue, 10 green, 6 red; 8 blue, 6 green; 8 blue, 3 red; 8 green, 4 red, 3 blue
Game 87: 8 blue, 4 red; 16 red, 20 blue, 4 green; 18 red, 1 green, 1 blue; 6 red, 1 green, 16 blue; 18 blue, 6 red
Game 88: 13 green, 8 blue, 5 red; 13 red, 5 green, 9 blue; 10 red, 18 blue, 7 green; 14 green, 9 red, 13 blue
Game 89: 14 red, 3 green, 5 blue; 10 blue, 5 red; 9 blue, 12 red, 3 green
Game 90: 2 red, 2 blue; 1 blue, 1 green, 3 red; 2 green, 1 blue, 8 red; 4 red, 2 green, 2 blue; 2 blue, 9 red, 6 green
Game 91: 1 green, 1 blue, 6 red; 3 blue, 2 red; 2 red, 10 green; 7 green, 2 blue, 4 red; 1 blue, 12 green, 8 red
Game 92: 5 red, 6 blue, 14 green; 9 blue, 1 red, 10 green; 2 red, 7 green, 6 blue; 2 red, 10 blue, 4 green
Game 93: 11 red, 5 blue, 2 green; 7 green, 8 red, 6 blue; 3 green, 5 blue, 10 red; 16 red, 8 blue, 6 green; 2 green; 1 green, 11 blue, 16 red
Game 94: 4 blue, 2 red, 4 green; 5 blue, 1 red, 2 green; 12 blue, 3 red, 3 green
Game 95: 1 red, 12 green, 4 blue; 1 blue, 9 green, 3 red; 1 blue, 13 green, 1 red; 3 red, 2 green, 1 blue; 4 blue, 3 red, 15 green
Game 96: 1 red, 7 blue, 2 green; 5 green; 3 red, 5 green, 11 blue
Game 97: 8 green, 6 red; 1 blue, 6 red, 10 green; 1 blue, 6 red
Game 98: 2 green, 8 red, 1 blue; 9 green, 2 blue, 7 red; 1 blue, 2 red, 11 green; 8 red, 10 green, 2 blue
Game 99: 3 blue, 2 red; 1 blue, 3 green, 3 red; 1 red, 3 green; 2 green, 2 red, 2 blue
Game 100: 7 blue, 6 red, 5 green; 3 blue, 13 green, 11 red; 6 red, 13 green, 14 blue; 8 red, 10 blue, 15 green`

// Matches the pattern for sets of colors between semicolons
// Ex: '2 green, 3 blue; 11 red; 2 green, 5 red, 1 blue' -> ['2 green, 3 blue;', '11 red;', '2 green, 5 red, 1 blue']
const matchColorsets = (string) => string.match(/(\d+ \w*,?\s?)*;?/g).filter(string => string !== '')

// removes a trailing semicolon from a string, if there is one
const removeTrailingSemicolon = (string) => (string.at(-1) === ';') ? string.slice(0, -1) : string;

/* 
Takes a line from the log such as 
"Game 2: 2 green, 3 blue; 11 red; 2 green, 5 red, 1 blue"

and parses it into something like:
[
  ['2 green', '3 blue'],
  ['11 red'],
  ['2 green', '5 red', '1 blue']
]
*/
const parseColorsetsFromString = (string) => 
  matchColorsets(string).map(colorset => removeTrailingSemicolon(colorset).split(', '))

const sumArray = (array) => array.reduce((sum, num) => sum += num)
/*
Takes an array of parsed color sets from a line such as:
[
  ['2 green', '3 blue'],
  ['11 red'],
  ['2 green', '5 red', '1 blue']
]

and return an object that describes the sets such as:
[
  {red: 0, green: 2, blue: 3},
  {red: 11, green: 0, blue: 0},
  {red: 5, green: 2, blue: 1}
]
*/
function serializeColorsets(parsedColorsets) {
  return parsedColorsets.map(set => {
    const serializedSet = {red: 0, green: 0, blue: 0}
    set.forEach(colorString => {
			const numberOfCubes = parseInt(colorString.match(/\d*/)[0])
      if(colorString.endsWith('red')) serializedSet['red'] += numberOfCubes
      if(colorString.endsWith('green')) serializedSet['green'] += numberOfCubes
      if(colorString.endsWith('blue')) serializedSet['blue'] += numberOfCubes
    })
    return serializedSet
  })
}

function serializeLog(gameLogString) {
  const serializedLog = {}
  gameLogString.split('\n').forEach((line, index) => {
    const colorsets = serializeColorsets(parseColorsetsFromString(line))
    serializedLog[index + 1] = colorsets
  })
  return serializedLog
}

// returns an array of game IDs that are possible given a game log and an object 
// describing how many of each cube there is.
// ex: findPossibleGames(gamelog, {red: 12, green: 13, blue: 14})
function findPossibleGames(gamelog, cubeCount) {
  const serializedGameLog = serializeLog(gamelog)
  const possibleGameIDs = []

  // loop through every game
  for(const gameID in serializedGameLog) {
    const gameSets = serializedGameLog[gameID]
    
    // check if each game is possible by comparing each set's cubes to the cube count
    const isPossible = gameSets.reduce((isPossible, currentSet) => {
      if(isPossible === false) return isPossible
      return (
        currentSet.red > cubeCount.red || 
        currentSet.green > cubeCount.green || 
        currentSet.blue > cubeCount.blue
      ) ? false : true
      }, 
      true
    )
    
    // if the game was possible, add it's id to the list
    if(isPossible) possibleGameIDs.push(parseInt(gameID))
  }
  return possibleGameIDs
}

// Part 1 solution: 2105
console.log(sumArray(findPossibleGames(gameLog, {red: 12, green: 13, blue: 14})))

/*                    --- Part Two ---
The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

    In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
    Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
    Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
    Game 4 required at least 14 red, 3 green, and 15 blue cubes.
    Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.

The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
*/

// Finds the minimum cubes in a given game
function findMinimumCubes(game) {
  return game.reduce((minimumCubes, currentSet) => {
    if(currentSet.red > minimumCubes.red) minimumCubes.red = currentSet.red
    if(currentSet.green > minimumCubes.green) minimumCubes.green = currentSet.green
    if(currentSet.blue > minimumCubes.blue) minimumCubes.blue = currentSet.blue
    return minimumCubes
  }, {red: 0, green: 0, blue: 0})
}

function powerCubes(cubes) {
  return cubes.red * cubes.blue * cubes.green
}

// Part 2 solution: 72422
sumArray(Object.values(serializeLog(gameLog)).map(game => powerCubes(findMinimumCubes(game))))