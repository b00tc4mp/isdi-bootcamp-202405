import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

import { User } from '../data/models.js'


mongoose.connect(process.env.MONGODB_URI)
    .then(() => bcrypt.hash('123123123', 8))
    .then(hash => User.create({ username: 'eden', email: 'marti@herms.com', password: hash }))
    .then(() => authenticateUser('eden', '123123123'))
    .then(userId => console.log('user authenticated', userId))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())