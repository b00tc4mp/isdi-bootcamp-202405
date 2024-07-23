import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../../app/validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function updatePost(condition, post, callback) {
    validate.callback(condition, 'condition')
    validate.object(post, 'post')
    validate.callback(callback)

    fs.readFile(`${__dirname}/posts.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const posts = json ? JSON.parse(json) : []

        const index = posts.findIndex(condition)

        if (index > -1) {
            posts.splice(index, 1, post)

            json = JSON.stringify(posts)

            fs.writeFile(`${__dirname}/posts.json`, json, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })

            return
        }

        callback(null)
    })
}

export default updatePost