import toggleFavPost from './toggleFavPost.js'

toggleFavPost('samu', '1ksy8z2bdn6o', error => {
    if (error) {
        callback(new Error(error.message))

        return
    }

    console.log('fav post toggled')
})