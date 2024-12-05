const Curray = require('./Curray')

console.info('TEST Curray.prototype.toString')

console.info('CASE toString in Curray')



const curray1 = new Curray(1, 2, 'a', '1a');

console.log(curray1.toString());
// Expected output: "1,2,a,1a"