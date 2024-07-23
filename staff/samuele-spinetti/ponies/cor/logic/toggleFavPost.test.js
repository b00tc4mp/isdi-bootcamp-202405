import toggleFavPost from './toggleFavPost.js'

toggleFavPost('samu', 'aey5mjq704g', error => {
    if (error) {
        console.error(error)

        return
    }
})