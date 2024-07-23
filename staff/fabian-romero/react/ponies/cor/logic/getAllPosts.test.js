import getAllPosts from './getAllPosts.js'

getAllPosts("Fabito", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }
    console.log(posts)
})
