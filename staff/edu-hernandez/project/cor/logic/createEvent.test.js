import 'dotenv/config'
import createEvent from './createEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createEvent(
        '66fa92c16018e425775d4c35',
        'Test from Cor, createEvent.js',
        'https://randomImage.png',
        'caption test from logic/cor',
        new Date(),
        {
            type: 'Point',
            coordinates: [41.3874, 2.1686]
        },
        '18:00'))
    .then(event => console.log(event))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())