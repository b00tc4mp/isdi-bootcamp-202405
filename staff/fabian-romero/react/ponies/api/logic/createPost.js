import data from '../data/index.js'

import generateId from '../util/generateId'

const createPost = (image, caption) => {

    const user = data.findeUser(user => user.username == username)

    if (user === null)
        throw new Error('user not found')

    if (!image.startsWith('http'))
        throw new Error('invalid image')

    const post = {
        id: generateId(),
        image,
        caption,
        author: username,
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)
}

export default createPost