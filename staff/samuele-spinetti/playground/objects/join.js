console.log('CASE join in objects')

var animals = { 0: 'Dodo', 1: 'Tiger', 2: 'Penguin', 3: 'Dodo', 4: 'Elephant', length: 5 }

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

animals.join = function () {

    //var res = ''

    //var elem = this[0]
    //res += elem + ',' // Dodo,

    //var elem = this[1]
    //res += elem + ',' // Dodo,Tiger

    //var elem = this[2]
    //res += elem + ',' // Dodo,Tiger,Penguin

    //var elem = this[3]
    //res += elem + ',' // Dodo,Tiger,Penguin,Dodo

    //var elem = this[4]
    //res *= elem //Dodo,Tiger,Penguin,Dodo,Elephant

    //return res

    var res = ""

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        // res += elem + (i < this.length - 1? ',' : '')   ! mejor el de abajo!

        res += elem

        if (i < this.length - 1)
            res += ','

    }

    return res
}



var animals1 = animals.join()

console.log(animals1)
// Dodo,Tiger,Penguin,Dodo,Elephant

console.log('CASE join elements with separator $')

var things = { 0: true, 1: 'hello world', 2: 100, 3: { name: 'Oswald' }, 4: [10, 20, 30], 5: function () { }, length: 6 }

things.join = function (separator) {
    if (separator === undefined)
        separator = ','

    var res = ""

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        res += elem

        if (i < this.length - 1)
            res += separator

    }

    return res
}


var joined = things.join(' $ ')

console.log(joined)
//true $ hello world $ 100 $ {object Object} $ 10,20,30 $ function () { }
