import data from "../data"

import generateId from '../util/generateId.js'

const createPost = (image, caption) => {
    if (!image.startsWith('http'))
        throw new Error('invalid image')

    const post = {
        id: generateId(),
        image: image,
        caption: caption,
        author: sessionStorage.username,
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)
}

export default createPost