import getAllFavPosts from "./getAllFavPosts.js";

getAllFavPosts('cauliFlower',(error, posts) => {
    if(error) {
        console.error(error)

        return
    }

console.log('posts:', posts)

})


