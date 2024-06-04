console.log('TEST reverse')
console.log('CASE implement Method.reverse()')

var flowers = { 0: 'rose', 1: 'geraniem', 2: 'lily', 3: 'tulyp', length: 4 }

flowers.reverse = function () {

    var newObject = { length: 0 }

    for (var index = this.length - 1; index >= 0; index--) {

        var flower = this[index]

        newObject[newObject.length++] = flower

    }

    this = newObject

    return this

}

console.log(flowers.reverse())