import registerUser from './registerUser.js'

const user = {
    name: 'valenti',
    surname: 'herms',
    email: 'val@herms.com',
    username: 'val',
    password: '11111111',
    yourPosts: [],
    likedPosts: [],
    savedPosts: [],
    followers: [],
    following: [],
    avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
}

registerUser(user.name, user.surname, user.email, user.username, user.password, user.password)

console.log(post)