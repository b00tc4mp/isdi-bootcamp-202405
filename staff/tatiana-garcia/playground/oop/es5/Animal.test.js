var Animal = require('./Animal')

var frank = new Animal('1991-11-16', 'Frank', 'Pereira', 'male')

console.log(frank)
console.log(frank.complain())
console.log(frank.eat('sandwich'))
console.log(frank.poo())
console.log(frank.toString())