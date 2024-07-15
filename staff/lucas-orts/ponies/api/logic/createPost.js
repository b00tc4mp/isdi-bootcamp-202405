import data from '../data/index.js'
import validate from '../validate.js'

import generateId from '../util/generateId.js'

const createPost = (username, image, caption) => {
    validate.username(username)
    validate.image(image)
    validate.string(caption, 'Caption')

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('user not found')

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