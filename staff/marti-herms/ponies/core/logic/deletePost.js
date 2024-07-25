import { ObjectId } from 'mongodb'

import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = (username, id, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.callback(callback, 'id')

    data.users.findOne({ username })
        .then(user => {
            if (user === null) {
                callback(new Error('user not found'))

                return
            }

            if (!user.yourPosts.includes(id)) {
                callback(new Error('post is not from user'))

                return
            }

            const index = user.yourPosts.indexOf(id)

            user.yourPosts.splice(index, 1)

            data.users.updateOne({ username }, { $set: { yourPosts: user.yourPosts } })
                .then(() => {
                    data.posts.deleteOne({ _id: new ObjectId(id) })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default deletePost