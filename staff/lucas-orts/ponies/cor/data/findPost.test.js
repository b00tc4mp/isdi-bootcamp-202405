import findPost from "./findPost.js"

const postFound = findPost(post => post.id === '2gouhl5uylg0', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post found', post)
})