console.log('TEST join')

console.log('CASE join elements from objects')

var obj = { 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 };

console.log(obj)
//{ 0: 'Fire', 1: 'Air', 2: 'Water', length: 3 }

obj.join = function () {
    // var res = ''
    // var elem = this[0]
    // res += elem + ',' //Fire,
    // var elem= this[1]
    // res += elem + ',' //Fire,Air,
    // var elem = this[2] //Water
    // res+= elem //Fire,Air,Water
    //return res
    var res = ''
    for (var i = 0; i < this.length; i++) {
        var elem = this[i]
        res += elem
        if (i < this.length - 1)
            res += elem + ','
        //res += elem + (i < this.length - 1 ? ',' : '')

    }
    return res
}

var join = obj.join()

console.log(join);
//"Fire,Air,Water"

console.log('CASE join elements with separator $')

var things = { 0: true, 1: 'hello world', 2: 100, 3: { name: 'Oswald' }, 4: [10, 20, 30], 5: function () { }, length: 6 }

things.join = function (separator) {
    if (separator === undefined)
        separator = ','

    var res = ''

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
//true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
//true,hello world,100,[object Object],10,20,30,function () { }
