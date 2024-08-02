import { User, Post } from '../data/models.js'

import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, image, caption) => {
    validate.username(username)
    validate.url(image, 'image')
    validate.string(caption, 'caption')

    return User.findOne({ username }).lean()
        .catch(error => callback(new SystemError(error.message)))
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({
                image,
                caption,
                author: username
            })
                .catch(error => callback(new SystemError(error.message)))
        })
        .then(() => { })
}