import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, img, caption) => {
    validate.username(username)
    validate.string(img, 'img')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.create({
                img,
                caption,
                author: user._id
            })
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    user.posts.push(post._id)

                    return User.updateOne({ username }, { $set: { posts: user.posts } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}