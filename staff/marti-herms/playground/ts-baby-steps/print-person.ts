//objects

function printPerson(person: { name: string, surname: string, age: number }) {
    console.log('name', person.name)
    console.log('surname', person.surname)
    console.log('age', person.age)
}

const julito = {
    name: 'julito',
    surname: 'camelas',
    age: 24
}

printPerson(julito)