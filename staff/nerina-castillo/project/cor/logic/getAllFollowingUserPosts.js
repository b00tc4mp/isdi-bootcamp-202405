import { User, Post } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find({ author: { $in: user.following } }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.like = (post.likes || []).some(userObjectId => userObjectId.toString() === userId)

                        return User.findById(post.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

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
