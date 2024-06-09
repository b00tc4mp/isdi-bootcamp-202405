console.log('TEST for each')
console.log('CASE implement for Each from arrays')

const array1 = {0: 'a', 1: 'b', 2: 'c'}
var copy = { length: 0}

array1.forEach = function(callback){
    for(var i = 0; i < this.length; i++) {
        var elem = this[i]

        callback(elem)
    }
}

array1.forEach(function (element){
    copy[copy.length++] = element
})

//  "a"
//  "b"
//  "c" 

console.assert(copy.length === array1.length, 'copy length equals char length')
console.assert(copy[0] === array1[0], 'copy at 0 equals array1 at 0')
console.assert(copy[1] === array1[1], 'copy at 1 equals array1 at 1')
console.assert(copy[2] === array1[2], 'copy at 2 equals array1 at 2')


console.log('CASE copy chars with index and self reference into new arrays')
const chars = ['a', 'b', 'c']
var copy = []

chars.forEach(function (element, index, array) { 
    copy[copy.length] = element;
    indexes[index.length++] = index;
    arrays[array.length++] = array;
    }

)

console.assert(copy.length === chars.length, 'copy length equals char length')

console.assert(copy[0].element === chars[0], 'copy at 0 equals array1 at 0')
console.assert(copy[0].index === 0, 'copy at 1 equals array1 at 1')
console.assert(copy[0].array === chars, 'copy at 2 equals array1 at 2')


console.log('Calculate percentages')

