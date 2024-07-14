import data from '../data'

import validate from '../validate.js'

import generateId from '../util/generateId.mjs'

const createPost = (image, caption) => {
    validate.image(image, 'image')

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

