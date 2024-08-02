import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username) => {
    validate.username(username)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find({}, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.fav = user.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                        post.like = post.likes.some(userObjectId => userObjectId._id.toString() === user._id.toString())

                        post.id = post._id.toString()
                        delete post._id

                        return User.findOne({ _id: post.author })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                post.author = {
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