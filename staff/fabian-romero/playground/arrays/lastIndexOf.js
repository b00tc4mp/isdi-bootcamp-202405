console.log('TEST lastIndexOf')


console.log('CASE lastIndexOF in Arrays')

// Devuelve el último índice en el que se puede encontrar un elemento determinado en la matriz, o -1 si no está presente. 

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'agbar'];

console.log(barcelona.lastIndexOf('agbar')); // "4" me dice la posicion del ultimo, da igual que aparezca 3 veces en posiciones anteriores, la funcion es decirme en que posicion final de la array se encuentra.

console.log(barcelona.lastIndexOf('wella')); // "2"

var lastIndexOf = barcelona.lastIndexOf('sagrada') // manera más larga. // resultado 0 porque está en esa posicion 
console.log(lastIndexOf)