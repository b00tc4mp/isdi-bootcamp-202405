import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import updatePassword from './updatePassword.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        updatePassword('marco', '123123123', '123456789', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Password updated')

            client.close()
        })
    })
    .catch(error => console.error(error))