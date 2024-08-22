import { Schema, model } from 'mongoose'

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
        default: ['regular']
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

const User = model('User', user)

export {
    User
}