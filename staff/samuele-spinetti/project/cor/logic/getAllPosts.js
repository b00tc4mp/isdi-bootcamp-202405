import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find({}, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.like = post.likes.some(userObjectId => userObjectId.toString() === userId)

                        return User.findById(post.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                post.author = {
                                    id: author._id.toString(),
                                    avatar: author.avatar,
                                }

                                post.id = post._id.toString()
                                delete post._id

                                return post
                            })
                    })

                    return Promise.all(promises)
                        .then(posts => posts)
                })
        })
}