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
    },
    favs: {
        type: [String],
        required: false
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

const newsArticle = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

healthCareProvider.index({ location: '2dsphere' })

const User = model('User', user)
const Location = model('Location', point)
const HealthCareProvider = model('HealthCareProvider', healthCareProvider)
const NewsArticle = model('NewsArticle', newsArticle)

export {
    User,
    Location,
    HealthCareProvider,
    NewsArticle
}