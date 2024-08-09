import fs from 'fs'

const users= []


const julito ={
    name:'Julito',
    surname:'Camelas',
    email: 'julito@camelas.com',
    username:'julitoCamelas',
    password: 'julito123',
    post: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDB6czQ0bjk4dXF5ZXZxY2Y3ODEzdjJ5MWJ5MG1tazNtZWpldTZtdyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/2bJWG8k0HAktq/giphy.gif'
}

const cauliflower ={
    name:'Cauli',
    surname:'Flower',
    email: 'cauli@flower.com',
    username:'cauliFlower',
    password: 'cauliflower4',
    post: 'https://media.giphy.com/media/mLZ6kvGkH31z0BAKUX/giphy.gif?cid=790b7611t0zs44n98uqyevqcf7813v2y1by0mmk3mejeu6mw&ep=v1_gifs_trending&rid=giphy.gif&ct=g'
}

const maxpower ={
    name:'Max',
    surname:'Power',
    email: 'max@power.com',
    username:'maxPower',
    password: 'maxpower1',
    post: 'https://media.giphy.com/media/g5R9dok94mrIvplmZd/giphy.gif?cid=790b7611t0zs44n98uqyevqcf7813v2y1by0mmk3mejeu6mw&ep=v1_gifs_trending&rid=giphy.gif&ct=g'
}



users.push(julito)
users.push(cauliflower)
users.push(maxpower)

const usersJSON = JSON.stringify(users)

console.log('userJSON', usersJSON)

fs.writeFileSync('./users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)


const posts =[]

const post1 = {
    image: 'https://media.giphy.com/media/g5R9dok94mrIvplmZd/giphy.gif?cid=790b7611t0zs44n98uqyevqcf7813v2y1by0mmk3mejeu6mw&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
    author: 'maxPower',
    id: "onlstpoafkw",
  };
  const post2 = {
    image: 'https://media.giphy.com/media/mLZ6kvGkH31z0BAKUX/giphy.gif?cid=790b7611t0zs44n98uqyevqcf7813v2y1by0mmk3mejeu6mw&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
    author: 'cauliFlower',
    id: "2cxgeu12zsw0",
  };

  const post3 = {
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDB6czQ0bjk4dXF5ZXZxY2Y3ODEzdjJ5MWJ5MG1tazNtZWpldTZtdyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/2bJWG8k0HAktq/giphy.gif',
    author: 'julitoCamelas',
    id: "3fswobxum9q0",
  };

  posts.push(post1)
posts.push(post2)
posts.push(post3)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync('./data/posts.json', postsJSON)

const postsJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('postsJSON2', postsJSON2)