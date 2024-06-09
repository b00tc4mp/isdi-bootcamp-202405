console.info('TEST lastIndexOf')
console.info('CASE Method lastIndexOf')

var cities = ['madrid', 'barcelona', 'leon', 'madrid']

console.assert(cities.length === 4, 'cities length is 4')
console.assert(cities[0] === 'madrid', 'cities[0] is equal to madrid')
console.assert(cities[1] === 'barcelona', 'cities[1] is equal to barcelona')
console.assert(cities[2] === 'leon', 'cities[2] is equal to leon')
console.assert(cities[3] === 'madrid', 'cities[3] is equal to madrid')

console.info('CASE search the word in last index of')

var firstWordLastPosition = cities.lastIndexOf('madrid')
console.assert(firstWordLastPosition === 3, 'the last index of madrid is the position 3')

console.info('CASE not found the word in last index of')
var wordNotFound = cities.lastIndexOf('navarra')
console.assert(wordNotFound === -1, 'wordNotFound is equal to -1')


console.info('CASE search the word in the last index from the positive position indicated ')

var word = cities.lastIndexOf('madrid', 3)
console.assert(word === 3, 'the last index of Madrid starting from position 3 is 3')

console.info('CASE search the word in the last index from the negative position indicated ')

var word = cities.lastIndexOf('barcelona', -3)
console.assert(word === 1, 'the last index of barcelona starting from position -3 is 1')

