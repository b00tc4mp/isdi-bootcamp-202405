import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, img, caption) => {
    validate.string(userId, 'userId')
    validate.string(img, 'img')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.create({
                img,
                caption,
                author: userId
            })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    user.posts.push(post._id)

                    return User.findByIdAndUpdate(userId, { posts: user.posts })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}