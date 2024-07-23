import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = (username, id, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.callback(callback, 'id')

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

        data.deletePost(post => post.id === id, error => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            data.removePostFromUsers(id, error => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

export default deletePost