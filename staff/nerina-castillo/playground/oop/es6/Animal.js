class Animal {
  constructor(birthdate, name, surname, gender) {
    this.birthdate = birthdate;
    this.name = name;
    this.surname = surname;
    this.gender = gender;
  }

  complain = function () {
    return "😮 ehto ta mal";
  };

  eat = function (food) {
    return "😮 " + food;
  };

  poo = function () {
    return "😑 💩";
  };

  toString = function () {
    return (
      Animal.name +
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
  };
}

module.exports = Animal;
