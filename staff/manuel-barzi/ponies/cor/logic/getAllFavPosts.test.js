import getAllFavPosts from './getAllFavPosts.js'

getAllFavPosts('samu', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})