import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.string(userId, 'userId')
    validate.string(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(targetUserId)
                .catch(error => { throw new SystemError(error.message) })
                .then(author => {
                    if (!author)
                        throw new NotFoundError('author not found')

                    return Post.find({ author: targetUserId }, { __v: 0 }).sort({ date: -1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(posts => {
                            const promises = posts.map(post => {
                                post.fav = author.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                                post.like = post.likes.some(userObjectId => userObjectId._id.toString() === userId)

                                post.id = post._id.toString()
                                delete post._id

                                post.author = {
                                    id: author.id,
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                                }

                                return post
                            })

                            return Promise.all(promises)
                        })
                })
        })
}