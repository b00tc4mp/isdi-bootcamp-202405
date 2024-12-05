import { Schema, model, ObjectId } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
    },
    posts: {
        type: [ObjectId],
        default: []
    },
    likes: {
        type: [ObjectId],
        default: []
    },
    favs: {
        type: [ObjectId],
        default: []
    },
    followers: {
        type: [ObjectId],
        default: []
    },
    following: {
        type: [ObjectId],
        default: []
    }
})

const post = new Schema({
    img: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    author: {
        type: ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [ObjectId],
        default: []
    }
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}