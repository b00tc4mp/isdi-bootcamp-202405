import updateUser from './updateUser.js'

const eduhv = {
    name: 'Edu',
    surname: 'Hernández',
    email: 'edu@hdz.com',
    username: 'eduhv',
    password: '123123123'
}

updateUser(user => user.username === 'dudu', eduhv)