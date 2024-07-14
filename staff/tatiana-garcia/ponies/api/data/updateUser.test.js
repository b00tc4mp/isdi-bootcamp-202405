import updateUser from './updateUser.js'

const user = {
    "name": "liliana",
    "surname": "daponte",
    "email": "lili@daponte.com",
    "username": "lilidaponte",
    "password": "123123123"

}

updateUser(user => user.name === 'lili', user)