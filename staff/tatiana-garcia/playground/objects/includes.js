console.info('TEST includes')

console.info('CASE object includes pokemonNames')

var pokemonName = { 0: 'eevee', 1: 'pikachu', 2: 'bulbasur', length: 3 }

pokemonName.includes = function (item) {

    for (var index = 0; index < this.length; index++) {

        if (item === this[index]) {

            return true
        }
    }

    return false
}

console.info(pokemonName.includes(3))
//false
console.info(pokemonName.includes('bulbasur'))
//true

console.info('TEST objects includes colors from index')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', 4: 'orange', 5: 'pink', 6: 'skyblue', 7: 'white', 8: 'red', 9: 'black', 10: 'grey', length: 11 }

colors.includes = function (item, index) {

    if (index === undefined) {

        index = 0
    } else if (index < 0) {

        index = this.length + index // si el indice tiene un menos delante al sumarlo se resta
    }

    for (var i = index; i < this.length; i++) {

        if (item === this[i]) {

            return true
        }
    }

    return false
}

var included = colors.includes('red', 4)
console.info(included)
//true

var included = colors.includes('red', 8)
console.info(included)
//false