import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(author => {
                    if (!author)
                        throw new NotFoundError('author not found')

                    return Post.find({ author: author._id }).sort({ date: -1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(posts => {
                            const promises = posts.map(post => {
                                post.fav = author.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                                post.like = post.likes.some(userObjectId => userObjectId._id.toString() === user._id.toString())

                                post.id = post._id.toString()
                                delete post._id

                                post.author = {
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