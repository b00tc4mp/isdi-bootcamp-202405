import getAllFavPosts from './getAllFavPosts.js'

getAllFavPosts("Taguapo", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})