import toggleFollowUser from './toggleFollowUser.js'

toggleFollowUser('marti', 'marti', error => {
    if (error) {
        console.error(error)

        return
    }
})