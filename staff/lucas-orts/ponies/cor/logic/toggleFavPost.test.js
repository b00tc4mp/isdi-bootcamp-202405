import toggleFavPost from './toggleFavPost.js'

toggleFavPost('Jhonymelavo', '2gouhl5uylg', error => {
    if (error) {
        console.error(error)

        return
    }
})