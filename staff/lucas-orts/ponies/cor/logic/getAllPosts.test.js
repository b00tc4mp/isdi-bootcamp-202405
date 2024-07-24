import getAllPosts from './getAllPosts.js'

getAllPosts("Cacatua", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})