window.name = 'Window'

var o = {
    name: 'Oswald',

    salute: function (to) {
        return this.name + ': Hello, ' + to + '!'
    },

    /*
    salute: to => {
        return this.name + ': Hello, ' + to + '!'
    },
    */

    /*
    salute: function(to) {
        return this.name + ': Hello, ' + to + '!'
    }.bind(this),
    */

    add: function (a, b) {
        return this.name + ': ' + (a + b)
    }
}

console.log(o.salute('Angustias'))

var f = o.salute

console.log(f('Angustias'))

var r = {
    name: 'Roberta'
}

console.log(f.call(r, 'Angustias'))
console.log(f.apply(r, ['Angustias']))

var f2 = f.bind(r)

console.log(f2('Angustias'))

function bind(funktion, context) {
    return function () {
        // return funktion.apply(context, arguments)
        return funktion.call(context, ...arguments) // es6
    }
}

var f3 = bind(f, r)

console.log(f3('Angustias'))

console.log(o.add(1, 2))

var f4 = o.add.bind(r)

console.log(f4(1, 2))

var f5 = bind(o.add, r)

console.log(f5(1, 2))

var a = { name: 'Angustias' }

var f6 = f4.bind(a)

console.log(f6(1, 2))

var f7 = bind(f5, a)

console.log(f7(1, 2))

// Oswald: Hello, Angustias!
// VM4245:31 Window: Hello, Angustias!
// VM4245:37 Roberta: Hello, Angustias!
// VM4245:38 Roberta: Hello, Angustias!
// VM4245:42 Roberta: Hello, Angustias!
// VM4245:52 Roberta: Hello, Angustias!
// VM4245:54 Oswald: 3
// VM4245:58 Roberta: 3
// VM4245:62 Roberta: 3
// VM4245:68 Roberta: 3
// VM4245:72 Roberta: 3
































