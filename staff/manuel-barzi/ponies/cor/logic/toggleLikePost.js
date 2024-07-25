import { ObjectId } from 'mongodb'
import data from '../data/index.js'

import validate from '../validate.js'

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            data.posts.findOne({ _id: new ObjectId(postId) })
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

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}