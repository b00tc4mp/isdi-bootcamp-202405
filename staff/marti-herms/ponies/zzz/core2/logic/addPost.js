import data from '../data/index.js'

import validate from '../validate.js'

import generateId from '../util/generateId.js'

const addPost = (username, img, caption, callback) => {
    validate.username(username)
    validate.string(img, 'img')
    validate.string(caption, 'caption')
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('user not found'))

            return
        }

        if (!img.startsWith('http')) {
            callback(new Error('invalid image'))

            return
        }

        const post = {
            id: generateId(),
            img,
            caption,
            author: {
                username: user.username,
                avatar: user.avatar,
            },
            date: new Date().toISOString(),
            likes: []
        }

        data.insertPost(post, error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            user.yourPosts.push(post.id)

            data.updateUser(user => user.username === username, user, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })

    })
}

export default addPost