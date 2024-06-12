console.log(`CASE indexOf from object v1`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.indexOf = function (value, startIndex = 0) {
    // Ajustar startIndex para que sea válido incluso si es negativo
    startIndex = (startIndex >= 0) ? startIndex : this.length + startIndex

    // Iterar sobre las claves del objeto a partir del índice especificado
    for (var i = Math.max(startIndex, 0); i < this.length; i++) {
        if (this[i] === value) {
            return i // Retorna el índice si se encuentra el valor
        }
    }

    return -1 // Retorna -1 si no se encuentra el valor
}

console.log(beasts.indexOf('bison')); // Output: '1'
console.log(beasts.indexOf('duck')); // Output: '3'
console.log(beasts.indexOf('bison', 2)); // Output: '4'
console.log(beasts.indexOf('elephant')); // Output: '-1'
console.log(beasts.indexOf('bison', -2)); // Output: '4'