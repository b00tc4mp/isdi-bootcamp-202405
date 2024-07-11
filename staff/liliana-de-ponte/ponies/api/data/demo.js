import fs from 'fs'

const users = []

const liliana = {
    name: 'Liliana',
    surname: 'De Ponte',
    email: 'lili@deponte.com',
    username: 'lilideponte',
    password: '123456789'
}

const samuele = {
    name: 'Samuele',
    surname: 'Spinetti',
    email: 'samuele@spinetti.com',
    username: 'samuelespinetti',
    password: '123456789'
}

const tatiana = {
    name: 'Tatiana',
    surname: 'Garcia',
    email: 'tatiana@garcia.com',
    username: 'tatianagarcia',
    password: '123456789'
}

const fabian = {
    name: 'Fabian',
    surname: 'Romero',
    email: 'fabian@romero.com',
    username: 'fabianromero',
    password: '123456789'
}

users.push(liliana)
users.push(samuele)
users.push(tatiana)
users.push(fabian)

const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)

const posts = []

const post1 = {
    author: "lilideponte",
    caption: "Fri-yay..",
    date: "2024-06-28T11:07:08.899Z",
    id: "onlstpoafkw",
    image: "https://media4.giphy.com/media/iG1DhZHNrOMObDNxgb/giphy.webp?cid=790b7611phw7xmfqnzf6cutq1xl6qlwt1r61ear7m0184syb&ep=v1_gifs_search&rid=giphy.webp&ct=g"
}

const post2 = {
    author: "samuelespinetti",
    caption: "Hello",
    date: "2024-06-21T11:07:08.899Z",
    id: "3fswobxum9q0",
    image: "https://media1.giphy.com/media/QxSSrQxSKaFECD7ywx/giphy.webp?cid=82a1493b6gf1qqoahwen6wob6oll8c8uo7gnqajd01d16erk&ep=v1_gifs_trending&rid=giphy.webp&ct=g"
}

const post3 = {
    author: "lilideponte",
    caption: "Jueves",
    date: "2024-06-22T11:07:08.899Z",
    id: "2cxgeu12zsw0",
    image:
        "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g"
}


posts.push(post1)
posts.push(post2)
posts.push(post3)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync('./data/posts.json', postsJSON)

const postsJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('postsJSON2', postsJSON2)