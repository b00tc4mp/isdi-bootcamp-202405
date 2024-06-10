console.log('Test push')

console.log('Case push an element to array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

var newCar = { brand: 'ford', model: 'fiesta', year: 2005 }

var count = cars.push(newCar)

console.assert(cars[3] === newCar, 'NewCar is at postion 3')
console.assert(cars.length === 4, 'cars length is equal to 4')
console.assert(count === 4, 'count is 4')

console.log('Case push multiple elements to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = animals.push('chickens', 'cats', 'dogs')

console.assert(animals[4] === 'chickens', 'animals at 4 is chickens')
console.assert(animals[5] === 'cats', 'animals at 5 is cats')
console.assert(animals[6] === 'dogs', 'animals at 6 is dogs')
console.assert(animals.length === 7, 'animals length is 7')
console.assert(count === 7, 'count is 7')
