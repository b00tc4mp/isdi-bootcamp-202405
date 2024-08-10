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
        default: 'https://www.shutterstock.com/shutterstock/photos/1284452899/display_1500/stock-vector-illustrator-of-unicorn-cartoon-pony-horse-cartoon-dream-pastel-color-happy-unicorn-expressions-1284452899.jpg'
    },
    following: {
        type: [ObjectId],
        ref: 'User'
    },
    favs: {
        type: [ObjectId],
        ref: 'Post'
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
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
        type: [ObjectId],
        ref: 'User'
    }
})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}