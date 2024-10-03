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
        default: './music.png'
    },
    description: {
        type: String,
        default: ''
    },
    following: {
        type: [ObjectId],
        ref: 'User'
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

const point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: point,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    tickets: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

event.index({ location: '2dsphere' })

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

const chat = new Schema({
    participants: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: ObjectId,
        ref: 'Message'
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const message = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    chat: {
        type: ObjectId,
        required: true,
        ref: 'Chat'
    }
})

const User = model('User', user)
const Post = model('Post', post)
const Event = model('Event', event)
const Location = model('Location', point)
const Comment = model('Comment', comment)
const Message = model('Message', message)
const Chat = model('Chat', chat)

export {
    User,
    Post,
    Event,
    Location,
    Comment,
    Message,
    Chat
}