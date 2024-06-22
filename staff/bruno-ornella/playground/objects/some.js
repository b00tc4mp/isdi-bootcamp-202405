console.log('TEST SOME')

console.log('CASE some in array')

var array = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }

array.some = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (element(this[i]))
            return true
    }
    return false
}


var even = array.some(function (element) {
    return element < 5
})

console.log(even)

