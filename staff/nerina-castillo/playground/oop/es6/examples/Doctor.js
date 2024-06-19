const Person = require("./Person");

class Doctor extends Person {
  constructor(name, surname, age, gender) {
    super(name, surname, age, gender);
  }

  heal() {
    return "🩺💉";
  }

  study(text) {
    return "📖 " + text;
  }

  toString() {
    return `{ Name: ${Doctor.name}, Surname: ${this.surname}, Age: ${this.age}, Gender: ${this.gender}}`;
  }
}
module.exports = Doctor;
