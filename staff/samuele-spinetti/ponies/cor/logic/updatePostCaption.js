import data from '../data/index.js'

import validate from '../validate.js'

import { ObjectId } from 'mongodb'

export default (username, postId, caption, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.string(caption)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) {
                        callback(new Error('Post not found'))

                        return
                    }

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: { caption } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}