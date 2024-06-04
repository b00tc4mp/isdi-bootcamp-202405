console.log('CASE lastIndexOf')

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']

console.log(index2.lastIndexOf(70))
//1
console.log(index4.lastIndexOf('hola',2))
//0
console.log(index3.lastIndexOf(6,2))
//-1
console.log(index3.lastIndexOf(-2,1))
//1

var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index5.lastIndexOf(7))
//7
console.log(index5.lastIndexOf(3,5))
//1

console.log(index5.lastIndexOf(1,-3))
//2