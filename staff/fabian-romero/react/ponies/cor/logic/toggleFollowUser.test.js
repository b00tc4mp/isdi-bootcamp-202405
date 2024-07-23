import toggleFollowUser from './toggleFollowUser.js'

toggleFollowUser("Fabito", "Valito", error => {
    if (error) {
        console.error(error)

        return

    }
    console.log()
})