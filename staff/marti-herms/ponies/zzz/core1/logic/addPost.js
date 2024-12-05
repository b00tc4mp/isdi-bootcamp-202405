import data from '../data/index.js'

import validate from '../validate.js'

import generateId from '../util/generateId.js'

const addPost = (username, img, caption) => {
    validate.username(username)
    validate.string(img, 'img')
    validate.string(caption, 'caption')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (!img.startsWith('http')) {
        throw new Error('invalid image')
    }

    const post = {
        id: generateId(),
        img,
        caption,
        author: {
            username: user.username,
            avatar: user.avatar,
        },
        date: new Date().toISOString(),
        likes: []
    }

    data.insertPost(post)

    user.yourPosts.push(post.id)

    data.updateUser((user) => user.username === username, user)
}

export default addPost