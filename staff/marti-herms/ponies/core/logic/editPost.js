import { ObjectId } from 'mongodb'
import data from '../data/index.js'

import validate from '../validate.js'

const editPost = (username, id, newCaption, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')
    validate.callback(callback)

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

            data.posts.findOne({ _id: new ObjectId(id) })
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    if (post.caption !== newCaption) {
                        data.posts.updateOne({ _id: new ObjectId(id) }, { $set: { caption: newCaption } })
                            .then(() => callback(null))
                            .catch(error => callback(new Error(error.message)))
                    }

                    callback(null)
                })
        })
        .catch(error => callback(new Error(error.message)))
}

export default editPost