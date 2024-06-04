console.log('CASE slice in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals)
// ['ant', 'bison', 'camel', 'duck', 'elephant' ]

console.log(animals.slice(0, 3))
// [ 'ant', 'bison', 'camel' ]
console.log(animals.slice(4))
// ['elphant']
console.log(animals.slice(2, -1))
// [ 'camel', 'duck' ]