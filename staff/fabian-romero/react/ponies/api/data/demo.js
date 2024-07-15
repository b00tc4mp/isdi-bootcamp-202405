import fs from 'fs'

const users = [] // aqui es paras cargar la info en tu local

const Fabian = {
    name: 'Fabian',
    surname: 'Romero',
    email: 'fabian@romero.com',
    username: 'Fabito',
    password: 'fabi1234'
}

const Valentin = {
    name: 'Valentin',
    surname: 'Romero',
    email: 'valentin@romero.com',
    username: 'Valito',
    password: 'vali1234'
}

users.push(Fabian) // aqui los pusheo' para añadirlos a las arrys vacias en caso de pedirlos en alguna funcion
users.push(Valentin)


const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)

const posts = []

const post1 = {

    author: "Fabito",
    caption: "TOT EL DIA!!",
    date: "2024-07-10T12:42:54.986Z",
    id: "gho3apb3njs",
    image: "https://media.tenor.com/LLTYGBtru5kAAAAM/mila-stauffer-whatever.gif"
}

const post2 = {
    author: "Valito",
    caption: "ÑamÑam!",
    date: "2024-07-11T09:41:57.634Z",
    id: "gud3txmwlqo",
    image: "https://media.tenor.com/u3QduFHVtJ8AAAAM/tacos-dog.gif"
}

posts.push(post1)
posts.push(post2)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync('./data/posts.json', postsJSON)

const postsJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('postsJSON2', postsJSON2)