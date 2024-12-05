import fs from 'fs'

import validate from '../validate.js'

function removePostFromUsers(id) {
    validate.string(id, 'id')

    let json = fs.readFileSync('./data/users.json', 'utf8')

    const users = json ? JSON.parse(json) : []

    users.forEach((user) => {
        user.yourPosts = user.yourPosts.filter(postId => postId !== id)
        user.likedPosts = user.likedPosts.filter(postId => postId !== id)
        user.savedPosts = user.savedPosts.filter(postId => postId !== id)
    })

    json = JSON.stringify(users)

    fs.writeFileSync('./data/users.json', json)
}

export default removePostFromUsers