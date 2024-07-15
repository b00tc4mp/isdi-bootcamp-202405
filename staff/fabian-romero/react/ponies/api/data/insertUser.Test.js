import insertUser from './insertUser.js'

const user = {
    name: 'Fabian',
    surname: 'Romero',
    email: 'fabian@romero.com',
    username: 'Fabito',
    password: 'fabi1234'
}

insertUser(user)

// para probar los test tengo que abrir la consola y escribir

// node data/demo.js