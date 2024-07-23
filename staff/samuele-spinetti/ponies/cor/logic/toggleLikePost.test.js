import toggleLikePost from './toggleLikePost.js'

toggleLikePost('marti', 'aey5mjq704g', error => {
    if (error) {
        console.error(error)

        return
    }
})