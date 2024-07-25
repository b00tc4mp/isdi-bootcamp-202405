import 'dotenv/config'

import data from '../data/index.js'

import { MongoClient } from 'mongodb'

import updateAvatar from './updateAvatar.js'

const client = new MongoClient(process.env.MONGODB_URI)

client.connect()
    .then(() => {
        console.log('Connected')

        const test = client.db('test')
        const users = test.collection('users')

        data.users = users

        updateAvatar('samu', 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=790b76112723qawue4wb4csm6w86jno3khupqhzqag5992sb&ep=v1_gifs_trending&rid=giphy.gif&ct=g', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Avatar updated')

            client.close()
        })
    })
    .catch(error => console.error(error))
