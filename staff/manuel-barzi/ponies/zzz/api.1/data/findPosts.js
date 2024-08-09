import fs from 'fs'

import validate from '../validate.js'

function findPosts(condition) {
    validate.callback(condition, 'condition')

    const json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const foundPosts = posts.filter(condition)

    return foundPosts
}

export default findPosts