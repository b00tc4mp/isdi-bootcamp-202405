import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, img, caption, callback) => {
    validate.username(username)
    validate.string(img, 'img')
    validate.string(caption, 'caption')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.create({
                img,
                caption,
                author: user._id
            })
                .then(result => {
                    user.posts.push(result.insertedId)

                    User.updateOne({ username }, { $set: { posts: user.yourPosts } })
                        .then(() => callback(null))
                        .catch(error => new Error(error.message))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))

}