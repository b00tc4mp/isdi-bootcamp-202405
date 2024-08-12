import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const user = new Schema({
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
    },
    role: {
        type: String,
        default: 'regular'
    },
    library: {
        type: [ObjectId],
        ref: 'Game'
    },
    favs: {
        type: [ObjectId],
        ref: 'Game'
    },
    games: {
        type: [ObjectId],
        ref: 'Game'
    }
})

const game = new Schema({
    enabled: {
        type: Boolean,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const review = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: ObjectId,
        ref: 'Game',
        required: true
    },
    rate: {
        type: Number,
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
const Game = model('Game', game)
const Review = model('Review', review)

export {
    User,
    Game,
    Review
}