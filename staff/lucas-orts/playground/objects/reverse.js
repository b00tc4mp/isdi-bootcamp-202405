console.log(`CASE reverse from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.reverse = function () {
    var middle = Math.floor(this.length / 2) // Calcular el índice del medio del objeto

    for (var i = 0; i < middle; i++) {
        var temp = this[i]; // Guardar temporalmente el valor actual
        this[i] = this[this.length - 1 - i] // Asignar el valor inverso al actual
        this[this.length - 1 - i] = temp // Asignar el valor temporal al inverso
    }

    return this
}

console.log(beasts.reverse()) // Output: {0: "bison", 1: "duck", 2: "camel", 3: "bison", 4: "ant", length: 5}
