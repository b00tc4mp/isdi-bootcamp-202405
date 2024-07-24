import deletePost from "./deletePost.js"

deletePost(post => post.id === '2gouhl5uyg06721376432123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})