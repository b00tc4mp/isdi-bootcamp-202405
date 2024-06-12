var Curray = require('./Curray')
require('./Curray.prototype.keys')

console.info('TEST keys in Curray')

var letters = new Curray('a', 'b', 'c');

var iterator = letters.keys();

for (var key = 0; key < letters.length; key++) {

    var letters1 = []
    letters1[key] = key;

    return letters1
}

console.assert(letters1[0] === 0, 'letters1[0] is 0')
console.assert(letters1[1] === 1, 'letters1[1] is 1')
console.assert(letters1[2] === 2, 'letters1[2] is 2')