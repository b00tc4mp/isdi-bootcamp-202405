console.log('CASE indexOf')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']

console.log(index1)
//[10,20,30,40,50]
console.log(index1.length)
//5

console.log(index3.indexOf(-3))
//2

console.log(index4)
//['hola',...]
console.log(index4.length)
//6
console.log(index4.indexOf('hola'))
//0
console.log(index4.indexOf('hola',2))
//5
console.log(index4.indexOf('nohay'))
//-1
console.log(index4.indexOf('buenas',3))
// -1 (porque empieza a contar desde el indice 3, que seria 7. Como 'buenas' va antes pues no lo pilla. -1)