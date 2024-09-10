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
    minprice: {
        type: Number,
        required: true
    },
    maxprice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: point,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
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

const Location = model('Location', point)
const User = model('User', user)
const Product = model('Product', product)

export {
    User,
    Product,
    Location
}