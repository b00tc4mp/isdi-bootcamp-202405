import toggleLikePost from './toggleLikePost.js'

toggleLikePost("Fabito", "gud3txmwlqo", error => {
    if (error) {
        console.error(error)

        return
    }

})