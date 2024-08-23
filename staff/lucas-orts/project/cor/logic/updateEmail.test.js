import 'dotenv/config'
import updateEmail from './updateEmail.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateEmail('66c7435ea25f13cef7c37a31', 'ester1@colero.com', '123123123'))
    .then(() => console.log('Email updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())