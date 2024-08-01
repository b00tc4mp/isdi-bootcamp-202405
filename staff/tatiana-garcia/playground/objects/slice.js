
console.info('TEST slice')

console.info('CASE Method.slice()')

var metalBands = { 0: 'iron maiden', 1: 'metallica', 2: 'stratovarius', 3: 'helloween', 4: 'scorpions', length: 5 }

metalBands.slice = function (item1, item2) {

    var newObject = { length: 0 }

    if (item2 === undefined) {

        item2 = this.length

    } else if (item2 < 0) {

        item2 = this.length + item2

    }
    if (item1 < 0) {

        item1 = this.length + item1

    } else if (item1 === undefined) {

        item1 = 0
    }


    for (var index = item1; index < item2; index++) {

        newObject[newObject.length++] = this[index]

    }

    return newObject

}

console.info(metalBands.slice(2))
//['stratovarius', 'helloween', 'scorpions']
console.info(metalBands.slice(1, 3))
// ['metallica', 'stratovarius']
console.info(metalBands.slice(-1))
//{ '0': 'scorpions', length: 1 }
