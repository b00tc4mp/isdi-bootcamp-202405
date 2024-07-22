import toggleLikePost from './toggleLikePost.js'

toggleLikePost('samu', '1ksy8z2bdn6o', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('like post toggled')
})