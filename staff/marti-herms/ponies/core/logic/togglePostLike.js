import { ObjectId } from 'mongodb'
import data from '../data/index.js'

import { validate } from 'com'

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

                    const index = post.likes.indexOf(username)

                    if (index < 0) {
                        post.likes.push(username)
                    } else {
                        post.likes.splice(index, 1)
                    }

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })
                        .then(() => {
                            const postIndex = user.likedPosts.findIndex(id => id === postId)

                            if (postIndex !== -1) {
                                user.likedPosts.splice(postIndex, 1)
                            } else {
                                user.likedPosts.push(new ObjectId(postId))
                            }

                            data.users.updateOne({ username }, { $set: { likedPosts: user.likedPosts } })
                                .then(() => callback(null))
                                .catch(error => callback(new Error(error.message)))
                        })
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}