console.log('TEST SOME')

console.log('CASE some in object')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }

numeros.some = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]))
            return true
    }
    return false
}

var num = numeros.some(function (element) {
    return element < 0
})

console.log(num)

//false