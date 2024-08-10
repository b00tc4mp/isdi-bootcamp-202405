import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function updatePost(condition, post) {
    validate.callback(condition, 'condition')
    validate.object(post, 'post')

    let json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    const posts = json? JSON.parse(json) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        json= JSON.stringify(posts)

       fs.writeFileSync(`${__dirname}/posts.json`, json)
    }
}

export default updatePost