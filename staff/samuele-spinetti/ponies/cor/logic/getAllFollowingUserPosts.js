import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'))

                return
            }

            Post.find({ author: { $in: user.following } }).sort({ date: -1 }).lean()
                .then(posts => {
                    if (posts.length) {
                        let count = 0

                        posts.forEach(post => {
                            post.fav = user.favs.some(postObjectId => postObjectId.toString() === post._id.toString())
                            post.like = post.likes.includes(username)

                            User.findOne({ username: post.author }).lean()
                                .then(author => {
                                    post.author = {
                                        username: author.username,
                                        avatar: author.avatar,
                                        following: user.following.includes(author.username)
                                    }

                                    count++

                                    if (count === posts.length) {
                                        posts.forEach(post => {
                                            post.id = post._id.toString()

                                            delete post._id
                                        })

                                        callback(null, posts)
                                    }
                                })
                                .catch(error => callback(new SystemError(error.message)))
                        })
                    } else callback(null, [])
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}