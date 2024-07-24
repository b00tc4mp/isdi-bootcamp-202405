import deletePost from './deletePost.js'

deletePost("Petazeta", "2gouhl5uylg0", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})