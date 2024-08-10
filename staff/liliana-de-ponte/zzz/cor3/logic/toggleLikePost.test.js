import toggleLikePost from "./toggleLikePost.js";

toggleLikePost("martiherms", "abcdefghl", error => {
    if (error) {
        console.error(error)

        return
    }
    console.log('like post toggled')
})