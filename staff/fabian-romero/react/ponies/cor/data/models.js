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
        default: 'https://icons.iconarchive.com/icons/iconarchive/cute-animal/512/Cute-Horse-icon.png'
    },
    following: {
        type: [String]
    },
    favs: {
        type: [ObjectId]
    },
})

const post = new Schema({
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [String]
    }
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}