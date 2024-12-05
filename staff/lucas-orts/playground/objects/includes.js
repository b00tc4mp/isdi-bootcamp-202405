console.log(`CASE includes from object`)

beasts.includes = function (value, startIndex = 0) {
    // Ajustar startIndex para que sea válido incluso si es negativo
    startIndex = (startIndex >= 0) ? startIndex : this.length + startIndex

    // Iterar sobre las claves del objeto a partir del índice especificado
    for (var i = startIndex; i < this.length; i++) {
        if (this[i] === value) {
            return true // Retorna true si se encuentra el valor
        }
    }

    return false // Retorna false si no se encuentra el valor
}
console.log(beasts.includes('bison')); // Output: true
console.log(beasts.includes('elephant')); // Output: false
console.log(beasts.includes('bison', 2)); // Output: true
console.log(beasts.includes('duck', -5)); // Output: true