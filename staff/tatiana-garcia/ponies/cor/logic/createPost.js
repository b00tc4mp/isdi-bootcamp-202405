import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, image, caption, callback) => {
    validate.username(username)
    validate.url(image, 'image')
    validate.string(caption, 'caption')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.create({
                image,
                caption,
                author: username
            })
                .then(() => callback(null))
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}