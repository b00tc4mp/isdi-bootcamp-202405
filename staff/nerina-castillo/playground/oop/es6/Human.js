const Animal = require("./Animal");

class Human extends Animal {
  constructor(birthdate, name, surname, gender) {
    super(birthdate, name, surname, gender);
  }

  add(a, b) {
    return a + b;
  }

  read(text) {
    return "🤓 " + text;
  }

  toString() {
    return (
      Human.name +
      " { birthdate: " +
      this.birthdate +
      ", name: " +
      this.name +
      ", surname: " +
      this.surname +
      ", gender: " +
      this.gender +
      " }"
    );
  }
}

module.exports = Human;
