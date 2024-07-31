//interface with optional property

type Cat = {
    name: string,
    age: number,
    color: string,
    meow?: boolean
}

function getCatData(cat: Cat) {
    return `Name: ${cat.name}, age: ${cat.age}, color: ${cat.color}, meow: ${cat.meow}`
}

const cat: Cat = {
    name: 'Lemmy',
    age: 11,
    color: 'brown',
    meow: true
}

console.log(getCatData(cat))