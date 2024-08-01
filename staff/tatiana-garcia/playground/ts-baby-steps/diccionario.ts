interface Diccionario {
    [clave: string]: string
}

const diccionarioEspañolIngles: Diccionario = {
    hola: 'hello',
    mundo: 'world',
    gracias: 'thank you',
    adios: 'goodby'
}

console.log(diccionarioEspañolIngles['hola'])
console.log(diccionarioEspañolIngles['gracias'])

// interfaz para definir un objeto con claves dinámicas.
