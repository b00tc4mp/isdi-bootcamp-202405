import deletePost from './deletePost.js'

deletePost("Valito", "n79ru9qf9kw", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})