console.log('TEST INCLUDES')

/*
console.log('CASE includes in objects')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }

numeros.includes = function (num) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === num)
            return true
    }
    return false
}

var numeros1 = numeros.includes(11)

console.log(numeros1)
//false
*/

console.log('TEST object includes pet')

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 }

console.log(pets)

pets.includes = function (element) {
    for (i = 0; i < this.length; i++)
        var elem = this[i]

    if (elem === element)
        return true

    return false
}

var included = pets.includes('dog')



console.log('TEST object includes color from index')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'skyblue', 7: 'red', 8: 'white', 9: 'black', 10: 'grey', length: 11 }

colors.includes = function (element, index) {
    if (index === undefined)
        index = 0

    else if (index < 0)
        index = this.length + index

    for (i = index; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return true
    }
    return false
}

var included = colors.includes('pink', 2)

console.log(included)