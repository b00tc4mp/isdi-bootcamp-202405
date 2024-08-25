import { User, Post } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.string(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(_user => {
            if (!_user) throw new NotFoundError('user not found')

            const userSearch = User.find({ username: new RegExp(query) }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => users.map(user => ({
                    id: user._id.toString(),
                    username: user.username,
                    avatar: user.avatar,
                    following: _user.following.some(userObjectId => userObjectId.toString() === user._id.toString())
                })))

            const postSearch = Post.find({ text: new RegExp(query) }, { __v: 0 }).sort({ date: -1 }).lean()
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
                                    following: _user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                                }

                                post.id = post._id.toString()
                                delete post._id

                                return post
                            })
                    })
                    return Promise.all(promises)
                })
            return Promise.all([userSearch, postSearch])
                .then(([users, posts]) => ({
                    users,
                    posts
                }))
        })
}