import getAllFavPosts from './getAllFavPosts.js'

getAllFavPosts('tatig', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }
    console.log(posts)
})
