import toggleFollowUser from "./toggleFollowUser.js"

toggleFollowUser("manubarzi", "peterpan", error => {
    if (error) {
        callback(new Error(error.message))

        return
    }

    console.log('follow user toggled')
})