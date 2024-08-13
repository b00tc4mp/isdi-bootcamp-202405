import fs from 'fs'

const users = []

const samu = {
    name: 'Eduard',
    surname: 'Hernández',
    email: 'edu@hdz.com',
    username: 'eduhv',
    password: '123123123'
}

const nico = {
    name: 'Lucas',
    surname: 'Orts',
    email: 'lucas@sorts.com',
    username: 'lucas',
    password: '123123123'
}

const cami = {
    name: 'Ricardo',
    surname: 'Tapia',
    email: 'ricardo@tapia.com',
    username: 'rtapia',
    password: '123123123'
}

users.push(eduhv)
users.push(lucas)
users.push(rtapia)

const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync(`${__dirname}/users.json`, usersJSON)

const usersJSON2 = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

console.log('usersJSON2', usersJSON2)

const posts = []

const post1 = {
    id: 'randomId_1',
    author: 'eduhv',
    date: '12-07-2024',
    caption: 'Friyay',
    image: 'https://randomUrl'
}

const post2 = {
    id: 'randomId_2',
    author: 'rtapia',
    date: '12-07-2024',
    caption: 'St.Patrick',
    image: 'https://randomUrl'
}

posts.push(post1)
posts.push(post2)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync(`${__dirname}/posts.json`, postsJSON)

const postsJSON2 = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

console.log('postsJSON2', postsJSON2)