import data from '../data/index.js'

import validate from '../validate.js'

const editPost = (username, id, newCaption, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')
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

        if (!user.yourPosts.includes(id)) {
            callback(new Error('post is not from user'))

            return
        }

        data.findPost(item => item.id === id, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (post === undefined) {
                callback(new Error('post not found'))

                return
            }

            if (post.caption !== newCaption) {
                post.caption = newCaption

                data.updatePost(post => post.id === id, post, (error) => {
                    if (error) {
                        callback(new Error(error.message))

                        return
                    }

                    callback(null)
                })
            }
        })
    })
}

export default editPost