import toggleLikePost from "./toggleLikePost.js";

toggleLikePost('maxPower', 'olzkh3ya8hs', (error) => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post liked')
})