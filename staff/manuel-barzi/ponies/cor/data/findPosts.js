import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findPosts(condition) {
    validate.callback(condition, 'condition')

    const json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    const posts = json ? JSON.parse(json) : []

    const foundPosts = posts.filter(condition)

    return foundPosts
}

export default findPosts