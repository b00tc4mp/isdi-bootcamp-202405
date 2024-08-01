const Vehicle = require('./Vehicle')

const car = new Vehicle('Generic Brand', 'Generic Model')

console.log(car)
console.log(car.start())
console.log(car.stop())
console.log(car.toString())