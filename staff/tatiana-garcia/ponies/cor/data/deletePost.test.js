import deletePost from './deletePost.js'

deletePost(post => post.id === '1ueanphtq31c', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})
