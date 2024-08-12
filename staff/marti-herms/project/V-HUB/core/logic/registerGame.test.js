import 'dotenv/config'
import { User, Game } from '../data/models.js'

import registerGame from './registerGame.js'

import mongoose from 'mongoose'

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' }))
    .then(user => registerGame(user.id, 'candy crush', img, 'candy crush game broh', link))
    .then(() => console.log('game registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())