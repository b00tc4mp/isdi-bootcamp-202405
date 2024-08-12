import 'dotenv/config'
import bcrypt from 'bcryptjs'

import getUserUsername from './getUserUsername'

import { User } from '../data/models'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => bcrypt.hash('123123123', 8))
    .then(hash => User.create({ username: 'eden', email: 'marti@herms.com', password: hash }))
    .then(user => getUserUsername(user.id, user.id))
    .then(username => console.log('username: ', username))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())