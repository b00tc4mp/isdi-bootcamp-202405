import { Schema, model, Types } from 'mongoose'
import mongoose from 'mongoose'

const { ObjectId } = Schema.Types

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    email: {
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
        default: 'https://i1.wp.com/mediamaniaonline.com/wp-content/uploads/2019/05/cropped-vinyl-icon-black-33.png?fit=512%2C512&ssl=1'
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
        default: null
    },
    text: {
        type: String,
        default: null
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

const event = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String
    },
    location: {
        type: [Number, Number],
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const comment = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    post: {
        type: ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const Post = model('Post', post)
const Event = model('Event', event)
const Comment = model('Comment', comment)

export {
    User,
    Post,
    Event,
    Comment
}