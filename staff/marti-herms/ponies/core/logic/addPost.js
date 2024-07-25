import data from '../data/index.js'

import { validate } from 'com'

export default (username, img, caption, callback) => {
    validate.username(username)
    validate.string(img, 'img')
    validate.string(caption, 'caption')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (!img.startsWith('http')) {
                callback(new Error('invalid image'))

                return
            }

            const post = {
                img,
                caption,
                author: user.username,
                date: new Date().toISOString(),
                likes: []
            }

            data.posts.insertOne(post)
                .then(result => {
                    user.yourPosts.push(result.insertedId.toString())

                    data.users.updateOne({ username }, { $set: { yourPosts: user.yourPosts } })
                        .then(() => callback(null))
                        .catch(error => new Error(error.message))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))

}