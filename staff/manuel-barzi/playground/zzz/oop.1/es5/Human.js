function Human(birthdate, name, surname, gender) {
    this.birthdate = birthdate
    this.name = name
    this.surname = surname
    this.gender = gender
}

Human.prototype.complain = function () {
    return '😮 ehto ta mal'
}

Human.prototype.eat = function (food) {
    return '😮 ' + food
}

Human.prototype.poo = function () {
    return '😑 💩'
}

module.exports = Human