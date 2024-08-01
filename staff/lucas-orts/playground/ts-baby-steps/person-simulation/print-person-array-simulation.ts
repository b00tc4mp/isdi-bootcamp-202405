// Definimos la clase Person
class Persona {
    name: string;
    surname: string;
    age: number;

    constructor(name: string, surname: string, age: number) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    // Método para imprimir los datos de la persona
    printPerson() {
        console.log('Name:', this.name);
        console.log('Surname:', this.surname);
        console.log('Age:', this.age);
    }
}

// Array para almacenar las personas
const personas: Persona[] = [];

// Función para simular la lectura de entrada del usuario
function simulatePrompt(question: string): string {
    // Simulación de entrada del usuario para fines de demostración
    const simulatedAnswers = [
        'Peter',  // name
        'Pan',    // surname
        '20',     // age
        'no'      // add another person? (yes/no)
    ];

    let index = 0;

    console.log(question);

    // Devuelve la siguiente respuesta simulada
    return simulatedAnswers[index++];
}

// Función para preguntar al usuario y agregar una persona al array
function addPerson() {
    const name = simulatePrompt('Enter name: ');
    const personName = name || 'Unknown';

    const surname = simulatePrompt('Enter surname: ');
    const personSurname = surname || 'Unknown';

    const ageInput = simulatePrompt('Enter age: ');
    const age = parseInt(ageInput) || 0;

    const newPerson = new Person(personName, personSurname, age);
    people.push(newPerson);
    newPerson.printPerson();

    // Preguntar si se desea añadir otra persona
    const answer = simulatePrompt('Do you want to add another person? (yes/no): ');
    if (answer.toLowerCase() === 'yes') {
        addPerson(); // Añadir otra persona
    } else {
        console.log('All people:', people);
    }
}

// Comienza añadiendo la primera persona
addPerson();