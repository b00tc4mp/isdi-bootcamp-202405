import createPost from "./createPost.js";

createPost("cauliFlower", "https//nlknvliver", "hey", error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post created')
})