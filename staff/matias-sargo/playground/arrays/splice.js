console.log('TEST SPLICE')

console.log('CASE splice in array')

var months = ['Jan', 'March', 'April', 'June']

months.splice(1, 0, 'Feb')
// Inserts at index 1
console.log(months);
["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
["Jan", "Feb", "March", "April", "May"]


console.log('CASE insert feb in months')

var months = new Array('Jan', 'Mar', 'Apr', 'Jun')

var res = months.splice(1, 0, 'Feb')


console.assert(res.length === 0, 'res length is 0')
// console.log(months)
// Array ['Jan', 'Feb', 'Mar', 'Apr', 'Jun']

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')



console.log('CASE replace Aprr with Apr in months')

var months = new Array('Jan', 'Feb', 'Mar', 'Aprr', 'Jun')

var res = months.splice(3, 1, 'Apr')


console.assert(res.length === 1, 'res length is 1')
console.assert(res[0] === 'Aprr', 'res at 0 is Aprr')

console.assert(months.length === 5, 'months length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'Mar', 'month at 2 is Mar')
console.assert(months[3] === 'Apr', 'month at 3 is Apr')
console.assert(months[4] === 'Jun', 'month at 4 is Jun')