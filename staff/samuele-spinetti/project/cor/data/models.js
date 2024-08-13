import { Schema, model } from 'mongoose'

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
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
        type: String
    }
})

const point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        defaul: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

const healthCareProvider = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    street: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    webURL: {
        type: String,
        required: true
    },
    openingHours: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    location: {
        type: point,
        required: true
    }
})

const User = model('User', user)
const Location = model('Location', point)
const HealthCareProvider = model('HealthCareProvider', healthCareProvider)

export {
    User,
    Location,
    HealthCareProvider
}