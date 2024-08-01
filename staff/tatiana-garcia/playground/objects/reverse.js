console.info('TEST reverse')
console.info('CASE implement Method.reverse()')

var flowers = { 0: 'rose', 1: 'geraniem', 2: 'lily', 3: 'tulyp', length: 4 }

flowers.reverse = function () {

    var newObject = { length: 0 }

    for (var index = this.length - 1; index >= 0; index--) {

        var flower = this[index]

        newObject[newObject.length++] = flower

    }

    return newObject

}

console.info(flowers.reverse())