
console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
//cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars['2'] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

cars.push = function() {
    var element = this[this.length]
    this[this.length +=]
    return element
}

cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
