console.log(`CASE copyWithin from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'lion', length: 5 };

beasts.copyWithin = function (target, start, end = this.length) {
    // Ajustar los índices de inicio y fin para que sean válidos incluso si son negativos
    start = (start >= 0) ? start : this.length + start
    end = (end >= 0) ? end : this.length + end

    // Convertir los índices negativos en cero si son mayores que el largo del array
    start = Math.max(start, 0);
    end = Math.min(end, this.length)

    // Ajustar el índice de destino para que sea válido incluso si es negativo
    target = (target >= 0) ? target : this.length + target

    // Convertir el índice negativo de destino en cero si es mayor que el largo del array
    target = Math.max(target, 0)

    // Calcular la cantidad de elementos que se copiarán
    var count = Math.min(end - start, this.length - target)

    // Copiar los elementos dentro del objeto
    for (var i = 0; i < count; i++) {
        this[target + i] = this[start + i]
    }

    return this
}


console.log(beasts.copyWithin(0, 2))
console.log(beasts.copyWithin(0, 3, 4))
