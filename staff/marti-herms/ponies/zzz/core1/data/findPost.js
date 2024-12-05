import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findPost(condition) {
    validate.callback(condition, 'condition')

    let json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    const posts = json ? JSON.parse(json) : []

    const post = posts.find(condition)

    return post || null
}

export default findPost