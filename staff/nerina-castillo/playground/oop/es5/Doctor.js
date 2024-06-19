var Person = require("./Person");

function Doctor(name, surname, age, gender) {
  Person.call(this, name, surname, age, gender);
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.heal = function () {
  return "🩺💉";
};

Doctor.prototype.study = function (text) {
  return "📖 " + text;
};

Doctor.prototype.toString = function () {
  return `{ Name: ${Doctor.name}, Surname: ${this.surname}, Age: ${this.age}, Gender: ${this.gender}}`;
};

module.exports = Doctor;
