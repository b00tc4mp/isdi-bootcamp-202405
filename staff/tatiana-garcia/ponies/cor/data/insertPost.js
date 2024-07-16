import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../../app/validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function insertPost(post) {
    validate.object(post, 'post')

    let json = fs.readFileSync(`${__dirname}/posts.json`, "utf-8")

    const posts = json ? JSON.parse(json) : []

    posts.push(post)

    json = JSON.stringify(posts)

    fs.writeFileSync(`${__dirname}/posts.json`, json)

}

export default insertPost