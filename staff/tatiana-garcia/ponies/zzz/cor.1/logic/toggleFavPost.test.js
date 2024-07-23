import toggleFavPost from "./toggleFavPost.js";

toggleFavPost("abtg", "qvqbt790bs0", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post favorite')
})