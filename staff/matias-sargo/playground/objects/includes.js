console.log('TEST includes')

console.log('CASE object includes pet')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

console.log(pets)

pets.includes = function (element) {
    // var elem = this[0]
    // if (elem === element)
    //     return true

    // var elem = this[1]
    // if (elem === element)
    //     return true

    // var elem = this[2]
    // if (elem === element)
    //     return true

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true
    }

    return false
}

var included = pets.includes('dog')

console.log(included)
// true

var included = pets.includes('horse')

console.log(included)
// false

console.log('CASE object includes color from index')

var colors = {
    0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'skyblue', 7: 'red', 8: 'white', 9: 'black', 10: 'grey', length: 11
}

colors.includes = function (element, index) {
    if (index === undefined)
        index = 0
    else if (index < 0)
        index = this.length + index

    for (var i = index; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true
    }

    return false
}

var included = colors.includes('pink', 2)

console.log(included)
// true

var included = colors.includes('red', 4)

console.log(included)
// true

var included = colors.includes('red', 8)

console.log(included)
// false

var included = colors.includes('orange')

console.log(included)
// true

var included = colors.includes('pink', undefined)

console.log(included)
// true

var included = colors.includes('lime', undefined)

console.log(included)
// false

var included = colors.includes('black', -4)

console.log(included)
// true

var included = colors.includes('black', -1)

console.log(included)
// false

var included = colors.includes('black', 15)

console.log(included)
// false

var included = colors.includes('black', -15)

console.log(included)
// true