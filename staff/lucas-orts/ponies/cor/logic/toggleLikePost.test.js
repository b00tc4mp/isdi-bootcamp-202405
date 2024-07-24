import toggleLikePost from './toggleLikePost.js'

toggleLikePost('Jhonymelavo', '2gouhl5uylg', error => {
    if (error) {
        console.error(error)

        return
    }
})