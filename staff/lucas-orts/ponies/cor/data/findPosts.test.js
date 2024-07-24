import findPosts from "./findPosts.js"

const postsFound = findPosts(post => post.author = 'Petazeta', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }
    console.log(postsFound)
})

