function Animal(birthdate, name, surname, gender) {
    this.birthdate = birthdate
    this.name = name
    this.surname = surname
    this.gender = gender
}

Animal.prototype.complain = function () {
    return '😮 ehto ta mal'
}

Animal.prototype.eat = function (food) {
    return '😮 ' + food
}

Animal.prototype.poo = function () {
    return '😑 💩'
}

module.exports = Animal