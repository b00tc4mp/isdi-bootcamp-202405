import toggleFollowUser from './toggleFollowUser.js'

toggleFollowUser('Jhonymelavo', 'Cacatua', error => {
    if (error) {
        console.error(error)

        return
    }
})