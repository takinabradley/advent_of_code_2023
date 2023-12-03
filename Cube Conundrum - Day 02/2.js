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

import gameLog from "./gameLog";

// Matches the pattern for sets of colors between semicolons
// Ex: '2 green, 3 blue; 11 red; 2 green, 5 red, 1 blue' -> ['2 green, 3 blue;', '11 red;', '2 green, 5 red, 1 blue']
const matchColorLists = (string) => string.match(/(\d+ \w*,?\s?)*;?/g).filter(string => string !== '')

// removes a trailing semicolon from a string, if there is one
const removeTrailingSemicolon = (string) => (string.at(-1) === ';') ? string.slice(0, -1) : string;

/* Takes a line from the game log and parses each set of colors as an array. Returns an array containing the each set
Ex:
"Game 2: 2 green, 3 blue; 11 red; 2 green, 5 red, 1 blue"

Becomes:
[
  ['2 green', '3 blue'], ['11 red'], ['2 green', '5 red', '1 blue']
]
*/
const parseColorLists = (string) => matchColorLists(string).map(colorset => removeTrailingSemicolon(colorset).split(', '))

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
function serializeColorLists(parsedColorsets) {
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

// serializes the color lists from each game in the log
// returns an object with game IDs as keys
function serializeLog(gameLogString) {
  const serializedLog = {}
  gameLogString.split('\n').forEach((line, index) => {
    const colorsets = serializeColorLists(parseColorLists(line))
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
The Elf says they've stopped producing snow because they aren't getting any 
water! He isn't sure why the water stopped; however, he can show you how to get 
to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you 
played, what is the fewest number of cubes of each color that could have been 
in the bag to make the game possible?

Again consider the example games from earlier:

```
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
```

- In game 1, the game could have been played with as few as 4 red, 2 green, and 
6 blue cubes. If any color had even one fewer cube, the game would have been 
impossible.
- Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue 
cubes.
- Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
- Game 4 required at least 14 red, 3 green, and 15 blue cubes.
- Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.

The power of a set of cubes is equal to the numbers of red, green, and blue 
cubes multiplied together. The power of the minimum set of cubes in game 1 is 
48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these 
five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What 
is the sum of the power of these sets?
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

function sumOfCubePowers(gameLog) {
  return sumArray(Object.values(serializeLog(gameLog)).map(game => powerCubes(findMinimumCubes(game))))
}

// Part 2 solution: 72422
console.log(sumOfCubePowers(gameLog))