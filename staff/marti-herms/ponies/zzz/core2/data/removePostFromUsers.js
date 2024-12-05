import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function removePostFromUsers(id, callback) {
    validate.string(id, 'id')
    validate.callback(callback)

    fs.readFile(`${__dirname}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const users = json ? JSON.parse(json) : []

        users.forEach((user) => {
            user.yourPosts = user.yourPosts.filter(postId => postId !== id)
            user.likedPosts = user.likedPosts.filter(postId => postId !== id)
            user.savedPosts = user.savedPosts.filter(postId => postId !== id)
        })

        json = JSON.stringify(users)

        fs.writeFile(`${__dirname}/users.json`, json, (error) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })

}

export default removePostFromUsers