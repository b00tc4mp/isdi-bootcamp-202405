import updateUser from './updateUser.js'

const nitro = {
    name: 'ni',
    surname: 'tro',
    email: 'ni@tro.com',
    username: 'nitro',
    password: '123456123456'
}

const matias = updateUser(user => user.username === 'matias', nitro)

console.log(matias) 