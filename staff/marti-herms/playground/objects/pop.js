console.log('TEST pop')

console.log('CASE pop an element to object');

var cars = new Object;

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 };
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 };
cars[2] = { brand: 'fiat', model: '500', year: 2017 };
cars.length = 3;

console.log(cars);
//{ 0: {...}, 1: {...}, 2: {...}, length: 3}

cars.pop = function () {
    this.length--;
    var i = this[this.length];
    delete this[this.length];
    return i;
}

console.log(cars);
//{ 0: {...}, 1: {...}, length: 2}
console.log(cars.pop());
console.log(cars);