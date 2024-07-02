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
// VM2460:23 Oswald: Hello, Angustias!
// VM2460:27 Window: Hello, Angustias!
