console.log('TEST splice in Arrays')

console.log('CASE splice')

//cambia el contenido del array y te entrega otro nuevo

// tiene 3 indicaciones primero le dices desde que posicion comenzar a borraer / cuantos tienes que borrar ( si no le indico nada borrará todo / y luego está el array final que te enseña los eliminados y los agregados)

// para agregar hago lo mismo posicion star / cuantos add / "los elementos en cuestion"

// el 0 significa insertar X en el array ejeplo " 1, 0 , febrero" le dices que en la posicion 1, add , febrero" y todo el resto se mueve de posicion .

var meses = ["enero", "febrero", "lunes", "martes"];


var meses = ["enero", "febrero", "lunes", "martes"];
var dias = meses.splice(2);

console.log(dias); // ["lunes", "martes"] // me elimino



var meses = ["enero", "febrero", "lunes", "martes"];
var dias = meses.splice(2, 1);

console.log(dias); // ["lunes"]
console.log(meses); // ["enero", "febrero", "martes"]



var meses = ["enero", "febrero", "lunes", "martes"];
var dias = meses.splice(2, 2, "marzo", "abril");

console.log(dias); // ["lunes", "martes"]
console.log(meses); // ["enero", "febrero", "marzo", "abril"]




console.log('TEST splice')

console.log('CASE insert feb in months')

var months = new Array('Jan', 'Mar', 'Apr', 'Jun')

var res = months.splice(1, 0, 'Feb')

console.assert(res.length === 0, 'res length is 0')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'Mar', 'months at 2 is Mar')
console.assert(months[3] === 'Apr', 'months at 3 is Apr')
console.assert(months[4] === 'Jun', 'months at 4 is Jun')

console.log('CASE replace aprr with apr in months')

var months = new Array('Jan', 'Feb', 'Mar', 'Aprr', 'Jun')

var res = months.splice(3, 1, 'Apr')

console.assert(res.length === 1, 'res length is 1')
console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'Mar', 'months at 2 is Mar')
console.assert(months[3] === 'Apr', 'months at 3 is Apr')
console.assert(months[4] === 'Jun', 'months at 4 is Jun')
