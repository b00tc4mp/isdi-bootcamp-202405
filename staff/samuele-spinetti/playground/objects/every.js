console.log('TEST EVERY')

console.log('CASE every in object')


var numeros = { 0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6 }

numeros.every = function (callback) {

    for (var i = 0; i < this.length; i++) {

        // if (callback(this[i]) === false)
        if (!callback(this[i]))

            return false

    }

    return true

}


var isBelowThreshold = numeros.every(function (currentValue) {

    return currentValue < 40

})

console.log(isBelowThreshold)