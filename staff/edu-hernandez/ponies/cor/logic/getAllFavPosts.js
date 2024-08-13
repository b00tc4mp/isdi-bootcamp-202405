import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find({ _id: { $in: user.favs } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const promises = posts.map(post => {
                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post._id.toString())
                        post.like = post.likes.some(userObjectId => userObjectId.toString() === userId)

                        return User.findById(post.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                post.author = {
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.includes(author.username)
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
