import data from '../data/index.js'

import generateId from '../util/generateId.js'

import validate from '../../app/validate.js'

const createPost = (username, image, caption, callback) => {
    validate.username(username)
    validate.image(image, 'image')
    validate.string(caption, 'caption')
    validate.callback(callback)

    data.findUser(user => user.username == username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('user not found'))

            return
        }

        const post = {
            id: generateId(),
            image,
            caption,
            author: username,
            date: new Date().toISOString(),
            likes: []
        }

        data.insertPost(post, error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })
}

export default createPost