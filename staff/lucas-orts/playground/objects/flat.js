console.info('TEST Array.prototype.flat')

console.info('Case flat in array')

/*var numeros = { 0: 0, 1: 1, 2: 2, 3: { 0: 3, 1: 4, length: 2 }, length: 4 }
numeros.flat = function (depth) {
    var flatted = { length: 0 }
    if (depth === undefined)
        depth = 1
    else if (depth === 0) {
        return numeros
    }
    while (depth !== 0) {
        for (var i = 0; i < this.length; i++) {

            if ((this[i]) === this.length - 1) {

                numeros.flat(depth)
                depth--
            } var element = this[i]

            flatted[flatted.length++] += element

        }

        return flatted
    }
}*/


/*console.assert(numeros[0] === 0, 'numeros at 0 is 0')
console.assert(numeros[1] === 1, 'numeros at 1 is 1')
console.assert(numeros[2] === 2, 'numeros at 2 is 2')
console.assert(numeros[3][0] === 3, 'numeros at 3-0 is 3')
console.assert(numeros[3][1] === 4, 'numeros at 3-1 is 4')*/

/*var numeros1 = numeros.flat();
console.log(numeros1[0])
console.log(numeros1[1])
console.log(numeros1[2])
console.log(numeros1[3])
console.log(numeros1[4])*/
/*console.assert(numeros1[0] === 0, 'numeros at 0 is 0')
console.assert(numeros1[1] === 1, 'numeros at 1 is 1')
console.assert(numeros1[2] === 2, 'numeros at 2 is 2')
console.assert(numeros1[3] === 3, 'numeros at 3 is 3')
console.assert(numeros1[4] === 4, 'numeros at 4 is 4')
*/

var numeros = { 0: 0, 1: 1, 2: { 0: 2, 1: { 0: 3, 1: { 0: 4, 1: 5, length: 2 }, length: 2 }, length: 2 }, length: 3 }

numeros.flat = function (depth) {
    var flatted = { length: 0 }
    if (depth === undefined)
        depth = 1
    else if (depth === 0) {
        return numeros
    }
    else {
        while (depth !== 0) {
            for (var i = 0; i < this.length; i++) {

                if ((this[i]) === this.length - 1) {

                    numeros.flat(depth)
                    depth--
                } var element = this[i]

                flatted[flatted.length++] = element

            }

            return flatted
        }
    }
}
var numeros1 = numeros.flat()
console.log(numeros1)
console.log(numeros1[0])
console.log(numeros1[1])
console.log(numeros1[2])


/*console.assert(numeros1[0] === 0, 'numeros at 0 is 0')
console.assert(numeros1[1] === 1, 'numeros at 1 is 1')
console.assert(numeros1[2] === 2, 'numeros at 2-0 is 2')
console.assert(numeros1[3][0] === 3, 'numeros at 2-1-0 is 3')
console.assert(numeros1[3][1][0] === 4, 'numeros at 2-1-1-0 is 4')
console.assert(numeros1[3][1][1] === 5, 'numeros at 2-1-1-1 is 5')*/

var numeros1 = numeros.flat(2)
console.log(numeros1[0])
console.log(numeros1[1])
console.log(numeros1[2])
console.log(numeros1[3])

/*console.assert(numeros2[0] === 0, 'numeros at 0 is 0')
console.assert(numeros2[1] === 1, 'numeros at 1 is 1')
console.assert(numeros2[2] === 2, 'numeros at 2 is 2')
console.assert(numeros2[3] === 3, 'numeros at 3 is 3')
console.assert(numeros2[4][0] === 4, 'numeros at 4-0 is 4')
console.assert(numeros2[4][1] === 5, 'numeros at 4-1 is 5')*/

var numeros1 = numeros.flat(Infinity)
console.log(numeros1[0])
console.log(numeros1[1])
console.log(numeros1[2])
console.log(numeros1[3])
console.log(numeros1[4])
console.log(numeros1[5])

/*console.assert(numeros3[0] === 0, 'numeros at 0 is 0')
console.assert(numeros3[1] === 1, 'numeros at 1 is 1')
console.assert(numeros3[2] === 2, 'numeros at 2 is 2')
console.assert(numeros3[3] === 3, 'numeros at 3 is 3')
console.assert(numeros3[4] === 4, 'numeros at 4 is 4')
console.assert(numeros3[5] === 5, 'numeros at 4 is 4')*/
