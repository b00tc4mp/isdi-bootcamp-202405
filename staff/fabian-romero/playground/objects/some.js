console.log('TEST some in object')

console.log('CASE some')


var number = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }

number.some = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i]))
            return true
    }

}

var numer = function (element) {

    return number > 4
}

console.log(number.some)