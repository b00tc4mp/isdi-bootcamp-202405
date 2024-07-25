import { User, Post } from '../data/models.js'
import { validate } from 'com'
import { ObjectId } from 'mongodb'

export default (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('User not found'))

                return
            }

            Post.findById({ _id: postId }).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('Post not found'))

                        return
                    }

                    const { favs } = user

                    const index = favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        favs.push(new ObjectId(postId))
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