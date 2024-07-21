import data from '../data/index.js'

import validate from '../validate.js'

const updatePostCaption = (username, postId, newCaption, callback) => {
    validate.username(username)
    validate.string(postId)
    validate.string(newCaption)
    validate.callback(callback)

   data.findUser(user => user.username === username, (error, user) => {
    if(error){
        callback(new Error(error.message))

        return
    }

    if (user === null) {
        callback(new Error('User not found'))

        return
    
    }

        data.findPost(post => post.id === postId, (error, post) => {
            if(error) {
                callback(new Error(error.message))

                return
            }

            if (post === undefined) throw new Error('post not found')
    
                post.caption = newCaption
            
                data.updatePost(post => post.id === postId, post, error => {
                    if(error) {
                        callback(new Error(error.message))

                        return
                    }

                    callback(null)
                })
        })
    
        
    
   })

    
}

export default updatePostCaption