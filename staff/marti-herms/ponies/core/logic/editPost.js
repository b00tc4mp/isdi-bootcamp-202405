import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, id, newCaption, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (user === null) {
                callback(new Error('user not found'))

                return
            }

            if (!user.yourPosts.includes(id)) {
                callback(new Error('post is not from user'))

                return
            }

            Post.findOne({ _id: id }).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    if (post.caption !== newCaption) {
                        Post.updateOne({ _id: id }, { $set: { caption: newCaption } })
                            .then(() => callback(null))
                            .catch(error => callback(new Error(error.message)))
                    } else callback(null)
                })
        })
        .catch(error => callback(new Error(error.message)))
}