import toggleFollowUser from './toggleFollowUser.js';

toggleFollowUser("abtg", "tatig", error => {
    if (error) {
        callbaback(new Error(error.message))

        return
    }

    console.log('follow user toggled')
})