import { User, Post } from '../data/models.js'
import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    const { likes } = post

                    const index = likes.indexOf(username)

                    if (index < 0)
                        likes.push(username)
                    else
                        likes.splice(index, 1)

                    Post.updateOne({ _id: postId }, { $set: { likes } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}