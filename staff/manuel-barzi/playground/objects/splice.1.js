console.log('TEST splice')

console.log('CASE insert feb in months')

var months = { 0: 'Jan', 1: 'Mar', 2: 'Apr', 3: 'Jun', length: 4 }

months.splice = function (fromIndex, removeCount, element) {
    // this -> { 0: 'Jan', 1: 'Mar', 2: 'Apr', 3: 'Jun', length: 4 }
    // fromIndex -> 1
    // removeCount -> 0
    // element -> Feb

    this[this.length++] = this[3] // this -> { 0: 'Jan', 1: 'Mar', 2: 'Apr', 3: 'Jun', 4: 'Jun', length: 5 }
    this[3] = this[2] // this -> { 0: 'Jan', 1: 'Mar', 2: 'Apr', 3: 'Apr', 4: 'Jun', length: 5 }
    this[2] = this[1] // this -> { 0: 'Jan', 1: 'Mar', 2: 'Mar', 3: 'Apr', 4: 'Jun', length: 5 }

    this[fromIndex] = element // this -> { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'Jun', length: 5 }


    return { length: 0 } // an object with length 0
}

var res = months.splice(1, 0, 'Feb')

console.assert(res.length === 0, 'res length is 0')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'Mar', 'months at 2 is Mar')
console.assert(months[3] === 'Apr', 'months at 3 is Apr')
console.assert(months[4] === 'Jun', 'months at 4 is Jun')