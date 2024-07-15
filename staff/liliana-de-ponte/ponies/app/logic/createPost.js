import data from '../data'

import generateId from '../utils/generateId.js'

import validate from '../validate.js'

const createPost = (username, image, caption) => {
    validate.username(username)
    validate.image(image)
    validate.string(caption, 'caption')
    
        const user = data.findUser(user => user.username == username)
    

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