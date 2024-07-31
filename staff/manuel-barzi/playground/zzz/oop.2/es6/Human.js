class Human {
    constructor(birthdate, name, surname, gender) {
        this.birthdate = birthdate
        this.name = name
        this.surname = surname
        this.gender = gender
    }

    complain() {
        return '😮 ehto ta mal'
    }

    eat(food) {
        return '😮 ' + food
    }

    poo() {
        return '😑 💩'
    }

}

module.exports = Human