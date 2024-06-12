console.log(`CASE slice from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.slice = function (start = 0, end = this.length) {
    // Ajustar los índices de inicio y fin para que sean válidos incluso si son negativos
    start = (start >= 0) ? start : this.length + start
    end = (end >= 0) ? end : this.length + end

    // Convertir los índices negativos en cero si son mayores que el largo del array
    start = Math.max(start, 0)
    end = Math.min(end, this.length)

    // Crear un nuevo objeto para almacenar los elementos cortados
    var result = {}

    // Copiar los elementos dentro del nuevo objeto
    for (var i = start, j = 0; i < end; i++, j++) {
        result[j] = this[i]
    }

    // Establecer la propiedad length del nuevo objeto
    result.length = end - start

    return result
}

console.log(beasts.slice(1, 4)) // Output: {0: "bison", 1: "camel", 2: "duck", length: 3}
console.log(beasts.slice(1)) // Output: {0: "bison", 1: "camel", 2: "duck", 4: 'bison', length: 4}
