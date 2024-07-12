import fs from 'fs'

import validate from '../validate.js'

function insertPost(post) {
    validate.object(post, 'post')

    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    posts.push(post)

    json = JSON.stringify(posts)

    fs.writeFileSync('./data/posts.json', json)
}

export default insertPost