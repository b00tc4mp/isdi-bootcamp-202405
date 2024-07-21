import getAllFollowingUserPosts from "./getAllFollowingUserPosts.js";

getAllFollowingUserPosts('cauliFlower', (error, posts) => {
    if(error) {
        console.error(error)

        return
    }

console.log(posts)

})
