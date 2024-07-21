import getAllPosts from "./getAllPosts.js";

getAllPosts('cauliFlower', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
