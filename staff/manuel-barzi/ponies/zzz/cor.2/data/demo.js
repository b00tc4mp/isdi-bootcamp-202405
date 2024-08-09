import fs from 'fs'

const users = []

const samu = {
    name: 'Samuele',
    surname: 'Spinetti',
    email: 'samuele@spinetti.com',
    username: 'samu',
    password: '123123123'
}

const nico = {
    name: 'Niccolo',
    surname: 'Spinetti',
    email: 'niccolo@spinetti.com',
    username: 'nico',
    password: '123123123'
}

const cami = {
    name: 'Camilla',
    surname: 'Spinetti',
    email: 'camilla@spinetti.com',
    username: 'cami',
    password: '123123123'
}

users.push(samu)
users.push(nico)
users.push(cami)

const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync(`${__dirname}/users.json`, usersJSON)

const usersJSON2 = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

console.log('usersJSON2', usersJSON2)

const posts = []

const post1 = {
    id: 'abcdefghi',
    author: 'samu',
    date: '11-07-2024',
    caption: 'Hello',
    image: 'https://njebvbeviobvo'
}

const post2 = {
    id: 'abcdefghl',
    author: 'cami',
    date: '11-07-2024',
    caption: 'Hello',
    image: 'https://njebvbeviobvb'
}

posts.push(post1)
posts.push(post2)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync(`${__dirname}/posts.json`, postsJSON)

const postsJSON2 = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

console.log('postsJSON2', postsJSON2)