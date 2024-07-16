import updateUser from './updateUser.js'

const user = {
    name: "marti",
    surname: "herms",
    email: "marti@herms.com",
    username: "Eden",
    password: "11111111",
    likedPosts: [
        "olzkh3ya8hs",
        "iz8vnuu9xxk",
        "pnh3hr39ljk",
        "h6e5w1v00xk",
        "2kpksv8mgl4"
    ],
    yourPosts: [
        "olzkh3ya8hs",
        "iz8vnuu9xxk",
        "h6e5w1v00xk",
        "2kpksv8mgl4"
    ],
    savedPosts: [
        "olzkh3ya8hs",
        "h6e5w1v00xk"
    ],
    followers: [
        "umat",
        "samu"
    ],
    following: [
        "umat",
        "samu"
    ],
    avatar: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjRqZTNnbDg4bWkxY2ttb2MzMzRwZXA4c2hicmhpOWJwejJnNjR3NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7TTgV830a3luvc0FbJ/giphy.gif"
}

updateUser((_user => _user.username === user.username), user)