console.log('Test Splice')

console.log('Case insert feb in months')

var months = {0: 'jan', 1: 'Mar', 2: 'Apr', 3: 'Jun', length: 4}

months.splice = function (fromIndex, removeCount, element){
    for(var i = this.length; i > fromIndex; i--)
        this[i] = this[i-1]

    this.length++

    this[fromIndex] = element

    return { length: 0 }
}
console.assert(res.length === 0, 'res length is 0')
console.assert(months.length === 0, 'month length is 0')

console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')

console.log('Case replace aprr with apr in months')

var months = {0: 'jan', 1: 'Feb', 2: 'Mar', 3: 'Aprr', 4: 'Jun', length: 5}

months.splice = function (fromIndex, removeCount, element){
    var removed = { length: 0}
    removed[removed.length++] = this[fromIndex]
    return removed
}

var res = months.splice(3, 1, 'Apr')

console.assert(res.length === 1, 'res length is 1')
console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')