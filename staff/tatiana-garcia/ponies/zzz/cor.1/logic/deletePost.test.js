import deletePost from './deletePost.js'

deletePost("tatig", "2qgbjm658wk", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})
