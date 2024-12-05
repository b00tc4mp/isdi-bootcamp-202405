
class Person {
    name: string
    surname: string
    age: number

    constructor(name: string, surname: string, age: number) {
        this.name = name
        this.surname = surname
        this.age = age
    }

    printPerson() {
        console.log('Name:', this.name)
        console.log('Surname:', this.surname)
        console.log('Age:', this.age)
    }
}

const people: Person[] = []

const person1 = new Person('Peter', 'Pan', 20)
const person2 = new Person('John', 'Doe', 30)
const person3 = new Person('Alice', 'Smith', 25)


people.push(person1)
people.push(person2)
people.push(person3)

console.log('All people:')

people.forEach(person => person.printPerson())