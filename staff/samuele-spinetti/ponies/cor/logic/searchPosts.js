import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.string(userId, 'UserId')
    validate.string(query, 'Query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Post.find({ caption: new RegExp(query) }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post._id.toString())
                        post.like = post.likes.some(userObjectId => userObjectId.toString() === userId)

                        return User.findById(post.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('Author not found')

                                post.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
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