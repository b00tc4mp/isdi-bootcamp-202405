console.log('TEST join in Object')


console.log('CASE join in object')

var fruits = { 0: 'apple', 1: 'orange', 2: 'banana', 3: 'pinapple', 4: 'watermelon', length: 5 }

fruits.join = function (separador) { // le pongo nombre al separador
    if (separador === undefined) // le digo que si el separador no se ecuentra sea
        separador === "," // le asigno un separador

    var result = "" // me hago una nueva variable donde van a ir todos los separadores, no asigno ningun elemento porque eso lo hago en la ejecución final

    for (var i = 0; i < this.length; i++) { // inicio el for para recorrer todos los elementos
        var elem = this[i] // creo una nueva variable para agrupar los elementos que voy contando

        result += elem // le digo que la variable con los separadores se suman con todos los elementos

        if (i < this.length - 1) // le digo que si el resultado de la longitud menos 1, es mayor que el i siempre lleva separador ( que ya le habia asignado antes)
            result += separador // este valor ( recordar que si es undefined es una ",")
    }

    return result // cuando acaba el for, me retorna la variable result
}

var joined = fruits.join("--") // y le indico en la funcion como quiero que lo separe

console.log(joined)