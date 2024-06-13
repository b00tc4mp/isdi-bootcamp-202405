console.log('TEST SPLICE')


console.log('CASE splice in object')


console.log('CASE insert feb in months')

var months = { 0: 'Jan', 1: 'Mar', 2: 'Apr', 3: 'Jun', length: 4 }

months.splice = function (fromIndex, removeCount, element) {

    for (var i = this.length; i > fromIndex; i--) {
        this[i] = this[i - 1]
    }

    this.length++
    this[fromIndex] = element


    return { length: 0 }// an object with length 0
}


var res = months.splice(1, 0, 'Feb')

console.assert(res.length === 0, 'res length is 0')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')


console.log('CASE replace Aprr with Apr in months')

var months = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Aprr', 4: 'Jun', length: 5 }

months.splice = function (fromIndex, removeCount, element) {

    var removed = { length: 0 }

    removed[removed.length++] = this.[fromIndex]

    this[fromIndex] = element

    return removed

}


var res = months.splice(3, 1, 'Apr')


console.assert(res.length === 1, 'res length is 1')
console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')









































var months = { 0: 'Jan', 1: 'March', 2: 'April', 3: 'June', length: 4 }

months.splice = function (start, deleteItem = this.length, ...args) {
    var newObject = { length: 0 }

    if (start < 0) {
        start = this.length + start
        if (start < 0) {
            start = 0
        }
    } else if (start >= this.length) {
        start = this.length

    } else if (start === undefined) {
        return newObject
    }
    if (deleteItem === undefined)
        deleteItem = 0
    else if (deleteItem <= 0)
        deleteItem = 0

    for (var i = start; i < deleteItem; i++) {
        newObject[newObject.length++] = this[start]
        for (var index = start; index < this.length; index++) {
            this[index] = this[index + 1]
        }
        delete this[this.length - 1]
        this.length--;


    }
    for (var i = 0; i < args.length; i++) {
        for (var j = this.length; j > start; j--)
            this[j] = this[j - 1]
        this.length++
        this[i + start] = args[i]
    }

    return newObject
}


var monthDelete = months.splice(1, 0, 'Feb');
// Inserts at index 1

console.log(months);
//{0: Jan, 1: Feb, 2:March, 3:April, 4:June, length:5}

var monthDelete = months.splice(4, 1, 'May');

console.log(months);
//{0: Jan, 1: Feb, 2: March, 3:April, 4:May, length: 5}
