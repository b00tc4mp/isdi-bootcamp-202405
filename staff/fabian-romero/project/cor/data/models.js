import { Schema, model } from 'mongoose'

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
        type: [String],
        ref: 'project',
    },

    likes: {
        type: [String],
        ref: 'project',
    },

    match: {
        type: [String],
        ref: 'inversor',
    },

    likes: {
        type: [String],
        ref: 'inversor',
    }
})

const User = model('User', userSchema)

export {
    User
}