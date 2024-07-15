import deletePost from "./deletePost.js";

const deletedPost = deletePost(post => post.id === "2nw3uw9axfi")

console.log(deletedPost)