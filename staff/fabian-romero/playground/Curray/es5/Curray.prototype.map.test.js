var Curray = require('./Curray')
require('./Curray.prototype.map')



console.info('TEST map in Arrays')


console.info('CASE map')


var array1 = (1, 4, 9, 16);

var map1 = array1.map((x) => x * 2);

console.assert(map1 === array1);//mas arrys prueba