import { User, Post } from "../data/models.js"
import { validate } from '../../com/index.js'

export default (username, postId, caption, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.string(caption, 'caption')
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

                    Post.updateOne({ _id: postId }, { $set: { caption } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))

                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}
