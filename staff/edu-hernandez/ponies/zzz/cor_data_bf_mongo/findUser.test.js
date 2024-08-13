import findUser from './findUser.js'

const rtapia = {
    name: 'Ricardo',
    surname: 'Tapia',
    email: 'ricardo@tapia.com',
    username: 'rtapia',
    password: '123123123'
}

findUser(user => user.username === 'rtapia')