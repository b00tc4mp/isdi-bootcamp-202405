console.log('CASE include pets')


var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 } // lo que hace "includes" es decirme true/false segun lo que hay dentro del array

pets.includes = function (element) { // le pongo nombre a la function otra vez
    for (var i = 0; i < this.length; i++) { // hago una nueva variable  que me recorra todos los elementos
        var elem = this[i] // me creo una nueva variable que agrupe temporalmente todos los elementos
        if (elem === element) // le digo que si los elementos coinciden me retorne true
            return true

    }

    return false // en el momento que eso no coincida me retorne false.

}


var included = pets.includes('dog') // creo una nueva variable para decirle que la primera variable tendra una nueva funcion y que ese resultado se copiara en ella.
console.log(included) // luego la llamo y me da el valor (true


var included = pets.includes('horse') // el caballo no está en el array entonces me dara resultado falso
console.log(included) //(false)