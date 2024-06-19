class Person {
  constructor(name, surname, age, gender) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
  }

  work(job) {
    return job;
  }

  eat(food) {
    return food;
  }

  drive(car) {
    return car;
  }
  toString() {
    return `{ Name: ${Person.name}, Surname: ${this.surname}, Age: ${this.age}, Gender: ${this.gender} }`;
  }
}

module.exports = Person;
