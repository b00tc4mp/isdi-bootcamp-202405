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
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true

    },
    location: {
        type: point,
        required: true
    },
    attendees: {
        type: [ObjectId],
        ref: 'User'
    },

    likes: {
        type: [ObjectId],
        ref: 'Event'
    }
})

const User = model('User', user)
const Event = model('Event', event)
const Location = model('Location', point)

export {
    User,
    Event,
    Location
}