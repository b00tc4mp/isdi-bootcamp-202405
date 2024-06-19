const Human = require('./Human')

const frank = new Human('1991-11-16', 'Frank', 'Pereira', 'male')

console.log(frank)
console.log(frank.complain())
console.log(frank.eat('🥪'))
console.log(frank.poo())
