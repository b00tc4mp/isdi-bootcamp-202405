var Curray = require('./Curray')

Curray.prototype.at = function (index) {
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]
}




//cuando formulo las formulas de object tengo que "nombre de = function(indicarle index o valor o elemento) depentiendo de lo que me pida la funcion."

// luego lo que espero que me retorne... "return this[index]" esperando que con la indiccacion al lado de la funcion me retone su posicion del array/objeto

//hago espacios y bajo el return ( que es el resultado) y entre estos 2 elementos veo cual es la ejecucion que debo realizar.

// en este caso es con if... le digo que si index/inicial/i es > -1 ( mayor que numeros negativos, para simplificar y dar la opcion de buscar numeros negativos) me retorne sin problema "return this[index]" 

//ELSE (PERO) si el numero es negativo me retorne el r"eturn[this.lenght(el valor de la longitud del this) + index(el valor inicial)]... se pone + index por que un valor negativo y un positivo da negativo