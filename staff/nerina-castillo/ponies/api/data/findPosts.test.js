import findPosts from "./findPosts.js";

const post = findPosts(post => post.author === 'cauliFlower')

console.log(post)