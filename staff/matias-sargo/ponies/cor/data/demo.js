import fs from 'fs'
// const fs = require('fs')

const users = []

const user1 = {
name: 'matias',
 surname: 'Sargo',
  email: 'matisargo@gmail.com',
  username: 'matif',
   password: '123456123456',
}
const user2 = {
name: 'mamo',
 surname: 'racho',
  email: 'mamo@racho.com',
   username: 'mamoracho',
    password: '123456123456',
}

users.push(user1)
users.push(user2)


const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)


const posts = []


const post1 = {

    id: '2nw3uw9axfi',
    image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjEx…5hbF9naWZfYnlfaWQmY3Q9Zw/bfd8hxbntgfBu/giphy.webp',
    caption: 'de',
    author: 'matif', 
    date: '2024-07-11T13:18:15.285Z'
}

const post2 = {

    id: 'hjrffljuv00',
    image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjEx…5hbF9naWZfYnlfaWQmY3Q9Zw/IlgotPIU8zWBW/giphy.webp',
    caption: 'de',
    author: 'matif',
    date: '2024-07-11T13:18:25.368Z',
}

const post3 = {

id: 'av5hkj8l780',
 image: 'https://media.giphy.com/media/mLZ6kvGkH31z0BAKUX/g…03w5jcthlc&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
  caption: 'juernes',
   author: 'mamoracho',
    date: '2024-07-11T13:19:38.661Z',
}

posts.push(post1)
posts.push(post2)
posts.push(post3)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync('./data/posts.json', postsJSON)

const postsJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('postsJSON2', postsJSON2)




