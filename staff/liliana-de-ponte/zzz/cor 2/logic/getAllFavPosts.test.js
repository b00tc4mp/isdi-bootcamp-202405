import getAllFavPosts from './getAllFavPosts.js'

getAllFavPosts("lilideponte", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
