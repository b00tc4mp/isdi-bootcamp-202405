onsole.log('CASE to join multiple elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

console.log(animals.join('-'))
// "pigs-goats-sheep-cows"

var things = [ true, 'hello world', 100, {name: 'Oswald'}, [10, 20, 30], function(){}]

var joined = things.join(' $ ')

console.log(joined)
