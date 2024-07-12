import data from '../data/index.js'

import generateId from '../util/generateId.js'

import validate from '../validate.js'

const createPost = (image, caption) => {
    validate.image(image)
    validate.string(caption)

    const post = {
        id: generateId(),
        image,
        caption,
        author: sessionStorage.username,
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)
}

export default createPost