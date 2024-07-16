import updateUser from './updateUser.js'

const lucas = {
    name: 'Lucas',
    surname: 'Rodriguez',
    email: 'lucas@rodriguez.com',
    username: 'lucasrodriguez',
    password: '123456789'
}

const tatiana = updateUser(user => user.username === 'tatianagarcia', lucas)

console.log(tatiana)