import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (username, postId) => {
    validate.username(username)
    validate.string(postId, 'postId')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    if (post.author.toString() !== user._id.toString())
                        throw new OwnershipError('user is not author')

                    const index = user.posts.findIndex(postId => postId.toString() === postId)

                    if (index > -1) user.posts.splice(index, 1)

                    return User.updateOne({ username }, { $set: { posts: user.yourPosts } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() =>
            Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}