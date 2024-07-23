import deletePost from "./deletePost.js";

deletePost("lilideponte", "azjd6bgw1ww", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})