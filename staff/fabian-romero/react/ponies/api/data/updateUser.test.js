import updateUser from './updateUser.js'

const Valito = {

    "name": "Valentin",
    "surname": "Romero",
    "email": "valentin@romero.com",
    "username": "Valito",
    "password": "vali1234"

}

updateUser(user => user.username === 'Valentin', Valito)