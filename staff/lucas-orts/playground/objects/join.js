console.log(`CASE join from object`)

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.join = function (separator = ',') {
    var result = ''

    for (var i = 0; i < this.length; i++) {
        if (i > 0) {
            result += separator
        }
        result += this[i]
    }

    return result
}

console.log(beasts.join('-')) // Output: "ant-bison-camel-duck-bison"
console.log(beasts.join()) // Output: "ant,bison,camel,duck,bison"
