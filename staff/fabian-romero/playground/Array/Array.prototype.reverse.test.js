console.log('TEST reverse in Arrays')

console.log('CASE reverse')

//Invierte una matriz en su lugar y devuelve la referencia a la misma arrays, el primer elemento del array ahora se convierte en el último y el último elemento del array se convierte en el primero.

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'parkguell'];

console.log(barcelona.reverse()) // me lo enseña al reves, no tiene más ciencia.



console.info('CASE reverse in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.reverse()

console.assert(animals2[0] === 'Elephant', 'animals2 at 0 is Elephant')
console.assert(animals2[1] === 'Dodo', 'animals2 at 1 is Dodo')
console.assert(animals2[2] === 'Penguin', 'animals2 at 2 is Penguin')
console.assert(animals2[3] === 'Tiger', 'animals2 at 3 is Tiger')
console.assert(animals2[4] === 'Dodo', 'animals2 at 4 is Dodo')