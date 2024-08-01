function Person(name, surname, age, gender) {
  this.name = name;
  this.surname = surname;
  this.age = age;
  this.gender = gender;
}

Person.prototype.work = function (job) {
  return job;
};

Person.prototype.eat = function (food) {
  return food;
};

Person.prototype.drive = function (car) {
  return car;
};

Person.prototype.toString = function () {
  return `Name: ${Person.name}, Surname: ${this.surname}, Age: ${this.age}, Gender: ${this.gender}`;
};

module.exports = Person;
