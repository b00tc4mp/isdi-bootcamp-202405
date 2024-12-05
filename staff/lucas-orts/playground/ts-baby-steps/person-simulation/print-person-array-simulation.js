// Definimos la clase Person
var Person = /** @class */ (function () {
    function Person(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    // Método para imprimir los datos de la persona
    Person.prototype.printPerson = function () {
        console.log('Name:', this.name);
        console.log('Surname:', this.surname);
        console.log('Age:', this.age);
    };
    return Person;
}());
// Array para almacenar las personas
var people = [];
// Función para simular la lectura de entrada del usuario
function simulatePrompt(question) {
    // Simulación de entrada del usuario para fines de demostración
    var simulatedAnswers = [
        'Peter', // name
        'Pan', // surname
        '20', // age
        'no' // add another person? (yes/no)
    ];
    var index = 0;
    console.log(question);
    // Devuelve la siguiente respuesta simulada
    return simulatedAnswers[index++];
}
// Función para preguntar al usuario y agregar una persona al array
function addPerson() {
    var name = simulatePrompt('Enter name: ');
    var personName = name || 'Unknown';
    var surname = simulatePrompt('Enter surname: ');
    var personSurname = surname || 'Unknown';
    var ageInput = simulatePrompt('Enter age: ');
    var age = parseInt(ageInput) || 0;
    var newPerson = new Person(personName, personSurname, age);
    people.push(newPerson);
    newPerson.printPerson();
    // Preguntar si se desea añadir otra persona
    var answer = simulatePrompt('Do you want to add another person? (yes/no): ');
    if (answer.toLowerCase() === 'yes') {
        addPerson(); // Añadir otra persona
    }
    else {
        console.log('All people:', people);
    }
}
// Comienza añadiendo la primera persona
addPerson();
