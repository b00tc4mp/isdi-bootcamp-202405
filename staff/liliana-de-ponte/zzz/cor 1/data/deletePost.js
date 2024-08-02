import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function deletePost(condition) {
    validate.callback(condition, 'condition')

    let json= fs.readFileSync(`${__dirname}/posts.json`, 'utf8')
    
    const posts = json? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        json= JSON.stringify(posts)

        fs.writeFileSync(`${__dirname}/posts.json`, json)
    }
}

export default deletePost