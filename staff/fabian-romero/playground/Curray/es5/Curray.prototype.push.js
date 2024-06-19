var Curray = require('./Curray')

Curray.prototype.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]

        this[this.length++] = argument
    }

    return this.length
}


// bucle explicado "for"... var = indice = 0: quiere decir que el inicio/indice/i/o como quiera comience en la posicion cero del array...

//entonces luego el indice/i/index es menor que (en este caso) "argument.length": es menor que la longitud que tiene argumentos, esto me devuelve solo si es un true/false... y va ejecutando su funcion de ir copiandonos elementos al "tgis"

//va comparando todo el tiempo para saber cuando se detiene "es 3 menor que 0? no..." y sigue sumando "es 3 menor que 1?, no"... "es 3 menor que 2?, no"... "es 3 menor que 3? iguales..." hy aquín se detiene y paso al siguiente función 

//luego de copiarlo incrementa la length de la inicial que en este caso comenzó en 0.

// veo que la variable arguments

// agrega elementos en la ultima fila...
// cuando son pocos elementos a agregar al array, se pueden agregar con esta formula "this[this.lenght++] = element" pero cuando son muchos elementos se ultiliza "argument" para hacerlo...
// tengo una formula para agrupar todos los elemntos en "argument" para add al array... 