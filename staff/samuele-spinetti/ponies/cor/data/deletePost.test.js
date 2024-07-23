import deletePost from './deletePost.js'

deletePost(post => post.id === "abcdefghl", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post deleted')
})