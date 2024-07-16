import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../../app/validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findPost(condition) {
    validate.callback(condition, 'condition')

    const json = fs.readFileSync(`${__dirname}/posts.json`, "utf-8")

    const posts = json ? JSON.parse(json) : []

    const post = posts.find(condition)

    return post || null

}

export default findPost