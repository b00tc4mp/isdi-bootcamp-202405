console.log('TEST AT')

console.log('CASE element at index')

var numeros = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(numeros)
// { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
console.log(numeros.length)
// 5

numeros.at = function (index) {
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]

}

var num = numeros.at(3)

console.log(num)
// 130

var num = numeros.at(-3)

console.log(num)
// 8