console.log('TEST SHIFT')

console.log('CASE shift in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

animals.shift = function () {

    var deletedAnimal = this[0]

    this.length--

    for (var i = 0; i < this.length; i++) {

        this[i] = this[i + 1]

    }

    delete this[this.length]

    return deletedAnimal
}

var animals1 = animals.shift()

console.log(animals1)
// Dodo
console.log(animals)