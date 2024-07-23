import findPost from "./findPost.js";

findPost(post => post.id === '2cxgeu12zjkh8', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post found', post)
})
