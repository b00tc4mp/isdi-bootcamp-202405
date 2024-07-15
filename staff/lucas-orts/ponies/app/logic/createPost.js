import data from '../data'
import validate from '../validate.js'

import generateId from '../util/generateId'

const createPost = (image, caption) => {
    validate.image(image)
    validate.string(caption)

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