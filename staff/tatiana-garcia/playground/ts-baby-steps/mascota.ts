interface Animal {
    nombre: string,
    edad: number
}

interface Mascota extends Animal {
    tipo: string,
    raza: string
}

const miMascota: Mascota = {
    nombre: 'Mimo',
    edad: 7,
    tipo: 'conejo',
    raza: 'Belier'
}

console.log(miMascota)

//interface que hereda, con objeto 