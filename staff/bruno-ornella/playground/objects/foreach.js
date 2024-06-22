console.log('TEST forEach')

console.log('CASE copy chars into new object')

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var copy = { length: 0 }

chars.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        callback(elem)
    }
}


chars.forEach(function (element) {
    copy[copy.length] = element
})
