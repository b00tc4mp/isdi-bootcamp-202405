import authenticateUser from './authenticateUser.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {
        console.log('conected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        authenticateUser('lili', '123123123', error => {
            if (error) {
                console.log(error)

                return
            }

            console.log('user authenticated')

            client.close()
        })
    })
    .catch(error => console.error(error))
