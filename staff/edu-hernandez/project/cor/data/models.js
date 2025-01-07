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
        default: '/avatar/avatarIcon.png'
    },
    going: {
        type: [ObjectId],
        default: [],
        ref: 'Event'
    },
    fav: {
        type: [ObjectId],
        ref: 'Event'
    },
    following: {
        type: [ObjectId],
        required: false
    }
})

const point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

const location = new Schema({
    type: {
        type: point,
        required: true
    },
})

const event = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
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
    contactUrl: {
        type: String,
        required: false
    },
    location: {
        type: point,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    going: {
        type: [ObjectId],
        default: [],
        ref: 'User',
    },
    reviews: [{
        author: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            maxlength: 250
        }
    }]
})

const comment = new Schema({
    author: {
        type: String,
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
    post: {
        type: ObjectId,
        ref: 'Event'
    }
})

const city = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    population: {
        type: Number
    },
    location: {
        type: location,
        required: true
    },
    events: {
        type: [ObjectId],
        ref: 'Event'
    }
})

const User = model('User', user)
const Event = model('Event', event)
const Comment = model('Comment', comment)
const Location = model('Location', point)
const City = model('City', city)

export {
    User,
    Event,
    Comment,
    Location,
    City
}