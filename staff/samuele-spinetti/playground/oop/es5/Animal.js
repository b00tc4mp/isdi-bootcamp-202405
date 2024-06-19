function Animal(birthdate, name, surname, gender) {
    this.birthdate = birthdate
    this.name = name
    this.surname = surname
    this.gender = gender
}

Animal.prototype.complain = function () {
    return '😮 ehto ta mal'
}

Animal.prototype.eat = function () {
    return '😮 ' + food
}

Animal.prototype.poo = function () {
    return '😑 💩'
}

// overrides Object.prototype.toString
Animal.prototype.toString = function () {
    return Animal.name + ' { birthdate: ' + this.birthdate + ', name: ' + this.name + ', surname: ' + this.surname + ', gender: ' + this.gender + ' }'
}

module.exports = Animal

