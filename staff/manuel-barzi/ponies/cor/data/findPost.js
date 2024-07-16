import fs from 'fs'

import validate from '../validate.js'

function findPost(condition) {
    validate.callback(condition, 'condition')

    const json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    const posts = json ? JSON.parse(json) : []

    const post = posts.find(condition)

    return post || null
}

export default findPost