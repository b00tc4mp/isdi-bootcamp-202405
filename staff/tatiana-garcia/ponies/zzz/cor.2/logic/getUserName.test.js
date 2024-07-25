import getUserName from './getUserName.js'
import data from '../data/index.js'

import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        getUserName('fabito', 'lili', (error, name) => {
            if (error) {
                console.error(error)

                return
            }
            console.log(name)

            client.close()
        })
    })
    .catch(error => console.error(error))

