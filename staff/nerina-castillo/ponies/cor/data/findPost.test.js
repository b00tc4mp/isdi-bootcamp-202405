import findPost from "./findPost.js";

const post = findPost(post => post.id === '13odod0tbx6', (error, post) => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post found', post)
})

console.log(post)