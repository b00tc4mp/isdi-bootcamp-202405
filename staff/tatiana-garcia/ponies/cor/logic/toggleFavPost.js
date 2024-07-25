import data from '../data/index.js'
import validate from '../../app/validate.js'

import { ObjectId } from 'mongodb'

function toggleFavPost(username, postId, callback) {
    validate.username(username)
    validate.postId(postId, 'postId')
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(posts => {
                    if (!posts) {
                        callback(new Error('post not found'))

                        return
                    }

                    const { favs } = user

                    const index = favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        favs.push(new ObjectId(postId))
                    else
                        favs.splice(index, 1)

                    data.users.updateOne({ username }, { $set: { favs } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))

                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => console.log(new Error(error.message)))

}

export default toggleFavPost