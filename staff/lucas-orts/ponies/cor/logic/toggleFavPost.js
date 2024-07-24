import data from '../data/index.js'
import validate from '../validate.js'

const toggleFavPost = (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.callback(callback)

    data.findUser(user => user.username == username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('user not found'))

            return
        }

        data.findPost(post => post.id === postId, (error, post) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (post === null) {
                callback(new Error('post not found'))

                return
            }

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else
                user.favs.splice(index, 1)

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

export default toggleFavPost