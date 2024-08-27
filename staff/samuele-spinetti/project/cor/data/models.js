import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

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
        type: String,
    },
    favs: {
        type: [ObjectId],
        ref: 'NewsArticle'
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
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    publishedAt: {
        type: Date,
        required: true
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    caption: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    }
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
        ref: 'Post'
    }
})

const chat = new Schema({
    participants: {
        type: [ObjectId],
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const message = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    chat: {
        type: ObjectId,
        required: true,
        ref: 'Chat'
    }
})

healthCareProvider.index({ location: '2dsphere' })

const User = model('User', user)
const Location = model('Location', point)
const HealthCareProvider = model('HealthCareProvider', healthCareProvider)
const NewsArticle = model('NewsArticle', newsArticle)
const Post = model('Post', post)
const Comment = model('Comment', comment)
const Chat = model('Chat', chat)
const Message = model('Message', message)

export {
    User,
    Location,
    HealthCareProvider,
    NewsArticle,
    Post,
    Comment,
    Chat,
    Message
}