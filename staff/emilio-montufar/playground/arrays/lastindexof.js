console.log('TEST lastIndexOf')
console.log('CASE Method lastIndexOf')

var cities = ['madrid', 'barcelona', 'leon', 'madrid']

console.log(cities.lastIndexOf('madrid'))
//3
console.log(cities.lastIndexOf('navarra'))
// -1
console.log(cities.lastIndexOf('leon'))
//2
console.log(cities.lastIndexOf('madrid', 3))
// 3
console.log(cities.lastIndexOf('barcelona', -3))