import data from '../data/index.js'

import validate from '../validate.js'

const createPost = (username, image, caption, callback) => {
    validate.username(username)
    validate.url(image, 'image')
    validate.string(caption, 'caption')
    validate.callback(callback)


data.users.findOne({username})
.then(user => {
        if (!user) {
            callback(new Error('user not found'))

            return

        }

        const post = {
            image,
            caption,
            author: username,
            date: new Date().toISOString(),
            likes: []

        }

data.posts.insertOne(post)
.then(()=> callback(null))
.catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}

export default createPost