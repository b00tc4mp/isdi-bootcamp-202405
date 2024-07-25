import data from '../data/index.js'

import validate from '../validate.js'

const getFollowedUserPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (user === null) {
                callback(new Error('user not found'))

                return
            }

            data.posts.find({ author: { $in: user.following } }).sort({ date: -1 }).toArray()
                .then(posts => {
                    if (posts.length) {
                        let count = 0

                        posts.forEach(post => {
                            post.id = post._id.toString()
                            delete post._id

                            post.fav = user.savedPosts.includes(post.id)
                            post.like = post.likes.includes(username)

                            data.users.findOne({ username: post.author })
                                .then(author => {
                                    post.author = {
                                        username: author.username,
                                        avatar: author.avatar,
                                        following: user.following.includes(author.username)
                                    }

                                    count++

                                    if (count === posts.length) {
                                        callback(null, posts)
                                    }
                                })
                                .catch(error => callback(new Error(error.message)))
                        })
                    } else callback(null, [])
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default getFollowedUserPosts