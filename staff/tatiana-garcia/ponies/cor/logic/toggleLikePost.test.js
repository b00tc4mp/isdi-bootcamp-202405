import toggleLikePost from './toggleLikePost.js';

toggleLikePost("abtg", "ooxdf4xo6cw", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('like post toggled')
})