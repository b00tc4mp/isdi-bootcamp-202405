import { Schema, model, Types } from 'mongoose'

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
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        // },
        // location: {
        //     type: [Number],
        //     validate: {
        //         validator: function (arr) {
        //             return arr.length === 2
        //         },
        //         message: 'The array must contain exactly two numbers.'
        //     }
    }
})

const product = new Schema({
    farmer: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    minprize: {
        type: Number,
        required: true
    },
    maxprize: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // location: {
    //     type: [Number],
    //     validate: {
    //         validator: function (arr) {
    //             return arr.length === 2
    //         },
    //         message: 'The array must contain exactly two numbers.'
    //     }
    // },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    }
})

const User = model('User', user)
const Product = model('Product', product)

export {
    User,
    Product
}