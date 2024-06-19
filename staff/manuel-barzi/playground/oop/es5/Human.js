var Animal = require('./Animal')

function Human(birthdate, name, surname, gender) {
    Animal.call(this, birthdate, name, surname, gender)
}

//Human.prototype = new Animal
Human.prototype = Object.create(Animal.prototype)
Human.prototype.constructor = Human

Human.prototype.add = function (a, b) {
    return a + b
}

Human.prototype.read = function (text) {
    return '🤓 ' + text
}

// overrides Animal.prototype.toString
Human.prototype.toString = function () {
    return Human.name + ' { birthdate: ' + this.birthdate + ', name: ' + this.name + ', surname: ' + this.surname + ', gender: ' + this.gender + ' }'
}

module.exports = Human