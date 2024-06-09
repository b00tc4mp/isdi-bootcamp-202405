console.log('TEST shift')

console.log('CASE shift first element from objects')

var names = { 0: 'laura', 1: 'juan', 2: 'nuria', 3: 'jose', 4: 'jesus', length: 5 }

names.shift = function () {

    var deletedName = this[0]

    for (var index = 0; index < this.length - 1; index++) {

        this[index] = this[index + 1]

    }

    delete this[this.length - 1]
    this.length--;

    return deletedName
}

console.log(names.shift())
// 'laura'
console.log(names)
// {0: 'juan', 1: 'nuria', 2: 'jose', 3: 'jesus', length: 4}