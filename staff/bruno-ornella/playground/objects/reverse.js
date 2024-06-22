console.log('CASE reverse from objects')

var array = { 0: 'one', 1: 'two', 2: 'three', 3: 'four', 4: 'five', length: 5 }

array.reverse = function () {
    var temp;
    for (var i = 0; i < this.length - i; i++) {
        temp = this[i]
        this[i] = this[this.length - i - 1]
        this[this.length - i - 1] = temp
    }
    return this
}

console.log(array)
//['one', 'two', 'three', 'four', 'five']

var array1 = array.reverse()

console.log(array1)
//['five', 'four', 'three', 'two', 'one']

console.log(array)
//['five', 'four', 'three', 'two', 'one']