var Curray = require('./Curray')
require('./Curray.prototype.forEach')

onsole.info('TEST Array.prototype.forEach')

console.info('CASE forEach in array')

var chars = new Curray('a', 'b', 'c')
var copy = new Curray

var chars1 = chars.forEach(function (element) {
    copy[copy.length] = element

})

console.assert(copy.length === chars1.length, 'copy length equals chars length')
console.assert(copy[0] === chars1[0], 'copy at 0 equals at 0')
console.assert(copy[1] === chars1[1], 'copy at 1 equals at 1')
console.assert(copy[2] === chars1[2], 'copy at 2 equals at 2')

