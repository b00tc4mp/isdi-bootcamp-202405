import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
function updatePosts(posts) {
    validate.object(posts, 'posts')

    let json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    const oldPosts = json ? JSON.parse(json) : []

    posts.forEach(post => {
        const index = oldPosts.findIndex(oldPost => oldPost.id === post.id)
        if (index !== -1) {
            oldPosts.splice(index, 1, post)
        }
    })

    json = JSON.stringify(oldPosts)

    fs.writeFileSync(`${__dirname}/posts.json`, json)
}

export default updatePosts