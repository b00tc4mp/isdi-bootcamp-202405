import getAllFavPosts from './getAllFavPosts.js'

getAllFavPosts("Fabito", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
