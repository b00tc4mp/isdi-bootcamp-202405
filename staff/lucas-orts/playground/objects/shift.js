console.log(`CASE shift from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.shift = function () {
    if (this.length === 0) {
        return undefined; // Si no hay elementos, retornar undefined
    } else {
        var firstElement = this[0] // Guardar el primer elemento

        // Desplazar los elementos del objeto hacia la izquierda
        for (var i = 0; i < this.length - 1; i++) {
            this[i] = this[i + 1]
        }

        delete this[this.length - 1] // Eliminar el último elemento (repetido)

        this.length-- // Disminuir la propiedad length

        return firstElement // Retornar el primer elemento eliminado
    }
}

console.log(beasts.shift()) // Output: 'ant'
console.log(beasts) // Output: {0: 'bison', 1: 'camel', 2: 'duck', 3: 'bison', length: 4}
