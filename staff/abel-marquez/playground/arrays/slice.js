console.log('CASE slice()') // (start,end) 

var index1 = [10,20,30,40,50]
var index2 = [60,70,80,90,100]
var index3 = [-1,-2,-3,-4,-5]
var index4 = ['hola','adios','buenas',7,8,'hola']
var index5 = [1,3,1,6,7,2,2,7,6]

console.log(index1.slice(1,4))
//[20,30,40] (coge la posicion indice 1 que es 20 y el 4 que es 50 no lo pone pero lo anterior si.)
console.log(index4.slice(-4,-2))
//['buenas,7]
console.log(index5.slice(2,-1))
// [1,6,7,2,2,7]