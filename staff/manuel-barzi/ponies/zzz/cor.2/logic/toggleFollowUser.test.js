import toggleFollowUser from './toggleFollowUser.js'

toggleFollowUser('samu', 'marti', error => {
    if (error) {
        callback(new Error(error.message))

        return
    }

    console.log('follow user toggled')
})