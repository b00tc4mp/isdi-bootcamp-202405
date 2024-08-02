import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.string(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find({ author: { $in: user.following } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.fav = user.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                        post.like = post.likes.some(userObjectId => userObjectId._id.toString() === userId.toString())

                        post.id = post._id.toString()
                        delete post._id

                        return User.findOne({ _id: post.author }).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                post.author = {
                                    id: author.id,
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                                }

                                return post
                            })
                    })

                    return Promise.all(promises)
                })
        })
}