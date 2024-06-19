var Curray = require('./Curray')

Curray.prototype.concat = function () {

    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) { // primer for para el primero
        var elem = this[i]

        newObject[newObject.length++] = elem
    }

    for (var i = 0; i < arguments.length; i++) { // segundo "argument"

        var argument = arguments[i]

        for (var j = 0; j < argument.length; j++) { // tercero que va dentro del segundo "argument"

            var elem = argument[j]

            newObject[newObject.length++] = elem

        }

    }

    return newObject

}



// tengo dos arrays que las quiero juntar en un solo elemento... entonces creo 1 variable nueva para agrupar todos lo anterior en ella

// array1.concat(array2) formula en array.
// en objetos hay que hacer un "for", con "nombre en este caso elem/resul/etc" (que es la ejecución que me agrupa todos los elementos) y luego esos elementos me los add al lenght de "elem/resuk/etc" que me los devuelve en la lenght del nuevo arrayI

// luego de esto hacer otro for, que me agrupe a todas restantes(todas juntas en una misma accion... primer for con indicador i... como en push que exite argument

//dentro de este for hago otro for(cambio el nombre de i/inicial/index por otra letra,) y hago otro for, para que me agrupe todo denuevo y me lo envie en la lenght del nuevo array J

// y le digo a la funcion que me return la nueva array3 con ya todo unido.