import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../../app/validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function deletePost(condition, callback) {
    validate.callback(condition, 'consition')
    validate.callback(callback)

    fs.readFile(`${__dirname}/posts.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const posts = json ? JSON.parse(json) : [] // si esta lo parsea y lo mete en posts

        const postIndex = posts.findIndex(condition) //aqui los busca y los mete en postIndex

        if (postIndex > -1) {
            posts.splice(postIndex, 1)

            json = JSON.stringify(posts)

            fs.writeFile(`${__dirname}/posts.json`, json, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        }
    })

}

export default deletePost