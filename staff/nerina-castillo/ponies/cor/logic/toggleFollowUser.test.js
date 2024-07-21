import toggleFollowUser from "./toggleFollowUser.js";

toggleFollowUser('maxPower', 'cauliFlower', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user followed')
})