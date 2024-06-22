console.info('TEST splice')

console.info('CASE insert feb in month')

var month = new Array('Jan', 'Mar', 'Apr', 'Jun')

var res = month.splice(1, 0, 'Feb')

console.assert(res instanceof Array, 'res is an Array')
console.assert(res.length === 0, 'res length is 0')

console.assert(month.length === 5, 'month length is 5')
console.assert(month[0] === 'Jan', 'month at 0 is Jan')
console.assert(month[1] === 'Feb', 'month at 1 is Feb')
console.assert(month[2] === 'Mar', 'month at 2 is Mar')
console.assert(month[3] === 'Apr', 'month at 3 is Apr')
console.assert(month[4] === 'Jun', 'month at 4 is Jun')


console.info('CASE raplace aprr with in months')

var month = new Array('Jan', 'Feb', 'Mar', 'Aprr', 'Jun')

var res = month.splice(3, 1, 'Apr')

console.assert(res instanceof Array, 'res is an Array')
console.assert(res.length === 1, 'res length is 0')
console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

console.assert(month.length === 5, 'month length is 5')
console.assert(month[0] === 'Jan', 'month at 0 is Jan')
console.assert(month[1] === 'Feb', 'month at 1 is Feb')
console.assert(month[2] === 'Mar', 'month at 2 is Mar')
console.assert(month[3] === 'Apr', 'month at 3 is Apr')
console.assert(month[4] === 'Jun', 'month at 3 is Jun')