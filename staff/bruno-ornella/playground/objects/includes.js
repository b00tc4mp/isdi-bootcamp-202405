console.log('CASE includes elements from objects')
// TODO implement case for includes 


var array1 = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

array1.includes = function (object) {
    for (i = 0; i < this.length; i++) {
        if (this[i] === object) {
            return true
        }
    }
    return false
}
console.log(array1.includes(2))
// true
console.log(array1.includes(8))
//false

console.log('CASE join elements from object')

var fruits = { 0: 'apple', 1: 'orange', 2: 'banana', 3: 'pinapple', 4: 'watermelon', length: 5 }

console.log(fruits)
// {0: 'apple', 1: 'orange', 2: 'banana', 3: 'pinapple', 4: 'watermelon', length: 5}

fruits.join = function () {

}

var joined = fruits.join()

console.log(joined)
//apple,orange,banana,pinapple,watermelon
