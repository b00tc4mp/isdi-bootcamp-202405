var Curray = require('./Curray')
require('./Curray.prototype.filter')



console.info('TEST filter in Curray')


console.info('CASE filter')


var words = ('spray', 'elite', 'exuberant', 'destruction', 'present');

var result = words.filter((word) => word.length > 6);

console.assert(result);