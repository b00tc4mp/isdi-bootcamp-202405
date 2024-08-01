function printPerson(person: { name: string, surname: string, age: number }) {
    console.log('name', person.name)
    console.log('surname', person.surname)
    console.log('age', person.age)
}

const peter = {
    name: 'Peter',
    surname: 'Pan',
    age: 20
}

printPerson(peter)