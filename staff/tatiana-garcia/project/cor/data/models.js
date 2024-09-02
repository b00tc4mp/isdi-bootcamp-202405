import { Schema, Types, model } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactEmail: {
        type: String,
        required: false
    },
    linkPage: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String
    },
    city: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'petsitter'],
        default: 'regular'
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    pets: {
        type: [String]
    }

})

const review = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    petsitter: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const Review = model('Review', review)

export {
    User,
    Review
}