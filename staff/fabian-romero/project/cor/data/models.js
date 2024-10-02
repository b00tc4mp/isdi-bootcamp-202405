import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
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
        default: 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-lightning-icon-png-free-buckle-pattern-image_2283126.jpg'
    },
    role: {
        type: String,
        enum: ['project', 'investor'],
        required: true,
        default: 'investor'
    },

    title: {
        type: String,
    },

    phoneNumber: {
        type: String,
    },

    image: {
        type: String,
        require: true,

    },

    description: {
        type: String,
    },

    category: {
        type: String,

    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    budgetGoal: {
        type: Number,
    },

    bank: {
        type: String,
    },

    match: {
        type: [ObjectId],
        ref: 'User',
    },

    likes: {
        type: [ObjectId],
        ref: 'User',
    },
})

const chat = new Schema({
    participants: [{
        type: ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: ObjectId,
        ref: 'Message'
    }],
    date: {
        type: Date,
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


const User = model('User', userSchema)
const Chat = model('Chat', chat)
const Message = model('Message', message)


export {
    User,
    Chat,
    Message

}