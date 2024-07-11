import fs from 'fs'
// const fs = require('fs')

const users = []

const caca = {
    name: 'Caca',
    surname: 'Tua',
    email: 'caca@tua.com',
    username: 'cacatua',
    password: '123123123'
}

const pon = {
    name: 'Pon',
    surname: 'Un',
    email: 'pon@un.com',
    username: 'ponun',
    password: '123123123'
}

const ta = {
    name: 'Ta',
    surname: 'Guapo',
    email: 'ta@guapo.com',
    username: 'taguapo',
    password: '123123123'
}

users.push(caca)
users.push(pon)
users.push(ta)

const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)



