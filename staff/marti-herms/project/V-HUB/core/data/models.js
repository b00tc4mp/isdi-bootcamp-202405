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
        type: String
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
    },
    following: {
        type: [ObjectId],
        ref: 'User'
    },
    followers: {
        type: [ObjectId],
        ref: 'User'
    }
})

const game = new Schema({
    enabled: {
        type: Boolean,
        default: false
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
const Game = model('Game', game)
const Review = model('Review', review)

export {
    User,
    Game,
    Review
}