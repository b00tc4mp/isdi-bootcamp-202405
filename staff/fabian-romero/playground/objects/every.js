console.log('TEST every in object')

console.log('CASE every')


var num = { 0: 1, 2: 30, 3: 39, 4: 29, 5: 10, 6: 13, length: 7 };

num.every = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) // aquí la llamada de la funcion en la longitud
            return false
    }

    return true

}

// luego la accion de la igualar las variables es fuera de declarar la funcion arriba.
var isBelowThreshold = num.every(function (currentValue) {

    return currentValue > 3;
})

console.log(isBelowThreshold);