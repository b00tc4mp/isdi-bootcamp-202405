import { Schema, Types, model } from 'mongoose'

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
    cif: {
        type: String,
    },
    image: {
        type: String
    },
    city: {
        type: String
    }

})

const petsitter = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    petsitterName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    pets: {
        type: [String]
    }

})

const User = model('User', user)
const Petsitter = model('Petsitter', petsitter)

export {
    User,
    Petsitter
}