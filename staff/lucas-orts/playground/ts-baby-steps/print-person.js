function printPerson(person) {
    console.log('name', person.name);
    console.log('surname', person.surname);
    console.log('age', person.age);
}
var peter = {
    name: 'Peter',
    surname: 'Pan',
    age: 20
};
printPerson(peter);
