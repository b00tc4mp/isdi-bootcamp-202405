console.log('CASE shift first element from objects')

var names = { 0: 'laura', 1: 'juan', 2: 'nuria', 3: 'jose', 4: 'jesus', length: 5 }

names.shift = function () {
    var daleteName = this.length[0]

    for (var i = 0; i < this.length - 1; i++) {         //dudasss
        this[i] = this[i] + 1

    }
    delete this[this.length - 1]
    this.length--
    return daleteName

}                                                        //NO FUNCIONA
var names1 = names.shift()

console.log(names)
//['juan', 'nuria', 'jose', 'jesus']
console.log(names1)
// laura
