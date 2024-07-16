import data from '../data/index.js'

import validate from '../../app/validate.js'

import generateId from '../util/generateId.js'

const createPost = (username, image, caption) => {
    validate.username(username)
    validate.image(image, 'image')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('user not found')

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

