import fs from 'fs'

//const fs = require('fs)

const users = []

const alberto = {
    name: 'alberto',
    surname: 'garcia',
    email: 'alberto@garcia.com',
    username: 'abtg',
    password: '123123123'
}

const tati = {
    name: 'tatiana',
    surname: 'garcia',
    email: 'tati@garcia.com',
    username: 'tatig',
    password: '123123123'

}

const lili = {
    name: 'liliana',
    surname: 'daponte',
    email: 'lili@daponte.com',
    username: 'lili',
    password: '123123123'
}

users.push(alberto)
users.push(tati)
users.push(lili)

const usersJSON = JSON.stringify(users)

console.log('userJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('userJSON2', usersJSON2)