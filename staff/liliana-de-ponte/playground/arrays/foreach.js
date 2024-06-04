console.log('CASE forEach in array')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach((element, index) => console.log(`El número en el indice ${index} es el número ${element}`))

// El número en el indice 0 es el número 1
// El número en el indice 1 es el número 2
// El número en el indice 2 es el número 3
// El número en el indice 3 es el número 4
// El número en el indice 4 es el número 5
// El número en el indice 5 es el número 6
// El número en el indice 6 es el número 7
// El número en el indice 7 es el número 8
// El número en el indice 8 es el número 9
// El número en el indice 9 es el número 10

console.log('CASE second test')

var lili = function (element, index) {
    console.log(`El número en el indice ${index} es el número ${element}`)
}

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach(lili)

// El número en el indice 0 es el número 1
// El número en el indice 1 es el número 2
// El número en el indice 2 es el número 3
// El número en el indice 3 es el número 4
// El número en el indice 4 es el número 5
// El número en el indice 5 es el número 6
// El número en el indice 6 es el número 7
// El número en el indice 7 es el número 8
// El número en el indice 8 es el número 9
// El número en el indice 9 es el número 10

var persons = ['Paco', 'Pep', 'Maria']

persons.forEach(function (person, currentIndex, personArray) {
    console.log(`Register number: ${currentIndex} name: ${person} list: ${personArray}`)
})

// Register number: 0 name: Paco all names: Paco,Pep,Maria
// Register number: 1 name: Pep all names: Paco,Pep,Maria
// Register number: 2 name: Maria all names: Paco,Pep,Maria