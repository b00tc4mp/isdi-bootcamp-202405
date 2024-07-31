// PRACTICAS PRACTICAS PRACTICAS
// PRACTICAS PRACTICAS PRACTICAS
// PRACTICAS PRACTICAS PRACTICAS


//OBJETOS TEORIA//













console.log('TEST objects')

var ro = new Object

ro[0] = 'fa'
ro[1] = 'bi'
ro[2] = 'to'

ro.length = 3 // lo tengo quye crear yo porque en objectos esto no existe.

console.log(ro) // si lo ejecuto me enseña como si fuera un "array", pero em objeto
// y me enseña la longitud en numeros, que siempre está 1 x arriba de la ultima posicion.
// no tiene más ciencia.



console.log('CASE remove last element from object')

var ro = new Object

ro[0] = 'fa'
ro[1] = 'bi'
ro[2] = 'to'
ro.length = 3

delete ro[1] // es una kyeword que solo existe en objetos y es para eliminar en objetos 
//le doy la accion de eliminar el que yo quiero, sin complicarme en este caso el [1]
ro.length-- // le doy la accion de restar dentro del length para que lo descuente del recuento
console.log(ro) // ejecuto el log de la variable completa.



console.log('CASE remove last 2 elements from object')

var ro = new Object

ro[0] = 'fa'
ro[1] = 'bi'
ro[2] = 'to'
ro.length = 3

delete ro[0] // tengo que darle la accion de eliminar uno x uno, la propiedad
delete ro[2] // eliminar uno x uno, sin complicarme

ro.length -= 2 // darle la accion de cambiarme el length, que no se cambia solo como en arrays
console.log(ro) // ejecutar la consola y me dará "{ '1': 'bi', length: 1 }"


console.log('CASE push an element to object')

//push es un metodo que tienen los arrays y los objetos no, todo se hace manual.
var colors = new Array

colors[0] = { cara: 'rojo', cuerpo: 'amarillo', pies: 'verde' }
colors[1] = { cara: 'lila', cuerpo: 'rosa', pies: 'nude' }
colors[2] = { cara: 'azul', cuerpo: 'celeste', pies: 'cian' }
colors.length = 3

console.log(colors)
console.log(colors.length)

// como voy a add un nuevo objeto se va a cambiar la longitud, pero como es objc lo tengo que hacer manual con esta formula.

colors.push = function (element) { // Le digo a color que ejecute un push. Push tiene una funcion, que dentro tiene elementos, que me cambiará la longitud
    this[colors.length++] = element // como tengo que modificar manualmente. Le digo mi longitud se tiene que sumar, porque se modifica con la funcion del push que agrega un nuevo elemento
    return colors.length // que me devuelva el resultado de la longitud, sumada.  
}

var pepi = colors.push({ cara: 'negra', cuerpo: 'blanco', pies: 'grises' }) // creo una nueva variante con un nombre nuevo y le digo que tiene el valor de "la variable anterior + punto + push()" que en sus parentesis contiene la informacion que quiero add.

console.log(colors)
console.log(colors.length)



console.log('CASE push multiple elements to object')


var colors = ['negra', 'blanco', 'gris']

console.log(colors)
console.log(colors.length)

colors.push = function { 'elemento1', 'elemento2', 'elemento3' } {
    this.[++this.length] = elemento1 // esta alternativa solo funciona con 3 elementos, si hay que hacer más no va.
    this.[++this.length] = elemento2
    this.[++this.length] = elemento3
}


var newColors = ('black', 'white', 'grey')

colors.push({ cara: 'negra', cuerpo: 'blanco', pies: 'grises' }){
    console.log(argument)
}

console.log(colors)
console.log(color.length)











console.log('CASE reverse in object')


var barcelona = { 0: 'sagrada', 1: 'montjuic', 2: 'wella', 3: 'beach', 4: 'montjuic', length: 3 }
barcelona.revers = function () {
    var temporal =

    // for normal y corriente
    // cual es la ingtencion... que sea al reves
    




}


















--NUEVOS CASOS-- -


    console.log('CASE join')


var myName = { 0: 'f', 1: 'a', 2: 'b', 3: 'i', 4: 't', 5: 'o' length: 6 }

myName.join = function () {
    for (var i = 0; i < this.length; i++)
        var elem = this[i]

    res += elem
    if (i < this.length - 1)
        res += ','
}

return res


var myNamejunts = myName.join("");

console.log(myNamejunts) 