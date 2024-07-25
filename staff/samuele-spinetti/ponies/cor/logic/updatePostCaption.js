import { User, Post } from '../data/models.js'
import { validate } from 'com'
import { ObjectId } from 'mongodb'

export default (username, postId, caption, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.string(caption)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            Post.findOne({ _id: postId }).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('Post not found'))

                        return
                    }

                    Post.updateOne({ _id: new ObjectId(postId) }, { $set: { caption } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}