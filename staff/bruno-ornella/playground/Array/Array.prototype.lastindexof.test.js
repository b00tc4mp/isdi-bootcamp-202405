console.info('CASE element at lastIndexOf')

var zoo = ['Giraffe', 'Tiger', 'Penguin', 'Giraffe'];

var lastIndexOfZoo = zoo.lastIndexOf('Giraffe')
console.assert(lastIndexOfZoo === 3, 'lastIndexOfZoo is equal to 3')

var lastIndexOfZoo1 = (zoo.lastIndexOf('Tiger'))
console.assert(lastIndexOfZoo1 === 1, 'lastIndexOfZoo1 is equal to 1')

var lastIndexoOfZoo2 = zoo.lastIndexOf('Giraffe', 2)
console.assert(lastIndexoOfZoo2 === 0, 'lastIndexOfZoo2 is equal to 0')

var lastIndexOfZoo3 = zoo.lastIndexOf('Giraffe', -2)
console.assert(lastIndexOfZoo3 === 0, 'lastIndexOfZoo is equal to 0')
