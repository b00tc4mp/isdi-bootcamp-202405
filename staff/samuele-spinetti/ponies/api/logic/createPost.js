import data from "../data/index.js"

import generateId from '../util/generateId.js'

const createPost = (username, image, caption) => {
    const user = data.findUser(user => user.username == username)

    if (user === null)
        throw new Error('User not found')

    if (!image.startsWith('http'))
        throw new Error('invalid image')

    const post = {
        id: generateId(),
        image: image,
        caption: caption,
        author: username,
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)
}

export default createPost