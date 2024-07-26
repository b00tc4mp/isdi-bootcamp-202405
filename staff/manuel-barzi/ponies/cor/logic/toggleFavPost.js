import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
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

                    const { favs } = user

                    const index = favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        favs.push(postId)
                    else
                        favs.splice(index, 1)

                    User.updateOne({ username }, { $set: { favs } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}