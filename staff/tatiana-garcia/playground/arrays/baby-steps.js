console.info("TEST arrays");

console.info('CASE add elemtents to array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.info(a);
// [10, 20, 3]

console.info(a.length)
// 3
//-----------------------------------------------------------
console.info('CASE remove last element from array')

var a = new Array

a[0] = 10
a[1] = 20
a[2] = 30

console.info(a);
// [10, 20, 30]
console.info(a.length)
// 3

a.length = a.length - 1

console.info(a)
// [10, 20]
console.info(a.length)
// 2

a.length--

console.info(a.length)
// 1
//----------------------------------------------------------
console.info('CASE remove last 2 elements from array')

var colors = new Array

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'

console.info(colors)
// ['red', 'green', 'blue', 'yellow']

console.info(colors.length)
// 4

colors.length -= 2
console.info(colors)
// ['red', 'green']

console.info(colors.length)
// 2