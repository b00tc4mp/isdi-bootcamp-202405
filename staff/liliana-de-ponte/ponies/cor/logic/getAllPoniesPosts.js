import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default username => {
    validate.username(username)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find({ author: { $in: user.following } }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post._id.toString())
                        post.like = post.likes.includes(username)

                        return User.findOne({ username: post.author }).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                post.author = {
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.includes(author.username)
                                }

                                posts.forEach(post => {
                                    post.id = post._id.toString()

                                    delete post._id
                                })

                                return post
                            })
                    })
                    return Promise.all(promises)
                })
        })
}