import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

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
        default: [],
        ref: 'Post'
    },
    likes: {
        type: [ObjectId],
        default: [],
        ref: 'Post'
    },
    favs: {
        type: [ObjectId],
        default: [],
        ref: 'Post'
    },
    followers: {
        type: [ObjectId],
        default: [],
        ref: 'User'
    },
    following: {
        type: [ObjectId],
        default: [],
        ref: 'User'
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
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [ObjectId],
        default: [],
        ref: 'User'
    }
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}