import data from '../data/index.mjs'

import generatedId from '../utils/generateId.mjs'

const createPost = (image, caption) => {
    if (!image.startsWith('http'))
        throw new Error('invalid image')

    const post = {
        id: generatedId(),
        image: image,
        caption: caption,
        author: sessionStorage.username,
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)
}

export default createPost