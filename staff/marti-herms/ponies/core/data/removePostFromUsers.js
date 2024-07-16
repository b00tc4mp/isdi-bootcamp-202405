import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function removePostFromUsers(id) {
    validate.string(id, 'id')

    let json = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

    const users = json ? JSON.parse(json) : []

    users.forEach((user) => {
        user.yourPosts = user.yourPosts.filter(postId => postId !== id)
        user.likedPosts = user.likedPosts.filter(postId => postId !== id)
        user.savedPosts = user.savedPosts.filter(postId => postId !== id)
    })

    json = JSON.stringify(users)

    fs.writeFileSync(`${__dirname}/users.json`, json)
}

export default removePostFromUsers