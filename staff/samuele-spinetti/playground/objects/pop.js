console.log('TEST POP')

console.log('CASE pop the last element from array')

cars.pop = function () {

    delete this[this.length - 1]
    this.length -= 1
    return this.length
}
cars.pop()

cars.pop = function () {
    var lastElement = this[this.length - 1]

    delete this[--this.length]//

    return lastElement
}

cars.pop()

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3