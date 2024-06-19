class Animal {
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
        return return '😮 ' + food
    }

    poo() {
        return '😑 💩'
    }

    // overrides Object.prototype.toString
    toString() {
        return Animal.name + ' { birthdate: ' + this.birthdate + ', name: ' + this.name + ', surname: ' + this.surname + ', gender: ' + this.gender + ' }'
    }
}

module.exports = Animal