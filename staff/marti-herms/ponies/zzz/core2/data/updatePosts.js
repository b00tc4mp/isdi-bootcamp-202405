import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function updatePosts(posts, callback) {
    validate.object(posts, 'posts')
    validate.callback(callback)

    fs.readFile(`${__dirname}/posts.json`, 'utf8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const oldPosts = json ? JSON.parse(json) : []

        posts.forEach(post => {
            const index = oldPosts.findIndex(oldPost => oldPost.id === post.id)
            if (index !== -1) {
                oldPosts.splice(index, 1, post)
            }
        })

        json = JSON.stringify(oldPosts)

        fs.writeFile(`${__dirname}/posts.json`, json, (error) => {
            if (error) {
                callback(new Error(error.message))

                return
            }
            callback(null)
        })
    })

}

export default updatePosts