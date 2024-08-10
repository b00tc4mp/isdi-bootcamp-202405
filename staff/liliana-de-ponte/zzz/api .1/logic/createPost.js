import data from '../data/index.js'

import generateId from '../utils/generateId.js'

import validate from '../validate.js'

const createPost = (username, image, caption) => {
validate.username(username)
validate.image(image)
validate.string(caption, 'caption')

    const user = data.findUser(user => user.username == username)

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