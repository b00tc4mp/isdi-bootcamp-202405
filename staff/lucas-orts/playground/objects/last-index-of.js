console.log(`CASE lastIndexOf from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }


beasts.lastIndexOf = function (value, startIndex = this.length - 1) {
    // Ajustar startIndex para que sea válido incluso si es negativo
    startIndex = (startIndex >= 0) ? startIndex : this.length + startIndex

    // Iterar sobre las claves del objeto en reversa a partir del índice especificado
    for (var i = Math.min(startIndex, this.length - 1); i >= 0; i--) {
        if (this[i] === value) {
            return i // Retorna el índice si se encuentra el valor
        }
    }

    return -1 // Retorna -1 si no se encuentra el valor
}

console.log(beasts.lastIndexOf('bison')); // Output: '4'
console.log(beasts.lastIndexOf('duck')); // Output: '3'
console.log(beasts.lastIndexOf('bison', 2)); // Output: '1'
console.log(beasts.lastIndexOf('elephant')); // Output: '-1'
console.log(beasts.lastIndexOf('bison', -2)); // Output: '1'


/*beasts.lastIndexOf = function (value, startIndex = Object.keys(this).length - 1) {
    // Si startIndex es negativo, ajustamos para que empiece desde el final del objeto
    startIndex = startIndex >= 0 ? startIndex : Object.keys(this).length + startIndex;

    var found = false;
    var result = '-1'; // Inicializar result como una cadena '-1'

    // Iterar sobre las claves a partir del índice especificado en reversa
    for (var i = startIndex; i >= 0 && i < Object.keys(this).length; i--) {
        var key = i.toString(); // Convertir el índice a cadena para usarlo como clave del objeto
        if (this[key] === value) {
            result = key; // Asignar la clave como una cadena
            found = true;
            break;
        }
    }

    if (!found) {
        return '-1'; // Retornar '-1' como cadena si no se encontró
    } else {
        return result; // Retornar la clave encontrada como cadena
    }
};

console.log(beasts.lastIndexOf('bison')); // Output: '4'
console.log(beasts.lastIndexOf('duck')); // Output: '3'
console.log(beasts.lastIndexOf('bison', 2)); // Output: '1'
console.log(beasts.lastIndexOf('bison', -3)); // Output: '1'
console.log(beasts.lastIndexOf('elephant')); // Output: '-1'
*/

console.log("CASE lasIndexOF from object")

pets = { 0: 'dog', 1: 'cat', 2: 'bird', 3: 'turtle', 4: 'snake', 5: 'bird', length: 6 }

pets.lastIndexOf = function (element, fromIndex) {

    /*var elem =this[4]
     if (elem === element)
         return 4
     var elem =this[3]
     if (elem === element)
         return 3
     var elem =this[2]
     if (elem === element)
         return 2
     var elem =this[1]
     if (elem === element)
         return 1
     var elem =this[0]
     if (elem === element)
         return 0
    
     
     return -1
     */

    /* var elem =this[3]
     if (elem === element) //bird === trutle
     var elem =this[2]
     if (elem === element) bird === bird
         return 2
        */

    if (fromIndex === undefined)
        fromIndex = this.length - 1
    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex
    else if (fromIndex > this.length - 1)
        fromIndex = this.length - 1

    for (var i = fromIndex; i > -1; i--) {
        var elem = this[i]
        if (element === elem)
            return i
    }
    return -1
}


var lastIndex = pets.lastIndexOf('bird')
console.log(lastIndex)
//5

var lastIndex = pets.lastIndexOf('elephant')
console.log(lastIndex)
//-1

var lastIndex = pets.lastIndexOf('bird', 3)
console.log(lastIndex)
//2

var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)
//2
