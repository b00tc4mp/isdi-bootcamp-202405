console.log('TEST REVERSE')

console.log('CASE reverse in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.reverse = function () {
    var tmp
    for (var i = 0; i < this.length - i; i++) {
        tmp = this[i]

        this[i] = this[this.length - i - 1]

        this[this.length - i - 1] = tmp
    }

    return this

}

var animals1 = animals.reverse()

console.log(animals)
console.log(animals1)
console.log(animals)