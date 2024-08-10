import toggleFavPost from './toggleFavPost.js'

toggleFavPost('lilideponte', "2cxgeu12zjkh8", error => {
    if (error) {
        cancelIdleCallback(new Error(error.message))

        return
    }

    console.log('fav post toggled')

})
