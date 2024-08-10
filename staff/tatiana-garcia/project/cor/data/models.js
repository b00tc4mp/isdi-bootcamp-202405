import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types //?

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
        // default: poner un emoji gris de momento
    },
    city: {
        type: [String],
        required: true
    },
    description: {
        type: String,
    }
})

const User = model('User', user)

export {
    User
}