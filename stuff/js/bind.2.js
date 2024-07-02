window.name = 'Window'

var o = {
    name: 'Oswald',

    salute: function (to) {
        return this.name + ': Hello, ' + to + '!'
    }

    /*
    salute: to => {
        return this.name + ': Hello, ' + to + '!'
    }
    */

    /*
    salute: function(to) {
        return this.name + ': Hello, ' + to + '!'
    }.bind(this)
    */
}

console.log(o.salute('Angustias'))

var f = o.salute

console.log(f('Angustias'))

var r = {
    name: 'Roberta'
}

console.log(f.call(r, 'Angustias'))
console.log(f.apply(r, ['Angustias']))
// VM2984:23 Oswald: Hello, Angustias!
// VM2984:27 Window: Hello, Angustias!
// VM2984:33 Roberta: Hello, Angustias!
// VM2984:34 Roberta: Hello, Angustias!