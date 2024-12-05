var Person = /** @class */ (function () {
    function Person(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    Person.prototype.printPerson = function () {
        console.log('Name:', this.name);
        console.log('Surname:', this.surname);
        console.log('Age:', this.age);
    };
    return Person;
}());
var people = [];
var person1 = new Person('Peter', 'Pan', 20);
var person2 = new Person('John', 'Doe', 30);
var person3 = new Person('Alice', 'Smith', 25);
people.push(person1);
people.push(person2);
people.push(person3);
console.log('All people:');
people.forEach(function (person) { return person.printPerson(); });
