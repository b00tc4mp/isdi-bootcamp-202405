import fs from 'fs'

import validate from '../validate.js'

function findPost(condition) {
    validate.callback(condition, 'condition')

    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const post = posts.find(condition)

    return post || null
}

export default findPost