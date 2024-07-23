import toggleFavPost from './toggleFavPost.js'

toggleFavPost("Fabito", "mi8drcuyseo", error => {
    if (error) {
        console.error(error)

        return

    }

    console.log('post favorited')
})